$(document).ready(function() {
    var element = $('.tanks-tile');
    for(var i = 0; i < 5; i++) {
        var clone = element.clone();
        $('.tanks-container').append(clone);
    }
});

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
        var rangeColor = "linear-gradient(180deg, #FFD100 0%, #997D00 100%)";
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