$(function () {
    $(".rate-star").rateYo({
        rating: 5,
        starWidth: "12px",
        readOnly: true,

    });

    $('.product-slider__inner').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
    });

    var mixer = mixitup('.products__inner-box');


});


$(function () {
    const burger__menu = document.querySelector('.burger__menu');
    burger__menu.addEventListener('click', () => {
        burger__menu.classList.toggle('burger__menu-active');
    })
});

$('.burger__menu').on('click', function () {
    $('.menu__list').slideToggle();
});

$('.user__icon-box').on('click', function () {
    $('.header__box').toggleClass('active');
});