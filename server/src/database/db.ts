import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import mysql from 'mysql2/promise';
import { config } from '../config/index.js';

let sqliteDb: Database.Database | null = null;
let mysqlPool: mysql.Pool | null = null;

export async function getDb() {
  if (config.db.client === 'mysql') {
    if (!mysqlPool) {
      mysqlPool = mysql.createPool({
        host: config.db.mysql.host,
        port: config.db.mysql.port,
        user: config.db.mysql.user,
        password: config.db.mysql.password,
        database: config.db.mysql.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }
    return mysqlPool;
  } else {
    if (!sqliteDb) {
      const dbDir = path.dirname(config.db.sqlitePath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
      sqliteDb = new Database(config.db.sqlitePath);
      sqliteDb.pragma('journal_mode = WAL');
      sqliteDb.pragma('foreign_keys = ON');
    }
    return sqliteDb;
  }
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  if (config.db.client === 'mysql') {
    const pool = (await getDb()) as mysql.Pool;
    const [rows] = await pool.query(sql, params);
    return rows as T[];
  } else {
    const db = (await getDb()) as Database.Database;
    const stmt = db.prepare(sql);
    return stmt.all(...params) as T[];
  }
}

export async function get<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  if (config.db.client === 'mysql') {
    const pool = (await getDb()) as mysql.Pool;
    const [rows] = await pool.query(sql, params);
    const arr = rows as T[];
    return arr.length > 0 ? arr[0] : null;
  } else {
    const db = (await getDb()) as Database.Database;
    const stmt = db.prepare(sql);
    const row = stmt.get(...params) as T | undefined;
    return row || null;
  }
}

export async function execute(
  sql: string,
  params: any[] = []
): Promise<{ insertId: number; affectedRows: number }> {
  if (config.db.client === 'mysql') {
    const pool = (await getDb()) as mysql.Pool;
    const [result] = await pool.execute(sql, params) as any;
    return {
      insertId: Number(result.insertId) || 0,
      affectedRows: Number(result.affectedRows) || 0,
    };
  } else {
    const db = (await getDb()) as Database.Database;
    const stmt = db.prepare(sql);
    const result = stmt.run(...params);
    return {
      insertId: Number(result.lastInsertRowid) || 0,
      affectedRows: Number(result.changes) || 0,
    };
  }
}

export async function initDb() {
  const isMysql = config.db.client === 'mysql';
  const schemaFile = isMysql ? 'schema.mysql.sql' : 'schema.sql';
  const schemaPath = path.resolve(process.cwd(), 'src/database', schemaFile);

  if (fs.existsSync(schemaPath)) {
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    if (isMysql) {
      const pool = (await getDb()) as mysql.Pool;
      const statements = schemaContent
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith('--') && !s.toLowerCase().startsWith('use '));
      for (const statement of statements) {
        await pool.query(statement);
      }
    } else {
      const db = (await getDb()) as Database.Database;
      db.exec(schemaContent);
    }
  }
}

