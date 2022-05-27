import React, { useState, useEffect } from "react";
import * as Validation from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertSnackbar } from '../../components/Snackbar';
import {
    Box,
    Grid,
    Button,
    TextField,
} from '@mui/material';
// Service imports
import { createBike, getBikeById, editBikeData } from "../../services/bikeService";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
export const BikeForm = (props) => {
    const profileData = useSelector(data => data?.profile)
    const bikeId = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
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
            setIsLoading(true)
            const { bikeMake, bikeModel, engineNumber, registrationNumber } = data
            const registerResponse = isEdit ?
                await editBikeData(bikeId?.id, {
                    bikeMake,
                    bikeModel,
                    engineNumber,
                    registrationNumber: registrationNumber.toUpperCase(),
                    owner: profileData?.id
                })
                :
                await createBike({
                    bikeMake,
                    bikeModel,
                    engineNumber,
                    registrationNumber: registrationNumber.toUpperCase(),
                    owner: profileData?.id
                })
            if (registerResponse.success) {
                if (registerResponse.duplicate) {
                    setSnackbarInfo({
                        message: "Bike with registration already exists",
                        variant: "warning",
                    });
                    setSnackbarOpen(true);
                } else {
                    setSnackbarInfo({
                        message: `Bike ${isEdit ? 'updated' : 'added'} successfully`,
                        variant: "success",
                    });
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate('/bike/all');
                    }, 2000);
                }
            } else {
                setIsLoading(false)
                setSnackbarInfo({
                    message: `Bike cannot be ${isEdit ? 'updated' : 'added'}`,
                    variant: "error",
                });
                setSnackbarOpen(true);
            }
        }
    });
    const { errors, touched, handleSubmit, getFieldProps, values, setFieldValue } = formik;
    const getBikeData = async () => {
        const response = await getBikeById(bikeId?.id)
        setIsLoading(true)
        if (response?.success) {
            const { bikeMake, bikeModel, registrationNumber, engineNumber } = response.data
            setFieldValue('bikeMake', bikeMake)
            setFieldValue('bikeModel', bikeModel)
            setFieldValue('registrationNumber', registrationNumber)
            setFieldValue('engineNumber', engineNumber)
        } else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Bike data cannot be fetched`,
                variant: "error",
            });
        }
        setIsLoading(false)
    }
    useEffect(() => {
        if (bikeId?.id) {
            setIsEdit(true)
            getBikeData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bikeId?.id])
    return (
        <div>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                    <Grid container >
                        <Grid item xs={1} md={2} lg={3}>
                        </Grid>
                        <Grid item xs={10} md={8} lg={6}>
                            <TextField
                                style={style}
                                fullWidth
                                type="text"
                                label="Bike Make"
                                value={values.bikeMake}
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
                                    {!isEdit ? 'Create' : 'Update'}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={1} md={2} lg={3}>
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
            <Loader open={isLoading} />
        </div>
    )
}

export default BikeForm