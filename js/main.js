// js/main.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initHeroAnimation();
    initHeroParticles();
    initServiceCards();
    initServiceModals();
    initTimeline();
    //initPortfolioFilters();
    initBlogParallax();
    initScrollAnimations();
    initTestimonialCarousel();
    initParticles();
    initMobileMenu();
    initContactForm();
    initTeamPortraits();
});

// 1. Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// 2. Hero 3D Animation with Three.js
// ... existing code ...

// 2. Hero 3D Animation with Three.js
// ... existing code ...

// 2. Hero 3D Animation with Three.js
// ... existing code ...

// 2. Hero 3D Animation with Three.js
// ... existing code ...

// 2. Hero 3D Animation with Three.js
// ... existing code ...

// 2. Hero 3D Animation with Three.js - Version simplifiée pour débogage
function initHeroAnimation() {
    console.log("Initialisation de l'animation hero...");
    const container = document.getElementById('hero-3d-animation');
    
    if (!container) {
        console.error("Container hero-3d-animation non trouvé!");
        return;
    }
    
    if (typeof THREE === 'undefined') {
        console.error("Three.js n'est pas chargé!");
        return;
    }
    
    console.log("Three.js est chargé, création de la scène...");
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Lumière simple
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    
    // Cube simple pour tester
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x53ebe3 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    camera.position.z = 5;
    
    // Animation simple
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    
    animate();
    console.log("Animation démarrée!");
}

// ... existing code ...

// ... existing code ...

// ... existing code ...

// Suppression de l'appel avec paramètre
// ... existing code ...

// ... existing code ...

// 3. Service Cards 3D Effects
function initServiceCards() {
    document.querySelectorAll('.service-card [data-tilt]').forEach(card => {
        VanillaTilt.init(card, { max: 5, speed: 400, glare: true, "max-glare": 0.2, scale: 1.02 });
    });
    document.querySelectorAll('.icon-container').forEach(el => create3DIcon(el.id));
}

function create3DIcon(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(80, 80);
    container.appendChild(renderer.domElement);

    // Choose geometry by ID
    let geometry;
    if (containerId.includes('surveillance')) {
        geometry = new THREE.ConeGeometry(1, 1.5, 4);
    } else if (containerId.includes('energy')) {
        geometry = new THREE.TorusGeometry(0.8, 0.2, 16, 32);
    } else {
        geometry = new THREE.SphereGeometry(0.8, 16, 16);
    }
    const material = new THREE.MeshPhongMaterial({ color: 0xfd7e14, specular: 0x111111, shininess: 30 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(1, 1, 1);
    scene.add(light);

    camera.position.z = 3;
    (function animateIcon() {
        requestAnimationFrame(animateIcon);
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    })();
}

// 4. Timeline Animations
function initTimeline() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.timeline-item').forEach(item => {
        ScrollTrigger.create({ trigger: item, start: 'top 80%', onEnter: () => item.classList.add('visible') });
    });
}



// 6. Blog Parallax
function initBlogParallax() {
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(500px) rotateY(${x * 10}deg) rotateX(${y * 10}deg)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });
}

// 7. Scroll Animations with GSAP
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('section').forEach(sec => {
        gsap.from(sec, { scrollTrigger: { trigger: sec, start: 'top 85%', toggleActions: 'play none none none' }, opacity: 0, y: 50, duration: 1 });
    });
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.3 });
    gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.6 });
    gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 1, delay: 0.9 });
}

// 8. Testimonial Carousel
function initTestimonialCarousel() {
    const carouselElem = document.getElementById('testimonialCarousel');
    if (!carouselElem) return;
    const carousel = new bootstrap.Carousel(carouselElem, { interval: 5000, pause: 'hover' });
    carouselElem.addEventListener('slide.bs.carousel', () => {
        const active = carouselElem.querySelector('.carousel-item.active .testimonial-card');
        if (active) VanillaTilt.init(active, { max: 5, speed: 400, glare: true, 'max-glare': 0.2 });
    });
}

// 9. Footer Particles
/*function initParticles() {
    const container = document.getElementById('footer-particles');
    if (!container) return;
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 50;
    function resize() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    for (let i=0; i < count; i++) {
        particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*2+1, vx: Math.random()*0.5-0.25, vy: Math.random()*0.5-0.25 });
    }
    (function animateParticles() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    })();
}*/

// 10. Mobile Menu 3D Animation
function initMobileMenu() {
    if (typeof bootstrap === 'undefined' || typeof gsap === 'undefined') return;
  
    const toggler = document.querySelector('.navbar-toggler');
    const collapseEl = document.getElementById('navbarNav');
    // Crée une instance de contrôle Bootstrap
    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
  
    toggler.addEventListener('click', () => {
      if (collapseEl.classList.contains('show')) {
        // ferme avec animation GSAP, puis bascule Bootstrap
        gsap.to(collapseEl, {
          height: 0,
          duration: 0.3,
          onComplete: () => bsCollapse.hide()
        });
      } else {
        // prépare l’élément caché à sa hauteur auto
        collapseEl.style.height = 'auto';
        const fullHeight = collapseEl.clientHeight + 'px';
        collapseEl.style.height = '0px';
        bsCollapse.show(); // ajoute .show
        // anime vers sa hauteur naturelle
        gsap.fromTo(collapseEl, { height: 0 }, { height: fullHeight, duration: 0.3 });
      }
    });
  }

// 11. Contact Form Multi-Step
// 11. Contact Form Multi-Step
/*function initContactForm() {
    const container = document.getElementById('contact-form');
    const steps = Array.from(container.querySelectorAll('.form-step'));
    const progressBar = container.querySelector('.progress-bar');
    const indicator   = document.getElementById('step-indicator');
    let current = 0;
  
    function showStep(idx) {
      steps.forEach((f, i) => {
        f.style.display = i === idx ? 'block' : 'none';
      });
      // update barre + indicateur
      const pct = ((idx+1)/steps.length)*100;
      progressBar.style.width = pct + '%';
      indicator.textContent = `Étape ${idx+1} sur ${steps.length}`;
      // recentre si besoin
      container.scrollIntoView({ behavior: 'smooth' });
    }
  
    showStep(0);
  
    container.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      e.preventDefault();
      const action = btn.dataset.action;
      const form   = steps[current];
  
      // ne passe next que si le formulaire est valide
      if (action === 'next' && !form.reportValidity()) return;
  
      // gestion conditionnelle étape 3 (mobile)
      if (action==='next' && current===1) {
        const svc = document.getElementById('cf-service').value;
        if (svc !== 'mobile') {
          current += 2;
          showStep(current);
          return;
        }
      }
  
      // préparation du résumé à l’avant-dernière étape
      if (action==='next' && current+1 === steps.length-1) {
        const summary = document.getElementById('cf-summary');
        summary.innerHTML = `
          <h5>Récapitulatif de votre demande</h5>
          <ul class="list-unstyled">
            <li><strong>Nom :</strong> ${document.getElementById('cf-name').value}</li>
            <li><strong>Email :</strong> ${document.getElementById('cf-email').value}</li>
            <li><strong>Service :</strong> ${document.getElementById('cf-service').selectedOptions[0].text}</li>
            <li><strong>Description :</strong> ${document.getElementById('cf-desc').value}</li>
            <li><strong>Page source :</strong> ${window.location.href}</li>
          </ul>`;
      }
  
      current += (action==='next'? 1 : -1);
      showStep(current);
    });
  }*/
  
  

// 12. Team Portraits 3D
function initTeamPortraits() {
    document.querySelectorAll('.team-portrait').forEach(container => {
        if (typeof THREE === 'undefined') return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth/ container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(1,1,1);
        scene.add(light);
        // Placeholder sphere as portrait
        const geo = new THREE.SphereGeometry(1,32,32);
        const mat = new THREE.MeshPhongMaterial({ color: 0x007bff });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        camera.position.z = 3;
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        animate();
    });
}

// 12. Exemple d'importation de modèles GLTF
function loadGLTFModel(containerId, modelPath) {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(1,1,1);
    scene.add(dir);

    // GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, gltf => {
        const model = gltf.scene;
        model.scale.set(1.5,1.5,1.5);
        scene.add(model);
        camera.position.z = 5;
        // animate
        (function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.005;
            renderer.render(scene, camera);
        })();
    }, undefined, error => console.error('Erreur chargement GLTF', error));
}

// Appels pour modèles
loadGLTFModel('icon-analyseneeds', 'assets/models/analysis.glb');
loadGLTFModel('icon-mobileapp', 'assets/models/mobile.glb');
loadGLTFModel('portrait-founder', 'assets/models/founder.glb');
// etc.

// Filtrage
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? 'block' : 'none';
      });
    });
  });
  
  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('.lightbox-img');
  document.querySelectorAll('.view-btn').forEach(b => {
    b.addEventListener('click', e => {
      const src = e.currentTarget.dataset.src;
      lbImg.src = src;
      lightbox.style.display = 'flex';
    });
  });
  lightbox.querySelector('.close').addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });

  /* 5. Portfolio Filtering
function initPortfolioFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category;
            document.querySelectorAll('.masonry-item').forEach(item => {
                item.style.display = (cat === 'all' || item.dataset.category === cat) ? 'block' : 'none';
            });
        });
    });
}*/

// ... existing code ...

// Fonction pour activer les animations au défilement
function initFadeAnimations() {
  // Sélectionne tous les éléments avec les classes d'animation
  const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
  
  // Crée un observateur d'intersection
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          // Ajoute la classe 'visible' quand l'élément est visible
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Optionnel: arrête d'observer une fois animé
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1, // Déclenche quand 10% de l'élément est visible
      rootMargin: '0px 0px -50px 0px' // Déclenche un peu avant que l'élément soit visible
  });
  
  // Observe chaque élément
  fadeElements.forEach(element => {
      observer.observe(element);
  });
}

// Ajoutez cet appel à votre fonction d'initialisation principale
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  initFadeAnimations();
  // ... existing code ...
});

// Filtrage des articles du blog
function initBlogFilters() {
  const filterButtons = document.querySelectorAll('.blog-filters .btn');
  const blogItems = document.querySelectorAll('.blog-item');
  
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Retirer la classe active de tous les boutons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Ajouter la classe active au bouton cliqué
          button.classList.add('active');
          
          // Récupérer la catégorie à filtrer
          const filterValue = button.getAttribute('data-filter');
          
          // Filtrer les articles
          blogItems.forEach(item => {
              if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                  item.style.display = 'block';
                  // Animation d'apparition
                  gsap.from(item, {
                      opacity: 0,
                      y: 20,
                      duration: 0.5,
                      delay: Math.random() * 0.3
                  });
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });
}

// Ajouter l'appel à la fonction dans votre DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  initBlogFilters();
  // ... existing code ...
});


// ... existing code ...

// Initialisation des particules du hero
function initHeroParticles() {
  if (document.getElementById('hero-particles')) {
      particlesJS('hero-particles', {
          "particles": {
              "number": {
                  "value": 50,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#92c9c5"
              },
              "shape": {
                  "type": "circle",
                  "stroke": {
                      "width": 0,
                      "color": "#000000"
                  }
              },
              "opacity": {
                  "value": 0.3,
                  "random": true,
                  "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                  }
              },
              "size": {
                  "value": 3,
                  "random": true,
                  "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                  }
              },
              "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#92c9c5",
                  "opacity": 0.2,
                  "width": 1
              },
              "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "detect_on": "canvas",
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": "grab"
                  },
                  "onclick": {
                      "enable": true,
                      "mode": "push"
                  },
                  "resize": true
              },
              "modes": {
                  "grab": {
                      "distance": 140,
                      "line_linked": {
                          "opacity": 0.5
                      }
                  },
                  "push": {
                      "particles_nb": 4
                  }
              }
          },
          "retina_detect": true
      });
  }
}

// Animation des compteurs
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
      const target = parseInt(counter.innerText);
      counter.innerText = '0';
      
      const updateCounter = () => {
          const count = parseInt(counter.innerText);
          const increment = target / 20;
          
          if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCounter, 100);
          } else {
              counter.innerText = target;
          }
      };
      
      // Démarrer l'animation lorsque l'élément est visible
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  updateCounter();
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  initHeroParticles();
  initCounters();
  // ... existing code ...
});


// ... existing code ...

// Gestion des modales de services
function initServiceModals() {
    // Animation des éléments dans la modale
    const serviceModals = document.querySelectorAll('.modal');
    
    serviceModals.forEach(modal => {
        // Réinitialiser les animations lorsque la modale est fermée
        modal.addEventListener('hidden.bs.modal', function() {
            const animatedElements = modal.querySelectorAll('.service-modal-icon, h4, p, .service-features li, .service-modal-image, .service-modal-cta');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
            });
        });
        
        // Préparer les animations lorsque la modale s'ouvre
        modal.addEventListener('show.bs.modal', function() {
            const animatedElements = modal.querySelectorAll('.service-modal-icon, h4, p, .service-features li, .service-modal-image, .service-modal-cta');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
            });
        });
        
        // Gérer le bouton "Demander ce service"
        const serviceBtn = modal.querySelector('.service-modal-cta .btn');
        if (serviceBtn) {
            serviceBtn.addEventListener('click', function() {
                // Récupérer le titre du service
                const serviceTitle = modal.querySelector('.modal-title').textContent;
                
                // Faire défiler jusqu'au formulaire de contact
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pré-remplir le sujet du formulaire si possible
                    const subjectField = document.querySelector('#contact-form select[name="subject"]');
                    if (subjectField) {
                        // Trouver l'option qui correspond le mieux au service
                        Array.from(subjectField.options).forEach(option => {
                            if (serviceTitle.includes(option.text) || option.text.includes(serviceTitle)) {
                                subjectField.value = option.value;
                            }
                        });
                    }
                    
                    // Ajouter le service dans le message si possible
                    const messageField = document.querySelector('#contact-form textarea[name="message"]');
                    if (messageField) {
                        messageField.value = `Je souhaite en savoir plus sur votre service "${serviceTitle.trim()}".`;
                    }
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    initServiceModals();
    // ... existing code ...
});