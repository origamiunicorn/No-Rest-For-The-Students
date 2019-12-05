# On Topic
On Topic is a web app allowing users to search for keywords in three different API databases, returning results of articles and videos (sourced via YouTube) related to that keyword. This is all part of Team No Rest For The Students's Project One for UCLA's Fullstack Web Development Coding Bootcamp (September 2019 to March 2020). 

On initial page load, ten of the most recent articles collected by CurrentsAPI will be displayed in the Related Articles div. Until a user inputs a keyword (or keywords) for search, these articles will remain displayed. A page reload may change the articles displayed if newer articles have been collected by the CurrentsAPI since the preceeding page load.

Users may expand or collapse the Related Articles or Related Videos sections on selection of the header element. Users may also create a login for the app by selecting the Sign Up button, or if the user has a login and is returning to the web app, sign into their account by selecting the Login button. They may also generate a modal with a random fact of the day or with NASA's astronomical picture of the day by selecting the corresponding buttons.

When a user has scrolled three hundred pixels down the page, a button will show in the lower right corner of their viewport, with a double chevron pointing upward. Selecting this button will return the user to the top of the page with a scroll.

## Search Functions
We built this web app with a focus on being mobile responsive first. This web app allows users to get a quick read on articles related to their keyword(s) from different information sources depending on which radio button is selected.

When "Current Events" is selected, any keyword(s) input into the search text area will pull the related ten most recent articles collected by NewsAPI and populate them into the Related Articles div. Any image associated to the articles requested will display in small on desktop, or to fill screen on mobile, along with the title of each article, the author(s) of each article, and the publication date for each article. A small summary of the article will be displayed, followed by a link to the original article. Selecting this link will open a new window to the article.

When "Past Year's Events" is selected, any keyword(s) input into the search text area will pull the related ten most recent articles collected by CurrentsAPI from the year prior and populate them into the Related Articles div. Any image associated to the articles requested will display in small on desktop, or to fill screen on mobile, along with the title of each article, the author(s) of each article, and the publication date for each article. A small summary of the article will be displayed, followed by a link to the original article. Selecting this link will open a new window to the article.

When "Wikipedia" is selected, any keyword(s) input into the search text area will pull the top ten related pages on Wikipedia by WikiData API and populate them into the Related Articles div. There are no images, authors, or publication dates displayed. The beginning of the Wikipedia page will be displayed, followed by a link to the original Wikipedia page. Selecting this link will open a new window to the Wikipedia page.

In all cases, the keyword(s) input will go to the YouTube API and populate 5 videos related to the keyword(s) on "Search". These videos will be populated as embeds in the Related Videos section. 

## Sign Up and Login
At present, site visitors have an option of signing up for the app, which allows them to have the website display a welcome message to the user when logged in. Functionality might be expanded in the future, but at present, this is the only visible change a logged in user will experience.

Selecting the "Sign Up" button will popuate a modal asking for the user's First Name, Last Name, Email Address, Password, and Confirm Password. It also displays a message stating the page requires the use of third party cookies.

If a password is not considered strong enough, an error will show upon selecting "Sign Up" in the Sign Up Modal, indicating in a message at the top of the modal that the password is not secure enough, and to please input a more secure password.

If an email address is already registered to a user who has signed up for the website, an error message will display at the top of the Sign Up Modal stating that email address has already been used.

Once a user has successfully filled out the form, if they have third party cookies accepted by their browser, they will see the modal message change to state they've successfully signed up. The web app will display a welcome message, and they'll have been automatically logged in.

When a user selects the Login button, they will be prompted for an email address and password. If they have forgotten their password, they can select the "Forgot password?" link below the Login button. This will prompt the user for an email address, and upon select of the Reset password button, send an email to the associated account. If there is no account with that email address, an error message will populate at the top of the modal stating, "Error: There is no user corresponding to that identifier. The user may have been deleted."

Upon successful login, a user will be shown a welcome message and the Log Out button at the top of the page.

## Extra Bits
There are two extra buttons present on this web app: Random Fact of the Day, and NASA Image of the Day. 

Selecting the Random Fact of the Day button will generate a modal which provides a random fact related to the calendar date of a user based on their local timezone. Closing the modal and selecting the Fact of the Day button again will provide a new, random fact for that calendar date. This is generated by the Numbers API, specifically the "date" portion, which generates a random fact for a give date upon requect made to the API.

The NASA Image of the Day button opens a modal which displays the Astronomy Picture of the Day from NASA, along with a brief explanation of the picture itself. This may be a photograph or a video. This image or video will change based on NASA's database updating daily. Selecting the button more than once will not change the image or video until the date has changed for the user.

## Langauges Used
* CSS3
* HTML5
* JavaScript

## Libraries Used
* Bulma CSS
* FontAwesome
* jQuery
* jQuery Validate

## APIs Used
* CurrentsAPI
* NASA POD API
* NewsAPI
* Numbers API (Date)
* Wikidata API
* YouTube Data API

## Other Technologies Used
* Firebase 

## Stretch Goals
* Pagination of search results.
* Proper Historical Search, if possible through the APIs being used at present.
* Saved search terms for logged in users, and a method to select a past search term to return new results using the same search parameters (keyword and the radio button selected to search for that term).
* Responsive structuring of the containing elements for YouTube videos so that on large viewports they show two in a row and in smaller viewports stack on top and fill the containing spaces.