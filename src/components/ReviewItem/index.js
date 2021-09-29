import './index.css'

const ReviewItem = props => {
  const {commentDetails} = props
  console.log('ajay')
  const {rating, comment, initialClassName} = commentDetails
  const initial = rating ? rating[0].toUpperCase() : ''

  return (
    <>
      <p className="heading">Reviews</p>
      <li className="comment-item">
        <div className="comment-container">
          <div className={initialClassName}>
            <p className="initial">{initial}</p>
          </div>
          <div>
            <div className="username-time-container">
              <p className="username">{rating}</p>
            </div>
            <p className="comment">{comment}</p>
          </div>
        </div>

        <hr className="comment-line" />
      </li>
    </>
  )
}

export default ReviewItem
