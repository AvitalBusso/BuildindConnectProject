import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Buttons = ({ changePage }) => {
  const { currentUser } = useSelector((state) => state.user);

  // Common button style
  const buttonStyle = {
    bgcolor: "#a1e5c9",
    marginBottom: 2,
    padding: 1.5,
    '&:hover': { backgroundColor: '#82c7aa' },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        borderRadius: 3,
        padding: 4,
        boxShadow: 3,
        textAlign: 'center',
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#6cad91' }}>
        Choose Your Section
      </Typography>

      {/* Buttons for different sections */}
      <Button variant="contained" fullWidth sx={buttonStyle} onClick={() => changePage('myDetails')}>
        My Details
      </Button>
      <Button variant="contained" fullWidth sx={buttonStyle} onClick={() => changePage('myPayments')}>
        My Payments
      </Button>
      <Button variant="contained" fullWidth sx={buttonStyle} onClick={() => changePage('bulletinBoard')}>
        Bulletin Board
      </Button>
      <Button variant="contained" fullWidth sx={buttonStyle} onClick={() => changePage('chats')}>
        Chats
      </Button>
      <Button variant="contained" fullWidth sx={buttonStyle} onClick={() => changePage('groupChat')}>
        Group Chat
      </Button>

      {/* Buttons visible only for the manager */}
      {currentUser.status === 'MANAGER' && (
        <>
          <Button variant="contained" fullWidth sx={buttonStyle} onClick={() => changePage('GeneralPayment')}>
            General Payment
          </Button>
          <Button variant="contained" fullWidth sx={buttonStyle} onClick={() => changePage('updatePayment')}>
            Update Payment
          </Button>
          <Button variant="contained" fullWidth sx={{ ...buttonStyle, backgroundColor: 'darkred', '&:hover': { backgroundColor: 'red' } }} onClick={() => changePage('administratorUpdate')}>
            Administrator Update
          </Button>
        </>
      )}
    </Box>
  );
};

export default Buttons;
