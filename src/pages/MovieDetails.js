import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      movies: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getIdMovie()
  }

  getIdMovie() {
    const { match: { params: { id } } } = this.props;
    return movieAPI.getMovie(id)
      .then((data) => this.setState({
        movies: data,
        loading: false,
      }))
  }

  deleteMovie() {
    const { match: { params: { id } } } = this.props;
    return movieAPI.deleteMovie(id)
      .then((data) => data)
  }

  render() {
    const { movies, loading } = this.state;
    const { match: { params: { id } } } = this.props;

    if (loading) return <Loading />

    return ( 
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${movies.imagePath}` } />
        <h1>{ movies.title }</h1>
        <p>{ `Subtitle: ${movies.subtitle}` }</p>
        <p>{ `Storyline: ${movies.storyline}` }</p>
        <p>{ `Genre: ${movies.genre}` }</p>
        <p>{ `Rating: ${movies.rating}` }</p>
        <Link to={`/movies/${id}/edit`}>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/" onClick={this.deleteMovie}>DELETAR</Link>
      </div>
    )
  }
}

export default MovieDetails;
