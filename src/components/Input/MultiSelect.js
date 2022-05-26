import React, { useState } from "react";

//MUI imports
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export const CustomSelect = ({
    setField,
    options,
    placeHolder
}) => {
    const onChange = (e) => {
        const value = e?.target?.value
        var arrIds = []
        var amount = []
        options.forEach(item => {
            value.forEach(item1 => {
                if (item1 === item?.name) {
                    arrIds.push(item?._id)
                    amount.push(item?.estimatedAmount)
                }
            })
        })
        const sum = amount.reduce((value, item) => value + item, 0);
        setField('features', arrIds || [])
        setField('estimatedAmount', sum || 0)
        setSelected([...value])
    };

    const [selected, setSelected] = useState([]);

    return (

        <Select
            multiple
            label="Service"
            value={selected}
            placeholder={placeHolder}
            onChange={onChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
        >
            {options.map((data) => (
                <MenuItem key={data?._id} value={data?.name}>
                    <Checkbox checked={selected.indexOf(data?.name) > -1 ? true : false} />
                    <ListItemText primary={data?.name} />
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelect;
