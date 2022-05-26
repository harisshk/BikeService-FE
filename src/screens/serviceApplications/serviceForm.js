import React, { useState, useEffect } from "react";
import * as Validation from 'yup';
import { useFormik, Form, FormikProvider, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AlertSnackbar } from '../../components/Snackbar';
import {
    Box,
    Grid,
    Button,
    MenuItem,
    FormControl,
    TextField,
    Typography,
    InputLabel
} from '@mui/material';
// Service imports
import { getUserBikes } from "../../services/bikeService";
import { useSelector } from "react-redux";
import { getAllFeatures } from "../../services/featuresService";
import CustomSelect from "../../components/Input/MultiSelect";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { parse } from 'date-fns'
import { bookService } from "../../services/servicesService";

export const CreateService = (props) => {
    const profileData = useSelector(data => data?.profile)

    const [bikes, setBikes] = useState([])
    const [features, setFeatures] = useState([])
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: ""
    })
    const navigate = useNavigate();

    const style = { width: "100%", margin: "10px 10px", }
    const formik = useFormik({
        initialValues: {
            bike: '',
            features: [],
            bookingDate: new Date(),
            estimatedAmount: 0

        },
        onSubmit: async (data) => {
            const { bike, features, bookingDate, estimatedAmount } = data
            if (bike !== '' && features?.length !== 0 && bookingDate !== '') {
                const response = await bookService({
                    bike,
                    features,
                    owner: profileData?.id,
                    bookingDate: bookingDate.toISOString(),
                    serviceAmount: estimatedAmount
                })
                if (response.success) {
                    setSnackbarInfo({
                        message: "Bike added successfully",
                        variant: "success",
                    });
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate('services/all');
                    }, 2000);
                } else {
                    setSnackbarInfo({
                        message: "Bike cannot be added",
                        variant: "error",
                    });
                    setSnackbarOpen(true);
                }
            } else {
                setSnackbarInfo({
                    message: "All fields are required",
                    variant: "warning",
                });
                setSnackbarOpen(true);
            }
        }
    });
    const { errors, touched, handleSubmit, getFieldProps, setFieldValue, values } = formik;
    const fetchData = async () => {
        const [featuresResponse, bikeResponse] = await Promise.all([
            getAllFeatures(),
            getUserBikes(profileData?.id)
        ]);
        if (featuresResponse?.success && bikeResponse?.success) {
            setBikes(bikeResponse?.data)
            setFeatures(featuresResponse?.data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            {bikes.length !== 0 ? <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                    <Grid container >
                        <Grid xs={1} md={2} lg={3}>
                        </Grid>
                        <Grid xs={10} md={8} lg={6}>
                            <FormControl style={style} fullWidth>
                                <TextField
                                    multiple
                                    select
                                    label={"Bike"}
                                    {...getFieldProps('bike')}
                                    error={Boolean(touched.gender && errors.gender)}
                                    helperText={touched.gender && errors.gender}
                                >
                                    {bikes && bikes.map((value) => {
                                        return (
                                            <MenuItem value={value?._id}>{value?.bikeMake + ' - ' + value?.registrationNumber}</MenuItem>
                                        )
                                    })}
                                </TextField>
                            </FormControl>
                            <FormControl style={style} fullWidth>
                                <InputLabel id="test-select-label">Service</InputLabel>

                                <CustomSelect placeHolder={'Service'} options={features} setField={setFieldValue}
                                />
                            </FormControl>
                            <FormControl style={style}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        label="Booking Date"
                                        style={style}
                                        minDate={new Date()}
                                        value={values.bookingDate}
                                        onChange={(newValue) => {
                                            setFieldValue('bookingDate', new Date(newValue));
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl>
                                <Typography variant="h5">Estimated Amount : {values?.estimatedAmount} </Typography>
                            </FormControl>
                            <Box sx={{ mt: 3 }} style={{ display: "flex", justifyContent: "end" }}>
                                <Button type="reset" color="error" >
                                    Reset
                                </Button> &nbsp;
                                <Button type="submit" variant="contained" >
                                    Create
                                </Button>
                            </Box>
                        </Grid>
                        <Grid xs={1} md={2} lg={3}>
                        </Grid>
                    </Grid>

                </Form>
            </FormikProvider>
                :
                <Box>
                    <Typography variant="h5">
                        Add Bike to book a service
                    </Typography>
                </Box>}
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
        </div>
    )
}

export default CreateService