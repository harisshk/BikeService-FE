import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import PageContainer from '../../components/Page';
import RegisterForm from '../../components/Forms/RegisterForm';
// import AuthSocial from '../sections/authentication/AuthSocial';
import registerImage from '../../assets/register.png'
// ----------------------------------------------------------------------

const RootStyle = styled(PageContainer)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 'auto',
  width: '100%',
  padding: theme.spacing(8, 0)
}));

// ----------------------------------------------------------------------

export default function Signup() {
  return (
    <RootStyle title="Register">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
        </Typography>
        <img alt="register" src={registerImage} />
      </SectionStyle>

      <Container>
        <ContentStyle>
          
        <Typography variant="h3" sx={{ px: 3,  }}>
        Student Registration
        </Typography>
          {/* <AuthSocial /> */}

          <RegisterForm />

          {/* <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" color="textPrimary">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="textPrimary">
              Privacy Policy
            </Link>
            .
          </Typography> */}

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
