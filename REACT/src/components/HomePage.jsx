import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildingById } from '../slices/buildingSlice';
import { Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import MyPayments from '../components/MyPayments';
import MyDetails from '../components/MyDetails';
import Buttons from '../components/Buttons';
import BulletinBoard from '../components/BulletinBoard';
import HomeIcon from '@mui/icons-material/Home'; 
import GeneralPayment from '../components/GeneralPayment';
import Chats from '../components/Chats';
import AdministratorUpdate from '../components/AdministratorUpdate';
import UpdatePayment from '../components/UpdatePayment';
import GroupChat from '../components/GroupChat';
import buildingImage from '../images/building.jpg';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState('buttons');
  const [anchorEl, setAnchorEl] = useState(null); 

  const changePage = (value) => {
    setPage('');
    setTimeout(() => {
      setPage(value);
    }, 0);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Object.keys(currentUser).length === 0) {
          navigate("/login");
        } else {
          await dispatch(getBuildingById(currentUser.building.id));
        }
      } catch (error) {
        console.error('Error fetching building details:', error);
      }
    };
    fetchData();
  }, [dispatch, currentUser]);

  const getUserAvatar = () => {
    return currentUser?.userName ? currentUser.userName.charAt(0).toUpperCase() : '';
  };

  const buttons = [
    { name: 'My Details', page: 'myDetails' },
    { name: 'My Payments', page: 'myPayments' },
    { name: 'Bulletin Board', page: 'bulletinBoard' },
    { name: 'Chats', page: 'chats' },
    { name: 'Group Chat', page: 'groupChat' },
  ];

  if (currentUser.status === 'MANAGER') {
    buttons.push(
      { name: 'General Payment', page: 'GeneralPayment' },
      { name: 'Update Payment', page: 'updatePayment' },
      { name: 'Administrator Update', page: 'administratorUpdate' }
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bgcolor: ' #a1e5c9',
          color: 'white',
          padding: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Building Connect
            </Typography>
            <Typography variant="body1" component="h2" sx={{ fontSize: '1rem', color: 'white' }}>
              Connecting Communities, Managing Buildings! 🏢✨
            </Typography>
          </motion.div>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon
            sx={{
              cursor: 'pointer',
              fontSize: 30,
              color: 'white',
              marginLeft: 2,
            }}
            onClick={() => changePage('buttons')}
          />
          <Avatar
            sx={{ bgcolor: 'white', color: '#a1e5c9', cursor: 'pointer', marginLeft: 2 }}
            onClick={handleAvatarClick}
          >
            {getUserAvatar()}
          </Avatar>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        height: '100%',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url(${buildingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}>
        <Box sx={{
          flex: 1,
          overflowY: 'scroll',
          padding: 3,
          "&::-webkit-scrollbar": { display: 'none' }
        }}>
          {page === 'buttons' && <Buttons changePage={changePage} />}
          {page === 'myDetails' && <MyDetails changePage={changePage} />}
          {page === 'myPayments' && <MyPayments changePage={changePage} />}
          {page === 'bulletinBoard' && <BulletinBoard changePage={changePage} />}
          {page === 'chats' && <Chats changePage={changePage} />}
          {page === 'groupChat' && <GroupChat changePage={changePage} />}
          {page === 'GeneralPayment' && currentUser.status === 'MANAGER' && <GeneralPayment changePage={changePage} />}
          {page === 'administratorUpdate' && currentUser.status === 'MANAGER' && <AdministratorUpdate changePage={changePage} />}
          {page === 'updatePayment' && currentUser.status === 'MANAGER' && <UpdatePayment changePage={changePage} />}
        </Box>

        {page !== 'buttons' && (
          <Box sx={{
            right: 0,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: 1,
            gap: 0.5,
          }}>
            {buttons.map((button) => (
              <button
                key={button.page}
                onClick={() => changePage(button.page)}
                style={{
                  backgroundColor: page === button.page ? '#a1e5c9' : '#B0BEC5',
                  color: 'white',
                  padding: '6px 12px',
                  marginBottom: '5px',
                  borderRadius: '0px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '120px',
                  textAlign: 'center',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                {button.name}
              </button>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
