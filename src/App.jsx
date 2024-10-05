import { useState, useEffect } from 'react';
import './App.css';
import { IoReload } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function App() {
  const [seconds, setSeconds] = useState(0);
  const [ready, setReady] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);
  const [switchGreen, setSwitchGreen] = useState(false);
  const [green, setGreen] = useState('');
  const [red1, setRed1] = useState('');
  const [red2, setRed2] = useState('');
  const [red3, setRed3] = useState('');
  const [jumpStart, setJumpStart] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  // Handle user action (click or keypress)
  const handleUserAction = (event) => {
    if (event.type === 'keydown' && event.code === 'Space') {
      event.preventDefault();
    }

    if (gameStarted && !switchGreen && !isRestarting) {
      setJumpStart(true);
      setTimeout(() => {
        setIsRestarting(true);
        window.location.reload();
      }, 1500);
    } else if (switchGreen && !isRestarting) {
      setSwitchGreen(false);
      setTryAgain(true);
    }
  };


  const handleAgain = () => {
    setIsRestarting(true);
    window.location.reload();
  };

  useEffect(() => {
    if (switchGreen) {
      const intervalId = setInterval(() => {
        setMilliseconds((prev) => {
          if (prev < 999) {
            return prev + 10;
          } else {
            setSeconds((sec) => sec + 1);
            return 0;
          }
        });
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [switchGreen]);

  const formatTime = () => {
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = Math.floor(milliseconds).toString().padStart(3, '0');
    return `${formattedSeconds}.${formattedMilliseconds}`;
  };

  const randomTime = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;

  useEffect(() => {
    if (ready) {
      setGameStarted(true);

      setTimeout(() => setRed1('bg-red-500'), 1000);
      setTimeout(() => setRed2('bg-red-500'), 2000);
      setTimeout(() => setRed3('bg-red-500'), 3000);
      setTimeout(() => {
        setGreen('bg-green-500');
        setSwitchGreen(true);
      }, randomTime);
    }

    return () => {};
  }, [ready]);

  useEffect(() => {
    const handleKeyDown = (event) => {
   
        handleUserAction(event);
      
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleUserAction);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleUserAction);
    };
  }, [switchGreen, ready, gameStarted]);



  return (
    <div className="w-dvw h-dvh flex flex-col bg-red items-center justify-center bg-zinc-100">
      <div className="flex flex-col w-[20rem] h-[18rem] items-center gap-6 relative ">
        {/* Error message for jumpstart */}
        {jumpStart && !isRestarting ? (
          <p className="text-red-500 font-bold text-center text-3xl animate-bounce mt-[10rem]">
            JUMPSTART!
          </p>
        ) : (
          <>
            <h1 className='text-xl font-semibold bg-slate-600 text-white border-[2px] p-3 border-white rounded-md mt-2'>Test your speed</h1>
            <div className='w-auto h-[5rem] bg-zinc-200  ring-gray-300 flex justify-center items-center p-3 rounded-lg'>

              <p className="font-semibold text-center">
                As soon as the lights turn green, stop the counter as fast as you can.
              </p>
            </div>
            {
              !ready ?
            <button
              className={`bg-orange-500 rounded-full w-[5rem] border-[4px] border-white h-[5rem] mt-3 font-semibold ring-1 ring-gray-400 hover:bg-orange-600 hover:text-gray-200 duration-150 flex justify-center items-center text-white`}
              onClick={() => setReady(true)}
            >
              Ready
            </button>
              :
              ""
            }
            <div className="absolute bottom-4 flex ">
              <h1 className={`text-2xl font-bold text-center ${!ready ? 'hidden' : 'flex'}`}>
                PRESS ANY KEY WHEN LIGHTS TURN
              </h1>
            </div>
            <h1 className={`absolute bottom-[-13px] text-2xl font-bold text-center ${!ready ? 'hidden' : ''}`}>
              <span className="animate-pulse text-green-500">GREEN</span>
            </h1>
          </>
        )}
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

      <div className="relative w-[400px] h-[100px] max-[500px]:w-[300px] flex gap-2 justify-center items-center bg-zinc-200 rounded-lg mb-3">
        <h1 className="text-3xl font-bold">{formatTime()}</h1>
        <p className="font-normal text-xl">ms</p>
        {tryAgain && (
          <div className="flex bg-green-400 w-[7rem] h-[4rem] max-[500px]:w-[3.5rem] max-[500px]:h-[3.5rem]  max-[500px]:rounded-full  absolute right-2 rounded-lg justify-center items-center">
            <button onClick={handleAgain} className="w-full h-full max-[500px]:text-[14px] font-semibold text-white flex justify-center items-center gap-2">
              <IoReload className="text-white text-xl" />
              <span className="max-[500px]:hidden">Try again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
