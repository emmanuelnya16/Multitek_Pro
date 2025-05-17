// Script pour gérer l'écran de chargement
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer l'élément preloader
    const preloader = document.getElementById('preloader');
    
    // Fonction pour masquer le preloader
    function hidePreloader() {
        preloader.classList.add('hidden');
        // Supprimer complètement après la transition
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Vérifier si toutes les ressources sont chargées
    window.addEventListener('load', function() {
        // Ajouter un délai minimum pour que le loader soit visible au moins 1 seconde
        setTimeout(hidePreloader, 1000);
    });
    
    // Fallback au cas où l'événement load ne se déclenche pas correctement
    setTimeout(hidePreloader, 5000);
});