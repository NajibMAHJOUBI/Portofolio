// ===== TUTORIEL.JS - Scripts spécifiques aux pages tutoriel =====

document.addEventListener('DOMContentLoaded', function() {
    initTocHighlighter();
    initCopyButtons();
    initProgressBar();
    initTutorialNavigation();
});

// Surlignage actif dans la table des matières
function initTocHighlighter() {
    const sections = document.querySelectorAll('.tutorial-section');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    if (!sections.length || !tocLinks.length) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// Boutons de copie pour les blocs de code
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('pre');
            
            if (code) {
                const textToCopy = code.innerText || code.textContent;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Feedback visuel
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copié!';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Erreur de copie:', err);
                    this.innerHTML = '<i class="fas fa-times"></i> Erreur';
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="far fa-copy"></i> Copier';
                    }, 2000);
                });
            }
        });
    });
}

// Barre de progression de lecture
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressFill) {
        window.addEventListener('scroll', function() {
            const winScroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            progressFill.style.width = scrolled + '%';
        });
    }
}

// Navigation entre tutoriels
function initTutorialNavigation() {
    // Marquer la progression des sections
    const sections = document.querySelectorAll('.tutorial-section');
    let currentSectionIndex = 0;
    
    if (sections.length) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + 120;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSectionIndex = index;
                }
            });
        });
    }
}

// Toggle pour afficher/masquer les solutions d'exercices
function toggleSolution(buttonId) {
    const solution = document.getElementById(buttonId + '-solution');
    const button = document.getElementById(buttonId);
    
    if (solution && button) {
        if (solution.style.display === 'none' || !solution.style.display) {
            solution.style.display = 'block';
            button.innerHTML = '<i class="fas fa-eye-slash"></i> Cacher la solution';
        } else {
            solution.style.display = 'none';
            button.innerHTML = '<i class="fas fa-eye"></i> Voir la solution';
        }
    }
}

// Marquer une section comme terminée
function markSectionCompleted(sectionId) {
    const section = document.getElementById(sectionId);
    const checkbox = document.getElementById('check-' + sectionId);
    
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        
        if (checkbox.checked) {
            section.classList.add('section-completed');
            localStorage.setItem('section-' + sectionId, 'completed');
        } else {
            section.classList.remove('section-completed');
            localStorage.removeItem('section-' + sectionId);
        }
    }
}

// Charger la progression sauvegardée
function loadProgress() {
    const sections = document.querySelectorAll('.tutorial-section');
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const status = localStorage.getItem('section-' + sectionId);
        const checkbox = document.getElementById('check-' + sectionId);
        
        if (status === 'completed' && checkbox) {
            checkbox.checked = true;
            section.classList.add('section-completed');
        }
    });
}

// Exporter les fonctions pour utilisation globale
window.toggleSolution = toggleSolution;
window.markSectionCompleted = markSectionCompleted;
window.loadProgress = loadProgress;