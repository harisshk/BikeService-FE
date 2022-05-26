import React, { useState } from "react";
import * as Validation from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AlertSnackbar } from '../../components/Snackbar';
import {
    Box,
    Grid,
    FormControl,
    Button,
    MenuItem,
    TextField,
} from '@mui/material';
// Service imports
import { createBike } from "../../services/bikeService";
import { useSelector } from "react-redux";
export const AddBike = (props) => {
    const profileData = useSelector(data => data?.profile)

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: ""
    })
    const navigate = useNavigate();

    const style = { width: "100%", margin: "10px 10px", }
    const BikeSchema = Validation.object().shape({
        bikeMake: Validation.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Bike Make required'),
        bikeModel: Validation.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Bike Model required'),
        engineNumber: Validation.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Engine number required'),
        registrationNumber: Validation.string()
            .min(9, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Registration number required'),
    });
    const formik = useFormik({
        initialValues: {
            bikeMake: '',
            bikeModel: '',
            engineNumber: '',
            registrationNumber: '',

        },
        validationSchema: BikeSchema,
        onSubmit: async (data) => {
            const { bikeMake, bikeModel, engineNumber, registrationNumber } = data
            const registerResponse = await createBike({
                bikeMake,
                bikeModel,
                engineNumber,
                registrationNumber: registrationNumber.toUpperCase(),
                owner: profileData?.id
            })
            console.log(registerResponse, '----')
            if (registerResponse.success) {
                if (registerResponse.duplicate) {
                    setSnackbarInfo({
                        message: "Bike with registration already exists",
                        variant: "warning",
                    });
                    setSnackbarOpen(true);
                } else {
                    setSnackbarInfo({
                        message: "Bike added successfully",
                        variant: "success",
                    });
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate('/bike/all');
                    }, 2000);
                }
            } else {
                setSnackbarInfo({
                    message: "Bike cannot be added",
                    variant: "error",
                });
                setSnackbarOpen(true);
            }
        }
    });
    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <div>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                    <Grid container >
                        <Grid xs={1} md={2} lg={3}>
                        </Grid>
                        <Grid xs={10} md={8} lg={6}>
                            <TextField
                                style={style}
                                fullWidth
                                type="text"
                                label="Bike Make"
                                placeholder="Eg: TVS, Bajaj"
                                {...getFieldProps('bikeMake')}
                                error={Boolean(touched.bikeMake && errors.bikeMake)}
                                helperText={touched.bikeMake && errors.bikeMake}
                            />
                            <TextField
                                style={style}
                                fullWidth
                                type="text"
                                label="Bike Model"
                                placeholder="Eg: Pulsar, Apache"
                                {...getFieldProps('bikeModel')}
                                error={Boolean(touched.bikeModel && errors.bikeModel)}
                                helperText={touched.bikeModel && errors.bikeModel}
                            />
                            <TextField
                                style={style}
                                fullWidth
                                type="text"
                                label="Registration Number"
                                placeholder="Eg: TN00AA0000"
                                {...getFieldProps('registrationNumber')}
                                error={Boolean(touched.registrationNumber && errors.registrationNumber)}
                                helperText={touched.registrationNumber && errors.registrationNumber}
                            />

                            <TextField
                                style={style}
                                fullWidth
                                type="text"
                                label="Engine Number"
                                placeholder="Eg: HJKSDGD34545DFVDF"
                                {...getFieldProps('engineNumber')}
                                error={Boolean(touched.engineNumber && errors.engineNumber)}
                                helperText={touched.engineNumber && errors.engineNumber}
                            />

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
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
        </div>
    )
}

export default AddBike