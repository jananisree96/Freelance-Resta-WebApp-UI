
import React from 'react';

interface LineChartData {
    label: string;
    value: number;
}

interface LineChartProps {
    data: LineChartData[];
    lineColor?: string;
    height?: number;
    width?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, lineColor = '#3B82F6', height = 250, width = 500 }) => {
    if (!data || data.length === 0) {
        return (
            <div style={{ height: `${height}px` }} className="flex items-center justify-center text-neutral-800">
                No data to display.
            </div>
        );
    }

    const PADDING = 40;
    const chartWidth = width - PADDING * 2;
    const chartHeight = height - PADDING * 2;
    
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1; // 10% padding
    const minValue = 0;

    const getX = (index: number) => PADDING + (index / (data.length - 1)) * chartWidth;
    const getY = (value: number) => PADDING + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

    const path = data.map((point, i) => {
        const x = getX(i);
        const y = getY(point.value);
        return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
    
    const areaPath = `${path} L ${getX(data.length - 1)},${getY(minValue)} L ${getX(0)},${getY(minValue)} Z`;

    const yAxisLabels = () => {
        const labels = [];
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
            const value = Math.round(minValue + (maxValue - minValue) * (i / steps));
            const y = getY(value);
            labels.push(
                <g key={i}>
                    <text x={PADDING - 10} y={y + 5} textAnchor="end" fontSize="12" fill="#6B7280">{value}</text>
                    <line x1={PADDING} y1={y} x2={width - PADDING} y2={y} stroke="#E5E7EB" strokeDasharray="2,2" />
                </g>
            );
        }
        return labels;
    };
    
    return (
        <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`}>
                {/* Y-Axis */}
                {yAxisLabels()}
                
                {/* X-Axis */}
                {data.map((point, i) => {
                     const x = getX(i);
                     return (
                         <text key={i} x={x} y={height - PADDING + 20} textAnchor="middle" fontSize="12" fill="#6B7280">{point.label}</text>
                     )
                })}
                
                {/* Gradient for area fill */}
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={lineColor} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                    </linearGradient>
                </defs>
                
                {/* Area under the line */}
                <path d={areaPath} fill="url(#areaGradient)" />

                {/* Line */}
                <path d={path} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Data points */}
                {data.map((point, i) => {
                    const x = getX(i);
                    const y = getY(point.value);
                    return (
                        <circle key={i} cx={x} cy={y} r="4" fill={lineColor} stroke="#fff" strokeWidth="2" />
                    )
                })}
            </svg>
        </div>
    );
};

export default LineChart;
