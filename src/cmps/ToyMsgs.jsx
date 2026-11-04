import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';


export function ToyMsgs({ msgs }) {
    if (!msgs.length) return
    <div>No messages yet..</div>


    return <ul>
        {msgs.map(msg => {
            return <li>
                <Card className='toy-msg'
                    variant="outlined"
                >
                    <CardContent
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr'
                        }}>
                        <div className='msg-txt'>
                            "{msg.txt}"
                        </div>
                        <div className='msg-by'
                            style={{ display: "flex", alignItems: 'center', gap: "0.5em", marginBlockStart: "10px" }}>
                            <Avatar
                                className='msg-by-avatar'
                                sizes='small'
                                style={{ width: "30px", height: "30px" }}></Avatar>{msg.by.username}
                        </div>
                        <span className='msg-time'>{msg.createdAt && utilService.getTimeAgo(msg.createdAt)}</span>
                    </CardContent>
                </Card>
            </li>
        })}
    </ul>
}