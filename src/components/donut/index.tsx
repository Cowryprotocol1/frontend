// import React from 'react';
// import { Doughnut } from "react-chartjs-2";
// import 'chart.js/auto';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
 
const Donut: React.FC = () => {
const data = {
    labels: ['Completed', 'Processing', 'Pending', 'Cancelled'],
    option: {
        plugins:{
            legend:{
                display: false,
                position:'bottom',
                align: 'end'
            }
        }
    },
    datasets: [
      {
        label: 'Transactions',
        data: [10, 7, 4, 2],
        backgroundColor: ['#2EC363', '#42ADE2', '#EBA352', '#E50808'],
        borderColor:['#2EC363', '#42ADE2', '#EBA352', '#E50808'],
        borderWidth: 1,
      },
    ],
  };

    return (
        <div className='px-8 flex flex-row items-center justify-center'>
            <Doughnut 
            width={230}
            height={230}
            options={{
                plugins:{
                    legend:{
                        display:true,
                        position:'right',
                        labels:{
                            boxWidth:5,
                            boxHeight:5
                        }
                    }
                },
            }}
            data={data}/>
        </div>
    );
}
 
export default Donut;