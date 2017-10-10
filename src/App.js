import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Movie from './Movie'

// Render: componentWillMount() -> render() -> componentDidMount()
// Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._getMovies()
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    console.log(movies)
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return axios.get('https://yts.ag/api/v2/list_movies.json?sort_by=download_count')
      .then(potato => potato.data.data.movies)
      .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      )
    })
    return movies
  }

  render() {
    const { movies } = this.state
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
