import React from 'react'


const Clock = () => {

    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    const [timerLabel, setTimerLabel] = React.useState('Session');
    const [timeLeft, setTimeLeft] = React.useState(sessionLength * 60);


    const decrementBreak = () => {
        if (breakLength > 1) {
            setBreakLength(breakLength - 1);
        }    
    }

    const decrementSession = () => {
        if (sessionLength > 1) {
            setSessionLength(sessionLength - 1);
        }
    }
    const incrementBreak = () => {
        if (breakLength < 60) {
            setBreakLength(breakLength + 1);
        }
    }
    const incrementSession = () => {
        if (sessionLength < 60) {
            setSessionLength(sessionLength + 1);
        }
    }



    return (
        <div className='clock text-center text-xl'>
           
            <h1 className='mb-10' >25 + 5 Clock</h1>
            <div className='constrols grid grid-cols-2 mt-4'>
                <div className='length-control grid grid-rows-2 '>
                    <div id='break-label'>Break Length</div>
                    <div className='control flex flex-row justify-center gap-3'>
                        <button id='break-decrement' onClick={decrementBreak}>-</button>
                        <div id='break-length'>{breakLength}</div>
                        <button id='break-increment' onClick={incrementBreak}>+</button>
                    </div>
                </div>
                <div className='length-control grid grid-rows-2'>
                    <div id='session-label'>Session Length</div>
                    <div className='control flex flex-row justify-center gap-3'>
                        <button id='session-decrement' onClick={decrementSession}>-</button>
                        <div id='session-length'>{sessionLength}</div>
                        <button id='session-increment' onClick={incrementSession}>+</button>
                    </div>
                </div>
            </div>
            <div className='timer flex flex-col justify-center m-6 border-4 border-double rounded-full border-teal-400 p-5'>
                <div id='timer-label' className='text-3xl'>{timerLabel}</div>
                <div id='time-left' className='text-3xl'>{timeLeft}</div>
            </div>
            <div className='timer-control mt-3 flex flex-row justify-center gap-3'>
                <div id='start_stop'>
                    <button id='start'><i className="bi bi-play-fill"></i></button>
                    <button id='stop'><i className="bi bi-pause-fill"></i></button>
                </div>
                <button id='reset'><i className="bi bi-arrow-repeat"></i></button>
            </div>
        </div>
    )
}

export default Clock