// import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const PageContainer = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    {console.log(children)}
    <head>
      <title>{title}</title>
    </head>
    {children}
  </Box>
));


export default PageContainer;
