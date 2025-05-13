// Gestion du portfolio et du lightbox
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const filterButtons = document.querySelectorAll('.btn-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.project-description');
    const lightboxClient = document.querySelector('.project-client');
    const lightboxTech = document.querySelector('.project-tech');
    const lightboxDate = document.querySelector('.project-date');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const viewButtons = document.querySelectorAll('.view-project');
    
    // Données des projets
    const projects = [
      {
        id: 1,
        title: "Réseau Social",
        category: "mobile",
        image: "assets/images/mobile.png",
        largeImage: "assets/portfolio/reseau.webp",
        description: "Application mobile d'un réseau social. Interface intuitive et fonctionnalités avancées de reporting.",
        client: "Entreprise XYZ",
        technologies: "Flutter, Firebase, REST API",
        date: "Janvier 2024"
      },
      {
        id: 2,
        title: "App de Réservation",
        category: "mobile",
        image: "assets/téléchargement.jpeg",
        largeImage: "assets/images/project2-large.jpg",
        description: "Application permettant aux utilisateurs de réserver des services à proximité. Intégration de la géolocalisation et des paiements en ligne.",
        client: "Startup ABC",
        technologies: "Flutter, Firebase, Google Maps API",
        date: "Mars 2024"
      },
      {
        id: 3,
        title: "Plateforme d'Emploi du Temps",
        category: "web",
        image: "assets/Emploi.png",
        largeImage: "assets/portfolio/Emploi.png",
        description: "Application web permettant la gestion et la visualisation des emplois du temps pour établissements scolaires. Système de notifications et interface responsive.",
        client: "École Supérieure",
        technologies: "Symfony, MySQL, JavaScript, HTML/CSS",
        date: "Février 2024"
      },
      {
        id: 4,
        title: "Site Web de prestation de service",
        category: "web",
        image: "assets/portfolio/appWeb.png",
        largeImage: "assets/portfolio/appWeb.png",
        description: "Site Web pour une entreprise de prestaton de service dans le domaine de l'informatique .",
        client: "MultiTek pro",
        technologies: "Symfony, MySQL, JavaScript, HTML/CSS",
        date: "Mai 2025"
      }
    ];
    
    let currentProjectIndex = 0;
    
    // Filtrage des projets
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');
        
        // Récupérer la catégorie à filtrer
        const filterValue = this.getAttribute('data-filter');
        
        // Filtrer les éléments
        portfolioItems.forEach(item => {
          item.classList.remove('visible');
          
          // Ajouter une petite temporisation pour l'animation
          setTimeout(() => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
              item.classList.remove('hidden');
              setTimeout(() => {
                item.classList.add('visible');
              }, 50);
            } else {
              item.classList.add('hidden');
            }
          }, 300);
        });
      });
    });
    
    // Ouvrir le lightbox
    viewButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        openLightbox(index);
      });
    });
    
    // Fermer le lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Navigation dans le lightbox
    lightboxPrev.addEventListener('click', showPrevProject);
    lightboxNext.addEventListener('click', showNextProject);
    
    // Gestion des touches clavier
    document.addEventListener('keydown', function(e) {
      if (!lightbox.style.display || lightbox.style.display === 'none') return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrevProject();
      } else if (e.key === 'ArrowRight') {
        showNextProject();
      }
    });
    
    // Fonctions
    function openLightbox(index) {
      currentProjectIndex = index;
      updateLightboxContent();
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    function showPrevProject() {
      currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
      updateLightboxContent();
    }
    
    function showNextProject() {
      currentProjectIndex = (currentProjectIndex + 1) % projects.length;
      updateLightboxContent();
    }
    
    function updateLightboxContent() {
      const project = projects[currentProjectIndex];
      
      // Animation de transition
      lightboxImage.style.opacity = 0;
      
      setTimeout(() => {
        lightboxTitle.textContent = project.title;
        lightboxImage.src = project.largeImage;
        lightboxDescription.textContent = project.description;
        lightboxClient.textContent = project.client;
        lightboxTech.textContent = project.technologies;
        lightboxDate.textContent = project.date;
        
        lightboxImage.style.opacity = 1;
      }, 300);
    }
    
    // Mettre à jour les compteurs de filtres
    updateFilterCounts();
    
    function updateFilterCounts() {
      // Compter les éléments par catégorie
      const counts = {
        all: portfolioItems.length,
        mobile: 0,
        web: 0,
        audio: 0
      };
      
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (counts[category] !== undefined) {
          counts[category]++;
        }
      });
      
      // Mettre à jour les compteurs dans les boutons
      filterButtons.forEach(button => {
        const category = button.getAttribute('data-filter');
        const countElement = button.querySelector('.filter-count');
        if (countElement && counts[category] !== undefined) {
          countElement.textContent = counts[category];
        }
      });
    }
  });