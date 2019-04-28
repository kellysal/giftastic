// Initial array of food	
$(document).ready(function () {

    var topics = ["Cheeseburger", "Ice Cream", "Bacon", "Popcorn", "Donuts", "Chocolate", "Hot Dog", "Pizza", "Chips", "Salad", "Pasta", "Steak", "Popsicle"];

    //  Create topic array buttons
    function renderButtons() {
        $('#buttons-view').empty();

        for (var i = 0; i < topics.length; i++) {
            // Create all buttons
            var a = $('<button>');
            a.addClass('food');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
        }
    }
    renderButtons();

    // On click function
    $(document).on('click', '.food', function () {

        // New variable logs text data from each button
        // Add the gif API
        var foodGif = $(this).html();
        console.log(foodGif);

        var queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=HUUWR1Z3ypdQ26l2JdfOoMPoV8zPaGeY&q=${foodGif}&limit=10&offset=0&rating=G&lang=en`;
        console.log(queryUrl);

        // AJAX call for the button being clicked
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function (response) {

            var results = response.data;
            console.log(results);
            // Clear div before adding next results
            $('#food-view').empty();
            for (var i = 0; i < results.length; i++) {
                var imageDiv = $('<div>');
                var imageView = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                console.log(imageView);

                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                gifImage.attr('data-state', 'still');
                $('#food-view').prepend(gifImage);
                gifImage.on('click', playGif);

                // Pull ratings for each movie from database
                // Display with gif
                var rating = results[i].rating;
                console.log(rating);
                var displayRated = $('<p>').text("Rating: " + rating);
                $('#food-view').prepend(displayRated);
            }

        });

        // Still and Animate gif function
        function playGif() {
            var state = $(this).attr('data-state');
            console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        }

    });

    // Add new button to the array
    $(document).on('click', '#add-food', function () {
        if ($('#food-input').val().trim() == '') {
            alert('Input can not be left blank');
        }
        else {
            var food = $('#food-input').val().trim();
            topics.push(food);
            $('#food-input').val('');
            renderButtons();
            return false;

        }

    });


});