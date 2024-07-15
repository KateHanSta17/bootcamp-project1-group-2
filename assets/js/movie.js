const TMDB_API_KEY = 'cc32f359ab5cc2ccfe990089e6ee3062';

// Array to keep track of suggested movie IDs to avoid duplicates being shown when searching again in the same session.
let suggestedMovies = [];

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
      let movie;
      for (let i = 0; i < data.results.length; i++) {
        let potentialMovie = data.results[Math.floor(Math.random() * data.results.length)];
        if (!suggestedMovies.includes(potentialMovie.id)) {
          movie = potentialMovie;
          suggestedMovies.push(movie.id);
          break;
        }
      }
      if (!movie) {
        suggestedMovies = [];
        fetchMovie(genre, decade);
      } else {
        displayMovie(movie);
      }
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
  fetchTrailer(movie.id); // Fetch trailer here
  fetchPlatforms(movie.id);
  $('#movieResult').removeClass('hidden');
}

function fetchTrailer(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;

  $.get(url, function(data) {
    const trailer = data.results.find(video => video.type === 'Trailer');
    if (trailer) {
      const videoId = trailer.key;
      $('#trailer').html(`
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      `);
    } else {
      $('#trailer').append('<p>No trailer available</p>');
    }
  }).fail(function() {
    $('#trailer').append('<p>Failed to fetch trailer</p>');
  });
}

function fetchPlatforms(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`;

  $.get(url, function(data) {
    const providers = data.results.AU && data.results.AU.flatrate;
    console.log(providers);
    console.log(data.results.AU);
    $('#platforms').empty();
    if (providers) {
      providers.forEach(provider => {
        $('#platforms').append(`<img src="https://image.tmdb.org/t/p/w92${provider.logo_path}" alt="${provider.provider_name}" class="w-8 h-8">`);
      });
    } else {
      $('#platforms').append('<p>No platforms found</p>');
    }
  }).fail(function() {
    $('#platforms').append('<p>Failed to fetch platforms</p>');
  });
}

function saveToWatchlist(movie, listType) {
  let list = JSON.parse(localStorage.getItem(listType)) || [];
  list.push(movie);
  localStorage.setItem(listType, JSON.stringify(list));
}

function loadWatchlist() {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  let dislikedList = JSON.parse(localStorage.getItem('disliked')) || [];
  $('#watchlist').empty();
  $('#disliked').empty();

  watchlist.forEach((movie, index) => {
    $('#watchlist').append(`<li>${movie.title} <span class="delete-btn" data-index="${index}" data-type="watchlist"><i class="fas fa-trash-alt"></i></span></li>`);
  });

  dislikedList.forEach((movie, index) => {
    $('#disliked').append(`<li>${movie.title} <span class="delete-btn" data-index="${index}" data-type="disliked"><i class="fas fa-trash-alt"></i></span></li>`);
  });

  $('.delete-btn').click(function() {
    let index = $(this).data('index');
    let type = $(this).data('type');
    deleteFromList(index, type);
    loadWatchlist();
  });
}

function deleteFromList(index, listType) {
  let list = JSON.parse(localStorage.getItem(listType)) || [];
  list.splice(index, 1);
  localStorage.setItem(listType, JSON.stringify(list));
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
  saveToWatchlist(movie, 'watchlist');
  alert('Movie added to watchlist');
  $('#pickAgainButton').removeClass('hidden');
});

$('#dislikeButton').click(function() {
  let movie = {
    title: $('#movieTitle').text(),
    poster: $('#moviePoster').attr('src'),
    synopsis: $('#movieSynopsis').text()
  };
  saveToWatchlist(movie, 'disliked');
  let genre = $('#genre').val();
  let decade = $('#decade').val();
  fetchMovie(genre, decade);
});

$('#pickAgainButton').click(function() {
  let genre = $('#genre').val();
  let decade = $('#decade').val();
  fetchMovie(genre, decade);
  $('#pickAgainButton').addClass('hidden');
});

$('#watchlistButton').click(function() {
  loadWatchlist();
  $('#watchlistModal').removeClass('hidden');
});

$('#closeWatchlist').click(function() {
  $('#watchlistModal').addClass('hidden');
});
