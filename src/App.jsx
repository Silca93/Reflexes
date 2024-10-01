import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [ready, setReady] = useState(false)
  const [milliseconds, setMilliseconds] = useState(0);
  const [switchGreen, setSwitchGreen] = useState(false);
  const [green, setGreen] = useState('');
  const [red1, setRed1] = useState('');
  const [red2, setRed2] = useState('');
  const [red3, setRed3] = useState('');

  const handleClick = () => {
    setSwitchGreen(false);
  };

  useEffect(() => {
    if (switchGreen) {
      // Start the count update logic after the start button is clicked
      const intervalId = setInterval(() => {
        setMilliseconds((prev) => {
          if (prev < 999) {
            return prev + 10; // Increment by 10ms
          } else {
            setSeconds((sec) => sec + 1); // Increment seconds if milliseconds reach 1000
            return 0; // Reset milliseconds
          }
        });
      }, 10); // Update every 10ms

      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }
  }, [switchGreen]);

  // Format time as '00.000' (seconds and milliseconds)
  const formatTime = () => {
    const formattedSeconds = seconds.toString().padStart(2, '0'); // Pad seconds with leading zeros
    const formattedMilliseconds = Math.floor(milliseconds).toString().padStart(3, '0'); // Get milliseconds and pad
    return `${formattedSeconds}.${formattedMilliseconds}`;
  };


  const randomTime = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;


  useEffect(() => {

    if (ready) {

      console.log(switchGreen);
  
      setTimeout(() => {
        setRed1('bg-red-500');
      }, 1000);
  
      setTimeout(() => {
        setRed2('bg-red-500');
      }, 2000);
  
      setTimeout(() => {
        setRed3('bg-red-500');
      }, 3000);
  
      setTimeout(() => {
        setGreen('bg-green-500');
        setSwitchGreen(true);
        console.log(switchGreen);
      }, [randomTime]
    );
    }

    return () => {};
  }, [ready]);


  useEffect(() => {
    window.addEventListener('keydown', handleClick);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleClick); 
      window.removeEventListener('click', handleClick); 
    };
  }, []);

  return (
    <div className="w-dvw h-dvh flex flex-col bg-red items-center justify-center bg-zinc-100">
      <div className="flex flex-col w-[20rem] h-[18rem] justify-center items-center gap-7 relative">

        <p>Test your reflexes! As soon as the lights turn green, stop the counter as fast as you can.</p>
          <button className={`bg-slate-500 rounded-full w-[4rem] h-[4rem] flex justify-center items-center text-white`} onClick={() => setReady(true)}>Ready</button>
        <div className='absolute bottom-0 flex '>
          <h1 className={`text-2xl font-bold text-center animate-pulse ${!ready ? 'hidden' : 'flex'}`}>PRESS ANY KEY WHEN </h1>
        </div>
        <div className='absolute bottom-[-2rem] flex '>
          <h1 className={`text-2xl font-bold text-center animate-pulse text-green-500 ${!ready ? 'hidden' : 'flex'}`}>GREEN </h1>
        </div>
      </div>
      <div className="w-[500px] h-[400px] max-[500px]:w-[350px] flex justify-center items-center gap-5">
        <div className="w-[100px] h-[300px] bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-3">
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red1 : green}`}></div>
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red2 : green}`}></div>
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red3 : green}`}></div>
        </div>
        <div className="w-[100px] h-[300px] bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-3">
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red1 : green}`}></div>
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red2 : green}`}></div>
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red3 : green}`}></div>
        </div>
        <div className="w-[100px] h-[300px] bg-slate-800 rounded-xl  flex flex-col justify-center items-center gap-3">
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red1 : green}`}></div>
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red2 : green}`}></div>
          <div className={`w-[80px] h-[80px] rounded-full ring-2 ring-white ${!ready && 'bg-slate-900'} ${!switchGreen ? red3 : green}`}></div>
        </div>
      </div>
 
      <div className="w-[400px] h-[100px] max-[500px]:w-[300px] flex gap-2 justify-center items-center bg-zinc-200 rounded-lg mb-3">
        <h1 className='text-3xl font-bold'>{formatTime()}</h1> 
        <p className='font-normal text-xl'>ms</p>
      </div>
      
    </div>
  );
}

export default App;
