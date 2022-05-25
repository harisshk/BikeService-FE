import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
//
// import account from '../../_mocks_/account';

// ----------------------------------------------------------------------
import { useSelector } from 'react-redux';
// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//     linkTo: '/'
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//     linkTo: '#'
//   },
//   {
//     label: 'Settings',
//     icon: 'eva:settings-2-fill',
//     linkTo: '#'
//   }
// ];

// ----------------------------------------------------------------------

export function AccountPopover() {
  const profile = useSelector(state => state?.profile)
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar>{profile?.name[0]}</Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
          {profile?.role}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))} */}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={()=>{
            localStorage.clear()
            window.location.href = "/login"
          }}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

export default AccountPopover