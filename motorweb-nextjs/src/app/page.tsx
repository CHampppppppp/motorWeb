'use client'

import React, { useState, useEffect } from 'react';
import Controls from '@/components/Controls/Controls';
import Grid from '@/components/Grid/Grid';
import Compare from '@/components/Compare/Compare';
import MouseSvg from '@/components/MouseSvg/MouseSvg';
import { Filters, Motorcycle } from '@/types';

export default function Home() {
    const initialFilters: Filters = {
        search: '',
        type: '',
        sort: 'default',
        priceMin: '',
        priceMax: '',
        ccMin: '',
        ccMax: '',
        brand: '',
        abs: '',
        tcs: '',
        cooling: '',
        yearMin: '',
        yearMax: '',
        seatMin: '',
        seatMax: '',
        weightMin: '',
        weightMax: '',
        cylinderCount: '',
    }
    
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [compareIds, setCompareIds] = useState<string[]>([]);
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 获取摩托车数据 - 只在父组件中调用一次
    const getMotorcycles = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/motor');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && Array.isArray(data.data)) {
                setMotorcycles(data.data);
            } else {
                console.error('API 返回的数据格式不正确:', data);
                setMotorcycles([]);
                setError('数据格式错误');
            }
        } catch (err) {
            console.error('获取摩托车数据失败:', err);
            setMotorcycles([]);
            setError(err instanceof Error ? err.message : '获取数据失败');
        } finally {
            setLoading(false);
        }
    };

    // 组件挂载时获取数据
    useEffect(() => {
        getMotorcycles();
    }, []);

    const toggleCompare = (id: string) => {
        setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }

    const clearCompare = () => {
        setCompareIds([]);
    };

    // 如果正在加载，显示加载状态
    if (loading) {
        return (
            <div className="loading-container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px'
            }}>
                正在加载摩托车数据...
            </div>
        );
    }

    // 如果有错误，显示错误信息
    if (error) {
        return (
            <div className="error-container" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                gap: '20px'
            }}>
                <p style={{ fontSize: '18px', color: '#e74c3c' }}>加载数据时出错: {error}</p>
                <button 
                    onClick={getMotorcycles}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    重试
                </button>
            </div>
        );
    }

    return (
        <>
            <Controls 
                filters={filters} 
                onFilterChange={setFilters} 
                onResetFilters={() => setFilters(initialFilters)} 
            />
            <Grid 
                filters={filters}
                compareIds={compareIds}
                onToggleCompare={toggleCompare}
                motorcycles={motorcycles}
            />
            <Compare
                compareIds={compareIds}
                onClearCompare={clearCompare}
                motorcycles={motorcycles}
            />
            <MouseSvg />
        </>
    );
}