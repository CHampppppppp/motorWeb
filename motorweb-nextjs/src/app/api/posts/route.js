import { NextResponse } from 'next/server';
import { executeQuery } from '../../../lib/db.js';

export async function GET() {
    try{
        console.log('正在获取文章')

    const posts = await executeQuery('SELECT * FROM posts ORDER BY date DESC');

    console.log(`成功获取 ${posts.length} 篇文章数据`);

    return NextResponse.json({
        success: true,
        message: '成功获取文章数据',
        data: posts,
        count: posts.length,
        timestamp: new Date().toISOString()
    })
} catch (error) {
    console.log('获取文章失败:', error);
    return NextResponse.json({
        success: false,
        message: '获取文章失败',
        error: error.message,
        timestamp: new Date().toISOString()
    }, { status: 500 });
}
}