$(document).ready(function () {
    //This will bring you back to top of page when the page is refreshed
    $(document).ready(function () {
        $(this).scrollTop(0);
    });
    // Get on-click radio button value stored into variable searchWithin. Do we want to use this to guide which API to run a search from?
    var searchWithin;
    var searchTerm;

    //This is our main search button onclick event
    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        $('.current-articles').empty();
        searchWithin = $("input[type='radio']:checked").val();
        searchTerm = $("#searchTermSmall").val().trim();
        searchTerm = escapeRegExp(searchTerm);
        searchTerm = sanitize(searchTerm);

        $(".searchTerm").val(""); // Clears text input box

        if (searchWithin == 'currentNews') {
            newsAPI(searchTerm);
        }

        if (searchWithin == 'historicalEvents') {
            currentsAPI(searchTerm);
        }

        if (searchWithin == "wikipediaInfo") {
            searchWiki(searchTerm);
        }

        // code to empty the youtube video divs and recreate the player divs 
        $('.video-pulls .image').each(function (index) {
            $(this).empty();
            $(this).append('<div id="player' + (index++) + '" class="has-ratio"></div>');
        });
        searchVideos(searchTerm);

    });


    /* 
        Code to query the CurrentsAPI 
    */
    function currentsAPI(search) {
        var apikey = '&apiKey=DZDcAWMI7tHZgDL-0HsY9xdV2PP2WERqSJ4RodnZ84DGyEwJ';
        var queryURL;
        var lang = '&language=en'
        var keywords = search;
        queryURL = 'https://api.currentsapi.services/v1/search?keywords=' + keywords + lang + apikey;

        console.log(queryURL)
        console.log(startDate)
        console.log(endDate)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < 10; i++) {
                var publish = moment(response.news[i].published);

                var publishDate = publish.year() + '/' + (publish.month() + 1) + '/' + publish.date();
                var author;
                console.log(response.news[i].author)
                if (response.news[i].author == null) {
                    author = 'Associated Press';
                }
                else {
                    author = response.news[i].author;
                }

                $('.current-articles').append('<article class="message is-info">' +
                    '<div class="columns">' +
                    '<div class="column is-1">' + '<img src="' + response.news[i].image/*image url goes here */ + '" />' +
                    '</div>' +
                    '<div class="column is-11">' + '<p class="title">' + response.news[i].title + '</p>' + '<p class="subtitle"> Written By: ' + author + '</p>' + '<p class="subtitle" style="margin-top:-20px">' + 'Published on: ' + publishDate + '</p>' +
                    '</div>' +
                    '</div>' +

                    '<div class="message-body">' + response.news[i].description + '</div>' + '<br />' +
                    '<a href="' + response.news[i].url + '" target=_blank>' + 'Open Article in New Tab' + '</a>' +
                    '<hr />' +
                    '</article>')
            }
        });
    }

    /*  
    Code to query the NewsAPI
    */
    function newsAPI(search) {
        // http://lorempixel.com/g/400/200/
        var apiNews = '&apiKey=c2704563e1294b96ae07dbe18fda2af6';
        var keyword = search;
        var queryNews = 'https://newsapi.org/v2/everything?q=' + keyword + apiNews
        $.ajax({
            url: queryNews,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            for (var i = 0; i < 10; i++) {
                var author;
                console.log(response.articles[i].author)
                if (response.articles[i].author == null) {
                    author = 'Associated Press';
                }
                else {
                    author = response.articles[i].author;
                }

                $('.current-articles').append('<article class="message is-info">' +
                    '<div class="columns">' +
                    '<div class="column is-1">' + '<img src="' + response.articles[i].urlToImage/*image url goes here */ + '" />' + '</div>' +
                    '<div class="column is-11">' + '<p class="title">' + response.articles[i].title + '</p>' + '<p class="subtitle"> Written By: ' + author + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="message-body">' + response.articles[i].description + '</div>' + '<br />' +
                    '<a href="' + response.articles[i].url + '" target=_blank>' + 'Open Article in New Tab' + '</a>' +
                    '<hr />' +
                    '</article>')
            }
        })
    }


    /* Start - To show Nasa Image of the day   */

    var today = moment().format('YYYY-MM-DD');
    var queryNASA = 'https://api.nasa.gov/planetary/apod?api_key=Ta10d3nY7WbfA7PR7VNlwYveTL1kVzMDe4LUm5V1&hd=TRUE&date=' + today
    // code to query the Nasa image of the day
    // Needs to be called and added to modal before modal is called so it doesn't have to load
    $.ajax({
        url: queryNASA,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        if (response.media_type == 'video') {
            $('.nasa-img').html('<iframe width="900" height="900" src="' + response.url + '">' + 'Your browser does not support this video type' + '</iframe>');
        }
        else {
            $('.nasa-img').html('<img src="' + response.hdurl + '">');
        }
        $('.nasa-desc').html(response.explanation);

    });

    $('.nasa-btn').on('click', function () {
        $('#modal-id').addClass('is-active');
        $('#modal-id').addClass('is-clipped');
        $('.nasa-modal').attr('class', 'is-active');
        $('.nasa-modal').attr('class', 'is-clipped');
    });

    $(document).on('click', '.modal-close', function () {
        $('#modal-id').removeClass('is-active');
    });

    /* End - To show Nasa Image of the day   */

    /* Start - To show the fact of the day */
    $('.fact-btn').on('click', function () {
        var todayInSlashes = moment().format('MM/DD')
        var todayInMoreSlashes = moment().format('MM/DD/YYYY')
        var queryNumber = 'http://numbersapi.com/' + todayInSlashes + '/date'
        $('.fact-title').html('Today is ' + todayInMoreSlashes);
        $.ajax({
            url: queryNumber,
            method: "GET"
        }).then(function (response) {
            $('.fact-modal').addClass('is-active')
            $('.fact-modal').addClass('is-clipped')
            $('.rando-fact').html(response);
        })

    })

    $(document).on('click', '.delete', function () {
        $('.fact-modal').removeClass('is-active')

    })
    $(document).on('click', '.close-button', function () {
        $('.fact-modal').removeClass('is-active')

    })
    /* End - To show the fact of the day */
});


/************************************ User defined functions  /************************************/
function generateURL(url, params) {
    if (params) url += $.param(params);
    return url;
}

function searchWiki(searchTerm) {
    var params = {
        action: "query",
        list: "search",
        srsearch: searchTerm,
        format: "json"
    };

    var queryURL = generateURL("https://en.wikipedia.org/w/api.php?origin=*&", params);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.query.search;
        $('.current-articles').empty();
        $.each(results, function (index, value) {
            var wikiArticle = $("<article class='message is-info'>");
            $('.current-articles').append(wikiArticle);
            var colDiv = $("<div class='columns'>");
            colDiv.append("<div class='column is-12'><h1 class='title'>" + results[index].title + "</h1></div>");
            var msgDiv = $("<div class='message-body'>" + results[index].snippet + "</div>");
            $(wikiArticle).append(colDiv, msgDiv);
            $(wikiArticle).append("<br />");
            $(wikiArticle).append("<a href='https://en.wikipedia.org/wiki/" + results[index].title + "' target='_blank'>" + results[index].title + "</a>");
            $('.current-articles').append("<hr />");
        });
    });
}

function searchVideos(searchTerm) {
    var playerInfoList = [];
    $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search?',
        data: {
            q: searchTerm,
            part: 'snippet',
            key: 'AIzaSyDvZJroibDl30fxnmsNsCZO1o-9N-Em5zs',
            maxResults: 6
        },
        dataType: 'jsonp'
    }).then(function (response) {
        var results = response.items;
        $.each(results, function (index, value) {
            var videoObj = {
                id: 'player',
                height: '390',
                width: '640',
                videoId: results[index].id.videoId
            }
            playerInfoList.push(videoObj);
        });

        $(".is-16by9").toggle();

        onYouTubePlayerAPIReady();

        function onYouTubePlayerAPIReady() {
            for (var i = 0; i < playerInfoList.length; i++) {
                player = new YT.Player('player' + [i], {
                    height: '360',
                    width: '640',
                    videoId: playerInfoList[i].videoId,
                    type: 'video'
                });
            }
        }
    });

    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}
/************************************ User defined functions  /************************************/

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}