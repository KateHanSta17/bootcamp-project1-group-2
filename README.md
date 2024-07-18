# Bootcamp Project #1: "Pick my Flick"
**Created by Group 2;
[Kate](https://github.com/KateHanSta17/), [Lewis](https://github.com/lewisgjohns), [Sanjeev](https://github.com/Sanjeev190), [Anson](https://github.com/ansonldoublee).**

### GitHub Repo
[Bootcamp Project #1 Group 2](https://github.com/KateHanSta17/bootcamp-project1-group-2)
### GitHub Pages link
[Pick My Flick](https://katehansta17.github.io/bootcamp-project1-group-2/)


## About Project

A simple website to cure your movie night analysis-paralysis. 
*"Let us pick for you."*

Introducing **Pick my Flick**, the ultimate movie discovery app designed to cure your movie night analysis-paralysis and get you watching before your popcorn gets cold!

Whether you're in the mood for a classic or something new, just select your preferred genre and decade, and let our smart algorithm do the rest. With recommendations you’ll be able to preview the run time, synopsis, poster and trailer of your suggested movie. Plus with our integration with Spotify for checking out soundtracks after you’ve watched, you'll never struggle to pick a movie again. 

Not only will we show you where you can stream the recommendation, our app ensures you never see the same suggestion twice; so transform your movie-watching experience with **Pick my Flick** – your personal movie concierge.

## User Story and Acceptance Criteria
### User Story
```
AS a movie enthusiast,
I WANT to effortlessly discover a movie to watch tonight, tailored to my preferences,
SO THAT I can enjoy watching films that match my mood and interests without wasting time searching.
```
### Acceptance Criteria
#### Genre and Decade Selection:
```
GIVEN that I open the app,
WHEN I select my preferred genre from the dropdown menu,
And select a decade from the dropdown menu,
THEN I should be able to see movie suggestions that match my selections.
```
#### Personalised Recommendations:
```
GIVEN that I have selected my preferences,
WHEN I click the "Pick My Flick" button,
THEN the app should display a movie suggestion with details including the title, poster, synopsis, and available streaming platforms.
```
#### Avoid Duplicate Suggestions:
```
GIVEN that I have previously seen a movie suggestion,
WHEN I use the app again,
THEN I should not see the same movie suggestion twice unless I reset the app or clear my history.
```
#### Watchlisting Movies:
```
GIVEN that I am viewing a movie suggestion,
WHEN I click the "Add to Watchlist" button,
THEN the movie should be saved to my watchlist and I should be notified of the addition.
```
#### Not Interested Movies:
```
GIVEN that I am viewing a movie suggestion,
WHEN I click the "Not Interested" button,
THEN the app should track the movie as disliked, and provide a new suggestion that I have not seen before.
```
#### Watchlist Management:
```
GIVEN that I want to review my liked movies,
WHEN I open my watchlist,
THEN I should see a list of all the movies I have liked, displayed in an organised manner, with options to remove movies from the list.
```
#### Responsive Design:
```
GIVEN that I am using the app on different devices,
Wherever I open the app on desktop or mobile
THEN the design should be responsive to that display
```

## The App
()[]


## About Collaborators
- Project tracker / WIP management - Kate
- Presentation - All
- API Research - All
- User Story / Acceptance Criteria - Kate & Sanjeev
- Wireframe and Design - Anson via Figma
- HTML // Styling (CSS) - Kate - boilerplate, Anson - body, Sanjeev - header & footer, Lewis - modals
- JavaScript - All
- Content - images & text - Anson & Lewis
- ReadMe - Kate
- Code structure - Quality assurance for assessment criteria - Sanjeev

## References

This project uses the following resources and libraries:

1. **HTML**: Provides the structure for the web page, including headers, main content, modals, and buttons.
2. **Figma**:
[Figma Wireframe](https://www.figma.com/design/4zqiUVgC9GIZSlCCfAmKIO/Pick-My-Flick?node-id=0-1&t=IPWlgg9KilON9S7H-1) Curated by Anson Lee
2. **Tailwind CSS Documentation**
   [Tailwind CSS Installation](https://tailwindcss.com/docs/installation)
3. **JavaScript**: Core functionality for the app is written in vanilla JavaScript and jQuery. Functions for fetching data from APIs (fetchGenres, fetchMovie, fetchTrailer, fetchPlatforms, fetchSpotifyPlaylist).
DOM manipulation and event handling.
4. **TMDb API Documentation**
   [TMDb API - Getting Started](https://developer.themoviedb.org/reference/intro/getting-started) Used to get genres (fetchGenres) and discover movies based on selected genre and decade (fetchMovie).
Fetching movie trailers (fetchTrailer) and available streaming platforms (fetchPlatforms).
5. **Spotify API Documentation** [Spotify API Documentation](https://developer.spotify.com/documentation/web-api)
Obtaining access tokens to authenticate requests (getSpotifyAccessToken).
Searching for playlists related to movie soundtracks (fetchSpotifyPlaylist).
6. **Local Storage**:
Used to store and retrieve the user's watchlist and disliked movies to avoid showing duplicate suggestions (saveToWatchlist, loadWatchlist, deleteFromList).
7. **External Libraries**:
*Font Awesome*: For using various icons (thumbs-up, thumbs-down, trash can).
*Google Fonts*: Importing the Roboto font for consistent typography across the app.


## License

MIT License

---

# 07 Project 1: Interactive Front-End Application

At the conclusion of each phase of this course, you’ll work with a group of your fellow students to create a **project**. A project is collaborative work among a group of developers to create an application that solves a real-world problem. Projects model the experience you’ll encounter in every development role at any company, from large multinational businesses to small startups. Coding is collaborative.

A project is a bit different from the Challenge assignments you’ve worked on so far. One of the biggest differences is that you’ll no longer build an application by yourself! This has some advantages&mdash;you won’t have to do all of the work, you can divide up duties, and you can share skills and knowledge with other developers and lean on their strengths. This can also be challenging if you’re used to working alone. Constant communication and time management are just two of the skills you’ll need to practice to make sure everyone in your group works together to complete the project. 

Projects won’t provide you with a user story or acceptance criteria, because you and your group will create them once you decide which real-world problem your application will solve. This lack of constraints can be freeing in a way, because you have room to build what you want, but it also means that you have to decide what those constraints are before you can start working.

Finally, a project requires a presentation, because you’re trying to convince an audience that it serves a purpose. Your instructional staff and fellow students are investors, and you’re pitching your creation to them&mdash;an experience that developers are required to do frequently. Your presentation is just as important as the actual project, so take it just as seriously.

## Project Requirements

You and your group will use everything you’ve learned over the past six modules to create a real-world front-end application that you’ll be able to showcase to potential employers. The user story and acceptance criteria will depend on the project that you create, but your project must fulfil the following requirements:

* Use a CSS framework other than Bootstrap.

* Be deployed to GitHub Pages.

* Be interactive (i.e., accept and respond to user input).

* Use at least two [server-side APIs](https://coding-boot-camp.github.io/full-stack/apis/api-resources).

* Must include one modal. It does not use native browser alert, confirm, or prompt functionality.

* Use client-side storage to store persistent data.

* Be responsive.

* Have a polished UI.

* Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

* Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

## Presentation Requirements

Use this [project presentation template](https://docs.google.com/presentation/d/10QaO9KH8HtUXj__81ve0SZcpO5DbMbqqQr4iPpbwKks/edit?usp=sharing) to address the following: 

* Elevator pitch: a one minute description of your application

* Concept: What is your user story? What was your motivation for development?

* Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?

* Demo: Show your stuff!

* Directions for Future Development

* Links to the deployed application and the GitHub repository

## Grading Requirements

This project is graded based on the following criteria:

### Technical Acceptance Criteria: 25%

* Satisfies the following code requirements:

  * Application uses at least two [server-side APIs](https://coding-boot-camp.github.io/full-stack/apis/api-resources)

  * Application uses client-side storage to store persistent data.

  * Application must have at least one modal (does not use alerts, prompts, or confirm methods).

  * Application uses a CSS framework other than Bootstrap.

  * Application is interactive (accepts and responds to user input)

### Concept 10%

* Application should be a unique and novel idea.

* Your group should clearly and concisely articulate your project idea.

### Deployment: 20%

* Application deployed at live URL and loads with no errors.

* Application GitHub URL submitted.

### Repository Quality: 10%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains a quality README file with description, screenshot, and link to deployed application.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application is responsive.

### Presentation 10%

* Your group should present using a slide deck.

* Every group member should speak during the presentation.

* Your presentation should follow the [Project Presentation Template](https://docs.google.com/presentation/d/10QaO9KH8HtUXj__81ve0SZcpO5DbMbqqQr4iPpbwKks/edit?usp=sharing).

### Collaboration 10%

* There are no major disparities in the number of GitHub contributions between group members.

## How to Submit Your Interactive Front-End Project

**Each member of your group** is required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository, with a unique name and a README describing the project.
