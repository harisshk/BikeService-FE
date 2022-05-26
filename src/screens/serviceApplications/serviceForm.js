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
} from '@mui/material';
// Service imports
import {  getUserBikes } from "../../services/bikeService";
import { useSelector } from "react-redux";
import { getAllFeatures } from "../../services/featuresService";
import CustomSelect from "../../components/Input/MultiSelect";
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
            // const { bikeMake, bikeModel, engineNumber, registrationNumber } = data
            // const registerResponse = await createBike({
            //     bikeMake,
            //     bikeModel,
            //     engineNumber,
            //     registrationNumber: registrationNumber.toUpperCase(),
            //     owner: profileData?.id
            // })
            // console.log(registerResponse, '----')
            // if (registerResponse.success) {
            //     if (registerResponse.duplicate) {
            //         setSnackbarInfo({
            //             message: "Bike with registration already exists",
            //             variant: "warning",
            //         });
            //         setSnackbarOpen(true);
            //     } else {
            //         setSnackbarInfo({
            //             message: "Bike added successfully",
            //             variant: "success",
            //         });
            //         setSnackbarOpen(true);
            //         setTimeout(() => {
            //             navigate('/bike/all');
            //         }, 2000);
            //     }
            // } else {
            //     setSnackbarInfo({
            //         message: "Bike cannot be added",
            //         variant: "error",
            //     });
            //     setSnackbarOpen(true);
            // }
        }
    });
    const { errors, touched, handleSubmit, getFieldProps, setFieldValue, values } = formik;
    const fetchData = async () => {
        const [featuresResponse, bikeResponse] = await Promise.all([
            getAllFeatures(),
            getUserBikes(profileData?.id)
        ]);
        if(featuresResponse?.success && bikeResponse?.success){
            setBikes(bikeResponse?.data)
            setFeatures(featuresResponse?.data)
        }
    }
    useEffect(() => {
        fetchData()
    },[])
    return (
        <div>
            {console.log(values, '00000000')}
            <FormikProvider value={formik}>
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

                            <CustomSelect style={style} options={features} setField={setFieldValue}
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

export default CreateService