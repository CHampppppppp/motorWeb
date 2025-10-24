"use client"

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Posts } from '@/types';
import ReactMarkdown from 'react-markdown';

interface PostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);
  const [post, setPost] = useState<Posts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取单篇文章数据
  const getPost = async (id: string): Promise<Posts | null> => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.post || null;
    } catch (error) {
      console.error('获取文章失败:', error);
      throw error;
    }
  };

  // 格式化日期
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const postData = await getPost(id);
        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取文章失败');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const scrollToTop = () => {
    // 直接滚动到页面顶部，因为.site-main不是滚动容器
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // 兼容性回退
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="hint">
          <p>正在加载文章...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="hint">
          <p>错误: {error}</p>
          <button 
            className="mt-4 py-2 px-4 bg-bg text-text border-none rounded-sm text-sm hover:opacity-90"
            onClick={() => window.location.reload()}
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="hint">
          <p>文章不存在</p>
          <Link href="/posts" className="hint">
            返回文章列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* 导航链接 */}
        <Link href="/posts" className="text-muted font-[500] no-underline text-md inline-flex items-center before:leftArrow hover:before:leftArrowHover mb-8">返回文章列表
        </Link>

      {/* 文章头部 */}
      <article>
        <header className='mb-8 border-b-1 border-solid border-line pb-4'>
          <h1 className='text-3xl m-0 mb-4 text-text leading-[1.3] font-bold'>
            {post.title}
          </h1>
          <div className="text-text text-md mb-3">
            发布时间: {formatDate(post.date)}
          </div>
          {post.summary && (
            <div className='mt-4 p-2 bg-bg rounded-[8px] border-solid border-border text-xl'>
              <strong>摘要:</strong> {post.summary}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="whitespace-pre-wrap leading-[1.7] text-text">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* 底部导航 */}
      <div className='mt-12 pt-8 border-t-1 border-solid border-line text-center'>
        <button
          type="button"
          aria-label="返回到页面顶部"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 py-2 px-4 bg-bg text-text border-none rounded-sm text-sm hover:opacity-90 cursor-pointer"
        >
          返回顶部
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </div>
  );
}