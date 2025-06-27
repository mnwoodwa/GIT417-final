'use strict';

document.addEventListener('DOMContentLoaded', ()=> {
    //used to make it a button and load the icon
    const toggleMode = document.getElementById('toggleMode');
    const toggleIcon = document.getElementById('toggleIcon');

    const darkMode = () => {
        //enables dark mode
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        toggleIcon.src = 'Light mode.png';
        toggleIcon.alt = 'Light mode button';
        localStorage.setItem('theme', 'dark');

    }; 

    const lightMode = () => {
        //enables light mode
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        toggleIcon.src = 'Dark mode.png';
        toggleIcon.alt = 'Dark mode button';
        localStorage.setItem('theme', 'light');

    };

    if(localStorage.getItem('theme') === 'dark') {
        darkMode();
    } else {
        lightMode();
    }

    toggleMode.addEventListener('click', () => {
        //button will toggle when clicked
        if(document.body.classList.contains('dark-mode')) {
            lightMode();
        } else {
            darkMode();
        }
    });
});