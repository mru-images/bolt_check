// Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCkQIWw9iJPnNBYsnIDL-zDWDsHRok1mps",
      authDomain: "imagescheck-1fc28.firebaseapp.com",
      projectId: "imagescheck-1fc28",
      storageBucket: "imagescheck-1fc28.appspot.com",
      messagingSenderId: "105228",
      appId: "1:105228:web:example",
      databaseURL: "https://imagescheck-1fc28-default-rtdb.firebaseio.com"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    const canvas = document.getElementById("globe");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("container");
    const input = document.getElementById("passwordInput");
    const devModeIntro = document.getElementById("devModeIntro");
    const accessGranted = document.getElementById("accessGranted");
    const particlesContainer = document.getElementById("particles");

    // Show developer mode intro first
    setTimeout(() => {
      devModeIntro.style.opacity = '0';
      setTimeout(() => {
        devModeIntro.style.display = 'none';
        document.body.classList.add('loaded');
      }, 1000);
    }, 3000);setTimeout(() => {
      // Fade in the container
      devModeIntro.style.opacity = '1';
      
      // After container is visible, start typing animation
      setTimeout(() => {
        devModeText.style.opacity = '1';
        devModeText.classList.add('typing');
        
        // After typing completes (3s), fade everything out
        setTimeout(() => {
          devModeIntro.style.opacity = '0';
          setTimeout(() => {
            devModeIntro.style.display = 'none';
            document.body.classList.add('loaded');
          }, 500);
        }, 3000);
      }, 500);
    }, 1000);

    // Set canvas size based on container
    function resizeCanvas() {
      const size = Math.min(container.offsetWidth, container.offsetHeight);
      canvas.width = size;
      canvas.height = size;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const baseRadius = Math.min(W, H) * 0.33;

    let angleY = 0;
    let angleX = 0;
    let isDragging = false;
    let lastX, lastY;

    // Zoom and focus state
    let zoom = 1;
    const zoomMin = 0.6;
    const zoomMax = 2.5;

    // Target focus point (for smooth rotation & zoom)
    let focusPoint = null;
    let focusAngleX = 0;
    let focusAngleY = 0;
    let focusZoom = 1;
    const focusEase = 0.05;

    // Password state
    let status = "normal"; // normal, correct, wrong
    let statusTimer = 0;
    let unlocked = false;
    let disappearing = false;

    // Shake state
    let shakeIntensity = 0;

    // Store all passwords in memory after loading
    let allPasswords = [];

    // Load all passwords when page loads
    async function loadPasswords() {
      try {
        const snapshot = await database.ref('Passwords/').once('value');
        const passwords = snapshot.val();
        if (passwords) {
          allPasswords = Object.values(passwords);
        }
      } catch (error) {
        console.error("Error loading passwords:", error);
      }
    }

    // Call the function to load passwords when page loads
    loadPasswords();

    // Points generation
    const pointCount = 300;
    const points = [];
    for (let i = 0; i < pointCount; i++) {
      let lat = Math.acos(2 * Math.random() - 1);
      let lon = 2 * Math.PI * Math.random();
      points.push({
        lat,
        lon,
        offset: 1 + Math.random() * 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Trails (connections)
    const trails = [];
    for (let i = 0; i < 50; i++) {
      let a = points[Math.floor(Math.random() * pointCount)];
      let b = points[Math.floor(Math.random() * pointCount)];
      trails.push([a, b, Math.random()]);
    }

    // Convert spherical to Cartesian coords
    function sphericalToCartesian(lat, lon, r = baseRadius, scale = 1) {
      const x = r * Math.sin(lat) * Math.cos(lon) * scale;
      const y = r * Math.sin(lat) * Math.sin(lon) * scale;
      const z = r * Math.cos(lat) * scale;
      return { x, y, z };
    }

    // Rotate 3D point by angleX and angleY
    function rotate3D({ x, y, z }, angleX, angleY) {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      let y1 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      return { x: x1, y: y1, z: z2 };
    }

    // Project 3D point to 2D canvas coords
    function project({ x, y, z }) {
      let scale = 300 / (300 + z);
      return {
        x: cx + x * scale * zoom,
        y: cy + y * scale * zoom,
        scale,
      };
    }

    // Find closest point on globe to mouse
    function findClosestPoint(mouseX, mouseY) {
      let closest = null;
      let closestDist = 20; // max pick radius in pixels

      for (const point of points) {
        let pos3D = sphericalToCartesian(point.lat, point.lon, baseRadius, point.offset);
        let rotated = rotate3D(pos3D, angleX, angleY);
        let proj = project(rotated);

        let dx = proj.x - mouseX;
        let dy = proj.y - mouseY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closestDist = dist;
          closest = point;
        }
      }
      return closest;
    }

    // Smoothly interpolate angle towards target angle (handling wrapping)
    function lerpAngle(current, target, t) {
      let diff = target - current;
      if (diff > Math.PI) diff -= 2 * Math.PI;
      if (diff < -Math.PI) diff += 2 * Math.PI;
      return current + diff * t;
    }

    // Get touch position relative to canvas
    function getTouchPos(canvas, touch) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }

    // Touch event handlers
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        const pos = getTouchPos(canvas, touch);
        lastX = pos.x;
        lastY = pos.y;
        canvas.style.cursor = "grabbing";
      }
    }, { passive: false });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      isDragging = false;
      canvas.style.cursor = "grab";

      if (e.touches.length === 0) {
        // If no drag (tap), check if tapped a point for focus
        const touch = e.changedTouches[0];
        const pos = getTouchPos(canvas, touch);
        const clickedPoint = findClosestPoint(pos.x, pos.y);

        if (clickedPoint) {
          if (focusPoint === clickedPoint) {
            // Tapping same point again resets focus
            focusPoint = null;
          } else {
            focusPoint = clickedPoint;
            // Calculate target rotation angles to center clicked point
            focusAngleX = Math.PI / 2 - focusPoint.lat;
            focusAngleY = -focusPoint.lon + Math.PI / 2;
            focusZoom = 1.8;
          }
        } else {
          // Tap outside any point resets focus
          focusPoint = null;
        }
      }
    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        const pos = getTouchPos(canvas, touch);
        angleY += (pos.x - lastX) * 0.005;
        angleX += (pos.y - lastY) * 0.005;
        lastX = pos.x;
        lastY = pos.y;
        // When dragging, cancel focus to let user control freely
        focusPoint = null;
      }
    }, { passive: false });

    // Drag controls
    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.style.cursor = "grabbing";
    });
    canvas.addEventListener("mouseup", (e) => {
      isDragging = false;
      canvas.style.cursor = "grab";

      // If no drag (click), check if clicked a point for focus
      if (Math.abs(e.clientX - lastX) < 5 && Math.abs(e.clientY - lastY) < 5) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const clickedPoint = findClosestPoint(mouseX, mouseY);

        if (clickedPoint) {
          if (focusPoint === clickedPoint) {
            // Clicking same point again resets focus
            focusPoint = null;
          } else {
            focusPoint = clickedPoint;
            // Calculate target rotation angles to center clicked point
            focusAngleX = Math.PI / 2 - focusPoint.lat;
            focusAngleY = -focusPoint.lon + Math.PI / 2;
            focusZoom = 1.8;
          }
        } else {
          // Click outside any point resets focus
          focusPoint = null;
        }
      }
    });
    canvas.addEventListener("mouseleave", () => {
      isDragging = false;
      canvas.style.cursor = "grab";
    });
    canvas.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        angleY += (mouseX - lastX) * 0.005;
        angleX += (mouseY - lastY) * 0.005;
        lastX = mouseX;
        lastY = mouseY;
        // When dragging, cancel focus to let user control freely
        focusPoint = null;
      }
    });

    // Zoom control with mouse wheel and pinch zoom
    let initialDistance = null;
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      zoom += -e.deltaY * 0.0015;
      zoom = Math.min(Math.max(zoom, zoomMin), zoomMax);

      // Cancel focus on zoom
      focusPoint = null;
    }, { passive: false });

    // Handle pinch zoom on touch devices
    canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (initialDistance === null) {
          initialDistance = currentDistance;
        } else {
          const scale = currentDistance / initialDistance;
          zoom *= scale;
          zoom = Math.min(Math.max(zoom, zoomMin), zoomMax);
          initialDistance = currentDistance;
        }
        
        // Cancel focus on zoom
        focusPoint = null;
      }
    }, { passive: false });

    canvas.addEventListener("touchend", () => {
      initialDistance = null;
    });

    // Variable rotation speeds setup
    const rotationBaseSpeedY = 0.004;
    const rotationSpeedAmplitudeY = 0.004;
    const rotationFrequencyY = 0.0015;

    const rotationBaseSpeedX = 0.003;
    const rotationSpeedAmplitudeX = 0.0035;
    const rotationFrequencyX = 0.0012;

    // Colors
    const normalColor = "#00ffff";
    const correctColor = "#00ff00"; // green
    const wrongColor = "#ff3300"; // red

    // Current glow color for smooth interpolation
    let glowColor = normalColor;

    // Function to interpolate colors (hex)
    function lerpColor(a, b, t) {
      const c1 = hexToRgb(a);
      const c2 = hexToRgb(b);
      const r = Math.round(c1.r + (c2.r - c1.r) * t);
      const g = Math.round(c1.g + (c2.g - c1.g) * t);
      const b_ = Math.round(c1.b + (c2.b - c1.b) * t);
      return `rgb(${r},${g},${b_})`;
    }

    function hexToRgb(hex) {
      hex = hex.replace(/^#/, "");
      if (hex.length === 3) {
        hex = hex.split("").map(c => c + c).join("");
      }
      const num = parseInt(hex, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    }

    // Animate glow color transitions and shaking
    let colorTransitionProgress = 1;

    // Shake offset for container
    let shakeOffsetX = 0;

    // Main animation loop
    function animate(t = 0) {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);

      // Handle status timer
      if (status !== "normal") {
        statusTimer -= 16.6;
        if (statusTimer <= 0) {
          statusTimer = 0;
          if (status === "correct") {
            if (!disappearing) {
              startDisappearing();
              disappearing = true;
            }
          } else {
            status = "normal";
            colorTransitionProgress = 0;
            shakeIntensity = 0;
            canvas.classList.remove("correct-glow", "wrong-glow");
            input.classList.remove("correct", "wrong");
          }
        }
      }

      // Update color transition progress
      if (colorTransitionProgress < 1) {
        colorTransitionProgress += 0.03;
        if (colorTransitionProgress > 1) colorTransitionProgress = 1;
      }

      // Determine target glow color based on status
      let targetColor = normalColor;
      if (status === "correct") {
        targetColor = correctColor;
        canvas.classList.add("correct-glow");
        canvas.classList.remove("wrong-glow");
        input.classList.add("correct");
        input.classList.remove("wrong");
      } else if (status === "wrong") {
        targetColor = wrongColor;
        canvas.classList.add("wrong-glow");
        canvas.classList.remove("correct-glow");
        input.classList.add("wrong");
        input.classList.remove("correct");
      } else {
        canvas.classList.remove("correct-glow", "wrong-glow");
        input.classList.remove("correct", "wrong");
      }

      // Smoothly interpolate glow color
      glowColor = lerpColor(glowColor, targetColor, colorTransitionProgress);
      
      // Update CSS variables for breathing effect (only in normal state)
      if (status === "normal") {
        const rgb = glowColor.match(/\d+/g);
        canvas.style.setProperty('--glow-color', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.55)`);
        canvas.style.setProperty('--glow-highlight', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`);
      }

      // Shake effect (for wrong password)
      if (status === "wrong" && shakeIntensity > 0) {
        shakeOffsetX = (Math.sin(t * 0.1 * 60) * shakeIntensity * 8);
        shakeIntensity *= 0.9; // decay shake over time
        if (shakeIntensity < 0.01) {
          shakeIntensity = 0;
          shakeOffsetX = 0;
        }
      } else {
        shakeOffsetX = 0;
      }

      container.style.transform = `translateX(${shakeOffsetX}px)`;

      // When unlocked, center the globe and keep it spinning fast in green
      if (unlocked && !disappearing) {
        // Hide input field
        input.classList.add('unlocked');
        
        // Center the globe
        container.classList.add('centered');
        
        // Smoothly interpolate rotation and zoom towards center
        angleX = lerpAngle(angleX, Math.PI/2, 0.05);
        angleY = lerpAngle(angleY, 0, 0.05);
        zoom = lerp(zoom, 1.5, 0.05);
        
        // Fast spinning
        angleY += 0.05;
      } 
      // Smoothly interpolate rotation and zoom towards focus target if any
      else if (focusPoint && !disappearing) {
        angleX = lerpAngle(angleX, focusAngleX, focusEase);
        angleY = lerpAngle(angleY, focusAngleY, focusEase);
        zoom += (focusZoom - zoom) * focusEase;
      } else if (!disappearing) {
        // Variable speed rotation when no focus & no drag
        if (!isDragging) {
          let baseSpeedY = rotationBaseSpeedY;
          let baseSpeedX = rotationBaseSpeedX;

          // If correct password, rotate fast for 3 seconds
          if (status === "correct" && statusTimer > 0) {
            baseSpeedY = 0.1;
            baseSpeedX = 0.05;
          }

          let variableSpeedY =
            baseSpeedY +
            rotationSpeedAmplitudeY * Math.sin(t * rotationFrequencyY);

          let variableSpeedX =
            baseSpeedX +
            rotationSpeedAmplitudeX * Math.cos(t * rotationFrequencyX);

          angleY += variableSpeedY;
          angleX += variableSpeedX;
        }

        // Slowly return zoom to normal if no focus
        zoom += (1 - zoom) * 0.02;
      }

      const radius = baseRadius;

      // Draw trails
      for (let [a, b, speed] of trails) {
        let pa = sphericalToCartesian(a.lat, a.lon, radius, a.offset);
        let pb = sphericalToCartesian(b.lat, b.lon, radius, b.offset);

        let ra = rotate3D(pa, angleX, angleY);
        let rb = rotate3D(pb, angleX, angleY);

        let projA = project(ra);
        let projB = project(rb);

        let alpha = 0.2 + 0.8 * Math.min(projA.scale, projB.scale);
        ctx.beginPath();
        ctx.moveTo(projA.x, projA.y);
        ctx.lineTo(projB.x, projB.y);
        ctx.strokeStyle = `rgba(${glowColorToRGB(glowColor)},${alpha * 0.3})`;
        ctx.lineWidth = 0.6;
        ctx.shadowBlur = 10;
        ctx.shadowColor = glowColor;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw points
      for (let point of points) {
        point.pulsePhase += 0.04;
        let pulse = 1 + 0.06 * Math.sin(point.pulsePhase);
        let offset = point.offset;

        let pos3D = sphericalToCartesian(point.lat, point.lon, radius, offset);
        let rotated = rotate3D(pos3D, angleX, angleY);
        let proj = project(rotated);

        let size = 1.5 * proj.scale + 1 * Math.sin(point.pulsePhase);
        let alpha = Math.max(0, Math.min(1, proj.scale));

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${glowColorToRGB(glowColor)},${alpha})`;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8 * proj.scale;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Start the disappearing sequence
    function startDisappearing() {
      // Position the globe in the center of the screen
      const rect = container.getBoundingClientRect();
      container.style.position = 'fixed';
      container.style.top = '50%';
      container.style.left = '50%';
      container.style.transform = 'translate(-50%, -50%)';
      container.style.margin = '0';
      
      // Add disappearing class for smooth animation
      container.classList.add('disappearing');
      
      // After globe disappears, show access granted
      setTimeout(() => {
        showAccessGranted();
      }, 800);

      
    }

    // Show access granted message with particles
    function showAccessGranted() {
      accessGranted.classList.add('fade-in');
      createParticles();
      
      // After showing access granted for 3 seconds, fade it out
      setTimeout(() => {
        accessGranted.classList.remove('fade-in');
        accessGranted.classList.add('fade-out');
        
        // After fade out completes, you could redirect or do something else
        setTimeout(() => {
          document.getElementById("the-tables").style.display='block';
        }, 1000);
        document.getElementById('container').remove();
        document.getElementById('passwordInput').remove();
        document.getElementById('devModeIntro').remove();
        document.getElementById('accessGranted').remove();
        const link = document.querySelector('link[href="../styles/login_styles.css"]');
          if (link) {
            link.href = "../styles/table_styles.css"; 
          }
      }, 3000);
    }


    // Create animated particles
    function createParticles() {
      const particleCount = 100;
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position in center 50% of screen
        const x = 25 + Math.random() * 50;
        const y = 25 + Math.random() * 50;
        
        // Random movement direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 10 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        // Random delay and duration
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 2;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
      }
    }

    // Simple linear interpolation
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    // Convert rgb string rgb(r,g,b) to r,g,b
    function glowColorToRGB(glow) {
      // glow is rgb(r,g,b)
      let result = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(glow);
      if (!result) return "0,255,255";
      return `${result[1]},${result[2]},${result[3]}`;
    }

    animate();

    // Handle password input
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value.trim();
        
        // Check against pre-loaded passwords
        if (allPasswords.includes(val)) {
          // Correct password
          status = "correct";
          statusTimer = 2000; // 3 seconds
          colorTransitionProgress = 0;
          shakeIntensity = 0;
          unlocked = true;
        } else {
          // Wrong password
          status = "wrong";
          statusTimer = 3000;
          colorTransitionProgress = 0;
          shakeIntensity = 9;
        }

        input.value = "";
      }
    });