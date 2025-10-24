import React, { useMemo } from 'react';
import { Motorcycle } from '@/types';

interface CompareProps {
    compareIds: string[];
    onClearCompare: () => void;
    motorcycles: Motorcycle[];
}

function formatPrice(num:number) {
    try { return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(num) }
    catch { return `¥${num}` }
}

const Compare: React.FC<CompareProps> = ({ compareIds, onClearCompare, motorcycles }) => {

    const dialogRef = React.useRef<HTMLDialogElement>(null);

    // 根据 compareIds 过滤出需要对比的摩托车
    const selectedBikes = useMemo(() => {
        if (!Array.isArray(motorcycles) || !Array.isArray(compareIds)) {
            return [];
        }
        return motorcycles.filter(bike => compareIds.includes(bike.id));
    }, [motorcycles, compareIds]);

    //如果有加入对比，则log提示选中的摩托车，否则返回null
    if (selectedBikes.length !== 0) {
        console.log('选中：', selectedBikes)
    }else{
        return null
    }

    const handleOpenCompare = () => {
        if (selectedBikes.length > 0) dialogRef.current?.showModal()
    }

    return (
        <section>
            <aside className="fixed bottom-0 left-1/5 right-1/5 flex items-center justify-between gap-[12px] px-[16px] py-[12px] mt-[16px] bg-bg border border-solid border-accent rounded-[12px]" aria-live="polite" aria-label="对比栏">
                <div>
                    <strong className='text-text'>已选对比：</strong>
                    {/* 上面判断为null（不是0),因此不会显示对比栏 */}
                    <span className='text-text'>{selectedBikes.length}</span> 款
                </div>
                <div>
                    <button className='ml-[8px] text-text bg-bg font-medium rounded-[4px] cursor-pointer py-[2px] px-[4px]' onClick={handleOpenCompare} disabled={selectedBikes.length === 0}>打开对比</button>
                    <button className='ml-[8px] text-text bg-bg font-medium rounded-[4px] cursor-pointer py-[2px] px-[4px]' onClick={onClearCompare} disabled={selectedBikes.length === 0}>清空选择</button>
                </div>
            </aside>

            <dialog
                ref={dialogRef}
                className="w-[min(1300px,calc(100vw-24px))] max-h-[80vh] border-solid border-line rounded-[14px] p-0 bg-card text-text fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-[2px] backdrop:bg-black/50"
                aria-labelledby="compare-title"
            >
                <form method="dialog">
                    <header className="flex items-center justify-between py-[12px] px-[14px] border-b-1 border-solid border-line">
                        <h2>车型参数对比</h2>
                        <button type="submit" value="cancel" aria-label="关闭" className='w-[48px] h-[48px] border-none bg-[#ffffff00] cursor-pointer flex items-center justify-center'>
                            <img
                                src="/close.svg"
                                alt=""
                                style={{ width: '100%', height: '100%' }}
                            />
                        </button>
                    </header>
                </form>
                <div className="p-0 max-h-[60vh] overflow-auto">
                    <table id="compare-table" className="w-full border-collapse" aria-label="对比表格">
                        <thead>
                            <tr>
                                <th className="sticky bg-bg text-text top-0 z-1 border-b border-line p-5 text-left">车型</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">类型</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">年款</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">排量(cc)</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">功率(kW)</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">扭矩(Nm)</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">质量(kg)</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">座高(mm)</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">极速(kmh)</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">零百(s)</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">缸数</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">价格</th>
                                <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-5 text-left">配置</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedBikes.map(b => (
                                <tr key={b.id}>
                                    <td className="border-b border-line p-5 text-left">{b.brand} {b.model}</td>
                                    <td className="border-b border-line p-5 text-left">{b.type}</td>
                                    <td className="border-b border-line p-5 text-left">{b.year}</td>
                                    <td className="border-b border-line p-5 text-left">{b.displacement_cc}</td>
                                    <td className="border-b border-line p-5 text-left">{b.power_kw}</td>
                                    <td className="border-b border-line p-5 text-left">{b.torque_nm}</td>
                                    <td className="border-b border-line p-5 text-left">{b.weight_kg}</td>
                                    <td className="border-b border-line p-5 text-left">{b.seat_height_mm}</td>
                                    <td className="border-b border-line p-5 text-left">{b.top_speed_kmh}</td>
                                    <td className="border-b border-line p-5 text-left">{b.accel_0_100_kmh}</td>
                                    <td className="border-b border-line p-5 text-left">{b.cylinder_count}</td>
                                    <td className="border-b border-line p-5 text-left">{formatPrice(b.price_cny)}</td>
                                    <td className="border-b border-line p-5 text-left">
                                        {b.abs ? 'ABS' : '无ABS'}{b.tcs ? ' / TCS' : ''}{b.aw ? ' / AW' : ''} / {b.cooling}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </dialog>
        </section>
    );
};

export default Compare;