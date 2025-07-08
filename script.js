var typed=new Typed(".text",{
    strings:["Frontend Developer","RPA Developer","Website Designer","Web Developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})

let menuIcon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

menuIcon.onclick=()=>{
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')
}

let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');
window.onscroll=()=>{
    sections.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop -150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top>=offset && top<offset+height){
            navLinks.forEach.apply(links=>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            });
        };
    });
    let header=document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY>100);
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active')
};
ScrollReveal({
    distance:'80px',
    duration:2000,
    delay:200,
});
ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, service-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });





var typed = new Typed(".text", {
    strings: ["Frontend Developer", "RPA Developer", "Website Designer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bi-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + id) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']')?.classList.add('active');
            });
        }
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bi-x');
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

const scriptURL = 'https://script.google.com/macros/s/AKfycbwXud7R_oGowFtrC12r3oVAH1iQtJALOI7s9xsqpRtBTcPT_kaWQXwWoWPl9G7WzI7v/exec';

const form = document.forms['contact-form'];

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append('sheetName', 'Contact-Form'); // Specify the sheet name
        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Thank you! Your form is submitted successfully.");
                window.location.reload();
            } else {
                throw new Error('Form submission failed.');
            }
        })
        .catch(error => console.error('Error!', error.message));
    });
}


