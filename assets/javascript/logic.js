


var apikey = '&apiKey=DZDcAWMI7tHZgDL-0HsY9xdV2PP2WERqSJ4RodnZ84DGyEwJ';
var historical = 'search?'
var current = 'latest-news?'
var startDate; //Will have to have YYYY-MM-dd format 
var endDate; // Will have to have YYYY-MM-dd format 
var type; //Will be an integer: 1 for news, 2 for articles, 3 for discussion content, Default 1

var lang = '&language=en'

var queryURL = 'https://api.currentsapi.services/v1/' + current + lang + apikey;



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    //We also want to make the response.news.published into a moment so that we can format it and display it
    // if (response.news.image !== 'none') {
    //     $('.article-img').append('<img src="' + response.news[3].image + '">');
    //     $('.article-info').append('<h1 class="article-title">' + response.news[3].title + '</h1>' + '<h3 class=article-by> By ' + response.news[3].author + '</h3>')
    //     $('.article-snippet').append('<p>' + response.news[3].description + '</p>')
    //     $('.article-link').append('<a href="' + response.news[3].url + '" target=_blank>' + 'Open Article in New Tab' + '</a>')
    // }




});



//From the response we can grab the image as the thumbnail and the url for the link added and the description + published date + Author
/*var apiNasa = 'Ta10d3nY7WbfA7PR7VNlwYveTL1kVzMDe4LUm5V1'

var queryNASA = 'https://api.nasa.gov/planetary/apod?api_key=Ta10d3nY7WbfA7PR7VNlwYveTL1kVzMDe4LUm5V1&hd=TRUE$date=' + today


var today = moment().format('YYYY-MM-DD')
var todayInSlashes = moment().format('MM/DD')



console.log(today);
//For the NASA image of the day
$.ajax({
    url: queryNASA,
    method: "GET"
}).then(function (response) {
    console.log(response)
    $('#new-news').append('<img src="' + response.hdurl + '">')

})

console.log(todayInSlashes)
var queryNumber = 'http://numbersapi.com/' + todayInSlashes + '/date'
$.ajax({
    url: queryNumber,
    method: "GET"
}).then(function (response) {
    console.log(response)
    $('#new-news').append(response);
})
*/

/*
Code to query the NewsAPI
*/


var sortBy = '&sortBy='
var apiNews = '&apiKey=c2704563e1294b96ae07dbe18fda2af6'
var keyword = $('.search-input').val()
var queryNews = 'https://newsapi.org/v2/top-headlines?country=us' + apiNews

$('.search-btn').on('click', function () {
    $.ajax({
        url: queryNews,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $('.article-img').append('<img src="' + response.articles[3].urlToImage + '">');
        $('.article-info').append('<h1 class="article-title">' + response.articles[3].title + '</h1>' + '<h3 class=article-by> By ' + response.articles[3].author + '</h3>')
        $('.article-snippet').append('<p>' + response.articles[3].description + '</p>')
        $('.article-link').append('<a href="' + response.articles[3].url + '" target=_blank>' + 'Open Article in New Tab' + '</a>')

    })

});


/**
 * code to query the wiki api
 */
var queryWiki = "https://en.wikipedia.org/w/api.php";

var params = {
    action: "query",
    list: "search",
    srsearch: "Nelson Mandela",
    format: "json"
};

url = queryWiki + "?origin=*&";
url += $.param(params);
console.log(url);
$.ajax({
    url: url,
    method: "GET"
}).then(function (response) {
    //console.log(response.query.search);
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

/*
Modals!
*/

$(document).ready(function () {
    $('.nasa-btn').on('click', function () {
        $('.nasa-modal').attr('class', 'is-active')
        $('.nasa-modal').attr('class', 'is-clipped')
    })
})
