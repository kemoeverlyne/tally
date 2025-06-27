import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface HeaderProps {}

const Logo: React.FC = () => (
  <Box sx={{ position: 'relative', display: 'inline-block', cursor: 'pointer', transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)', '&:hover': { transform: 'scale(1.08)', filter: 'drop-shadow(0 0 16px #7b2ff2cc)' } }}>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <rect width="48" height="48" rx="16" fill="url(#paint0_linear)"/>
      <path d="M14 24C14 19.134 19.04 15 24 15C28.96 15 34 19.134 34 24C34 28.866 28.96 33 24 33C22.36 33 20.82 32.77 19.48 32.36L15 33L15.84 28.38C14.48 26.13 14 24.63 14 24Z" fill="white"/>
      <circle cx="19.5" cy="24.5" r="2" fill="#7b2ff2"/>
      <circle cx="24" cy="24.5" r="2" fill="#7b2ff2"/>
      <circle cx="28.5" cy="24.5" r="2" fill="#7b2ff2"/>
      <g filter="url(#sparkle)"><circle cx="38" cy="12" r="2.5" fill="#f357a8"/></g>
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7b2ff2"/>
          <stop offset="1" stopColor="#f357a8"/>
        </linearGradient>
        <filter id="sparkle" x="32" y="6" width="12" height="12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
    </svg>
    {/* Shimmer overlay */}
    <Box sx={{
      pointerEvents: 'none',
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      borderRadius: '16px',
      background: 'linear-gradient(120deg, transparent 30%, #fff7 50%, transparent 70%)',
      opacity: 0.7,
      transform: 'translateX(-60%)',
      animation: 'shimmerLogo 2.2s infinite',
    }} />
    <style>{`
      @keyframes shimmerLogo {
        0% { transform: translateX(-60%); }
        100% { transform: translateX(120%); }
      }
    `}</style>
  </Box>
);

const StatusDot: React.FC = () => (
  <Box component="span" sx={{
    display: 'inline-block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    bgcolor: '#4ade80',
    boxShadow: '0 0 6px #4ade80cc',
    mr: 1,
    verticalAlign: 'middle',
  }} />
);

const Header: React.FC<HeaderProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 2px 24px #7b2ff233',
        borderBottom: '1.5px solid #e0e7ff',
        zIndex: 100,
        transition: 'background 0.4s cubic-bezier(.4,2,.6,1), color 0.4s cubic-bezier(.4,2,.6,1)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 72, md: 96 }, px: { xs: 1, md: 4 }, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 900,
              letterSpacing: -1.5,
              fontFamily: 'Poppins',
              fontSize: { xs: 22, md: 36 },
              color: '#5f3dc4',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'color 0.3s cubic-bezier(.4,2,.6,1)',
              cursor: 'pointer'
            }}
          >
            Tally Assistant
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#7b2ff2',
              fontWeight: 600,
              fontFamily: 'Poppins',
              opacity: 0.95,
              display: 'flex',
              alignItems: 'center',
              fontSize: { xs: 13, md: 16 },
              mt: 0.5,
            }}
          >
            <StatusDot />Online • Powered by Nexa
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
          <IconButton onClick={handleMenu} sx={{ ml: 2 }}>
            <Avatar src="https://ui-avatars.com/api/?name=Alex+User&background=7b2ff2&color=fff&rounded=true&size=48" alt="User" sx={{ width: 40, height: 40, boxShadow: '0 2px 8px #7b2ff233', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 4px 16px #7b2ff299' } }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { mt: 1, minWidth: 160, borderRadius: 2 } }}
          >
            <MenuItem onClick={handleClose} sx={{ fontFamily: 'Poppins' }}><AccountCircle sx={{ mr: 1 }} /> Profile</MenuItem>
            <MenuItem onClick={handleClose} sx={{ fontFamily: 'Poppins' }}>Settings</MenuItem>
            <MenuItem onClick={handleClose} sx={{ fontFamily: 'Poppins', color: '#f357a8' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 