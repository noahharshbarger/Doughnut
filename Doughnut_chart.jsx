import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartColors from './ChartColors';

export const PortfolioChart = ({
  stockMarketValues,
  stockSymbols,
  portfolioPercentages,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: stockSymbols,
        datasets: [
          {
            label: 'market value',
            data: stockMarketValues,
            backgroundColor: ChartColors(),
            borderColor: 'white',
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'left',
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const { index } = elements[0];
            const symbol = stockSymbols[index];
            window.location.href = `/investments/portfolio/${symbol}`;
          }
        },
      },
    });
  }, [stockMarketValues, stockSymbols, portfolioPercentages]);

  return <canvas ref={chartRef} />;
};
