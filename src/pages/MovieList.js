import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    return movieAPI.getMovies()
      .then((data) => {
        this.setState({ movies: data })
      });
  }

  render() {
    const { movies } = this.state;

    return (
      <div>
      {
        !movies.length ? <Loading /> :
        <div data-testid="movie-list">
            {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
            <br />
            <Link to="/movies/new">ADICIONAR CARTÃO</Link>
          </div>
      }
      </div>
    )


  }
}

export default MovieList;
