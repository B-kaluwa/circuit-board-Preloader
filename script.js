document.addEventListener("DOMContentLoaded", () => {
  const terminalText = document.getElementById("terminalText");
  const progressBar = document.getElementById("progressBar");
  const percentage = document.getElementById("percentage");
  const preloader = document.getElementById("preloader");
  const mainContent = document.querySelector("main");
  const canvas = document.getElementById("circuitCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Terminal lines
  const lines = [
    "Initializing neural circuits...",
    "Booting quantum processors...",
    "Loading AI modules...",
    "Establishing secure encryption...",
    "Compiling data pipelines...",
    "Launching experience..."
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let progress = 0;

  // Typing effect
  function typeLine() {
    if (charIndex < lines[lineIndex].length) {
      terminalText.textContent += lines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, 50);
    } else {
      setTimeout(() => {
        lineIndex++;
        if (lineIndex < lines.length) {
          terminalText.textContent = "";
          charIndex = 0;
          typeLine();
        }
      }, 500);
    }
  }

  // Progress bar fill
  function updateProgress() {
    if (progress < 100) {
      progress += Math.floor(Math.random() * 5) + 1;
      if (progress > 100) progress = 100;
      progressBar.style.width = progress + "%";
      percentage.textContent = progress + "%";
      setTimeout(updateProgress, 200);
    }
  }

  // Circuit board animation
  const nodes = [];
  const nodeCount = 60;

  function initCircuit() {
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 3,
        pulse: Math.random() * 0.5 + 0.5
      });
    }
  }

  function drawCircuit() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0,255,136,0.2)";
    ctx.lineWidth = 1;

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw glowing nodes
    for (let node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * node.pulse, 0, Math.PI * 2);
      ctx.fillStyle = "#00ff88";
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur = 15;
      ctx.fill();
      node.pulse += Math.sin(Date.now() / 500) * 0.01;
    }

    requestAnimationFrame(drawCircuit);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  initCircuit();
  drawCircuit();

  // Run animations
  typeLine();
  updateProgress();

  // Ensure preloader stays for at least 3 seconds
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        preloader.style.display = "none";
        mainContent.style.display = "block";
      }, 500);
    }, 6000);
  });
});
