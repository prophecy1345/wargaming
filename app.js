$(document).ready(function() {
    const element = $('.tanks-tile');
    for(let i = 0; i < 5; i++) {
        const clone = element.clone();
        clone.attr('id', `tanks-tile-${i + 1}`);
        $('.tanks-container').append(clone);
    }
});

$(document).ready(function() {
    const popupElement = $('.tanks-popup');
    for(let i = 0; i < 6; i++) {
        const clone = popupElement.clone(true, true);
        clone.attr('id', `tanks-popup-${i}`);
        clone.find("#rating_input-0").attr("id", "rating_input-" + (i));
        clone.find("#rating_slider-0").attr("id", "rating_slider-" + (i));
        clone.find("#tanks-equipment-container-0").attr("id", "tanks-equipment-container-" + (i));
        clone.find("#experience-quantity-0").attr("id", "experience-quantity-" + (i));
        clone.find("#experience-quantity-mobile-0").attr("id", "experience-quantity-mobile-" + (i));
        $('.tanks-tile').eq(i).append(clone);
    }
    popupElement.hide();
});

function calculateValue(id) {
    const rating = parseInt($(`#rating_input-${id}`).val());
    let equipmentValue = 0;

    $(`#tanks-equipment-container-${id} input:checked`).each(function() {
        const equipmentType = $(this).val();

        if (equipmentType === "standart") {
            return;
        } else if (equipmentType === "elite") {
            equipmentValue = 0.1 * rating;
        } else if (equipmentType === "premium") {
            equipmentValue = 0.2 * rating;
        }
    });

    $(`#tanks-equipment-container-${id} input[type=radio]:checked`).prop("checked", true);

    $("input[type=radio]").on("touchstart click", function() {
        $(this).prop("checked", true);
    });

    $(`#rating_input-${id}`).on("click touchstart", function() {
        $(this).focus();
    });

    $(`#rating_slider-${id}`).on("touchstart", function(e) {
        $(this).focus();
    });

    const totalValue = rating * 3 + equipmentValue;

    if ($(window).width() <= 576) {
        $(`#experience-quantity-mobile-${id}`).text(totalValue);
    } else {
        $(`#experience-quantity-${id}`).text(totalValue);
    }
}

let currentTanksTileId = '';

$('.tanks-container').on('mouseenter touchstart', '.tanks-tile', function() {
    currentTanksTileId = $(this).attr('id').slice(-1);

    $(`#rating_slider-${currentTanksTileId}`).slider({
        min: 0,
        max: 300,
        value: $(`#rating_input-${currentTanksTileId}`).val(),
        range: "min",
        slide: function () {
            updateInputFromSlider(`#rating_input-${currentTanksTileId}`, $(this).slider("value"));
            $(`#rating_slider-${currentTanksTileId}`).slider('value', $(this).slider("value"));
        },
        create: function() {
            const rangeColor = "linear-gradient(180deg, #FFD100 0%, #997D00 100%)";
            $(this).find(".ui-slider-range").css("background-image", rangeColor);
        },
    });

    function updateInputFromSlider(input_id, value) {
        $(input_id).val(value);
    }

    $(document).ready(function () {
      $(`#rating_input-${currentTanksTileId}`).change(function () {
        $(`#rating_slider-${currentTanksTileId}`).slider("value", $(this).val());
        $(`#rating_slider-${currentTanksTileId}`).prop("value", $(this).val());
      });
    });

    $(document).ready(function() {
        calculateValue(`${currentTanksTileId}`);

        $(`input[type=radio], #rating_input-${currentTanksTileId}, #rating_slider-${currentTanksTileId}`).on("touchstart click input slide", function() {
            calculateValue(`${currentTanksTileId}`);
        });
    });
});
