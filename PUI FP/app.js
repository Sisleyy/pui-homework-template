const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');   
        } else {
            entry.target.classList.remove('show');
        }

    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
    const soundIcons = document.querySelectorAll('.sound-icon');
    const volumeSliders = document.querySelectorAll('.volume-slider');

    //  sound objects
    const sounds = {
        bird: new Audio('./Media/Sounds/birds.mp3'),
        rain: new Audio('./Media/Sounds/rain.mp3'),
        creek: new Audio('./Media/Sounds/river.mp3'),
        water: new Audio('./Media/Sounds/underwater.mp3'),
        thunder: new Audio('./Media/Sounds/thunder.mp3'),
        ocean: new Audio('./Media/Sounds/ocean.mp3'),
        jazz: new Audio('./Media/Sounds/jazz.mp3'),
        talk: new Audio('./Media/Sounds/talk.mp3'),
        fire: new Audio('./Media/Sounds/fireplace.mp3'),

    };

    soundIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const soundToPlay = sounds[icon.dataset.sound];
            const slider = document.querySelector(`.volume-slider[data-sound="${icon.dataset.sound}"]`);
            if (soundToPlay.paused) {
                soundToPlay.play();
                slider.value = 50;
            } else {
                soundToPlay.pause();
                slider.value = 0;
            }
        });
    });

    volumeSliders.forEach(slider => {
        slider.addEventListener('input', () => {
            const soundToControl = sounds[slider.dataset.sound];
            if (soundToControl.paused) {
                soundToControl.play();
            }
            soundToControl.volume = slider.value / 100;
            // If the slider is set to 0, pause the sound
            if (slider.value == 0) {
                soundToControl.pause();
            }
        });
    });
});
