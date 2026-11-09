import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';
import Rating from '@mui/material/Rating';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export function FeebackPreview({ feedback }) {
    const initials = feedback.by ? utilService.getUserInitials(feedback.by) : null

    const customIcons = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon
                color="error"
                sx={{
                    gridRow: '1/3',
                    alignSelf: 'center',
                    width: '50px',
                    fontSize: '2em'
                }} />,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon
                color="error"
                sx={{
                    gridRow: '1/3',
                    alignSelf: 'center',
                    width: '50px',
                    fontSize: '2em'
                }} />,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon
                color="warning"
                sx={{ gridRow: '1/3', alignSelf: 'center', width: '50px', fontSize: '2em' }} />,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon
                color="success"
                sx={{ gridRow: '1/3', alignSelf: 'center', width: '50px', fontSize: '2em' }} />,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon
                color="success"
                sx={{ gridRow: '1/3', alignSelf: 'center', width: '50px', fontSize: '2em' }} />,
            label: 'Very Satisfied',
        },
    }
    return <CardContent
        sx={{
            display: 'grid',
            rowGap: '0.3em',
            columnGap: '0.7em',
            gridTemplateColumns: 'min-content 1fr min-content'
        }}>

        {feedback.rating && customIcons[feedback.rating].icon}

        <h3>{feedback.by?.fullname ? feedback.by.fullname : feedback.by.username}</h3>

        <div className='feedback-txt'>
            "{feedback.txt}"
        </div>



        <span className='msg-time'>{feedback.createdAt && utilService.getTimeAgo(feedback.createdAt)}</span>
    </CardContent>
}