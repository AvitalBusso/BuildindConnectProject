import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAd, deleteAd, getAdsByBuildingId } from '../slices/adSlice';
import { Box, Button, Typography, TextField, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

function BulletinBoard() {
  const dispatch = useDispatch();
  const { currentBuilding } = useSelector((state) => state.building);
  const { currentUser } = useSelector((state) => state.user);
  const { adsList } = useSelector((state) => state.ad)
  const [showForm, setShowForm] = useState(false);
  const [newAd, setNewAd] = useState({ date: '', title: '', text: '', imageUrl: '', building: currentBuilding });

  const convertDateFormat = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    setNewAd({ ...newAd, date: formattedDate });
  };

  // Function to convert date to user-readable format
  const formatDateForDisplay = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`; 
  };

  useEffect(() => {
    convertDateFormat();
    const fetchData = async () => {
      try {
        const response = await dispatch(getAdsByBuildingId(currentBuilding.id));
        const adsArray = Object.values(response.payload);
        adsArray.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      } catch (error) {
        console.error('Error fetching ads list:', error);
      }
    };
    fetchData();
  }, [dispatch, currentBuilding.id]);

  const addToAdsList = async (e) => {
    if (newAd.title === '' || newAd.text === '') return;
    e.preventDefault();
    try {
      await dispatch(addAd(newAd));

      //clear 
      setNewAd((prevAd) => ({ ...prevAd, title: '', text: '', imageUrl: '' }));

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAd = async (adId) => {
    try {
      await dispatch(deleteAd(adId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#82c7aa' }}>
          Bulletin Board
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Grid container spacing={3}>
          {Object.entries(adsList).map(([key, value]) => (
            <Grid item xs={12} key={key}>
              <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#a1e5c9' }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                  {formatDateForDisplay(value.date)} {/* הצגת התאריך בפורמט הקריא */}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {value.text}
                </Typography>
                {value.imageUrl && (
                  <img src={value.imageUrl} alt="Ad" style={{ width: '100%', borderRadius: '8px' }} />
                )}
                {currentUser.status === 'MANAGER' && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteAd(value.id)}
                      sx={{ marginTop: 2 }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </motion.div>
      {currentUser.status === 'MANAGER' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {showForm === false ? (
            <Button
              variant="contained"
              onClick={() => setShowForm(true)}
              sx={{
                marginTop: 3, bgcolor: '#a1e5c9',
                '&:hover': {
                  backgroundColor: '#82c7aa'
                },
              }}
            >
              Add Ad
            </Button>
          ) : (
            <Box component="form"
              sx={{
                marginTop: 2,
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: 3,
                padding: '12px',
                display: 'flex',
                gap: '10px',
                flexDirection: 'column',
              }}>
              <TextField
                label={<span style={{
                  color: '#a1e5c9',
                }}>
                  Date
                </span>}
                type="datetime-local"
                value={newAd.date.replace(' ', 'T')} // החזרת ה-T ב-form
                onChange={(e) => setNewAd({ ...newAd, date: e.target.value })}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#a1e5c9',
                    }
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label={<span style={{
                  color: '#a1e5c9',
                }}>
                  Title
                </span>}
                value={newAd.title}
                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                fullWidth
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#a1e5c9',
                    }
                  }
                }}
              />
              <TextField
                label={<span style={{
                  color: '#a1e5c9',
                }}>
                  Text
                </span>}
                value={newAd.text}
                onChange={(e) => setNewAd({ ...newAd, text: e.target.value })}
                fullWidth
                multiline
                rows={4}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#a1e5c9',
                    }
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained"
                  onClick={(e) => {
                    setShowForm(false);
                    addToAdsList(e);
                  }}
                  sx={{
                    bgcolor: '#a1e5c9',
                    '&:hover': {
                  backgroundColor: '#82c7aa'
                }
                  }}>
                  Add New Ad
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setShowForm(false);
                    convertDateFormat();
                    setNewAd((prevAd) => ({ ...prevAd, title: '', text: '' }));
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </motion.div>
      )}
    </Box>
  );
}

export default BulletinBoard;