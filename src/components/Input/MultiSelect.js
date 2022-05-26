import { FieldProps } from "formik";
import React from "react";
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
    style,
    setField,
    field,
    form,
    options,
}) => {
    console.log('######', options)
    const onChange = (e) => {
        console.log(e.target?.value)
        const value = e?.target?.value
        setSelected([...value])
        setField('features', [...value])
    };

    const [selected, setSelected] = React.useState([]);
    const getValue = () => {
        if (options) {
            return []
        } else {
            return [];
        }
    };

    return (
        // <Select
        //   className={className}
        //   name={field.name}
        //   value={getValue()}
        // //   onChange={onChange}
        //   placeholder={placeholder}
        //   options={options}
        //   isMulti={isMulti}
        // />
        <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            style={style}
            value={selected}
            onChange={onChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
        >
            {options.map((data) => (
                <MenuItem key={data?._id} value={data?._id}>
                    <Checkbox checked={selected.indexOf(data?._id) > -1 ? true : false} />
                    <ListItemText primary={data?.name} />
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelect;
