import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useUser } from "../../store/user";

ChartJS.register(ArcElement, Tooltip, Legend);
 
const Donut: React.FC = () => {
    const {transactions} = useUser();
    const completed = transactions.filter((txn)=> txn.transaction_status === "completed").length
    const processing = transactions.filter((txn)=> txn.transaction_status === "processing").length
    const pending = transactions.filter((txn)=> txn.transaction_status === "pending").length
    const failed = transactions.filter((txn)=> txn.transaction_status === "failed").length

    const data = {
        labels: ['Completed', 'Processing', 'Pending', 'Cancelled'],
        datasets: [
        {
            label: 'Transactions',
            data: [completed, processing, pending, failed],
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