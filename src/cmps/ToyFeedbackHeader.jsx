import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';

export function ToyFeedbackHeader({ feedback }) {
    return <CardContent
        sx={{
            display: 'grid',
            rowGap: '0.3em',
            columnGap: '0.7em',
            gridTemplateColumns: 'minmax(0em,max-content) max-content 1fr',
            gridTemplateRows:'min-content min-content auto'
        }}>

        {feedback.toy.imgUrl && <img className="toy-feedback-img" src={feedback.toy.imgUrl} alt="" />}

        <h3 className='toy-feedback-header'>{feedback.toy.name}</h3>

        <span className='toy-feedback-time'>{feedback.createdAt && utilService.getTimeAgo(feedback.createdAt)}</span>
    </CardContent>
}