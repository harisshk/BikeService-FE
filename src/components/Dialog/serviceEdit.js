import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import {
    Box,
    Grid,
    Button,
    MenuItem,
    FormControl,
    TextField,
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';

function ServiceEdit(props) {
    const { open, onHide, data, onSubmit } = props
    const style = { width: "100%", margin: "10px 10px", }
    const formik = useFormik({
        initialValues: {
            status: '',
            serviceAmount: '',
            id: ''

        },
        onSubmit: async (data) => {
            const { status, serviceAmount, id } = data
            onSubmit(status, serviceAmount, id)
        }
    });
    const statusId = {
        "REQUESTED": 0,
        "PENDING": 1,
        "READYFORDELIVERY": 2,
        "COMPLETED": 3
    }
    const status = [
        { name: 'Requested', value: 'REQUESTED' },
        { name: 'Pending', value: 'PENDING' },
        { name: 'Ready for Delivery', value: 'READYFORDELIVERY' },
        { name: 'Completed', value: 'COMPLETED' }
    ]
    const { errors, touched, handleSubmit, getFieldProps, setFieldValue, values } = formik;
    useEffect(() => {
        if (open) {
            console.log(data?.status, data, '-----')
            setFieldValue('status', data?.status)
            setFieldValue('serviceAmount', data?.serviceAmount)
            setFieldValue('id', data?._id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    return (
        <Dialog header={"Service Edit"} visible={open} style={{ minWidth: "50vw" }} onHide={() => onHide()} breakpoints={{ '1440': "90vw" }} draggable={false} focusOnShow={false} closeOnEscape={false}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                    <Grid container >
                        <FormControl style={style} fullWidth>
                            <TextField
                                select
                                label={"Change Status"}
                                value={values.status}
                                {...getFieldProps('status')}
                                error={Boolean(touched.gender && errors.gender)}
                                helperText={touched.gender && errors.gender}
                            >
                                {status && status.map((value, index) => {
                                    if (index >= statusId[data?.status]) {
                                        return (
                                            <MenuItem key={value?.value} value={value?.value}>{value?.name}</MenuItem>
                                        )
                                    }
                                    return null
                                })}
                            </TextField>
                        </FormControl>
                        <FormControl style={style}>
                            <TextField
                                type="number"
                                label="Estimated Amount"
                                value={values?.serviceAmount}
                                {...getFieldProps('serviceAmount')}
                                error={Boolean(touched.serviceAmount && errors.serviceAmount)}
                                helperText={touched.serviceAmount && errors.serviceAmount}
                            />
                        </FormControl>
                        <Box sx={{ mt: 3 }} style={{ display: "flex", justifyContent: "end" }}>
                            <Button onClick={()=>onHide()} type='button' color="error" >
                                Close
                            </Button> &nbsp;
                            <Button type="submit" variant="contained" >
                                Update
                            </Button>
                        </Box>
                    </Grid>

                </Form>
            </FormikProvider>
        </Dialog>
    )
}


export default ServiceEdit