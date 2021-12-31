const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '74b85ea10999434aa1d122796ce07824',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const API_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-To-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('whoops', error);
    }
}

// Evenet Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);