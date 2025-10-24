import { NextResponse } from 'next/server';
import { executeQuery, testConnection } from '../../../lib/db.js';

export async function GET() {
  try {
    console.log('正在尝试连接到数据库...');
    
    // 测试数据库连接
    await testConnection();
    
    // 执行一个简单的查询
    const result = await executeQuery('SELECT 1 + 1 AS solution');
    
    console.log('数据库连接成功！');
    console.log('查询结果:', result[0]?.solution);
    
    return NextResponse.json({
      success: true,
      message: '数据库连接成功！',
      result: result[0]?.solution || 2,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('数据库连接失败:', error);
    
    return NextResponse.json({
      success: false,
      message: '数据库连接失败',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}