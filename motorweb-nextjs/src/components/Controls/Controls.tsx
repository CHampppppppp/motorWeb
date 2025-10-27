import React, { useMemo, useState, useEffect } from 'react';
import { Motorcycle, Filters } from '@/types';

// 组件属性类型
interface ControlsProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onResetFilters: () => void;
}

// 筛选与排序控件组件
const Controls: React.FC<ControlsProps> = ({ filters, onFilterChange, onResetFilters }) => {
  const [bikesData, setBikesData] = useState<Motorcycle[]>([]);

  // 获取摩托车数据
  const getMotorcycles = async (): Promise<void> => {
    try {

      const response = await fetch('/api/motor');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setBikesData(data.data);
      } else {
        throw new Error(data.message || '获取数据失败');
      }
    } catch (err) {
      console.error('获取摩托车数据失败:', err);
    } finally {
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    getMotorcycles();
  }, []);

  const brand = useMemo(() => Array.from(new Set((bikesData as Motorcycle[]).map(b => b.brand))), [bikesData])

  const update = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-3" aria-label="筛选与排序">
      {/* 搜索框 - 全宽 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-12 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="search" className="block text-muted text-xs mb-1.5">搜索 (品牌/车型)：</label>
        <input
          id="search"
          type="search"
          placeholder="例：本田 / CB500F"
          autoComplete="off"
          value={filters.search}
          onChange={e => update('search', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        />
      </div>

      {/* 车型类型 */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="type" className="block text-muted text-xs mb-1.5">车型类型：</label>
        <select
          id="type"
          value={filters.type}
          onChange={e => update('type', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        >
          <option value="">全部</option>
          <option value="街车">街车</option>
          <option value="仿赛">仿赛</option>
          <option value="巡航">巡航</option>
          <option value="ADV">ADV</option>
          <option value="踏板">踏板</option>
          <option value="越野">越野</option>
        </select>
      </div>

      {/* 排序 */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="sort" className="block text-muted text-xs mb-1.5">排序：</label>
        <select
          id="sort"
          value={filters.sort}
          onChange={e => update('sort', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        >
          <option value="default">默认</option>
          <option value="price_asc">价格 ↑</option>
          <option value="price_desc">价格 ↓</option>
          <option value="displacement_desc">排量 ↓</option>
          <option value="power_desc">功率 ↓</option>
          <option value="weight_asc">重量 ↑</option>
          <option value="value_desc">性价比 ↓</option>
        </select>
      </div>

      {/* 价格区间 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label className="block text-muted text-xs mb-1.5">价格区间 (¥)：</label>
        <div className="flex items-center gap-2">
          <input
            id="price-min"
            type="number"
            inputMode="numeric"
            placeholder="低"
            value={filters.priceMin}
            onChange={e => update('priceMin', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
          <span className="text-muted">—</span>
          <input
            id="price-max"
            type="number"
            inputMode="numeric"
            placeholder="高"
            value={filters.priceMax}
            onChange={e => update('priceMax', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
        </div>
      </div>

      {/* 缸数 */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="cylinder" className="block text-muted text-xs mb-1.5">缸数：</label>
        <select
          id="cylinder"
          value={filters.cylinderCount}
          onChange={e => update('cylinderCount', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        >
          <option value="">全部</option>
          <option value="1">单缸</option>
          <option value="2">双缸</option>
          <option value="3">三缸</option>
          <option value="4">四缸</option>
          <option value="6">六缸</option>
        </select>
      </div>

      {/* ABS */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="abs" className="block text-muted text-xs mb-1.5">ABS：</label>
        <select
          id="abs"
          value={filters.abs}
          onChange={e => update('abs', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        >
          <option value="">全部</option>
          <option value="true">有</option>
          <option value="false">无</option>
        </select>
      </div>

      {/* 排量区间 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label className="block text-muted text-xs mb-1.5">排量区间 (cc)：</label>
        <div className="flex items-center gap-2">
          <input
            id="cc-min"
            type="number"
            inputMode="numeric"
            placeholder="低"
            value={filters.ccMin}
            onChange={e => update('ccMin', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
          <span className="text-muted">—</span>
          <input
            id="cc-max"
            type="number"
            inputMode="numeric"
            placeholder="高"
            value={filters.ccMax}
            onChange={e => update('ccMax', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
        </div>
      </div>

      {/* 品牌 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="brand" className="block text-muted text-xs mb-1.5">品牌：</label>
        <select
          id="brand"
          value={filters.brand}
          onChange={e => update('brand', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        >
          <option value="">全部</option>
          {brand.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* 年份区间 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label className="block text-muted text-xs mb-1.5">年份区间：</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="低"
            value={filters.yearMin}
            onChange={e => update('yearMin', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="高"
            value={filters.yearMax}
            onChange={e => update('yearMax', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
        </div>
      </div>

      {/* TCS */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="tcs" className="block text-muted text-xs mb-1.5">TCS：</label>
        <select
          id="tcs"
          value={filters.tcs}
          onChange={e => update('tcs', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        >
          <option value="">全部</option>
          <option value="true">有</option>
          <option value="false">无</option>
        </select>
      </div>

      {/* 冷却方式 */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label htmlFor="cooling" className="block text-muted text-xs mb-1.5">冷却方式：</label>
        <select
          id="cooling"
          value={filters.cooling}
          onChange={e => update('cooling', e.target.value)}
          className="w-full bg-bg text-text border border-line rounded-md px-2.5 py-2"
        >
          <option value="">全部</option>
          <option value="水冷">水冷</option>
          <option value="风冷">风冷</option>
          <option value="油冷">油冷</option>
        </select>
      </div>

      {/* 整备质量区间 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label className="block text-muted text-xs mb-1.5">整备质量区间 (kg)：</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="低"
            value={filters.weightMin}
            onChange={e => update('weightMin', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="高"
            value={filters.weightMax}
            onChange={e => update('weightMax', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
        </div>
      </div>

      {/* 座高区间 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 bg-card border border-line rounded-lg p-2.5 shadow-sm">
        <label className="block text-muted text-xs mb-1.5">座高区间 (mm)：</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="低"
            value={filters.seatMin}
            onChange={e => update('seatMin', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="高"
            value={filters.seatMax}
            onChange={e => update('seatMax', e.target.value)}
            className="flex-1 placeholder:text-sm bg-bg text-text border border-line rounded-md px-2 py-1"
          />
        </div>
      </div>

      {/* 重置按钮 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-12 flex gap-2.5">

        <button
          onClick={onResetFilters}
          className="bg-bg text-text border border-accent px-3 py-2.5 rounded-lg font-semibold cursor-pointer transition-all duration-100
          hover:scale-101 w-full"
        >
          重置筛选
        </button>
      </div>
    </section>
  )
}

export default Controls