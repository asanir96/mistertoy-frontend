import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';
import Rating from '@mui/material/Rating';

export function FeebackPreview({ feedback }) {
    return <CardContent
        sx={{
            display: 'grid',
            rowGap: '0.3em',
            columnGap: '0.7em',
            gridTemplateColumns: 'min-content 1fr min-content'
        }}>

        {feedback.rating &&
            <Rating
                sx={{ gridColumn: 1, gridRow: 1, justifySelf: 'end', alignSelf: 'center' }}
                value={feedback.rating}
                readOnly
            />}


        <div className='feedback-txt'>
            "{feedback.txt}"
        </div>

    </CardContent>
}