import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Typography,
  TextField,
  MenuItem,
  Link
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../../../components/Iconify';
import { Grid, Box, FormControl, Checkbox, Button } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import { AlertSnackbarBC } from '../Snackbar';

// Service imports
import { register } from "../../services/authService";
// ----------------------------------------------------------------------
const Input = styled('input')({
  display: 'none',
});
export default function RegisterForm() {
  const navigate = useNavigate();
  const style = { width: "100%", margin: "10px 10px", }

  const genders = ["Male", "Female", "Other"]
  
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: "",
    variant: ""
  })
  const [uploadData, setUploadData] = useState({
    isTermsAccepted: false
  })
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password is required'),
    gender: Yup.string().required('Gender is required'),
    phoneNumber: Yup.string().required('Phone Number is required').max(10, "Not valid"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      gender: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (data) => {
      if (uploadData.isTermsAccepted) {
        submitHandler(data)
      } else {
        setSnackbarInfo({
          message: "Accept the Terms and condition",
          variant: "warning",
        });
        setSnackbarOpen(true);
      }
    }
  });

  const submitHandler = async (data) => {
    const { name, gender, email, phoneNumber, password } = data
    const registerResponse = await register({
      name,
      gender,
      email,
      phoneNumber,
      password,
      role: "CUSTOMER",
   
    })
    if (!registerResponse.error) {
      if (registerResponse.duplicate) {
        setSnackbarInfo({
          message: "User with email already exists",
          variant: "warning",
        });
        setSnackbarOpen(true);
      } else {
        setSnackbarInfo({
          message: "User added successfully",
          variant: "success",
        });
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    } else {
      setSnackbarInfo({
        message: "User cannot be added",
        variant: "error",
      });
      setSnackbarOpen(true);
    }
  }
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
          <Typography variant="h5" sx={{ px: 3 }}>
            Personal
          </Typography>
          <div style={{ padding: "1vw" }} >
            <Grid container spacing={1}>
              <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6}>
                <TextField
                  style={style}
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6}>
                <FormControl style={style} fullWidth>
                  <TextField
                    select
                    label={"Gender"}
                    {...getFieldProps('gender')}
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    {genders && genders.map((value) => {
                      return (
                        <MenuItem value={value}>{value}</MenuItem>
                      )
                    })}
                  </TextField>
                </FormControl>
              </Grid>
             
              <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6}>
                <TextField
                  style={style}
                  fullWidth
                  type="number"
                  label="Phone Number"
                  {...getFieldProps('phoneNumber')}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>
              <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6}>
                <TextField
                  style={style}
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6}>
                <TextField
                  style={style}
                  fullWidth
                  type="password"
                  label="Password"
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6}>
                <TextField
                  style={style}
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  {...getFieldProps('confirmPassword')}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>
            </Grid>
          </div>
          
          <Box sx={{ px: 2, mt: 1 }} style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={uploadData.isTermsAccepted} onClick={(e) => setUploadData({
              ...uploadData,
              isTermsAccepted: e?.target?.checked
            })} value="accept" color="primary" /> &nbsp;
            <span>Accept  <span style={{ textDecoration: "underline" }}>Terms and Conditions</span></span>
          </Box>
          <br />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="reset" color="error" >
              Reset
            </Button> &nbsp;
            <Button type="submit" variant="contained" >
              Register
            </Button>
          </div>
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Already have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="/login" underline="hover">
              Login.
            </Link>
          </Typography>
        </Form>
      </FormikProvider>
      <AlertSnackbarBC
        open={snackbarOpen}
        message={snackbarInfo.message}
        variant={snackbarInfo.variant}
        handleClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}
