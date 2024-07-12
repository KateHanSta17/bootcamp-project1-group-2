$(document).ready(function() {
    const TMDB_API_KEY = 'cc32f359ab5cc2ccfe990089e6ee3062';
    const WATCHMODE_API_KEY = '8dgjQecoVv11kakK4ursj0sGrhMqykzJkOnlWxt3';
  
    function fetchGenres() {
      $.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`, function(data) {
        data.genres.forEach(genre => {
          $('#genre').append(`<option value="${genre.id}">${genre.name}</option>`);
        });
      });
    }
  
    function fetchMovie(genre, decade) {
      let startYear = decade.split('-')[0];
      let endYear = decade.split('-')[1] || new Date().getFullYear();
  
      $.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`, function(data) {
        if (data.results.length > 0) {
          let movie = data.results[Math.floor(Math.random() * data.results.length)];
          displayMovie(movie);
        } else {
          $('#movieResult').addClass('hidden');
          alert('No movies found for the selected criteria.');
        }
      });
    }
  
    function displayMovie(movie) {
      $('#moviePoster').attr('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
      $('#movieTitle').text(movie.title);
      $('#movieSynopsis').text(movie.overview);
      fetchPlatforms(movie.id);
      $('#movieResult').removeClass('hidden');
    }
  
    function fetchPlatforms(movieId) {
      $.get(`https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${WATCHMODE_API_KEY}`, function(data) {
        $('#platforms').empty();
        data.sources.forEach(source => {
          $('#platforms').append(`<img src="${source.logo}" alt="${source.name}" class="w-8 h-8">`);
        });
      });
    }
  
    function saveToWatchlist(movie) {
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  
    function loadWatchlist() {
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      $('#watchlist').empty();
      watchlist.forEach(movie => {
        $('#watchlist').append(`<li>${movie.title}</li>`);
      });
    }
  
    fetchGenres();
  
    $('#pickButton').click(function() {
      let genre = $('#genre').val();
      let decade = $('#decade').val();
  
      if (!genre || !decade) {
        $('#errorMessage').removeClass('hidden');
      } else {
        $('#errorMessage').addClass('hidden');
        fetchMovie(genre, decade);
      }
    });
  
    $('#likeButton').click(function() {
      let movie = {
        title: $('#movieTitle').text(),
        poster: $('#moviePoster').attr('src'),
        synopsis: $('#movieSynopsis').text()
      };
      saveToWatchlist(movie);
      alert('Movie added to watchlist');
    });
  
    $('#dislikeButton').click(function() {
      let genre = $('#genre').val();
      let decade = $('#decade').val();
      fetchMovie(genre, decade);
    });
  
    $('#watchlistButton').click(function() {
      loadWatchlist();
      $('#watchlistModal').removeClass('hidden');
    });
  
    $('#closeWatchlist').click(function() {
      $('#watchlistModal').addClass('hidden');
    });
  });
  