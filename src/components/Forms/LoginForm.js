import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { AlertSnackbarBC } from '../../components/Snackbar';

// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../components/Iconify';
// redux
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/action/profile'
// ----------------------------------------------------------------------
import { login } from '../../services/authService';
export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: "",
    variant: ""
  })
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (data) => {
      const { email, password } = data
      const loginResponse = await login(email, password)
      if (loginResponse.success) {
        dispatch(setProfile(loginResponse));
        navigate('/home', { replace: true });
      }
      else {
        if (loginResponse.message === "Mismatch email / password") {
          setSnackbarInfo({
            message: "Credentials error",
            variant: "error"
          })
          setSnackbarOpen(true)
        } else if (loginResponse.message === "No account found using this email Id") {
          setSnackbarInfo({
            message: "Credentials error",
            variant: "error"
          })
          setSnackbarOpen(true)
        } else {
          setSnackbarInfo({
            message: "Something went wrong",
            variant: "error"
          })
          setSnackbarOpen(true)
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };


  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="end" justifyContent="end" sx={{ my: 2 }}>
            {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

            <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}

          >
            Login
          </LoadingButton>
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

export default LoginForm