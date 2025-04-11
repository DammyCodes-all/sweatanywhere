# SweatAnywhere - Fitness Website

SweatAnywhere is a modern, responsive fitness website that offers beginner-friendly workout routines for chest, legs, and abs. The website features an engaging UI with animated transitions, workout timers, and exercise demonstrations through GIFs.

## Features

- 🏋️‍♂️ Three beginner-friendly workout categories:
  - Chest workout (10 mins, 4 exercises)
  - Leg workout (5 mins, 4 exercises)
  - Abs workout (7 mins, 4 exercises)
- 🎨 Modern UI with smooth animations using AOS (Animate On Scroll)
- 📱 Fully responsive design that works on all devices
- ⏱️ Built-in workout timers
- 🖼️ Exercise demonstrations using GIF animations
- 💪 Motivational quotes that refresh every 10 seconds

## Timer Functionality

The `timer.js` file contains two main timer functions:

### countDown(seconds, minutes = '0', id = '')
- Used for countdown timers (e.g., "Get Ready" timer)
- Parameters:
  - `seconds`: Number of seconds to count down from
  - `minutes`: (Optional) Number of minutes to count down from
  - `id`: HTML element ID where the timer should be displayed
- Example: `countDown(10, 0, 'ready-timer')` for 10-second countdown

### countUp(seconds, id = '')
- Used for tracking exercise duration
- Parameters:
  - `seconds`: Maximum seconds to count up to
  - `id`: HTML element ID where the timer should be displayed
- Example: `countUp(30, 'rep-timer')` for 30-second exercise timer

## Known Limitations

The workout play functionality is currently incomplete. While the timer functions are implemented, the following features are pending:
- Exercise progression tracking
- Rest periods between exercises
- Complete workout session management
- Exercise completion tracking
- Workout summary/statistics

## Technologies Used

- HTML5
- CSS3
- JavaScript/jQuery
- AOS (Animate On Scroll) library
- Material Icons
- Custom timer implementation

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Click on any workout card to start
4. Use the "Start Exercise" button to begin the workout

## Browser Compatibility

The website is tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- Complete workout play functionality
- Add user profiles and progress tracking
- Implement workout customization
- Add more workout categories and difficulty levels
- Include sound cues for exercise transitions