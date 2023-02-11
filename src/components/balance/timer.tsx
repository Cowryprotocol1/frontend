import React, {useState, useEffect, useMemo} from 'react';
import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../../pages/_app";

type CountdownTimerProps = {
  timer: number;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

const CountdownTimer: NextPageWithLayout<CountdownTimerProps> = ({timer, setIsExpired}) => {

  const [countdown, setCountdown] = useState(timer*60);

  const decrementCountdown = () => {
      setCountdown(countdown => countdown - 1);
  }
  useEffect(() => {
    if (countdown > 0){
        setTimeout(decrementCountdown, 1000);
    }
    else{
        setIsExpired(true)
    }
  }, [countdown]);
// console.log(countdown)
  const minutes = useMemo(() => Math.floor(countdown/60), [countdown]);
  const seconds = useMemo(() => Math.floor(countdown%60), [countdown]);

  return (
      <div className="bg-[#EBA352] h-[50px] w-[50px] rounded-full flex flex-col justify-center items-center">
          <h2 className="text-xs font-thin text-white">{minutes}:{seconds < 10 ?"0"+seconds: seconds}</h2>
      </div>
  );
}

CountdownTimer.getLayout = (page) => <Layout>{page}</Layout>;

export default React.memo(CountdownTimer);
