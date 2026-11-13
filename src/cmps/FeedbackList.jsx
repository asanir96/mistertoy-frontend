import { FeebackPreview } from './FeedbackPreview';
import { useSelector } from "react-redux"
import Card from '@mui/material/Card';
import { UserFeedbackHeader } from './UserFeedbackHeader';
import { ToyFeedbackHeader } from './ToyFeedbackHeader';
import { ReviewFeedbackHeader } from './ReviewFeedbackHeader';

export function FeedbackList({ feedbacks, onRemoveFunc, isReviews }) {
    const user = useSelector(storedState => storedState.authModule.user)

    if (!feedbacks.length) return <div>No messages yet..</div>

    let cardHeaderVariant




    return <ul className='feedback-list'>
        {feedbacks.map(feedback => {

            if (feedback.by && feedback.toy) {
                cardHeaderVariant = <ReviewFeedbackHeader feedback={feedback} />
            } else if (feedback.by) {
                cardHeaderVariant = <UserFeedbackHeader feedback={feedback} />
            } else {
                cardHeaderVariant =<ToyFeedbackHeader feedback={feedback} />
            }
                

        return <li className='feeback-list-item position-relative'>
            <Card className='toy-msg'
                variant="outlined">

                {cardHeaderVariant}

                <FeebackPreview feedback={feedback} />

                {user && user._id === feedback.by?._id &&
                    <button
                        className='feedback-delete-btn position-absolute'
                        onClick={isReviews ? () => onRemoveFunc(feedback._id) : () => onRemoveFunc(feedback.id)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>}
            </Card>
        </li>
        })}
    </ul>
}