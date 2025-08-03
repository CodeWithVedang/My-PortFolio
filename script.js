var typed = new Typed(".text", {
    strings: ["Frontend Developer", "RPA Developer", "Website Designer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']')?.classList.add('active');
            });
        }
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});
ScrollReveal().reveal('.home-content, .heading, h2', { origin: 'top' });
ScrollReveal().reveal('.home-img, .service-container, .vsproj-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

const scriptURL = 'https://script.google.com/macros/s/AKfycbx9X_qUdIullPJ5Ze4fyLda2aClKIeCI4fRzVTIeeJ8WSI8ykm3fu2cSLLDNuVoeSDH/exec';
const form = document.forms['contact-form'];

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append('sheetName', 'Contact-Form');
        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert("Thank you! Your form is submitted successfully.");
                form.reset();
            } else {
                throw new Error(data.message || 'Form submission failed.');
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Error submitting form. Please try again.');
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach((item, index) => {
    item.style.setProperty('--i', index);
  });
});