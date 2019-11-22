


var apikey = '&apiKey=DZDcAWMI7tHZgDL-0HsY9xdV2PP2WERqSJ4RodnZ84DGyEwJ';
var historical = 'search?'
var current = 'latest-news?'
var startDate; //Will have to have YYYY-MM-dd format 
var endDate; // Will have to have YYYY-MM-dd format 
var type; //Will be an integer: 1 for news, 2 for articles, 3 for discussion content, Default 1
var keyword = 'keywords='
var lang = '&language=en'

var queryURL = 'https://api.currentsapi.services/v1/' + historical + lang + apikey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    //We also want to make the response.news.published into a moment so that we can format it and display it
    if (response.news.image !== 'none') {
        $('#new-news').append('<h1 class="article-title">' + response.news[6].title + '</h1>' + '<h3 class=article-by> By ' + response.news[6].author + '</h3>' + '<img src="' + response.news[5].image + '">' + '<br>' + '<a href="' + response.news[6].url + '" target=_blank>' + 'Open Article in New Tab' + '</a>')
    }                //For styling purposes ^^




});

//From the response we can grab the image as the thumbnail and the url for the link added and the description + published date + Author
var apiNasa = 'Ta10d3nY7WbfA7PR7VNlwYveTL1kVzMDe4LUm5V1'

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


var sortBy = '&sortBy='
var apiNews = '&apiKey=c2704563e1294b96ae07dbe18fda2af6'
var queryNews = 'https://newsapi.org/v2/everything?q=' + 'bitcoin' + sortBy + 'popularity' + apiNews

$.ajax({
    url: queryNews,
    method: "GET"
}).then(function (response) {
    console.log(response)
    $('#new-news').append(response.articles)
})
