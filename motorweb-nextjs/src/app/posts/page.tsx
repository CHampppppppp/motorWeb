"use client"
import { useState, useEffect } from 'react';
import { Posts } from '../../types/index.js'
import Link from 'next/link'

export default function PostsPage() {
    const [posts, setPosts] = useState<Posts[]>([])
    const [filteredPosts, setFilteredPosts] = useState<Posts[]>([])
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const getPosts = async (): Promise<void> => {
        try {
            setLoading(true)
            const res = await fetch('/api/posts')
            console.log(res);
            
            if (!res.ok) {
                throw new Error(`获取文章失败! status: ${res.status}`)
            }

            const data = await res.json()
            console.log(data);
            if (data.success && Array.isArray(data.data)) {
                setPosts(data.data)
                setFilteredPosts(data.data)
            } else {
                setPosts([])
                setFilteredPosts([])
                setError('数据格式错误')
            }
        } catch (err) {
            console.error('获取文章列表失败:', err)
            setError(err instanceof Error ? err.message : '获取数据失败')
            setPosts([])
            setFilteredPosts([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    // 搜索功能
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (!query.trim()) {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.summary.toLowerCase().includes(query)
            );
            setFilteredPosts(filtered);
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
                        className="mt-4 py-2 px-4 bg-bg text-text
                        border-none rounded-sm text-sm hover:opacity-90"
                        onClick={() => window.location.reload()}
                    >
                        重试
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {/* 页面头部 */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <h1 className='m-0 text-text text-3xl font-bold flex items-center justify-center' >文章列表</h1>
                <input
                    type="text"
                    placeholder="搜索文章标题或摘要..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full max-w-[420px] py-2 px-4 border-1 border-solid border-line rounded-[4px] bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-border"
                />
            </div>

            {/* 统计信息 */}
            <div className="mb-4 text-text text-sm">
                共找到 <span className="font-bold text-text">{filteredPosts?.length || 0}</span> 篇文章
                {searchQuery && ` (搜索: "${searchQuery}")`}
            </div>

            {/* 文章列表 */}
            {!filteredPosts || filteredPosts.length === 0 ? (
                <div className="hint">
                    <p>{searchQuery ? '没有找到匹配的文章' : '暂无文章'}</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredPosts.map((post) => (
                        <article key={post.id} className="border-1 border-solid border-line p-5 mb-3 bg-bg rounded-[8px] transition duration-200 ease-in-out hover:shadow-md">
                            <h2 className="text-[20px] m-0 mb-2 text-text font-[600]">{post.title}</h2>
                            <div className="text-text text-[13px] mb-3">
                                发布时间: {formatDate(post.date)}
                            </div>
                            <p className="text-text text-[15px] m-0 mb-4 leading-[1.6]">{post.summary}</p>
                            <Link href={`/posts/${post.id}`} className="text-text no-underline text-sm font-medium inline-flex items-center after:rightArrow hover:after:rightArrowHover">阅读全文
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}