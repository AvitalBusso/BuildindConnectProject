import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../slices/buildingSlice";
import GoogleMaps from "../components/GoogleMap";
import { Box, TextField, Button, Typography, Paper, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import closeBuilding2Image from '../images/closeBuilding2.jpg';

const SignUpBuilding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [building, setBuilding] = useState({ address: "", monthPrice: "" });
  const [isExist, setIsExist] = useState(true);

  const updateBuilding = (e) => setBuilding({ ...building, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (building.address && building.monthPrice) {
      try {
        const response = await dispatch(signUp(building));
        if (signUp.fulfilled.match(response)) {
          navigate("/signUp", { state: { status: 201, address: building.address } });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else navigate(0);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${closeBuilding2Image})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Paper elevation={10} component="form" onSubmit={handleSubmit} sx={{ padding: 4, borderRadius: 3, bgcolor: "white", width: "100%", maxWidth: 500, textAlign: "center" }}>
          <ArrowBackIcon sx={{ cursor: "pointer", color: "#a1e5c9" }} onClick={() => navigate("/login")} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#a1e5c9" }}>Sign Up Your Building</Typography>
          <GoogleMaps building={building} setBuilding={setBuilding} setIsExist={setIsExist} />
          
          {building.address && (
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <TextField
                label={<span style={{ color: '#a1e5c9' }}>Monthly Price</span>}
                variant="outlined" fullWidth margin="normal" name="monthPrice" value={building.monthPrice} onChange={updateBuilding}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#a1e5c9',
                    }
                  }
                }}
                type="number" InputProps={{ min: 0, step: "0.01", startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment> }}
                onKeyDown={(e) => e.key === '-' && e.preventDefault()} required
              />
            </motion.div>
          )}

          <Box mt={2}>
            <Button variant="contained" type="submit" fullWidth disabled={isExist} sx={{ bgcolor: '#a1e5c9' }}>
              Sign Up
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SignUpBuilding;
