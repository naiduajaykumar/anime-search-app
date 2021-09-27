import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineExternalLink} from 'react-icons/hi'
import './index.css'

const AnimeData = props => {
  const {animeData} = props
  const {
    title,
    coverImage,
    episodesCount,
    rating,
    descriptions,
    id,
    trailerUrl,
    seasonYear,
    genres,
  } = animeData

  return (
    <Link to={`/anime/${id}`} className="link-item" key={animeData.id}>
      {/* We had given id to object because to uniquely identify the list of JobsItems */}
      <li className="job-item" key={animeData.id}>
        <div className="logo-container">
          <img src={coverImage} alt="company logo" className="logo" />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}%</p>
            </div>
            <p className="rating">Season Year: {seasonYear}</p>
          </div>
        </div>
        <div className="details-container">
          <div className="package-container">
            <p className="pack-text">{genres}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="desc-container">
          <h1 className="title desc-head">Description</h1>
          <div className="text">{descriptions}</div>
        </div>
        <div>
          <a href={trailerUrl} className="link-sec link-name">
            Watch Trailer
            <HiOutlineExternalLink className="link" />
          </a>
        </div>
      </li>
    </Link>
  )
}
export default AnimeData
