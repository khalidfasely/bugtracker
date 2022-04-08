const navSlide = () => {
    const burger = document.querySelector('.burger');
    const sideBar = document.querySelector('.side-bar');

    burger.addEventListener('click', () => {
        sideBar.classList.toggle('open');
    });    
};

export default navSlide;