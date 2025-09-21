
import React from 'react';

interface PieChartData {
    name: string;
    value: number;
    color: string;
}

interface PieChartProps {
    data: PieChartData[];
}

const PieSlice: React.FC<{
    percent: number;
    startPercent: number;
    color: string;
}> = ({ percent, startPercent, color }) => {
    const getCoordinates = (p: number) => {
        const x = Math.cos(2 * Math.PI * p);
        const y = Math.sin(2 * Math.PI * p);
        return [x, y];
    };

    // If a slice is 100%, it's a full circle, which SVG arc paths don't handle well.
    // We draw a circle instead.
    if (percent >= 0.9999) {
        return (
            <circle
                cx="0"
                cy="0"
                r="1"
                fill={color}
            />
        );
    }

    const [startX, startY] = getCoordinates(startPercent);
    const [endX, endY] = getCoordinates(startPercent + percent);

    const largeArcFlag = percent > 0.5 ? 1 : 0;

    const pathData = [
        `M ${startX} ${startY}`, // Move to starting point of arc
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw the arc
        `L 0 0`, // Line back to the center
    ].join(' ');

    return (
        <path
            d={pathData}
            fill={color}
        />
    );
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    
    if (data.length === 0 || total === 0) {
        return (
             <div className="flex items-center justify-center h-48 w-full text-neutral-800">
                <p className="text-center text-sm">No data available to display.</p>
            </div>
        );
    }

    let cumulativePercent = 0;

    const legend = (
        <div className="flex flex-col gap-2">
            {data.map(item => (
                <div key={item.name} className="flex items-center p-1">
                    <span className="w-4 h-4 rounded-sm mr-2 flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-neutral-800 text-sm text-left">{item.name} (₹{item.value.toLocaleString()})</span>
                </div>
            ))}
        </div>
    );

    const chartDisplay = (
        <div className="relative w-48 h-48">
            <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
                {data.map((item) => {
                    if (item.value <= 0) return null;
                    const percent = item.value / total;
                    const slice = (
                        <PieSlice
                            key={item.name}
                            percent={percent}
                            startPercent={cumulativePercent}
                            color={item.color}
                        />
                    );
                    cumulativePercent += percent;
                    return slice;
                })}
            </svg>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {chartDisplay}
            {legend}
        </div>
    );
};

export default PieChart;