import { Box, Button, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addGeneralPayment } from '../slices/paymentsSlice';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import emailjs from '@emailjs/browser';
import { getTenantsList } from '../slices/buildingSlice';

function GeneralPayment() {
  const dispatch = useDispatch();
  const { currentBuilding } = useSelector((state) => state.building);
  const { tenants } = useSelector((state) => state.building);
  const [newPayment, setNewPayment] = useState({ date: '', paid: 'false', price: currentBuilding.monthPrice });
  const [added, setAdded] = useState(false);

  // Format and set the current date and time
  const convertDateFormat = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);  // Simplified date format: YYYY-MM-DDTHH:MM
    setNewPayment({ date: formattedDate, paid: 'false', price: currentBuilding.monthPrice });
  };

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        convertDateFormat();
        await dispatch(getTenantsList(currentBuilding.id));
      } catch (error) {
        console.error("Error fetching tenants list:", error);
      }
    };
    fetchTenants();
  }, [currentBuilding.id, dispatch]);

  // Handle form submission
  const addPayment = async (e) => {
    e.preventDefault();
    setAdded(true);
    try {
      await dispatch(addGeneralPayment({ payment: newPayment, buildingId: currentBuilding.id }));
      tenants.forEach(sendEmail);
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  // Send email to each tenant
  const sendEmail = (tenant) => {
    const emailContent = `Dear ${tenant.userName},\n\nThis is a notification from Building Connect: A new monthly payment has been added. Thank you!\n\nBuilding Connect Team`;
    const templateParams = {
      from_name: "Building Connect",
      from_email: "buildingconnect2024@gmail.com",
      to_name: tenant.userName,
      to_email: tenant.email,
      message: emailContent,
    };

    emailjs.send("service_ID", "template_ID", templateParams, "YB2n9plR_9_n5ymry")
      .then(response => console.log("Email sent:", response))
      .catch(error => console.error("Email sending error:", error));
  };

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: 3 }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#82c7aa' }}>
          Adding a monthly payment
        </Typography>
      </motion.div>
      {!added ? (
        <Box sx={{ bgcolor: '#f5f5f5', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <Box component="form" sx={{ marginTop: 2 }}>
              <TextField
                label={<span style={{ color: '#a1e5c9' }}>Date and Time</span>}
                type="datetime-local"
                value={newPayment.date}
                onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Button
                  variant="contained"
                  color={newPayment.paid === 'true' ? 'success' : 'error'}
                  onClick={() => setNewPayment({ ...newPayment, paid: newPayment.paid === 'false' ? 'true' : 'false' })}
                  sx={{ marginRight: 2 }}
                >
                  Paid: {newPayment.paid === 'false' ? 'No' : 'Yes'}
                </Button>
                <TextField
                  label={<span style={{ color: '#a1e5c9' }}>Price</span>}
                  value={newPayment.price}
                  onChange={(e) => setNewPayment({ ...newPayment, price: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="number"
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
              <Button variant="contained" onClick={addPayment} sx={{ bgcolor: '#a1e5c9', '&:hover': { backgroundColor: '#82c7aa' } }}>
                Add New
              </Button>
            </Box>
          </motion.div>
        </Box>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#82c7aa', textAlign: 'center' }}>
              Added successfully!!!
            </Typography>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
}

export default GeneralPayment;
