function countUp(sec, id = '') {
    let seconds = 0;
    let secLimit = 0;
    let milliseconds = 0;
    let minutes = 0;
    
    const interval = setInterval(() => {
        milliseconds++;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
            secLimit++;
            if (seconds >= 60) {
                minutes++;
                seconds = 0;
            }
        }
        if (secLimit >= sec) {
            clearInterval(interval);
            return;
        }
        
        const $timerDisplay = $(`#${id}`);
        $timerDisplay.text(`${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`);
    }, 10);
    
    return interval;
}

function countDown(sec , min = '0' , id = ''){
    let seconds = sec
    let minutes = min
    const interval = setInterval(()=>{
        seconds--
        if(seconds === 0){
          if(minutes != 0){
            minutes--
            seconds += 60
          }else clearInterval(interval)
        }
        let $timerDisplay = $(`#${id}`)
        $timerDisplay.text(`${minutes} : ${seconds}s`)
        return //console.log(` You have ${minutes} minutes  : ${seconds} seconds left!`)
    } , 1000)
    
}