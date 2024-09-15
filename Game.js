const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 30,
    speed: 0,
    gravity: 0.6,
    jumpPower: -10
};

const pipes = [];
const pipeWidth = 60;
const pipeGap = 200;
const pipeSpeed = 2;
let frame = 0;
let score = 0;

// Event listener for bird jump
document.addEventListener('keydown', () => {
    bird.speed = bird.jumpPower;
});

// Main game loop
function gameLoop() {
    frame++;
    
    // Update bird
    bird.y += bird.speed;
    bird.speed += bird.gravity;
    
    // Add new pipes
    if (frame % 90 === 0) {
        const pipeHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({
            x: canvas.width,
            y: pipeHeight
        });
    }
    
    // Move pipes
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
    });
    
    // Remove off-screen pipes
    if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
        pipes.shift();
        score++;
    }
    
    // Check for collisions
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        alert('Game Over! Score: ' + score);
        document.location.reload();
    }
    
    pipes.forEach(pipe => {
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)
        ) {
            alert('Game Over! Score: ' + score);
            document.location.reload();
        }
    });
    
    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bird
    ctx.fillStyle = 'orange';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    
    // Draw pipes
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);
    });
    
    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
