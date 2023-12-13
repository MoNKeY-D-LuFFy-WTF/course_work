const teamCardContent = document.querySelectorAll('.team-card-content');
function listnerItemCard(arrCard) {
    for (let i = 0; i < arrCard.length; i++) {
        if (arrCard[i].getBoundingClientRect().top <= 250) {
            arrCard[i].classList.add('active')
        }
    }
}
window.addEventListener('scroll', () => {
    listnerItemCard(teamCardContent);
})