import {useState, Component} from 'react'
import {useHistory} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import AnimeData from '../AnimeData'

import './index.css'

const apiStatusJobsDataConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    animeList: [],
    apiJobsStatus: apiStatusJobsDataConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiJobsStatus: apiStatusJobsDataConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {searchInput} = this.state
    console.log(searchInput)
    let jobsApiUrl

    if (searchInput !== '') {
      jobsApiUrl = `https://api.aniapi.com/v1/anime?title=${searchInput}%20`
    } else {
      jobsApiUrl = `https://api.aniapi.com/v1/anime`
    }
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    const fetchedData = await response.json()

    if (fetchedData.status_code === 404) {
      this.setState({
        apiJobsStatus: apiStatusJobsDataConstants.failure,
      })
    } else {
      console.log(fetchedData)
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
        apiJobsStatus: apiStatusJobsDataConstants.success,
      })
    }
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.enterSearchInput()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobsListView = () => {
    const {animeList} = this.state
    const shouldShowJobsList = animeList.length > 0
    return shouldShowJobsList ? (
      <div className="all-anime-container">
        <ul className="anime-list">
          {animeList.map(job => (
            <AnimeData animeData={job} key={job.id} />
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

  renderJobsFailureView = () => (
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
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button onClick={this.getJobs} type="button" className="seac-btn">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderData = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiStatusJobsDataConstants.success:
        return this.renderJobsListView()
      case apiStatusJobsDataConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusJobsDataConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="app-container">
          <div className="all-jobs-section">
            {this.renderSearchInput()}
            {this.renderData()}
          </div>
        </div>
      </>
    )
  }
}
export default Home
