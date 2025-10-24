import mysql from 'mysql2/promise';

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'motorweb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// 创建连接池
export let pool;

export const getConnection = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool(dbConfig);
    }
    return pool;
  } catch (error) {
    console.error('数据库连接失败:', error);
    throw error;
  }
};

// 执行查询的辅助函数
export const executeQuery = async (query, params = []) => {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('查询执行失败:', error);
    throw error;
  }
};

// 测试数据库连接
export const testConnection = async () => {
  try {
    const connection = await getConnection();
    await connection.execute('SELECT 1');
    console.log('数据库连接成功!');
    return true;
  } catch (error) {
    console.error('数据库连接测试失败:', error);
    return false;
  }
};

export default { getConnection, executeQuery, testConnection };