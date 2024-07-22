import React, { useEffect, useRef, useState } from 'react'


const Clock = () => {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isSession, setIsSession] = useState(true);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(intervalRef.current);
            playAlarm();
            setIsSession(!isSession);
            setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
        }
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [isRunning, timeLeft, isSession, sessionLength, breakLength])

    useEffect(() => {
        audioRef.current = new Audio('https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav');
    }, []);

    const playAlarm = () => {
        if(audioRef.current) {
            audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
        }
    }

    const startTimer = () => {
        setIsRunning(true);
    }

    const stopTimer = () => {
        setIsRunning(false);
    }

    const resetTimer = () => {
        setIsRunning(false);
        setIsSession(true);
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(25 * 60);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const adjustTime = (type, amount)=>{
        if(isRunning) return;
        if(type === 'session'){
            const newSessionLength = Math.max(1, Math.min(60, sessionLength + amount));
            setSessionLength(newSessionLength);
            if(isSession) setTimeLeft(newSessionLength * 60);
        }else{
            setBreakLength(Math.max(1, Math.min(60, breakLength + amount)));
        }
    }


    return (
        <div className='clock text-center text-xl'>

            <h1 className='mb-10' >25 + 5 Clock</h1>
            <div className='constrols grid grid-cols-2 mt-4'>
                <div className='length-control grid grid-rows-2 '>
                    <div id='break-label'>Break Length</div>
                    <div className='control flex flex-row justify-center gap-3'>
                        <button id='break-decrement' onClick={()=>adjustTime('break', -1)}>-</button>
                        <div id='break-length'>{breakLength}</div>
                        <button id='break-increment' onClick={()=>adjustTime('break', 1)}>+</button>
                    </div>
                </div>
                <div className='length-control grid grid-rows-2'>
                    <div id='session-label'>Session Length</div>
                    <div className='control flex flex-row justify-center gap-3'>
                        <button id='session-decrement' onClick={()=>adjustTime('session', -1)}>-</button>
                        <div id='session-length'>{sessionLength}</div>
                        <button id='session-increment' onClick={()=>adjustTime('session', 1)}>+</button>
                    </div>
                </div>
            </div>
            <div className='timer flex flex-col justify-center m-6 border-4 border-double rounded-full border-teal-400 p-5'>
                <div id='timer-label' className='text-3xl'>{isSession ? 'Session' : 'Break'}</div>
                <div id='time-left' className='text-3xl'>{formatTime(timeLeft)}</div>
            </div>
            <div className='timer-control mt-3 flex flex-row justify-center gap-3'>
                <div id='start_stop'>
                    <button id='start' onClick={startTimer}><i className="bi bi-play-fill"></i></button>
                    <button id='stop' onClick={stopTimer}><i className="bi bi-pause-fill"></i></button>
                </div>
                <button id='reset' onClick={resetTimer}><i className="bi bi-arrow-repeat"></i></button>
            </div>
            <audio id="beep" ref={audioRef}></audio>
        </div>
    )
}

export default Clock