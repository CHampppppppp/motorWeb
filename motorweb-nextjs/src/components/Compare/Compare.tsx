import React, { useMemo } from 'react';
import { Motorcycle } from '@/types';

interface CompareProps {
  compareIds: string[];
  onClearCompare: () => void;
  motorcycles: Motorcycle[];
}

function formatPrice(num: number) {
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
  } else {
    return null
  }

  const handleOpenCompare = () => {
    if (selectedBikes.length > 0) dialogRef.current?.showModal()
  }

  return (
    <section>
      <aside className="fixed bottom-0 left-2 right-2 sm:left-1/5 sm:right-1/5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-3 mt-4 bg-bg border border-solid border-accent rounded-xl shadow-lg" aria-live="polite" aria-label="对比栏">
        <div className="text-center sm:text-left">
                    <strong className='text-text text-sm sm:text-base'>已选对比：</strong>
                    {/* 上面判断为null（不是0),因此不会显示对比栏 */}
                    <span className='text-text text-sm sm:text-base'>{selectedBikes.length}</span> 款
                </div>
                <div className="flex gap-2">
                    <button className='text-xs sm:text-sm text-text bg-transparent border border-line font-medium rounded-md cursor-pointer py-2 px-3 hover:bg-tran1 transition-colors duration-200' onClick={handleOpenCompare} disabled={selectedBikes.length === 0}>打开对比</button>
                    <button className='text-xs sm:text-sm text-text bg-transparent border border-line font-medium rounded-md cursor-pointer py-2 px-3 hover:bg-tran1 transition-colors duration-200' onClick={onClearCompare} disabled={selectedBikes.length === 0}>清空选择</button>
                </div>
      </aside>

      <dialog
                ref={dialogRef}
                className="w-[min(95vw,1300px)] max-w-none max-h-[90vh] border-solid border-line rounded-2xl p-0 bg-card text-text fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-[2px] backdrop:bg-black/50"
                aria-labelledby="compare-title"
            >
                <form method="dialog">
                    <header className="flex items-center justify-between py-3 px-4 border-b-1 border-solid border-line">
                        <h2 className="text-lg sm:text-xl font-semibold">车型参数对比</h2>
                        <button type="submit" value="cancel" aria-label="关闭" className='w-10 h-10 sm:w-12 sm:h-12 border-none bg-transparent cursor-pointer flex items-center justify-center hover:bg-tran1 rounded-full transition-colors duration-200 relative group'>
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                                <span className="absolute w-3 h-0.5 sm:w-4 sm:h-0.5 bg-text rotate-45 transition-colors duration-200"></span>
                                <span className="absolute w-3 h-0.5 sm:w-4 sm:h-0.5 bg-text -rotate-45 transition-colors duration-200"></span>
                            </div>
                        </button>
                    </header>
                </form>
                <div className="p-0 max-h-[70vh] overflow-auto">
                    <div className="overflow-x-auto">
                        <table id="compare-table" className="w-full min-w-[800px] border-collapse" aria-label="对比表格">
                            <thead>
                                <tr>
                                    <th className="sticky bg-bg text-text top-0 z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">车型</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">类型</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">年款</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">排量(cc)</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">功率(kW)</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">扭矩(Nm)</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">质量(kg)</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">座高(mm)</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">极速(kmh)</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">零百(s)</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">缸数</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">价格</th>
                                    <th className="sticky top-0 bg-bg text-text z-1 border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">配置</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedBikes.map(b => (
                                    <tr key={b.id}>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm font-medium">{b.brand} {b.model}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.type}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.year}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.displacement_cc}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.power_kw}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.torque_nm}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.weight_kg}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.seat_height_mm}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.top_speed_kmh}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.accel_0_100_kmh}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">{b.cylinder_count}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm font-medium">{formatPrice(b.price_cny)}</td>
                                        <td className="border-b border-line p-3 sm:p-5 text-left text-xs sm:text-sm">
                                            {b.abs ? 'ABS' : '无ABS'}{b.tcs ? ' / TCS' : ''}{b.aw ? ' / AW' : ''} / {b.cooling}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </dialog>
    </section>
  );
};

export default Compare;