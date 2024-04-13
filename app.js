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
  slide: function (event, ui) {
    //When sliding the toggle
    updateInputFromSlider("#rating_input", $(this).slider("value"));
  },
  change: function (event, ui) {
    //After releasing the toggle
    updateInputFromSlider("#rating_input", $(this).slider("value"));
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