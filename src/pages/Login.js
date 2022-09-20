// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '800px',
  maxWidth: 900,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  backgroundColor: '#F9FAFB',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <img src="/static/illustrations/logo_h3m.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Connecter à votre compte H3M-BTP
            </Typography> <br/>

            {/* <AuthSocial /> */}

            <LoginForm />

            {/* {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )} */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}