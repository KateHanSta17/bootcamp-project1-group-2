const TMDB_API_KEY = 'cc32f359ab5cc2ccfe990089e6ee3062';
const SPOTIFY_CLIENT_ID = '9b24f33477b84ab0b61cfbd6aa000e1d';
const SPOTIFY_CLIENT_SECRET = '811ae717971f424fbb7b69b070accba8';

// Array to keep track of suggested movie IDs to avoid duplicates being shown when searching again in the same session.
let suggestedMovies = [];

// Function to get Spotify access token
function getSpotifyAccessToken(callback) {
  const authString = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + authString
    },
    body: 'grant_type=client_credentials'
  })
  .then(response => response.json())
  .then(data => callback(data.access_token))
  .catch(error => console.error('Error fetching Spotify access token:', error));
}

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
  getSpotifyAccessToken(function(accessToken) {
    fetchSpotifyPlaylist(movie.title, accessToken);
  });
  $('#movieResult').removeClass('hidden');
}

function fetchTrailer(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;

  // removes previous trailer after each new movie is fetched
  $('#trailer').empty();

  $.get(url, function(data) {
    const trailer = data.results.find(video => video.type === 'Trailer');
    if (trailer) {
      const videoId = trailer.key;
      $('#trailer').html(`
        <iframe
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allowfullscreen
        ></iframe>      `);
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

function fetchSpotifyPlaylist(movieTitle, accessToken) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(movieTitle + ' soundtrack')}&type=playlist&limit=1`;

  $.ajax({
    url: url,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    success: function(data) {
      const buttonHtml = `
        <button onclick="window.open('{url}', '_blank')" 
                class="bg-zinc-700 text-white p-2 px-4 rounded-full mt-4 flex items-center">
          <img src="assets/images/spotify_icon.png" alt="Spotify Icon" class="w-6 h-6 mr-2"> Related Spotify playlist
        </button>
      `;

      if (data.playlists.items.length > 0) {
        const playlist = data.playlists.items[0];
        $('#spotifyPlaylist').html(buttonHtml.replace('{url}', playlist.external_urls.spotify));
      } else {
        $('#spotifyPlaylist').html(buttonHtml.replace('{url}', 'https://open.spotify.com/playlist/37i9dQZF1DXb69UWhjrXsW'));
      }
    },
    error: function() {
      const errorButtonHtml = `
        <button onclick="window.open('https://open.spotify.com/playlist/37i9dQZF1DXb69UWhjrXsW', '_blank')" 
                class="bg-zinc-700 text-white p-2 px-4 rounded-full mt-4 flex items-center">
          <img src="assets/images/spotify_icon.png" alt="Spotify Icon" class="w-6 h-6 mr-2"> Related Spotify playlist
        </button>
      `;
      $('#spotifyPlaylist').html(errorButtonHtml);
    }
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
    $('#watchlist').append(`
      <li class="flex items-center space-x-4">
      <li>
        <img src="https://image.tmdb.org/t/p/w92${movie.poster}" alt="poster not found" class="w-20 h-20 object-cover">
        </li>
        <span class="text-white text-sm">${movie.title}</span>
        <span class="delete-btn text-red-500" data-index="${index}" data-type="watchlist"><i class="fas fa-trash-alt"></i></span>
      </li>
    `);
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
// need to check the code from 130 i