import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
export function FloatingAddBtn() {
    return (
        <Box sx={{
            '& > :not(style)': { m: 1 },
            position: 'fixed'
            , right: '2em',
            bottom: '2em'
        }}>
            <Tooltip title="Add a toy">
                <Link to="/toy/edit">
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Tooltip>

        </Box>
    );
}