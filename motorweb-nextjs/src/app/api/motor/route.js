import { NextResponse } from 'next/server';
import { executeQuery } from '../../../lib/db.js';

export async function GET() {
  try {
    console.log('正在查询motorcycles表数据...');
    
    // 查询motorcycles表中的所有数据
    const motorcycles = await executeQuery('SELECT * FROM motorcycles ORDER BY brand, model');
    
    console.log(`成功获取 ${motorcycles.length} 条摩托车数据`);
    
    return NextResponse.json({
      success: true,
      message: '成功获取摩托车数据',
      data: motorcycles,
      count: motorcycles.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('查询motorcycles表失败:', error);
    
    return NextResponse.json({
      success: false,
      message: '查询摩托车数据失败',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}