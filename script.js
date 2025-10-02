const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
let W = confettiCanvas.width = window.innerWidth;
let H = confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = confettiCanvas.width = window.innerWidth;
  H = confettiCanvas.height = window.innerHeight;
});

const popSound = document.getElementById('popSound');

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 6 + Math.random() * 8;
    this.h = 6 + Math.random() * 8;
    this.vx = -3 + Math.random() * 6;
    this.vy = -3 + Math.random() * 6;
    this.gravity = 0.03;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = -0.1 + Math.random() * 0.2;
    this.color = ['#ff6b6b','#ffd93d','#6bf178','#6bbcff','#c36bff'][Math.floor(Math.random()*5)];
    this.opacity = 0.9;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.angle += this.spin;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();
  }
}

function spawnConfetti(x, y) {
  const particles = [];
  for (let i = 0; i < 100; i++) { 
    particles.push(new Particle(x, y));
  }

  let frames = 0;
  function animate() {
    frames++;
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => { p.update(); p.draw(ctx); });
    if (frames < 200) requestAnimationFrame(animate); 
    else ctx.clearRect(0,0,W,H);
  }
  animate();
}

document.getElementById('updateBtn').addEventListener('click', () => {
  const x = Math.random() * W;
  const y = Math.random() * H;
  spawnConfetti(x, y);
  popSound.currentTime = 0;
  popSound.play();
});

const musicButton = document.getElementById('musicButton');
const birthdayMusic = document.getElementById('birthdayMusic');

musicButton.addEventListener('click', () => {
    if (birthdayMusic.paused) {
        birthdayMusic.play();
        musicButton.textContent = "Playing 🎶";
    } else {
        birthdayMusic.pause();
        musicButton.textContent = "Click for birthday music! 🎶";
    }
});
