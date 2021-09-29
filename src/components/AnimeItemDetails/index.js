/* eslint-disable react/destructuring-assignment */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {HiOutlineExternalLink} from 'react-icons/hi'
import Reviews from '../Reviews'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AnimeItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    animeDetails: {},
  }

  componentDidMount() {
    this.getAnimeData()
  }

  getAnimeData = async () => {
    const {id} = this.props.match.params
    console.log(id)

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://api.aniapi.com/v1/anime/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const animeDetails = fetchedData.data

      this.setState({
        apiStatus: apiStatusConstants.success,
        animeDetails,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="error-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <p className="error-para">
        We cannot seem to find the page you are looking for.
      </p>

      <button
        onClick={this.getAnimeData}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderAnimeDetailsView = () => {
    if (this.props) {
      const {animeDetails} = this.state
      console.log(animeDetails.id)

      return (
        <>
          <div className="items">
            <div className="logo-container">
              <img
                src={animeDetails.banner_image}
                alt="job details company logo"
                className="cover-img"
              />
            </div>

            <div className="anime-details-card">
              <div className="title-container-item">
                <h1 className="title">{animeDetails.titles.en}</h1>
                <a
                  href={animeDetails.trailer_url}
                  className="text link-sec link-name"
                >
                  Watch Trailer
                  <HiOutlineExternalLink className="link-icon" />
                </a>
              </div>
              <div className="details-container-each">
                <div>
                  <p className="rating">
                    Season Year : {animeDetails.season_year}
                  </p>

                  <p className="rating">
                    Episodes : {animeDetails.episodes_count}
                  </p>

                  <p className="rating">
                    Duration : {animeDetails.episode_duration}min
                  </p>
                </div>
                <div className="genre-container">
                  <p className="rating">
                    Genres :{' '}
                    {animeDetails.genres.splice(8).map(each => (
                      <span>{each}, </span>
                    ))}
                  </p>
                </div>
              </div>
              <hr className="line" />
              <div className="desc-container">
                <div className="title-container">
                  <div>
                    <h1 className="title desc-head">Description</h1>
                  </div>
                </div>
                <p className="text">{animeDetails.descriptions.en}</p>
              </div>

              <Reviews animeDetails={animeDetails} key={animeDetails.id} />
            </div>
          </div>
        </>
      )
    }
    return this.renderFailureView()
  }

  renderAnimeDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAnimeDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="anime-item-details-container">
          {this.renderAnimeDetails()}
        </div>
      </>
    )
  }
}

export default AnimeItemDetails
