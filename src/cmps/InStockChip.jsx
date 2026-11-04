import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
export function InStockLabel({ inStock }) {
    return (
        <Stack direction="row" spacing={1}>
            {inStock ? <Chip
                sx={{
                    fontSize: '0.7em',
                    padding: '0 1px',

                }}
                size="small"
                label="In stock"
                icon={<DoneIcon />}
                color='success'
            /> :
                <Chip
                    size="small"
                    sx={{
                        fontSize: '0.7em',
                        padding: '0 1px',

                    }}
                    label="Out of stock"
                    variant="filled"
                    icon={<BlockIcon />}
                    color='error'
                />}
        </Stack>
    );
}
