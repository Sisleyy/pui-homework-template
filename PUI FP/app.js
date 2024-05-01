//navbar
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function () {
        navMenu.classList.add('active');
        menuIcon.classList.add('hidden');
    });

    document.addEventListener('click', function (event) {
        const targetElement = event.target;
        if (!navMenu.contains(targetElement) && !menuIcon.contains(targetElement)) {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('hidden');
        }
    });
});
//show cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
    const soundIcons = document.querySelectorAll(".sound-icon");
    const volumeSliders = document.querySelectorAll(".volume-slider");
  
    // Define sound objects with loop properties
    const sounds = {
      bird: new Audio("./Media/Sounds/birds.mp3"),
      rain: new Audio("./Media/Sounds/rain.mp3"),
      creek: new Audio("./Media/Sounds/river.mp3"),
      water: new Audio("./Media/Sounds/underwater.mp3"),
      thunder: new Audio("./Media/Sounds/thunder.mp3"),
      ocean: new Audio("./Media/Sounds/ocean.mp3"),
      jazz: new Audio("./Media/Sounds/jazz.mp3"),
      talk: new Audio("./Media/Sounds/talk.mp3"),
      fire: new Audio("./Media/Sounds/fireplace.mp3"),
    };
  
    //  sound is loopping
    Object.values(sounds).forEach(sound => sound.loop = true);
  
    soundIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const soundToPlay = sounds[icon.dataset.sound];
        const slider = document.querySelector(`.volume-slider[data-sound="${icon.dataset.sound}"]`);
        if (soundToPlay.paused) {
          soundToPlay.play();
          slider.value = 50; // default volume value when playing
        } else {
          soundToPlay.pause();
          slider.value = 0; // Reset slider to 0 when pausing
        }
      });
    });
  
    volumeSliders.forEach((slider) => {
      slider.addEventListener("input", () => {
        const soundToControl = sounds[slider.dataset.sound];
        soundToControl.volume = slider.value / 100;
        if (slider.value > 0 && soundToControl.paused) {
          soundToControl.play(); // Play and continue looping if volume is bigger than 0
        } else if (slider.value == 0) {
          soundToControl.pause(); // Pause the sound if slider is set to 0
        }
      });
    });
  });
  
  //about page
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });
  const hiddenElements2 = document.querySelectorAll(".hiddenabout");
  hiddenElements2.forEach((el) => observer2.observe(el));