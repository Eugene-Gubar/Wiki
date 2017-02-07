$( document ).ready(function() {
    // Begin code style search form
    $('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });
    
    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });
    

    $('form').submit(function(event) {
        event.preventDefault();
        return false;
    });
    // End code style search form


    // BEGIN API WIKI

    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pithumbsize=150&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var title = '';
    var callback = '&callback=JSON_CALLBACK';
    var url_page = 'https://en.wikipedia.org/?curid=';

    $('#btn-search').on('click', function() {

        title = $("#in-search").val();
        $("#content").empty();
        $('#search, #search button.close').click();

        $.ajax({
            url: api + title + callback,
            headers: { 'Api-User-Agent': 'Example/1.0' },
            type: 'POST',
            dataType: 'jsonp',
        })
        .done(function(msg) {
            $.each(msg.query.pages, function(index, el) {
                
                var url = url_page + el.pageid;
                var title = el.title;
                var desc = el.extract;
                var alt = title;

                if (el.hasOwnProperty('thumbnail')) {
                    var img = el.thumbnail.source;
                    var height = el.thumbnail.height;
                    var width = el.thumbnail.width;
                } else {
                    var img = 'http://cdn.shopify.com/s/files/1/0095/4332/t/30/assets/no-image.svg';
                    var height;
                    var width = 150;
                }

                $('#content').append('<a href="' + url + '" class="list-group-item" target="_blank"><img class="media-object" src="' + img + '" width="' + width + '" height="' + height + '" alt="' + alt + '" title="' + title + '"><h4 class="list-group-item-heading">' + title + '</h4><p class="list-group-item-text">' + desc + '</p></a>');
            });
        })
        .fail(function() {
            console.log("error");
        });

    });
    

    // END API WIKI

});