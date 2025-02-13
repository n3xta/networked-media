const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

// const startTime = Date.now();

function updateClock() {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  const hourAngle =
    (minutes + seconds / 60 + milliseconds / 60000) * 6;

  const minuteAngle =
    (seconds + milliseconds / 1000) * 6;

  const secondAngle =
    (seconds + milliseconds / 1000) * 360 % 360;

  hourHand.style.transform   = `translateX(-50%) rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

  document.getElementById("background-time").innerText =
    now.toLocaleTimeString('en-IT', { hour12: false }) + " " +
    String(milliseconds).padStart(3, '0');

  requestAnimationFrame(updateClock);
}



// function updateClock() {
//   // const elapsed = (Date.now() - startTime) / 1000;

//   const hourAngle = (elapsed * 0.1) % 360;
//   const minuteAngle = (elapsed * 6) % 360;
//   const secondAngle = (elapsed * 360) % 360;

//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();
//   const milliseconds = now.getMilliseconds();

//   hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
//   minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
//   secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

//   document.getElementById("background-time").innerText =
//   now.toLocaleTimeString('en-IT', { hour12: false }) + " " + String(milliseconds).padStart(3, '0');

//   requestAnimationFrame(updateClock);
// }

function createTickMarks(containerId, diameterVh) {
  const container = document.getElementById(containerId);
  const radius = diameterVh / 2;
  
  for (let i = 1; i < 61; i++) {
    const tick = document.createElement('div');
    tick.className = 'tick';
    tick.innerText = i;
    
    const angle = i * 6;
    tick.style.transform = `rotate(${angle}deg) translateY(-${radius}vh)`;
    
    container.appendChild(tick);
  }
}
  
  // createTickMarks('number-circle-54', 110);
  createTickMarks('number-circle-44', 90);

updateClock();

const { Engine, World, Bodies, Composite } = Matter;

const engine = Engine.create();
const world = engine.world;
world.gravity.y = 1;

const canvas2 = document.getElementById('emoji-canvas-2');
const canvas6 = document.getElementById('emoji-canvas-6');
canvas2.width = canvas6.width = window.innerWidth;
canvas2.height = canvas6.height = window.innerHeight;
const ctx2 = canvas2.getContext('2d');
const ctx6 = canvas6.getContext('2d');

const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true });
const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
World.add(world, [leftWall, rightWall]);
World.add(world, ground);

const emojis = [
  "⏰", "⏳", "⌛",
  "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘",
  "📅", "📆", "📊", "📈",
  "💯", "⚪", "⚫", "🔴", "🟢", "🔵",
  "🔔", "🔕", "📣", "📢",
  "📬", "📩", "📧", "📨",
  "📋", "📝", "📃", "📄", 
  "✅", "❌", "❗", "❓",
  "📚", "📦", "🧱", "🔺",
  "💥", "🤯", "😵‍💫", "🔥"
];

function dropSmallEmoji() {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const x = Math.random() * window.innerWidth;
  const smallBody = Bodies.circle(x, -30, 20, {
    restitution: 0.6,
    friction: 0.8,
    frictionStatic: 0.9,
    frictionAir: 0.02,
  });
  smallBody.emoji = emoji;
  smallBody.layer = 6;
  smallBody.size = 'small';
  World.add(world, smallBody);
}

function dropBigEmoji() {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const x = Math.random() * window.innerWidth;
  const bigBody = Bodies.circle(x, -30, 70, {
    restitution: 0.6,
    friction: 0.8,
    frictionStatic: 0.9,
    frictionAir: 0.02,
  });
  bigBody.emoji = emoji;
  bigBody.layer = 2;
  bigBody.size = 'big';
  World.add(world, bigBody);
}

setInterval(() => {
  dropSmallEmoji();
}, 1000);

setInterval(() => {
  dropBigEmoji();
}, 60000);

(function renderEmojis() {
  requestAnimationFrame(renderEmojis);
  Engine.update(engine, 1000 / 60);
  
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx6.clearRect(0, 0, canvas6.width, canvas6.height);
  
  const bodies = Composite.allBodies(world);
  bodies.forEach(body => {
    if (body.emoji) {
      const pos = body.position;
      if (body.size === 'big') {
        ctx2.font = "250px sans-serif";
        ctx2.fillText(body.emoji, pos.x - 25, pos.y + 25);
      } else if (body.size === 'small') {

        ctx6.font = "50px sans-serif";
        ctx6.fillText(body.emoji, pos.x - 15, pos.y + 15);
      }
    }
  });
})();