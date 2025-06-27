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

    const shows = {
        CBButton: 'charlie',
        AnnButton: 'annie',
        FootButton: 'footloose'
    };

    Object.keys(shows).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            document.querySelectorAll('.show').forEach(show => {
                show.classList.remove('selected');
                show.classList.add('hiddenItem');
            });
           const showId = shows[buttonId];
           const showToView = document.getElementById(showId);
           showToView.classList.remove('hiddenItem');
           showToView.classList.add('selected');
        });
    });

    const form = document.querySelector('#game form');
    const input = document.getElementById('guessNum');
    const result = document.getElementById('gameResult');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const userGuess = parseInt(input.value, 10);

        if(isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            result.textContent = 'Please enter a number between 1 and 10';
            return;
        }

        const randomNum = Math.floor(Math.random() * 10) + 1;

        if(userGuess === randomNum) {
            result.textContent = `You guessed ${userGuess} and the number was ${randomNum}. You win!`;
        } else {
            result.textContent = `You guessed ${userGuess}, but the number was ${randomNum}. Try again!`;
        }
    });
    const contactForm = document.querySelector('#contact form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const commentInput = document.getElementById('comment');
    const methodPhone = document.getElementById('phoneMethod');
    const methodEmail = document.getElementById('emailMethod');

    function viewError(input, message) {
        let error = input.nextElementSibling;
        if(!error || !error.classList.contains('error')) {
            error = document.createElement('span');
            error.classList.add('error');
            input.insertAdjacentElement('afterend', error);
        }
        error.textContent = message;
    }

    function clearErrors() {
        //removes previous error messages
        document.querySelectorAll('.error').forEach(el => el.remove());
    }

    function validateEmail(email) {
        //checks to see if email format is valid
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        //checks if phone format is valid
        return /^\d{10}$/.test(phone);
    }

    contactForm.addEventListener('submit', function(e) {
        //stops the form from submitting normally
     e.preventDefault();
    clearErrors();
    let valid = true;
    
        if (nameInput.value.trim() === '') {
            //when value is empty
            viewError(nameInput, 'Full name is required.');
            valid = false;
        }

        if(commentInput.value.trim() === '') {
            //when value is empty
            viewError(commentInput, 'Please leave a comment.');
            valid = false;
        }

        if(!methodPhone.checked && !methodEmail.checked) {
            //makes sure one of the buttons is selected
            viewError(methodEmail, 'Please select a preferred contact method.');
            valid = false;
        }

        if(methodEmail.checked && !validateEmail(emailInput.value.trim())) {
            viewError(emailInput, 'Please enter a valid email address.');
            valid = false;
        }
        if(methodPhone.checked && !validatePhone(phoneInput.value.trim())) {
            viewError(phoneInput, 'Enter a valid 10-digit phone number.');
            valid = false;
        }

        if(valid) {
            const storageContact = {
                //stores info from user
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                contactMethod: methodPhone.checked ? 'Phone' : 'Email',
                comment: commentInput.value.trim()
            };

            contactForm.reset();

            const pastMessage = document.querySelector('#thankYouMessage');
            if (pastMessage) {
                pastMessage.remove();
            }

            const thankYouMessage = document.createElement('p');
            thankYouMessage.textContent = `Thank you ${storageContact.name}! We'll contact you via ${storageContact.contactMethod} (${storageContact.contactMethod === 'Phone' ? storageContact.phone : storageContact.email}).`;
        
            thankYouMessage.id = 'thankYouMessage';
            contactForm.insertAdjacentElement('afterend', thankYouMessage); 
        }  
    });
 });