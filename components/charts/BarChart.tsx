
import React from 'react';

interface BarChartData {
    label: string;
    value: number;
    color: string;
}

interface BarChartProps {
    data: BarChartData[];
    title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.value), 0) * 1.2; // Add 20% padding to max value
    const chartHeight = 200; // in pixels

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow-md border border-base-300 h-full">
            <h3 className="text-xl font-serif font-bold text-neutral mb-4">{title}</h3>
            <div className="flex justify-around items-end" style={{ height: `${chartHeight}px` }}>
                {data.map((item, index) => {
                    const barHeight = maxValue > 0 ? (item.value / maxValue) * chartHeight : 0;
                    return (
                        <div key={index} className="flex flex-col items-center h-full justify-end w-1/4">
                             <span className="text-sm font-bold text-neutral mb-1">{item.value.toLocaleString()}</span>
                            <div
                                className="w-12 rounded-t-md hover:opacity-90 transition-opacity"
                                style={{ height: `${barHeight}px`, backgroundColor: item.color }}
                                title={`${item.label}: ${item.value.toLocaleString()}`}
                            ></div>
                            <span className="text-xs text-neutral-800 mt-2 font-semibold uppercase tracking-wider">{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BarChart;
