import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import AnimeData from '../AnimeData'
import LogoutButton from '../LogoutButton'
import './index.css'

const apiStatusAnimeDataConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    animeList: [],
    apiAnimeStatus: apiStatusAnimeDataConstants.initial,
    searchInput: '',
    selectValue: 'title',
  }

  componentDidMount() {
    this.getAnime()
  }

  getAnime = async () => {
    this.setState({
      apiAnimeStatus: apiStatusAnimeDataConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {searchInput, selectValue} = this.state

    let animeApiUrl

    if (searchInput !== '') {
      switch (selectValue) {
        case 'Title':
          animeApiUrl = `https://api.aniapi.com/v1/anime?title=${searchInput}`
          break
        case 'Genre':
          animeApiUrl = `https://api.aniapi.com/v1/anime?genres=${searchInput}`
          break
        case 'Description':
          animeApiUrl = `https://api.aniapi.com/v1/anime?descriptions=%${searchInput}%`
          break
        default:
          animeApiUrl = `https://api.aniapi.com/v1/anime?title=${searchInput}`
      }
    } else {
      animeApiUrl = `https://api.aniapi.com/v1/anime`
    }
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(animeApiUrl, options)
    const fetchedData = await response.json()

    if (fetchedData.status_code === 404) {
      this.setState({
        apiAnimeStatus: apiStatusAnimeDataConstants.failure,
      })
    } else {
      const updatedData = fetchedData.data.documents.map(each => ({
        coverImage: each.cover_image,
        genres: each.genres,
        id: each.id,
        descriptions: each.descriptions.en,
        trailerUrl: each.trailer_url,
        episodesCount: each.episodes_count,
        rating: each.score,
        title: each.titles.en,
        seasonYear: each.season_year,
      }))
      this.setState({
        animeList: updatedData,
        apiAnimeStatus: apiStatusAnimeDataConstants.success,
      })
    }
  }

  enterSearchInput = () => {
    this.getAnime()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.enterSearchInput()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  handleChange = event => {
    this.setState({selectValue: event.target.value})
  }

  renderAnimeListView = () => {
    const {animeList} = this.state

    const shouldShowJobsList = animeList.length > 0
    return shouldShowJobsList ? (
      <div className="all-anime">
        <ul className="anime-list">
          {animeList.map(anime => (
            <AnimeData animeData={anime} key={anime.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
        <button onClick={this.getJobs} type="button" className="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  renderAnimeFailureView = () => (
    <div className="anime-error-view-container">
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="failure view"
        />
        <h1 className="no-products-heading">No Anime Found</h1>
        <p className="no-products-description">
          We could not find any Anime. Try other searches.
        </p>
      </div>
      <button onClick={this.getJobs} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSearchInput = () => {
    const {searchInput, selectValue} = this.state
    return (
      <div className="header">
        <div className="search-container">
          <select
            className="drop search-input"
            value={selectValue}
            onChange={this.handleChange}
          >
            <option value="Title">Title</option>
            <option value="Genre">Genre</option>
            <option value="Description">Description</option>
          </select>
          <input
            value={searchInput}
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchInput}
          />
          <button onClick={this.getAnime} type="button" className="seac-btn">
            <BsSearch className="search-icon" />
          </button>
        </div>
        <LogoutButton />
      </div>
    )
  }

  renderData = () => {
    const {apiAnimeStatus} = this.state

    switch (apiAnimeStatus) {
      case apiStatusAnimeDataConstants.success:
        return this.renderAnimeListView()
      case apiStatusAnimeDataConstants.failure:
        return this.renderAnimeFailureView()
      case apiStatusAnimeDataConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="all-anime-container">
          {this.renderSearchInput()}
          {this.renderData()}
        </div>
      </>
    )
  }
}
export default Home
