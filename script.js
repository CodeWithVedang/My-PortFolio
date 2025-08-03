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


// Neon Cursor Trail
const canvas = document.getElementById('cursor-trail');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 100;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
    ctx.save();
    ctx.globalAlpha = this.life / 100; // smooth transparency based on life
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 25;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
}

}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', e => {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(e.x, e.y));
    }
});
// Firework Particle Class
class FireworkParticle extends Particle {
    constructor(x, y) {
        super(x, y);
        this.speedX = (Math.random() - 0.5) * 8; // wider spread
        this.speedY = (Math.random() - 0.5) * 8; 
        this.size = Math.random() * 4 + 3;
        this.life = 80;
        this.gravity = 0.15; // smooth fall
        this.friction = 0.98; // gradual slowdown
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    }
    update() {
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        this.speedY += this.gravity; // gravity pull
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1.5;
        if (this.size > 0.2) this.size *= 0.96;
    }
}


// Firework on Click
window.addEventListener('click', e => {
    for (let i = 0; i < 50; i++) {  // Number of particles per firework
        particles.push(new FireworkParticle(e.x, e.y));
    }
});
