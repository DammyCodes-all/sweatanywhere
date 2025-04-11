$(".toggle").click( ()=>{ $('.nav').toggleClass('shown')})
//  Aos initialization
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true
});

let isStarted = false

// background change
const imgUrl = [ '/src/images/bg-1.png' , '/src/images/bg-2.png' , '/src/images/bg-3.png']
let num = 0
function showbg(num){
    $('#home').css({
        "background-image": `url(${imgUrl[num]})`,
        "background-repeat": "no-repeat",
        "background-position": "center center",
        "background-size": "cover"
    })
    $('.hero_txt').addClass('hide').removeClass('hero_txt_shown')
    $('.hero_txt').eq(num).removeClass('hide').addClass('hero_txt_shown')
    isStarted = true
}

if(!isStarted){
    showbg(0)
}

// autoslide logic
let autoSlideInterval
function autoPlay(){
    autoSlideInterval = setInterval(()=>{
    num++
        if (num > ( imgUrl.length - 1)){
            num = 0
        }
        if (num < 0){
            num = (imgUrl.length - 1)
        }
        showbg(num)
    } , 5000)
}
// reset slide function
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoPlay();
}

autoPlay();

$('#next, #prev').click(function() {
    resetAutoSlide();
});

$('#next').click(()=>{
    num++
    if (num > ( imgUrl.length - 1)){
        num = 0
    }
    showbg(num)
});

$('#prev').click(()=>{
    num--
    if (num < 0){
        num = (imgUrl.length - 1)
    }
    showbg(num)
})

// fetch and show motivational quotes
async function fetchQuote(){
    try {
        let content, author
        do {
            const response = await fetch('https://zenquotes.io/api/random')
            if(response.status !== 200){
                throw new Error(`${response.status}`)
            }
            const data = await response.json()
            content = data[0].q
            author = data[0].a
        } while (content.length >= 70)
        
        writeText(`" ${content} "`, 'quote')
        writeText(`-- ${author}`, 'author')
    } catch (error) {
        writeText(`Something went wrong: ${error}`, 'quote')
    }
}

let used = false
if(!used){
    fetchQuote()
    used = true
}
// auto fetch every 10 sec
const autofetch = setInterval(() => {
    fetchQuote()
}, 10000);
// write text animation

function writeText(text, elementId) {
    let currentText = 0;
    const textList = text.split('');
    const $el = $(`#${elementId}`);
    $el.text('')
    if( $el.text().length > 70){
        return
    }
    const interval = setInterval(() => {
        if (currentText < textList.length) {
            $el.append(textList[currentText]);
            currentText++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}


// workout modal logic
const $modal = $('#workout-modal');
const workoutList = $('.workout-list')
let currentWorkout;
let currentExerciseIndex = 0;

function showModal(id) { 
    $modal.addClass('workout-session-bg-shown');
    $('.workout-session-container').addClass('workout-session-container-shown');
    currentWorkout =  workoutList.eq(id)
    currentWorkout.removeClass('hidden').addClass('shown')
}
function hideModal() { 
    $modal.removeClass('workout-session-bg-shown');
    $('.workout-session-container').removeClass('workout-session-container-shown');
    currentWorkout.removeClass('shown').addClass('hidden');
    $('.get-ready').removeClass('shown').addClass('hidden');
    
    // Reset exercise state
    $('.excercise.shown').removeClass('shown').addClass('hidden');
    currentExerciseIndex = 0;
}



// click-event handlers
let currentId;
$('.animated-button').click(function(){
    const id = $(this).attr('id')
    currentId = $(this).attr('id')
    showModal(id);
    add1()
});
$('.close-modal').click(function(){
    const id = $(this).attr('id')
    hideModal(id);
    clearPage()
    currentId = null
})
$('.start').click(function(){
    clearPage()
    remove1()
    getReady()
    setTimeout(()=>{
        removeGetReady()
        appendExcersice()
    }, 10000)
})


// state management functions
const add1 = ()=>{
    $('.start').addClass('shown-center').removeClass('hidden')
    $('.workout-list-name').text('Workout List')
}
const remove1 = ()=>{
   $('.start').addClass('hidden').removeClass('shown-center')
    $('.workout-list-name').text('')
}
function removeGetReady(){
    $('.get-ready').removeClass('shown').addClass('hidden')
}
function clearPage(){
    currentWorkout.removeClass('shown').addClass('hidden');
    $('.get-ready').removeClass('shown').addClass('hidden')
}
function getReady(){
    $('.get-ready').removeClass('hidden').addClass('shown')
    $('#ready-timer').text('0 : 10s')
    countDown(10 , 0 , 'ready-timer')
}

function appendExcersice(){
    // Map workout IDs to their corresponding exercise class names
    const workoutClasses = {
        0: 'chest-excersices',
        1: 'leg-excersise',
        2: 'abs-excersise'
    };

    // Get the exercise class based on currentId
    let exerciseClass = workoutClasses[currentId];
    
    if (!exerciseClass) {
        console.error('Invalid workout type:', currentId);
        return;
    }

    // Hide any previously shown exercise
    $(`.${exerciseClass} .excercise.shown`).removeClass('shown').addClass('hidden');

    // Find and show the current exercise
    const $exercise = $(`.${exerciseClass} .excercise`).eq(currentExerciseIndex);
    
    if ($exercise.length === 0) {
        console.error(`No exercises found for ${exerciseClass}`);
        return;
    }

    $exercise.removeClass('hidden').addClass('shown');
    $('.workout-session-container').append($exercise);

    // Start the timer for this exercise
    const $timer = $exercise.find('.rep-timer');
    countUp(30, $timer.attr('id'));
}

function nextExercise() {
    const workoutClass = currentId == 0 ? 'chest-excersices' : 
                        currentId == 1 ? 'leg-excersise' : 
                        'abs-excersise';
    
    const totalExercises = $(`.${workoutClass} .excercise`).length;
    
    // Remove current exercise
    $(`.${workoutClass} .excercise.shown`).removeClass('shown').addClass('hidden')
    $('.workout-session-container').empty()
    
    currentExerciseIndex++;
    
    if (currentExerciseIndex >= totalExercises) {
        // Workout complete
        hideModal();
        currentExerciseIndex = 0;
        return;
    }
    
    // Show next exercise
    appendExcersice();
}

// Add event listener for completing an exercise
$('.next').on('click' ,  function() {
    nextExercise();
});
