// --- PHẦN HIỆU ỨNG TRANG WEB ---

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let pieces = [];
const num_row = 150;
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function initPieces() {
    pieces = [];
    for (let i = 0; i < num_row; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 80%)`
        });
    }
}

function updatePieces() {
    for (let piece of pieces) {
        piece.y += piece.speedY;
        if (piece.y > canvas.height) {
            piece.y = -piece.size;
            piece.x = Math.random() * canvas.width;
        }
    }
}

function drawPieces() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let piece of pieces) {
        ctx.beginPath();
        ctx.arc(piece.x, piece.y, piece.size, 0, Math.PI * 2);
        ctx.fillStyle = piece.color;
        ctx.fill();
    }

    animateParticles(); // vẽ pháo hoa cùng lúc
}

function loop() {
    updatePieces();
    drawPieces();
    requestAnimationFrame(loop);
}

initPieces();
loop();

// --- PHẦN PHÁO HOA ---
function startFirework() {
    const colors = ["#ff5050", "#ff66cc", "#66ccff", "#99ff99", "#ffff66"];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height / 2; // nửa trên màn hình
            const size = Math.random() * 3 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            explode(x, y, size, color);
        }, Math.random() * 2000);
    }
}

function explode(x, y, size, color) {
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        particles.push({ x, y, vx, vy, life: 50, size, color });
    }
}

function animateParticles() {
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
            particles.splice(index, 1);
        } else {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
}

// --- PHẦN THƯ CHÚC MỪNG ---
const text = "Hello Diệu Viii xinggggiuuuu💖 Vậy là đã đến sinh nhật lần thứ 18 của Diệu Vi ruiii! Tớ chúc Diệu Vii có một sinh nhật vui vẻ bên gia đình cũng như bên các người bạn thân yêu, chúc cho cậu luôn nở nụ cười trên môi, khong phải suy nghĩ tiêu cực. Tuổi mới thêm tràn đầy sức sống, nhiệt huyết. Học tập tốt hơn, vững vàng hơnn, trưởng thành hơnn. Chúc cho cậu đạt được kết quả cao như đã muốn, đỗ vào nguyện vọng 1 - HUS. Cố gắng để hẹn nhau ở Hà Nội nhaaa! Còn về chuyện tình cẻm ni=))), tớ luôn thoải mái, lúc nào cũng được hết cả, có duyên thì oke, còn khong có duyên thì tớ tạo ra duyên=))))). Mặc dù là vậy, nhma cả 2 cũng cố gắng từng ngày hơn để đạt mục tiêu hơn, khong vì chuyện tình cẻm này mà việc học lơ đãng đi. Phải cố gắng để cùng nhau đạt được mục tiêu nhaaaa. Gái HUS - Trai UET - VNU. Tuyệt vời lắmmm. Nhưng mà tuyệt hơn thế nữa là chúng taaa😳💖";
const speed = 100;
let i = 0;
let clockInterval;
let fireworkInterval;

document.getElementById("startButton").onclick = function () {
    this.style.display = "none";
    document.getElementById("clock").style.display = "block";

    startAtBirthday();
};

function typeWriter() {
    document.getElementById("content").innerHTML = "Chúc Mừng Sinh Nhật Diệu Vii xinhhhiuuuu! 🎉";
    clearInterval(clockInterval);
    document.getElementById("clock").innerHTML = "";
    document.getElementById("clock").style.display = "none";

    document.getElementById("startSound").play();

    if (i < text.length) {
        document.getElementById("letter").innerHTML += text.charAt(i);

        const card = document.getElementById("card");
        card.scrollTop = card.scrollHeight;

        i++;
        setTimeout(typeWriter, speed);
    } else {
        document.getElementById("card").style.overflow = "auto";
    }
}

function preTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");
    const timeString = `${hours}:${minutes}:${second}`;
    const timePrint = document.getElementById("clock");
    timePrint.innerHTML = timeString;
}

function startAtBirthday() {
    const now = new Date();
    const birthday = new Date(now.getFullYear(), 3, 30, 0, 0, 0); 

    if (now >= birthday) {
        typeWriter();
        startFirework();
        fireworkInterval = setInterval(startFirework, 4000);
    } else {
        const timeDiff = birthday - now;
        setTimeout(() => {
            typeWriter();
            startFirework();
            fireworkInterval = setInterval(startFirework, 4000);
        }, timeDiff);
        
        clockInterval = setInterval(preTime, 1000);
        preTime();
    }
}

window.onload = startAtBirthday;
