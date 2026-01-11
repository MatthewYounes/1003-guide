document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
});

function toggleSection(element) {
    const content = element.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function toggleComplete(event, id) {
    event.stopPropagation();
    const card = document.getElementById(id);
    const isComplete = card.classList.toggle('completed');
    
    const checkIcon = card.querySelector('.check-icon');
    checkIcon.innerHTML = isComplete ? '✓' : '';

    saveProgress();
    updateProgressBar();
}

function saveProgress() {
    const completedIds = [];
    document.querySelectorAll('.section-card.completed').forEach(card => {
        completedIds.push(card.id);
    });
    localStorage.setItem('mortgageProgress', JSON.stringify(completedIds));
}

function loadProgress() {
    const saved = JSON.parse(localStorage.getItem('mortgageProgress'));
    if (saved) {
        saved.forEach(id => {
            const card = document.getElementById(id);
            if (card) {
                card.classList.add('completed');
                card.querySelector('.check-icon').innerHTML = '✓';
            }
        });
    }
    updateProgressBar();
}

function updateProgressBar() {
    const total = document.querySelectorAll('.section-card').length;
    const completed = document.querySelectorAll('.section-card.completed').length;
    const percent = Math.round((completed / total) * 100);
    
    document.querySelector('.progress-fill').style.width = percent + '%';
    document.querySelector('#progress-text').innerText = percent + '% Done';
}