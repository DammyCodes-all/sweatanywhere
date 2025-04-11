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

// Motivational quotes collection
const motivationalQuotes = [
    { text: "The only bad workout is the one that didn't happen.", author: "Yoo smith" },
    { text: "No matter how slow you go, you are still lapping everybody on the couch.", author: "Will cooper" },
    { text: "What seems impossible today will one day become your warm-up.", author: "Aristotle" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Albert Einstein" },
    { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Smith" },
    { text: "Strength does not come from the body. It comes from the will.", author: "Gandhi" },
    { text: "Don't wish it were easier, wish you were better.", author: "Jim Rohn" },
    { text: "The difference between try and triumph is just a little umph!", author: "Marvin Phillips" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
    { text: "Tomorrow's battle is won during today's practice.", author: "Unknown" },
    { text: "The pain you feel today will be the strength you feel tomorrow.", author: "javaScript" },
    { text: "Strive for progress, not perfection.", author: "Dammycodes-all" }
];

// fetch and show motivational quotes
function fetchQuote() {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    writeText(`"${randomQuote.text}"`, 'quote');
    writeText(`-- ${randomQuote.author}`, 'author');
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
