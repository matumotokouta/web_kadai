const hamburger = document.getElementById('hamburger');
const navi = document.getElementById('navi');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navi.classList.toggle('active');
});