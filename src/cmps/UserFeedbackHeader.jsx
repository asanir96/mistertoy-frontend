import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';

export function UserFeedbackHeader({ feedback }) {
    const initials = feedback.by ? utilService.getUserInitials(feedback.by) : null
    const reviewByTitle = feedback.by.fullname ? feedback.by.fullname : feedback.by.username
    
    return <CardContent
        sx={{
            display: 'grid',
            rowGap: '0.3em',
            columnGap: '0.7em',
            gridTemplateColumns: 'max-content max-content 1fr',
            gridTemplateRows:'min-content min-content auto'
        }}>

        <Avatar
        sx={{gridColumn:'1', gridRow:'1 / 4'}}>{initials}</Avatar>

        <h3 className='user-review-header'>{reviewByTitle }</h3>

        <span className='user-feedback-time'>{feedback.createdAt && utilService.getTimeAgo(feedback.createdAt)}</span>
    </CardContent>
}