var db =  require('../../src/db.js')

module.exports = {
  formatPicks: function(picks){
    var movies = picks.user_picks.split('*')
    var titles = []
    movies.shift()

    movies.forEach(function(movie){
      titles.push(movie.slice(movie.indexOf('#')+1, movie.indexOf('$')));
    })

    return titles;
  },

  addMovieVotes: function(picks, vote_id) {
    console.log('***** picks!', picks);
    picks.forEach(function(movie, index) {
      db.movieByTitle(movie).then(function(title) {
        console.log('********inserting vote:', vote_id, title.id);
        var movieVote = {'vote_id': vote_id,
                        'movie_id': title.id,
                        'rank': index+1,
                      'comment': 'my fave movie ever'}
        db.insertMovieVote(movieVote).then(function(results) {
          console.log('keep this here to execute the promise');
        });
      })
    })
  }
}
