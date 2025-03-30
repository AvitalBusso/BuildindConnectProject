import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, deletePayment, getPaymentsByUser, updatePaid } from '../slices/paymentsSlice';
import { Box, Button, Typography, TextField, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const MyPayments = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { AllMyPayments } = useSelector((state) => state.payment);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getPaymentsByUser(currentUser.id));
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchData();
  }, []);

  const formatDateForDisplay = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: 3 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#82c7aa' }}>
          My Payments
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {!AllMyPayments.length ? <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 3, boxShadow: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#82c7aa',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',

            }}>
            no payments!!
          </Typography>
        </Paper> :
          <Grid container spacing={3}>
            {Object.entries(AllMyPayments).map(([key, value]) => (
              <Grid item xs={12} key={key}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                  {Object.entries(value).map(([subKey, subValue]) => {
                    if (subKey === 'user' || subKey === 'id') return null;
                    return (
                      <Box key={subKey} sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#a1e5c9' }}>
                          {subKey}:
                        </Typography>
                        <Typography variant="body2">
                          {subKey === 'price' ? (
                            `$${subValue}`
                          ) : subKey === 'paid' ? (
                            <Button
                              variant="contained"
                              color={subValue ? 'success' : 'error'}
                              sx={{ textTransform: 'none' }}
                            >
                              {subValue ? 'Paid' : 'Unpaid'}
                            </Button>
                          ) : subKey === 'date' ? (
                            formatDateForDisplay(subValue) 
                          ) : (
                            subValue
                          )}
                        </Typography>
                      </Box>
                    );
                  })}
                </Paper>
              </Grid>
            ))}
          </Grid>
        }
      </motion.div>
    </Box>
  );
};

export default MyPayments;
