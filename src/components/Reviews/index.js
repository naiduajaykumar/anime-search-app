/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
import {useState} from 'react'
import ReviewItem from '../ReviewItem'
import useLocalStorage from '../../hooks/useLocalStorage'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const Reviews = props => {
  const [ratingDetails, setRatingDetails] = useState({
    rating: '',
    comment: '',
    id: '',
    initialClassName: '',
  })

  /** At first for records we will set the dummy data  */
  const [records, setRecords] = useLocalStorage('records', [
    {
      rating: '2',
      comment: 'good',
      id: 1,
      initialClassName: 'white',
    },
  ])

  const handleInput = e => {
    const {name} = e.target
    const {value} = e.target

    setRatingDetails({...ratingDetails, [name]: value})
  }

  const renderReviewsList = () => {
    const records1 = JSON.parse(localStorage.getItem('records'))

    if (records1) {
      const items = records1.filter(each => each.id === props.animeDetails.id)
      console.log(items)
      return items.map(eachReview => (
        <ReviewItem key={eachReview.id} commentDetails={eachReview} />
      ))
    }
    return null
  }

  const onAddComment = event => {
    event.preventDefault()

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      ...ratingDetails,
      id: props.animeDetails.id,
      initialClassName: initialBackgroundColorClassName,
    }

    setRecords([...records, newComment])
    setRatingDetails({rating: '', comment: '', id: '', initialClassName: ''})
  }

  return (
    <div className="review-app-container">
      <div className="review-container">
        <h1 className="title">Reviews</h1>
        <div className="review-inputs">
          <form className="form" onSubmit={onAddComment}>
            <input
              type="number"
              required
              className="name-input"
              placeholder="Rating"
              max="5"
              min="1"
              id="rating"
              name="rating"
              onChange={handleInput}
              value={ratingDetails.rating}
            />
            <textarea
              placeholder="Description"
              className="review-input"
              onChange={handleInput}
              name="comment"
              rows="2"
              id="comment"
              type="text"
              required
              value={ratingDetails.comment}
            />
            <button type="submit" className="add-button">
              Add Review
            </button>
          </form>
        </div>
        <hr className="line" />

        <ul className="review-list">{renderReviewsList()}</ul>
      </div>
    </div>
  )
}

export default Reviews
