import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const AnimeData = props => {
  const {animeData} = props
  const {
    title,
    coverImage,
    episodesCount,
    descriptions,
    id,
    trailerUrl,
    seasonYear,
    genres,
  } = animeData

  const records1 = JSON.parse(localStorage.getItem('records'))

  let items
  let sum
  let customRating
  if (records1) {
    items = records1.filter(each => each.id === id)
    sum = Object.values(items).reduce(
      (acc, curr) => acc + parseInt(curr.rating),
      0,
    )
    customRating = Math.ceil(sum / items.length)
  }

  genres.splice(8)

  return (
    <Link to={`/anime/${id}`} className="link-item" key={id}>
      {/* We had given id to object because to uniquely identify the list of AnimeItems */}
      <li className="job-item" key={animeData.id}>
        <div className="head-container">
          <div>
            <img src={coverImage} alt="img" className="logo" />
          </div>
          <div className="head-2nd-container">
            <div className="title-container">
              <h1 className="title">{title}</h1>
            </div>
            <div className="items-details-container">
              <p className="rating">Season Year : {seasonYear}</p>
              <div className="rating-container">
                <p className="rating">Rating : </p>
                <p className="rating">{customRating} </p>
                <AiFillStar className="star-icon" />
              </div>
              <p className="rating">{id}</p>
              <p className="rating">Episodes : {episodesCount}</p>
              <p className="rating">Trailer Url : {trailerUrl}</p>
              <div className="genre-container">
                <p className="rating genres">
                  Genres :{' '}
                  {genres.map(each => (
                    <span>{each}, </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="desc-container">
          <h1 className="title desc-head">Description</h1>
          <div className="text">{descriptions}</div>
        </div>
      </li>
    </Link>
  )
}
export default AnimeData
