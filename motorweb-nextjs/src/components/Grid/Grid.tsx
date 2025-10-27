import React, { useMemo } from 'react';
import { Motorcycle, Filters } from '@/types';

// 组件属性类型
interface GridProps {
    filters: Filters;
    compareIds: string[];
    onToggleCompare: (id: string) => void;
    motorcycles: Motorcycle[];
}

function formatPrice(num: number): string {
    try {
        return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 }).format(num);
    } catch {
        return `¥${num}`;
    }
}

function Stat({ label, value }: { label: string, value?: number | string }) {
    return (
        <div className="bg-bg border border-solid border-line rounded-[8px] p-2.5">
            <div className="text-muted text-3">{label}</div>
            <div className="font-bold mt-1">{value ?? '—'}</div>
        </div>
    );
}

const Grid: React.FC<GridProps> = ({ filters, compareIds, onToggleCompare, motorcycles }) => {
    const filtered = useMemo(() => {
        const toNum = (v: string): number | null => (v === '' || v == null ? null : Number(v))
        const {
            search, type, brand, abs, tcs, cooling,
            priceMin, priceMax, ccMin, ccMax,
            yearMin, yearMax, seatMin, seatMax, weightMin, weightMax,
            cylinderCount, sort,
        } = filters

        const s = (search || '').trim().toLowerCase()

        let list = motorcycles.filter((b: Motorcycle) => {
            if (s && !(b.brand.toLowerCase().includes(s) || b.model.toLowerCase().includes(s))) return false
            if (type && b.type !== type) return false
            if (brand && b.brand !== brand) return false
            if (cooling && b.cooling !== cooling) return false
            if (abs === 'true' && !b.abs) return false
            if (abs === 'false' && b.abs) return false
            if (tcs === 'true' && !b.tcs) return false
            if (tcs === 'false' && b.tcs) return false
            if (cylinderCount && b.cylinder_count !== Number(cylinderCount)) return false

            const pMin = toNum(priceMin), pMax = toNum(priceMax)
            const cMin = toNum(ccMin), cMax = toNum(ccMax)
            const yMin = toNum(yearMin), yMax = toNum(yearMax)
            const stMin = toNum(seatMin), stMax = toNum(seatMax)
            const wMin = toNum(weightMin), wMax = toNum(weightMax)

            if (pMin != null && b.price_cny < pMin) return false
            if (pMax != null && b.price_cny > pMax) return false
            if (cMin != null && b.displacement_cc < cMin) return false
            if (cMax != null && b.displacement_cc > cMax) return false
            if (yMin != null && b.year < yMin) return false
            if (yMax != null && b.year > yMax) return false
            if (stMin != null && b.seat_height_mm < stMin) return false
            if (stMax != null && b.seat_height_mm > stMax) return false
            if (wMin != null && b.weight_kg < wMin) return false
            if (wMax != null && b.weight_kg > wMax) return false

            return true
        })

        if (sort && sort !== 'default') {
            list = list.sort((a: Motorcycle, b: Motorcycle) => {
                switch (sort) {
                    case 'price_asc': return a.price_cny - b.price_cny
                    case 'price_desc': return b.price_cny - a.price_cny
                    case 'displacement_desc': return b.displacement_cc - a.displacement_cc
                    case 'power_desc': return b.power_kw - a.power_kw
                    case 'weight_asc': return a.weight_kg - b.weight_kg
                    case 'value_desc': {
                        const va = a.power_kw / a.price_cny
                        const vb = b.power_kw / b.price_cny
                        return vb - va
                    }
                    default: return 0
                }
            })
        }

        return list
    }, [filters, motorcycles])

    return (
        <>
            <section className="text-muted py-6 px-3">共 {filtered.length} 款车型</section>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch" aria-label="摩托车列表">
                {filtered.map((b: Motorcycle) => {
                    const selected = compareIds.includes(b.id)

                    return (
                        <article className="bg-card border border-solid border-line rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:border-accent" key={b.id}>
                            <div className="relative w-full bg-bg">
                                {b.image ? (
                                    <img className="w-full aspect-[8/9] object-cover block" src={b.image} alt={`${b.brand} ${b.model}`} />
                                ) : (
                                    <div className="w-full aspect-[4/3] flex items-center justify-center text-muted font-bold tracking-[0.4px] bg-gradient-to-br from-tran1 to-tran2 text-center px-2 text-sm sm:text-base">{b.brand} {b.model}</div>
                                )}
                            </div>
                            <header className="flex items-center justify-between py-3 px-4 border-b border-solid border-line">
                                <div className="font-bold text-sm sm:text-base truncate">{b.brand} {b.model}</div>
                                <div className="text-xs sm:text-sm text-muted bg-bg py-1 px-2 rounded-[999px] whitespace-nowrap ml-2">{b.type} {b.year}</div>
                            </header>
                            <div className="p-2 grid grid-cols-2 sm:grid-cols-3 gap-1">
                                <Stat label="排量 (cc)" value={b.displacement_cc} />
                                <Stat label="功率 (kW)" value={b.power_kw} />
                                <Stat label="扭矩 (Nm)" value={b.torque_nm} />
                                <Stat label="整备质量 (kg)" value={b.weight_kg} />
                                <Stat label="座高 (mm)" value={b.seat_height_mm} />
                                <Stat label="缸数" value={b.cylinder_count} />
                                <div className="sm:hidden col-span-2">
                                    <Stat label="价格" value={formatPrice(b.price_cny)} />
                                </div>
                                <div className="hidden sm:block">
                                    <Stat label="极速(kmh)" value={b.top_speed_kmh} />
                                </div>
                                <div className="hidden sm:block">
                                    <Stat label="零百/h(s)" value={b.accel_0_100_kmh} />
                                </div>
                                <div className="hidden sm:block">
                                    <Stat label="价格" value={formatPrice(b.price_cny)} />
                                </div>
                            </div>
                            <div className="mt-auto flex flex-col border-t border-solid border-line">
                                <div className="mt-1 flex justify-center mr-5 mb-1 text-muted text-xs sm:text-sm text-center px-2" style={{ gridColumn: "1 / -1" }}>
                                    配置：{b.abs ? "ABS" : "无 ABS"}{b.tcs ? " / TCS" : ""}{b.aw ? " / AW" : ""} / {b.cooling}
                                </div>
                                <button
                                    className={`bg-bg text-text border border-solid border-line py-2 px-2.5 rounded-[8px] cursor-pointer transition-all duration-200 text-sm sm:text-base ${selected ? 'w-full h-full rounded-0 bg-accent text-text border-accent' : 'hover:bg-tran1'}`}
                                    type="button"
                                    onClick={() => onToggleCompare?.(b.id)}
                                >
                                    {selected ? '移除对比' : '加入对比'}
                                </button>
                            </div>
                        </article>
                    )
                })}
            </section>
        </>
    )
}

export default Grid;