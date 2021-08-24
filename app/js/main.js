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

$('.product-one__tabs .tab, .settings__tabs .tabs').on('click', function (event) {
    var id = $(this).attr('data-id');
    $('.product-one__tabs, .settings__tabs').find('.tab-item').removeClass('active-tab').hide();
    $('.product-one__tabs .tabs, .settings__tabs .tabs').find('.tab').removeClass('active');
    $(this).addClass('active');
    $('#' + id).addClass('active-tab').fadeIn();
    return false;
});

$(function() {

	$('input[type="file"], select').styler();

});

