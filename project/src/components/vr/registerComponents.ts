import 'aframe';

// Register custom A-Frame components
AFRAME.registerComponent('artwork-interaction', {
  schema: {
    title: { type: 'string', default: '' },
    description: { type: 'string', default: '' },
    audioSrc: { type: 'string', default: '' }
  },

  init: function() {
    const el = this.el;
    const data = this.data;
    let audio: HTMLAudioElement | null = null;
    
    if (data.audioSrc) {
      audio = new Audio(data.audioSrc);
    }
    
    // Create tooltip entity for showing info on hover
    const tooltip = document.createElement('a-entity');
    tooltip.setAttribute('visible', 'false');
    tooltip.setAttribute('position', '0 1.5 0');
    tooltip.setAttribute('text', {
      value: `${data.title}\n${data.description}`,
      align: 'center',
      width: 2,
      color: 'white'
    });
    tooltip.setAttribute('geometry', {
      primitive: 'plane',
      width: 2.2,
      height: 'auto'
    });
    tooltip.setAttribute('material', {
      color: '#000',
      opacity: 0.7
    });
    el.appendChild(tooltip);
    
    // Event listeners
    el.addEventListener('mouseenter', () => {
      tooltip.setAttribute('visible', 'true');
      el.setAttribute('scale', '1.05 1.05 1.05');
    });
    
    el.addEventListener('mouseleave', () => {
      tooltip.setAttribute('visible', 'false');
      el.setAttribute('scale', '1 1 1');
    });
    
    el.addEventListener('click', () => {
      if (audio) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }
      
      // Animation on click
      const currentScale = el.getAttribute('scale');
      const animation = document.createElement('a-animation');
      animation.setAttribute('attribute', 'scale');
      animation.setAttribute('from', `${currentScale.x} ${currentScale.y} ${currentScale.z}`);
      animation.setAttribute('to', '1.1 1.1 1.1');
      animation.setAttribute('direction', 'alternate');
      animation.setAttribute('dur', '300');
      animation.setAttribute('repeat', '1');
      el.appendChild(animation);
    });
  }
});

// Ambient particles component for atmosphere
AFRAME.registerComponent('ambient-particles', {
  schema: {
    count: { type: 'number', default: 100 },
    color: { type: 'color', default: '#ffffff' },
    size: { type: 'number', default: 0.05 }
  },

  init: function() {
    const data = this.data;
    const scene = this.el.sceneEl;
    
    if (!scene) return;
    
    for (let i = 0; i < data.count; i++) {
      const particle = document.createElement('a-entity');
      
      // Random position within a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 5 + Math.random() * 15;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      particle.setAttribute('geometry', {
        primitive: 'sphere',
        radius: data.size * (0.5 + Math.random() * 0.5)
      });
      
      particle.setAttribute('material', {
        color: data.color,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.5,
        shader: 'flat'
      });
      
      particle.setAttribute('position', { x, y, z });
      
      // Add floating animation
      const animDuration = 5000 + Math.random() * 5000;
      const animationY = document.createElement('a-animation');
      animationY.setAttribute('attribute', 'position');
      animationY.setAttribute('from', `${x} ${y} ${z}`);
      animationY.setAttribute('to', `${x} ${y + (Math.random() * 0.5)} ${z}`);
      animationY.setAttribute('direction', 'alternate');
      animationY.setAttribute('dur', animDuration);
      animationY.setAttribute('easing', 'easeInOutSine');
      animationY.setAttribute('repeat', 'indefinite');
      
      particle.appendChild(animationY);
      this.el.appendChild(particle);
    }
  }
});

// Custom component for gallery layout generation
AFRAME.registerComponent('gallery-layout', {
  schema: {
    layout: { type: 'string', default: 'circular' },
    count: { type: 'number', default: 0 },
    radius: { type: 'number', default: 5 },
    spacing: { type: 'number', default: 2 },
    height: { type: 'number', default: 1.6 }
  },

  init: function() {
    this.generateLayout();
  },

  update: function() {
    this.generateLayout();
  },
  
  validateNumber: function(value: number, defaultValue: number = 0): number {
    return isNaN(value) || !isFinite(value) ? defaultValue : value;
  },
  
  generateLayout: function() {
    const data = this.data;
    const el = this.el;
    
    // Validate inputs
    const count = Math.max(0, Math.floor(this.validateNumber(data.count, 0)));
    const radius = this.validateNumber(data.radius, 5);
    const spacing = this.validateNumber(data.spacing, 2);
    const height = this.validateNumber(data.height, 1.6);
    
    // Clear existing layout
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    
    if (count === 0) return; // Don't generate layout if there are no items
    
    // Generate positions based on layout type
    const positions = [];
    
    if (data.layout === 'circular') {
      // Circular layout
      const angleStep = (2 * Math.PI) / count;
      
      for (let i = 0; i < count; i++) {
        const angle = i * angleStep;
        const x = this.validateNumber(radius * Math.cos(angle));
        const z = this.validateNumber(radius * Math.sin(angle));
        
        positions.push({
          position: { x, y: height, z },
          rotation: { x: 0, y: this.validateNumber(angle * (180 / Math.PI) + 90), z: 0 }
        });
      }
    } else if (data.layout === 'corridor') {
      // Corridor layout
      const halfCount = Math.ceil(count / 2);
      const length = halfCount * spacing;
      
      for (let i = 0; i < halfCount; i++) {
        // Left wall
        const xLeft = -radius;
        const zLeft = this.validateNumber(-length / 2 + i * spacing);
        positions.push({
          position: { x: xLeft, y: height, z: zLeft },
          rotation: { x: 0, y: 90, z: 0 }
        });
        
        // Right wall (if we have enough items)
        if (i + halfCount < count) {
          const xRight = radius;
          const zRight = this.validateNumber(-length / 2 + i * spacing);
          positions.push({
            position: { x: xRight, y: height, z: zRight },
            rotation: { x: 0, y: -90, z: 0 }
          });
        }
      }
    } else if (data.layout === 'grid') {
      // Grid layout (one wall)
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          if (index < count) {
            const x = this.validateNumber((col - (cols - 1) / 2) * spacing);
            const y = this.validateNumber(height + (rows - 1 - row) * spacing);
            
            positions.push({
              position: { x, y, z: -radius },
              rotation: { x: 0, y: 0, z: 0 }
            });
          }
        }
      }
    }
    
    // Create placeholder elements for each position
    positions.forEach((pos, index) => {
      const placeholder = document.createElement('a-entity');
      placeholder.setAttribute('position', pos.position);
      placeholder.setAttribute('rotation', pos.rotation);
      placeholder.setAttribute('class', 'artwork-placeholder');
      placeholder.setAttribute('data-index', index.toString());
      
      // Add a visual indicator for debugging
      const debug = document.createElement('a-box');
      debug.setAttribute('width', 1);
      debug.setAttribute('height', 1);
      debug.setAttribute('depth', 0.1);
      debug.setAttribute('color', '#333');
      debug.setAttribute('opacity', 0.2);
      placeholder.appendChild(debug);
      
      el.appendChild(placeholder);
    });
  }
});

export default {};