$(document).ready(function() {
    var element = $('.tanks-tile');
    for(var i = 0; i < 5; i++) {
        var clone = element.clone();
        $('.tanks-container').append(clone);
    }
});