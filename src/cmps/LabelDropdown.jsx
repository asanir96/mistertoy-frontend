import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


export function LabelDropdown({ labels, selectedLabels=[], handleChange }) {
    const theme = useTheme();
    const [selectedLabelsToEdit, setSelectedLabelsToEdit] = useState(selectedLabels);

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

    function getStyles(label, selectedLabelsToEdit, theme) {
        return {
            fontWeight: selectedLabelsToEdit.includes(label)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    function onOptionSelect(ev) {
        const { target: { value } } = ev;
        setSelectedLabelsToEdit(typeof value === 'string' ? value.split(',') : value,);
        handleChange(ev)
    }

    function onRemoveLabel(value, ev) {
        ev.preventDefault()
        ev.target.value = selectedLabelsToEdit.filter(label => label !== value)
        ev.target.name='labels'
        setSelectedLabelsToEdit(prev => prev.filter(label => label !== value));
        handleChange(ev)
    }

    function hanedleClick(ev) {
        ev.stopPropagation()
    }

    return <FormControl sx={{ m: 1, width: 300, marginInline: 0 }}>
        <InputLabel id="demo-multiple-chip-label">Label</InputLabel>
        <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            name='labels'
            multiple
            value={selectedLabelsToEdit}

            onChange={onOptionSelect}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value}
                            label={value}
                            onMouseDown={ev => ev.stopPropagation()}
                            onClick={hanedleClick}
                            onDelete={ev => onRemoveLabel(value, ev)} />
                    ))}
                </Box>
            )}
            MenuProps={MenuProps}
        >
            {labels.map((label) => (
                <MenuItem
                    key={label}
                    value={label}
                    style={getStyles(label, selectedLabelsToEdit, theme)}
                >
                    {label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}

