let countdownInterval;
let checkStartClick = true;
let checkTime;
let display_focus = document.querySelector(".display-focus");
let alarm_ring = new Audio("./assets/sounds/alarm.wav");
function startCountdown(currentminutes, currentseconds, checkcurrentTime) {
    var inputStudyNumber = document.getElementById("inputStudyNumber").value;
    var inputBreakNumber = document.getElementById("inputBreakNumber").value;
    var start_click = new Audio("./assets/sounds/start-click.wav");
    start_click.play();
    var start_time = document.getElementById("start");
    if (typeof checkcurrentTime === 'undefined' || checkcurrentTime) {
        checkTime = true;
    } else if (checkcurrentTime === false) {
        checkTime = false;
    }
    var countdown = document.getElementById("countdown");
    var countminutes;
    var countseconds;
    if (typeof currentminutes === 'undefined') {
        countminutes = inputStudyNumber - 1;
        countseconds = 60;
    } else {
        countminutes = currentminutes;
        countseconds = currentseconds;
    }
    if (!countdownInterval) {
        countdownInterval = setInterval(function () {
            start_time.onclick = function () {
                if (checkStartClick) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                    startCountdown(countminutes, countseconds, checkTime);
                } else {
                    startCountdown();
                    checkStartClick = true;
                }
            }
            countseconds--;
            countdown.innerHTML = countminutes + ":" + countseconds;
            if (countseconds < 10 && countminutes < 10) {
                countdown.innerHTML = "0" + countminutes + ":" + "0" + countseconds;
            }
            if (countminutes < 10 && countseconds > 10) {
                countdown.innerHTML = "0" + countminutes + ":" + countseconds;
            }
            if (countseconds < 10 && countminutes >= 10) {
                countdown.innerHTML = countminutes + ":" + "0" + countseconds;
            }
            if (countseconds === 0) {
                countminutes--;
                if (countminutes === -1 && checkTime) {
                    alarm_ring.play();
                    setDisplay(false);
                    checkTime = false;
                    countminutes = inputBreakNumber - 1;
                    clearInterval(countdownInterval);
                    checkStartClick = true;
                    countdown.innerHTML = "Break Time";
                } else if (countminutes === -1 && !checkTime) {
                    alarm_ring.play();
                    setDisplay(true);
                    checkTime = true;
                    countminutes = inputStudyNumber - 1;
                    clearInterval(countdownInterval);
                    checkStartClick = true;
                    countdown.innerHTML = "Focus Time";
                }
                countseconds = 60;
            }
        }, 1000);
    }
}
function setDisplay(checkDisplay) {
    if (checkDisplay) {
        display_focus.classList.remove("background-break");
        display_focus.classList.add("background-focus");
    } else {
        display_focus.classList.remove("background-focus");
        display_focus.classList.add("background-break");
    }
}
function stopCountdown() {
    var stop_click = new Audio("./assets/sounds/stop-click.wav");
    stop_click.play();
    clearInterval(countdownInterval);
    countdownInterval = null;
}
function openSetting() {
    document.getElementById("overlay").style.display = "block";
    document.querySelector(".setting").style.display = "block";
}
function closeSetting() {
    document.getElementById("overlay").style.display = "none";
    document.querySelector(".setting").style.display = "none";
}
function setTimer() {
    var countdown = document.getElementById("countdown");
    if(document.getElementById("inputStudyNumber").value < 10){
        countdown.innerText = "0" + document.getElementById("inputStudyNumber").value + ":" + "00";
    }else{
        countdown.innerText = document.getElementById("inputStudyNumber").value + ":" + "00";
    }
    closeSetting();
    clearInterval(countdownInterval);
    checkStartClick = false;
    countdownInterval = null;
    if(!checkTime){
        setDisplay(true);
    }
}