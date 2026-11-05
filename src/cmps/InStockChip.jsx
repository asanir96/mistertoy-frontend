import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

export function InStockLabel({ inStock, style }) {
    return (
        <Stack direction="row" spacing={1} className='in-stock'>
            {inStock ? <Chip

                sx={style}
                size="small"
                label="In stock"
                icon={<DoneIcon />}
                                    variant="outlined"

                color='success'
            /> :
                <Chip
                    className='in-stock'
                    size="small"
                    sx={style}
                    label="Out of stock"
                    variant="outlined"
                    icon={<BlockIcon />}
                    color='error'
                />}
        </Stack>
    );
}
