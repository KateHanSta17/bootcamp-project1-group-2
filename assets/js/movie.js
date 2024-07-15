$(document).ready(function() {
    const TMDB_API_KEY = 'cc32f359ab5cc2ccfe990089e6ee3062';
    const WATCHMODE_API_KEY = '8dgjQecoVv11kakK4ursj0sGrhMqykzJkOnlWxt3';
  
    // Array to keep track of suggested movie IDs to avoid duplicates being shown when searching again in the same session.
    let suggestedMovies = [];
  
    function fetchGenres() { // fetch genres for the dropdown list so all available genres can be shown.
      $.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`, function(data) {
        data.genres.forEach(genre => {
          $('#genre').append(`<option value="${genre.id}">${genre.name}</option>`);
        });
      });
    }
  
    function fetchMovie(genre, decade) { // fetch movie based on the genre and decade selected by the user.
      let startYear = decade.split('-')[0];
      let endYear = decade.split('-')[1] || new Date().getFullYear();
  
      $.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`, function(data) {
        if (data.results.length > 0) {
          let movie;
          // Find a movie that hasn't been suggested yet
          for (let i = 0; i < data.results.length; i++) {
            let potentialMovie = data.results[Math.floor(Math.random() * data.results.length)];
            if (!suggestedMovies.includes(potentialMovie.id)) {
              movie = potentialMovie;
              suggestedMovies.push(movie.id);
              break;
            }
          }
          // If all movies have been suggested, reset the list. Contingency function.
          if (!movie) {
            suggestedMovies = [];
            fetchMovie(genre, decade);
          } else {
            displayMovie(movie);
          }
        } else {
          $('#movieResult').addClass('hidden'); // `No movies found for the selected criteria.` message if no movies are found.
          alert('No movies found for the selected criteria.');
        }
      });
    }
  
    function displayMovie(movie) { // display all relevant movie details on the same page once form has been submitted.
      $('#moviePoster').attr('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
      $('#movieTitle').text(movie.title);
      $('#movieSynopsis').text(movie.overview);
      fetchPlatforms(movie.id);
      $('#movieResult').removeClass('hidden');
    }
  
    function fetchPlatforms(movieId) { // fetch streaming services movie is available on.
      console.log(movieId);
      // 'https://api.watchmode.com/v1/search/?apiKey=${WATCHMODE_API_KEY}&search_field=name&search_value=Ed%20Wood';
      //$.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, function(data) {
    //     console.log(data);
    //     $('#platforms').empty();
    //     data.sources.forEach(source => {
    //       console.log(source);
    //       $('#platforms').append(`<img src="${source.logo}" alt="${source.name}" class="w-8 h-8">`); // display streaming service logo.
    //     });
    //   }); 
    // }
  // add error to show if no platforms are found for the title shown.
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`; // dynamically change the movie id to the movie id of the movie that is being displayed.
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzMyZjM1OWFiNWNjMmNjZmU5OTAwODllNmVlMzA2MiIsIm5iZiI6MTcyMDc1MTkzMi4yNTYyOTEsInN1YiI6IjY2OGZiZDM1ZjgzZmYyMjBiNWE3OWI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cNPEc-735YLCuvtmRg8810suBO7srexXA4Y23K89HKs'
    }
  };
  
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      console.log(json.results.AU)})
    .catch(err => console.error('error:' + err));

    // .buy then do a for loop to loop through the array of the provider name and logo
}
    function saveToWatchlist(movie, listType) { // save movie to watchlist or disliked list pop up modal.
      let list = JSON.parse(localStorage.getItem(listType)) || [];
      list.push(movie);
      localStorage.setItem(listType, JSON.stringify(list));
    }
  
    function loadWatchlist() { // load watchlist and disliked list from local storage.
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      let dislikedList = JSON.parse(localStorage.getItem('disliked')) || [];
      $('#watchlist').empty();
      $('#disliked').empty();
  
      watchlist.forEach((movie, index) => { // append movie to liked watchlist.
        $('#watchlist').append(`<li>${movie.title} <span class="delete-btn" data-index="${index}" data-type="watchlist"><i class="fas fa-trash-alt"></i></span></li>`);
      });
  
      dislikedList.forEach((movie, index) => { // append movie to disliked list.
        $('#disliked').append(`<li>${movie.title} <span class="delete-btn" data-index="${index}" data-type="disliked"><i class="fas fa-trash-alt"></i></span></li>`);
      });
  
      $('.delete-btn').click(function() { // delete movie from watchlist or disliked list.
        let index = $(this).data('index');
        let type = $(this).data('type');
        deleteFromList(index, type);
        loadWatchlist();
      });
    }
  
    function deleteFromList(index, listType) { // delete movie from watchlist or disliked list. 
      let list = JSON.parse(localStorage.getItem(listType)) || [];
      list.splice(index, 1);
      localStorage.setItem(listType, JSON.stringify(list));
    }
  
    fetchGenres();
  
    $('#pickButton').click(function() { // event listener for when the user submits the form.
      let genre = $('#genre').val();
      let decade = $('#decade').val();
  
      if (!genre || !decade) { // error message if user doesn't select a genre or decade.
        $('#errorMessage').removeClass('hidden');
      } else {
        $('#errorMessage').addClass('hidden');
        fetchMovie(genre, decade);
      }
    });
  
    $('#likeButton').click(function() { // event listener for when the user likes a movie.
      let movie = {
        title: $('#movieTitle').text(),
        poster: $('#moviePoster').attr('src'),
        synopsis: $('#movieSynopsis').text()
      };
      saveToWatchlist(movie, 'watchlist'); // save movie to watchlist.
      alert('Movie added to watchlist');
      $('#pickAgainButton').removeClass('hidden');
    });
  
    $('#dislikeButton').click(function() { // event listener for when the user dislikes a movie.
      let movie = {
        title: $('#movieTitle').text(),
        poster: $('#moviePoster').attr('src'),
        synopsis: $('#movieSynopsis').text()
      };
      saveToWatchlist(movie, 'disliked'); // save movie to disliked list.
      let genre = $('#genre').val();
      let decade = $('#decade').val();
      fetchMovie(genre, decade);
    });
  
    $('#pickAgainButton').click(function() { // event listener for when the user wants to pick another movie.
      let genre = $('#genre').val();
      let decade = $('#decade').val();
      fetchMovie(genre, decade);
      $('#pickAgainButton').addClass('hidden');
    });
  
    $('#watchlistButton').click(function() { // event listener for when the user wants to view their watchlist.
      loadWatchlist();
      $('#watchlistModal').removeClass('hidden');
    });
  
    $('#closeWatchlist').click(function() { // event listener for when the user wants to close the watchlist modal.
      $('#watchlistModal').addClass('hidden');
    });
  });
  