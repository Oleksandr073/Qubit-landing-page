import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export default (function () {

    new Swiper('.trust__slider', {
        modules: [ Navigation ],
        spaceBetween: 40,
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: '.trust__button--next',
            prevEl: '.trust__button--prev',
        },
    });
    
})();