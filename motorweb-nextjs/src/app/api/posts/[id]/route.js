import { executeQuery } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return Response.json(
        { error: '缺少文章 ID 参数' },
        { status: 400 }
      );
    }

    // 从数据库获取单篇文章
    const query = 'SELECT * FROM posts WHERE id = ? LIMIT 1';
    const result = await executeQuery(query, [id]);

    if (!result || result.length === 0) {
      return Response.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    const post = result[0];

    return Response.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        summary: post.summary,
        date: post.date
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('获取文章详情失败:', error);
    return Response.json(
      { 
        error: '服务器内部错误',
        details: error.message 
      },
      { status: 500 }
    );
  }
}