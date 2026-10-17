import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale, BarElement, Title,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { loadStats } from '../store/actions/toy';
import { useSelector } from 'react-redux';



export function ToyDashbord() {
    const stats = useSelector(storedState => storedState.stats)
    
    useEffect(() => {
        loadStats()
    },[])    


    if (!stats) return  <div className="loader position-absolute"> </div>

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
        LinearScale,
        BarElement,
        Title,);

    const pieOptions = {
        layout: {
            padding: 20
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'left'
            },
            title: {
                position: 'top',

                display: true,
                text: 'Toy count by label',
            },
        },
    };
    const pieData = {
        labels: Object.keys(stats.toyCountByLabel),
        datasets: [
            {
                label: '# of toys',
                data: Object.values(stats.toyCountByLabel),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const BarOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Avergae price by label',
            },
        },
    };

    const BarData = {
        labels: Object.keys(stats.avgPriceByLabel),
        datasets: [
            {
                label: 'Dataset 1',
                data: Object.values(stats.avgPriceByLabel),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };


    return <section
        className='dashbord'
    >
        <h3>Stats</h3>
        <div className='stats' style={{ width: '100%', height: '400px' }}>
            <Pie data={pieData} options={pieOptions} />;
            <Bar options={BarOptions} data={BarData} />;
        </div>

    </section>
}
