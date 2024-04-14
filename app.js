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



$("#rating_slider").slider({
    min: 0,
    max: 300,
    value: 1,
    range: "min",
    slide: function (event, ui) {
        updateInputFromSlider("#rating_input", $(this).slider("value"));
    },
    range: "min",
    change: function (event, ui) {
        updateInputFromSlider("#rating_input", $(this).slider("value"));
    },
    create: function(event, ui) {
        const rangeColor = "linear-gradient(180deg, #FFD100 0%, #997D00 100%)";
        $(this).find(".ui-slider-range").css("background-image", rangeColor);
    }
});

function updateInputFromSlider(input_id, value) {
  $(input_id).val(value);
}

$(document).ready(function () {
  $("#rating_input").change(function () {
    $("#rating_slider").slider("value", $(this).val());
    $("#rating_slider").prop("value", $(this).val());
  });
});

function calculateValue() {
    const rating = parseInt($("#rating_input").val());
    let equipmentValue = 0;

    $(".tanks-equipment-container input").each(function() {
        const equipmentType = $(this).is(":checked") ? $(this).val() : null;

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

    $("#rating_input").on("click touchstart", function() {
        $(this).focus();
    });



    const totalValue = (rating * 3 + equipmentValue).toFixed(0);

    if ($(window).width() <= 576) {
        $("#experience-quantity-mobile").text(totalValue);
        animateNumber("#experience-quantity-mobile", totalValue);
    } else {
        $("#experience-quantity").text(totalValue);
        animateNumber("#experience-quantity", totalValue);
    }
}

function animateNumber(element, number){
    $(element).prop('counter',0).animate({
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
    calculateValue();

    $("input[type=radio]").on("touchstart click", function() {
       calculateValue();
    });

    $("#rating_input").on("input", function() {
        calculateValue();
    });

    $("#rating_slider").on("slide touchstart", function(event, ui) {
        calculateValue();
    });
});
