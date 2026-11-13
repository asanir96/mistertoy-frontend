import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';

export function ReviewFeedbackHeader({ feedback }) {
    const initials = feedback.by ? utilService.getUserInitials(feedback.by) : null
    const reviewByTitle = feedback.by.fullname ? feedback.by.fullname : feedback.by.username

    return <CardContent>

        <div className='review-user-info'>
            <Avatar
                sx={{ gridColumn: '1', gridRow: '1 / 4' }}>{initials}</Avatar>

            <h3 className='user-name'>{reviewByTitle}</h3>

            <span className='review-time'>{feedback.createdAt && utilService.getTimeAgo(feedback.createdAt)}</span>
        </div>

        <div className='review-toy-info'>

            <img className="toy-img" src={feedback.toy.imgUrl} alt="" />

            <h3 className='toy-name'>{feedback.toy.name}</h3>
        </div>



    </CardContent>
}