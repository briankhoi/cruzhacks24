import React, { useState, useEffect } from 'react';
import './timer.css';

export default function Timer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [studySession, setStudySession] = useState(true);


    // useEffect(() => {
    //     if(count >= 4){
    //         window.alert('Congratulations! You have reached 4 cycles, go out and take a nice walk or rest. :)')
    //     }
    // });

    useEffect(() => {
        let interval = null;
        

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // setCount(prevCount => prevCount + 1);
                        // if(count <3){
                        //     window.alert(["Time is up, take a five minute break! :)"]);
                        // }
                        setStudySession(!studySession);

                        /* Alternates between study and break sessions */
                        if(studySession){
                            setMinutes(5)
                            if(seconds === 0)
                            {
                                window.alert(["Time is up, take a five minute break! :) "]);
                            }
                        }
                        else{
                           
                            setMinutes(25)
                            { 
                                if(seconds === 0)
                                {
                                    window.alert(["Break is up, time to resume studying! ;) "]);
                                }
                            }
                        }
                        // setTimer(0);
                        //resetTimer();
                    } else {
                        setMinutes(minutes => minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds => seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds, minutes]);

    /* To reset timer */
    const resetTimer = () => {
        setMinutes(25);
        setSeconds(0);
        setIsActive(false);
        setStudySession(true);
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    return (
        <div class="timer-container">
            <div className="timer">
                <div class="timer1">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
                {/* <div className = 'count'>{count} cycle/s (4 cycles)</div> */}
                <div class="timer2">
                    <div className ="resetTimerButton" onClick={toggleTimer}>
                        {isActive ? 'Pause' : 'Start'}
                    </div>
                    {/* <div className = "resetTimerButton" onClick={resetTimer}>Reset</div> */}
                </div>
            </div>
        </div>
    );
}
