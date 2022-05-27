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
import { createFeature, editFeature, getFeatureById } from "../../services/featuresService";
import Loader from "../../components/Loader";
export const FeatureForm = () => {
    const featureId = useParams() || false
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: ""
    })
    const navigate = useNavigate();
    const style = { width: "100%", margin: "10px 10px", }
    const featureSchema = Validation.object().shape({
        name: Validation.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name is required'),
        estimatedAmount: Validation.number()
            .required('Estimated Amount is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            estimatedAmount: 0,
        },
        validationSchema: featureSchema,
        onSubmit: async (data) => {
            setIsLoading(true)
            const registerResponse = isEdit ?
                await editFeature(featureId?.id, data)
                :
                await createFeature(data)
            if (registerResponse.success) {

                setSnackbarInfo({
                    message: `Bike ${isEdit ? 'updated' : 'added'} successfully`,
                    variant: "success",
                });
                setSnackbarOpen(true);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/features/all');
                }, 2000);
            } else {
                setIsLoading(false)
                setSnackbarInfo({
                    message: `Feature cannot be ${isEdit ? 'updated' : 'added'}`,
                    variant: "error",
                });
                setSnackbarOpen(true);
            }

        }
    });
    const { errors, touched, handleSubmit, getFieldProps, values, setFieldValue } = formik;
    const getDataById = async () => {
        setIsLoading(true)
        const response = await getFeatureById(featureId?.id)
        if (response?.success) {
            const { name, estimatedAmount } = response.data
            setFieldValue('name', name)
            setFieldValue('estimatedAmount', estimatedAmount)
        } else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Feature cannot be fetched`,
                variant: "error",
            });
        }
        setIsLoading(false)
    }
    useEffect(() => {
        if (featureId?.id) {
            setIsEdit(true)
            getDataById()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featureId?.id])
    return (
        <div>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                    <Grid container >
                        <Grid xs={1} md={2} lg={3} item>
                        </Grid>
                        <Grid xs={10} md={8} lg={6} item>
                            <TextField
                                style={style}
                                fullWidth
                                type="text"
                                label="Name"
                                value={values.name}
                                placeholder="Eg: Oil Service"
                                {...getFieldProps('name')}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <TextField
                                style={style}
                                fullWidth
                                type="number"
                                label="Estimated Amount"
                                placeholder="Eg: 120"
                                {...getFieldProps('estimatedAmount')}
                                error={Boolean(touched.estimatedAmount && errors.estimatedAmount)}
                                helperText={touched.estimatedAmount && errors.estimatedAmount}
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
                        <Grid xs={1} md={2} lg={3} item>
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

export default FeatureForm