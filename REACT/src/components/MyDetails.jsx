import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../slices/userSlice';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const MyDetails = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [editedValues, setEditedValues] = useState(currentUser);
  const [isEditing, setIsEditing] = useState(null);
  const [errors, setErrors] = useState({});

  const validateField = (key, value) => {
    const regexMap = {
      email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      phone: /^[0-9]{3}-[0-9]{7}$/,
      userName: (val) => val.length >= 3,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    };
    const errorMessages = {
      email: 'Invalid email address',
      phone: 'Phone must be formatted as xxx-xxxxxxx',
      userName: 'Username must be at least 3 characters',
      password: 'Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, and one number'

    };
    return regexMap[key] && !regexMap[key].test(value) ? errorMessages[key] : '';
  };

  const handleEdit = (key) => setIsEditing(key);
  const handleCancel = () => {
    setIsEditing(null);
    setErrors({});
  };

  const handleChange = (e, key) => {
    const newValue = e.target.value;
    setEditedValues({ ...editedValues, [key]: newValue });
    setErrors({ ...errors, [key]: validateField(key, newValue) });
  };

  const handleSave = (key) => {
    const error = validateField(key, editedValues[key]);
    if (error) {
      setErrors({ ...errors, [key]: error });
    } else {
      dispatch(update({ ...editedValues, [key]: editedValues[key] }));
      setIsEditing(null);
    }
  };

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: 3 }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#82c7aa' }}>
          My Details
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: 6 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6" color='#a1e5c9'>Field</Typography></TableCell>
                <TableCell><Typography variant="h6" color='#a1e5c9'>Value</Typography></TableCell>
                <TableCell><Typography variant="h6" color='#a1e5c9'>Action</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(currentUser).map(([key, value]) => {
                if (['id', 'building', 'imageUrl'].includes(key)) return null;

                return (
                  <motion.tr key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <TableCell><Typography variant="body1">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</Typography></TableCell>
                    <TableCell>
                      {isEditing === key ? (
                        key === 'password' ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={editedValues[key]}
                            onChange={(e) => handleChange(e, key)}
                            error={!!errors[key]}
                            helperText={errors[key]}
                            type={isEditing === key ? 'text' : 'password'}  // אם במצב עריכה, נציג כטקסט
                            sx={{ transition: 'all 0.3s ease' }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={editedValues[key]}
                            onChange={(e) => handleChange(e, key)}
                            error={!!errors[key]}
                            helperText={errors[key]}
                            sx={{ transition: 'all 0.3s ease' }}
                          />
                        )
                      ) : (
                        key === 'password' ? (
                          <Typography variant="body1">••••••••</Typography>  // הצגת נקודות בשדה הסיסמה
                        ) : (
                          <Typography variant="body1">{typeof value === 'object' ? JSON.stringify(value) : value}</Typography>
                        )
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing === key ? (
                        <>
                          <motion.button onClick={() => handleSave(key)} style={buttonStyle('#4CAF50')}>Save</motion.button>
                          <motion.button onClick={handleCancel} style={buttonStyle('#f44336')}>Cancel</motion.button>
                        </>
                      ) : (
                        !['userName', 'status'].includes(key) && (
                          <motion.button onClick={() => handleEdit(key)} style={buttonStyle('#a1e5c9')}>Edit</motion.button>
                        )
                      )}
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Box>
  );
};

const buttonStyle = (color) => ({
  marginRight: '10px',
  padding: '8px 16px',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
});

export default MyDetails;