import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsList } from '../slices/buildingSlice';
import { getPaymentsByUser, } from '../slices/paymentsSlice';
import { motion } from 'framer-motion';
import Email from '../components/Email';
import { addNewPayment, deleteById, updateP } from '../services/paymentsService';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function UpdatePayment() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { tenants, currentBuilding } = useSelector((state) => state.building);
  const [tenantPayment, setTenantPayment] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [newPayment, setNewPayment] = useState({
    date: '',
    paid: 'false',
    price: currentBuilding.monthPrice,
    user: selectedTenant
  });

  const convertDateFormat = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(
      now.getHours()
    ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setNewPayment({
      date: formattedDate,
      paid: false,
      price: currentBuilding.monthPrice,
      user: selectedTenant
    });
  };

  useEffect(() => {
    dispatch(getTenantsList(currentBuilding.id));
  }, [dispatch, currentBuilding.id]);

  useEffect(() => {
    convertDateFormat();
    if (selectedTenant) {
      dispatch(getPaymentsByUser(selectedTenant.id))
        .then((response) => {
          if (response.payload?.status === 404) {
            setTenantPayment([]);
          } else {
            setTenantPayment(response.payload);
          }
        })
        .catch((error) => console.error('Error fetching payments:', error));
    }
  }, [selectedTenant]);

  const handleCardClick = (tenant) => {
    setSelectedTenant(tenant);
  };

  const handleMarkAsPaid = (paymentId) => {
    setTenantPayment(prevTenantPayments =>
      prevTenantPayments.map(payment =>
        payment.id === paymentId
          ? { ...payment, paid: !payment.paid }
          : payment
      )
    );
    updateP(paymentId);
  };

  const handleDeletePayment = (paymentId) => {
    setTenantPayment(prevTenantPayments =>
      prevTenantPayments.filter(payment => payment.id !== paymentId)
    );
    deleteById(paymentId)
  };

  const addToPayments = (e) => {
    e.preventDefault();
    if (newPayment.price !== '') {
      setTenantPayment([...tenantPayment, newPayment])
      addNewPayment(newPayment)
    }
  };

  const formatDateForDisplay = (date) => {
    const dateObj = new Date(date);
    return `${String(dateObj.getDate()).padStart(2, '0')}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, '0')}-${dateObj.getFullYear()} ${String(
      dateObj.getHours()
    ).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        padding: 3,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#f5f5f5',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontWeight: 'bold',
              color: '#82c7aa'

            }}
          >
            Choose the tenant:
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center'
              }}
            >

              {tenants.map((tenant) => (
                <motion.div
                  key={tenant.id}
                  onClick={() => {
                    handleCardClick(tenant);
                    setShowForm(false);
                  }}

                  style={{
                    backgroundColor: selectedTenant?.id === tenant.id ? '#a1e5c9' : '#B0BEC5', // צבע שונה כאשר נבחר
                    color: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    width: '150px',
                    textAlign: 'center',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Typography variant="h6">{tenant.userName}</Typography>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {selectedTenant && (
            <Box sx={{ marginTop: 4 }}>
              <Grid container spacing={2}>
                {tenantPayment.length > 0 &&
                  Object.entries(tenantPayment).map(([key, value]) => (
                    <Grid item xs={12} key={key}>
                      <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: 2 }}>
                        {Object.entries(value).map(([subKey, subValue]) => {
                          if (subKey === 'user' || subKey === 'id') return null;
                          return (
                            <Box
                              key={subKey}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: 1
                              }}
                            >
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
                                    onClick={() => handleMarkAsPaid(value.id)}
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
                        {currentUser.status === 'MANAGER' && (
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDeletePayment(value.id)}
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

              {showForm === false ? (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginTop: 3, paddingX: 2 }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setShowForm(true)}
                    sx={{ marginTop: 3, bgcolor: '#a1e5c9', '&:hover': { backgroundColor: '#82c7aa' } }}
                  >
                    Add Payment
                  </Button>
                  <Email
                    tenant={{
                      userName: selectedTenant.userName,
                      email: selectedTenant.email,
                      managerEmail: currentUser.email
                    }}
                  />
                </Box>
              ) : (
                <Box component="form" sx={{ marginTop: 4 }}>
                  <TextField
                    label={<span style={{
                      color: '#a1e5c9',
                    }}>
                      Date and Time
                    </span>}
                    type="datetime-local"
                    value={newPayment.date}
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, date: e.target.value })
                    }
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#a1e5c9',
                        }
                      }
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Button
                      variant="contained"
                      color={newPayment.paid === true ? 'success' : 'error'}
                      onClick={(e) => {
                        e.preventDefault();
                        setNewPayment({
                          ...newPayment,
                          paid: !newPayment.paid
                        });
                      }}
                      sx={{ marginRight: 2 }}
                    >
                      Paid: {newPayment.paid === false ? 'No' : 'Yes'}
                    </Button>
                    <TextField
                      label=
                      {<span style={{
                        color: '#a1e5c9',
                      }}>
                        price
                      </span>}
                      value={newPayment.price}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, price: e.target.value })
                      }
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#a1e5c9',
                          }
                        }
                      }}
                      type="number"
                      onKeyDown={(event) => {
                        if (event.key === '-') {
                          event.preventDefault();
                        }
                      }}
                      inputProps={{ min: 0 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        setShowForm(false);
                        addToPayments(e);
                        convertDateFormat();
                      }}
                      sx={{
                        bgcolor: '#a1e5c9'
                      }}
                    >
                      Add New
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setShowForm(false);
                        convertDateFormat();
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>

              )}

            </Box>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}

export default UpdatePayment;