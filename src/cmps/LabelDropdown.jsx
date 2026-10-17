import { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


export function LabelDropdown({ labels, filterBy, handleChange }) {
    const theme = useTheme();
    const [selectedLabels, setSelectedLabels] = useState([]);


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 0;
    const MenuProps = {
        slotProps: {
            paper: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight: personName.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    function onOptionSelect(ev) {
        const { target: { value } } = ev;
        setSelectedLabels(typeof value === 'string' ? value.split(',') : value,);
        handleChange(ev)
    }

    return <div class="label-select">
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Label</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                name='labels'
                multiple
                value={selectedLabels}
                onChange={onOptionSelect}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {labels.map((label) => (
                    <MenuItem
                        key={label}
                        value={label}
                        style={getStyles(label, selectedLabels, theme)}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
}

