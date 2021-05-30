import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieInfos = this.getMovieInfos.bind(this);

    this.state = {
      movie: {},
      shouldRedirect: false,
      loading: true
    };
  }

  componentDidMount() {
    this.getMovieInfos()
  }

  async handleSubmit(updatedMovie) {
    const updateMovie = await movieAPI.updateMovie(updatedMovie);
    if (updateMovie === 'OK') {
      this.setState({
        shouldRedirect: true,
      })
    }
  }

  async getMovieInfos() {
    const { match: { params: { id } } } = this.props;
    const movie = await movieAPI.getMovie(id)
      this.setState({
        movie,
        loading: false,
      })
  }

  render() {
    const { loading, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />
    }

    if (loading) {
      return <Loading />
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

export default EditMovie;
