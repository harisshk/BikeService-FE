import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// mocks_
// import account from '../../_mocks_/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components

import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import sidebarConfig from './SidebarConfig';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const profile = useSelector(state => state.profile)
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        {/* <Logo /> */}
        <h2>Bike Service</h2>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar>{profile?.name[0]}</Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {profile?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {profile?.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} profile={profile} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

export default DashboardSidebar