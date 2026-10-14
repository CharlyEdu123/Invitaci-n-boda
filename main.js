document.querySelectorAll('.carousel-container').forEach((container, carouselIndex) => {
    const images = container.querySelectorAll('.carousel-img');
    const interval = parseInt(container.getAttribute('data-interval')) || 6000;
    const staggerDelay = carouselIndex * 1000;
    let currentIndex = 0;

    if (images.length > 1) {
      const changeImage = () => {
        images[currentIndex].classList.remove('opacity-100', 'active');
        images[currentIndex].classList.add('opacity-0');

        currentIndex = (currentIndex + 1) % images.length;

        images[currentIndex].classList.remove('opacity-0');
        images[currentIndex].classList.add('opacity-100', 'active');
      };

      setTimeout(() => {
        changeImage();
        setInterval(changeImage, interval);
      }, interval + staggerDelay);
    }
});