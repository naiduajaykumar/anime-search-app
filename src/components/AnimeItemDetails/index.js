/* eslint-disable react/destructuring-assignment */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

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
    this.getJobData()
  }

  getJobData = async () => {
    const {id} = this.props.match.params

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
      console.log(fetchedData)

      const animeDetails = fetchedData.data

      this.setState({
        apiStatus: apiStatusConstants.success,
        animeDetails,
      })
    }
    if (response.status === 404 || response.status === 400) {
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

      <button onClick={this.getJobData} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    if (this.props) {
      const {animeDetails} = this.state

      return (
        <>
          <div className="job-details-card">
            <div className="logo-container">
              <img
                src={animeDetails.cover_image}
                alt="job details company logo"
                className="logo"
              />
              <div className="title-container">
                <h1 className="title">{animeDetails.titles.en}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{animeDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="details-container">
              <div className="about-details">
                <MdLocationOn className="location-icon" />
                <p className="text">{animeDetails.location}</p>
                <BsFillBriefcaseFill className="location-icon" />
                <p className="text">{animeDetails.employment_type}</p>
              </div>
              <div className="package-container">
                <p className="pack-text">{animeDetails.package_per_annum}</p>
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
          </div>
        </>
      )
    }
    return this.renderFailureView()
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
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
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default AnimeItemDetails
