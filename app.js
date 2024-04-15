$(document).ready(function() {
    const element = $('.tanks-tile');
    for(let i = 0; i < 5; i++) {
        const clone = element.clone();
        $('.tanks-container').append(clone);
    }
});

// $('.tanks-tile').each(function() {
//     const popup = $(".tanks-popup").clone(true, true);
//     $(this).append(popup);
// });



$("#rating_slider-1").slider({
    min: 0,
    max: 300,
    value: 1,
    range: "min",
    slide: function () {
        updateInputFromSlider("#rating_input-1", $(this).slider("value"));
        console.log($(this).slider("value"));
    },
    change: function () {
        console.log($(this).slider("value"));
        updateInputFromSlider("#rating_input-1", $(this).slider("value"));
    },
    create: function() {
        const rangeColor = "linear-gradient(180deg, #FFD100 0%, #997D00 100%)";
        $(this).find(".ui-slider-range").css("background-image", rangeColor);
    }
});

function updateInputFromSlider(input_id, value) {
    $(input_id).val(value);
}

$(document).ready(function () {
  $("#rating_input-1").change(function () {
    $("#rating_slider-1").slider("value", $(this).val());
    $("#rating_slider-1").prop("value", $(this).val());
  });
});

function calculateValue(id) {
    const rating = parseInt($(`#rating_input-${id}`).val());
    let equipmentValue = 0;

    $(`#tanks-equipment-container-${id} input:checked`).each(function() {
        const equipmentType = $(this).val();

        if (equipmentType === "standart") {
            equipmentValue = 0;
        } else if (equipmentType === "elite") {
            equipmentValue = 0.1 * rating;
        } else if (equipmentType === "premium") {
            equipmentValue = 0.2 * rating;
        }
    });

    $("input[type=radio]").on("touchstart click", function() {
        $(this).prop("checked", true);
    });

    $(`#rating_input-${id}`).on("click touchstart", function() {
        $(this).focus();
    });

    const totalValue = rating * 3 + equipmentValue;

    console.log('рейтинг', rating, 'eq', equipmentValue, 'total', totalValue)

    if ($(window).width() <= 576) {
        $(`#experience-quantity-mobile-${id}`).text(totalValue);
        animateNumber(`#experience-quantity-mobile-${id}`, totalValue);
    } else {
        $(`#experience-quantity-${id}`).text(totalValue);
        animateNumber(`#experience-quantity-${id}`, totalValue);
    }
}

function animateNumber(element, number){
    $(element).prop('counter', 0).animate({
        counter: number
    },
    {
      duration: 100,
      step: function(now){
          $(this).text(Math.ceil(now));
      }
    });
};


$(document).ready(function() {
    calculateValue(1);

    $("input[type=radio], #rating_input-1, #rating_slider-1").on("touchstart click input slide", function() {
        calculateValue(1);
    });
});
