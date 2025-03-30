// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { signUp } from "../slices/userSlice";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { Visibility, VisibilityOff, Email, Person, Phone, Home, Lock } from "@mui/icons-material";
// import { getTenantsList } from "../slices/buildingSlice";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import closeBuilding2Image from '../images/closeBuilding2.jpg';

// const SignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { status } = location.state || {};
//   const { currentBuilding } = useSelector((state) => state.building);
//   const { tenants } = useSelector((state) => state.building);
//   const [user, setUser] = useState({
//     userName: "",
//     password: "",
//     email: "",
//     phone: "",
//     status: status === 201 || tenants.length === 0 ? "MANAGER" : "TENANT",
//     apartmentNumber: "",
//     floor: "",
//     building: currentBuilding,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({
//     userName: "",
//     password: "",
//     email: "",
//     phone: "",
//     apartmentNumber: "",
//     floor: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       if (Object.keys(currentBuilding).length === 0) {
//         navigate("/login");
//       } else {
//         try {
//           const response = await dispatch(getTenantsList(currentBuilding.id));

//           if (getTenantsList.fulfilled.match(response)) {
//             const tenantsList = response.payload;
//             setUser((prevUser) => ({
//               ...prevUser,
//               status: status === 201 || tenantsList.length === 0 ? "MANAGER" : "TENANT",
//             }));
//           }
//         } catch (error) {
//           console.error("Error fetching tenants list:", error);
//         }
//       }
//     };
//     fetchData();
//   }, [currentBuilding, status, dispatch, navigate]);


//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     let validationErrors = { ...errors };

//     switch (name) {
//       case "userName":
//         if (value.length < 3) {
//           validationErrors.userName = "Username must be at least 3 characters";
//         } else {
//           validationErrors.userName = "";
//         }
//         break;
//       case "password":
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//         if (!passwordRegex.test(value)) {
//           validationErrors.password = "Password must be at least 8 characters with lowercase, uppercase letters, and a number";
//         } else {
//           validationErrors.password = "";
//         }
//         break;
//       case "email":
//         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//         if (!emailRegex.test(value)) {
//           validationErrors.email = "Email address is not valid";
//         } else {
//           validationErrors.email = "";
//         }
//         break;
//       case "phone":
//         const phoneRegex = /^[0-9]{3}-[0-9]{7}$/;
//         if (!phoneRegex.test(value)) {
//           validationErrors.phone = "Phone number is not valid. Format should be xxx-xxxxxxx";
//         } else {
//           validationErrors.phone = "";
//         }
//         break;
//       case "apartmentNumber":
//         if (!/^\d+$/.test(value)) {
//           validationErrors.apartmentNumber = "Apartment number must contain only numbers";
//         } else {
//           validationErrors.apartmentNumber = "";
//         }
//         break;
//       case "floor":
//         if (!/^\d+$/.test(value)) {
//           validationErrors.floor = "Floor must be a number";
//         } else {
//           validationErrors.floor = "";
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors(validationErrors);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let validationErrors = {};
//     let isValid = true;

//     if (user.userName.length < 3) {
//       validationErrors.userName = "Username must be at least 3 characters";
//       isValid = false;
//     }

//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//     if (!passwordRegex.test(user.password)) {
//       validationErrors.password = "Password must be at least 8 characters with lowercase, uppercase letters, and a number";
//       isValid = false;
//     }

//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,6}$/;
//     if (!emailRegex.test(user.email)) {
//       validationErrors.email = "Email address is not valid";
//       isValid = false;
//     }

//     const phoneRegex = /^[0-9]{3}-[0-9]{7}$/;
//     if (!phoneRegex.test(user.phone)) {
//       validationErrors.phone = "Phone number must be 10 digits, formatted as xxx-xxxxxxx";
//       isValid = false;
//     }

//     if (!/^\d+$/.test(user.apartmentNumber)) {
//       validationErrors.apartmentNumber = "Apartment number must contain only numbers";
//       isValid = false;
//     }

//     if (!/^\d+$/.test(user.floor)) {
//       validationErrors.floor = "Floor must be a number";
//       isValid = false;
//     }

//     setErrors(validationErrors);

//     if (!isValid) return;
//     try {
//       const response = await dispatch(signUp(user));
//       if (signUp.fulfilled.match(response)) {
//         navigate("/homePage");
//       } else if (signUp.rejected.match(response)) {
//         const error = response.payload;
//         if (response.payload.status === 409) {
//           setUser({ ...user, userName: '' })

//           let validationErrors = { ...errors };
//           validationErrors.userName = "this name is catched"
//           setErrors(validationErrors)
//           console.log("Conflict: User already exists");
//         } else {
//           console.log("Connection error: ", error);
//         }
//       }
//     } catch {
//       console.error("An unexpected error occurred:", error);
//     }
//   };

//   const updateValue = (e) => {
//     const { name, value } = e.target;
//     let validationErrors = { ...errors };

//     if (name === "phone") {
//       let phoneValue = value.replace(/\D/g, "");

//       if (phoneValue.length > 10) {
//         phoneValue = phoneValue.slice(0, 10);
//       }

//       if (phoneValue.length > 3) {
//         phoneValue = phoneValue.slice(0, 3) + '-' + phoneValue.slice(3, 10);
//       }

//       setUser({ ...user, [name]: phoneValue });
//     } else {
//       setUser({ ...user, [name]: value });
//     }

//     switch (name) {
//       case "userName":
//         if (value.length < 3) {
//           validationErrors.userName = "Username must be at least 3 characters";
//         } else {
//           validationErrors.userName = "";
//         }
//         break;
//       case "password":
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//         if (!passwordRegex.test(value)) {
//           validationErrors.password = "Password must be at least 8 characters with lowercase, uppercase letters, and a number";
//         } else {
//           validationErrors.password = "";
//         }
//         break;
//       case "email":
//         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//         if (!emailRegex.test(value)) {
//           validationErrors.email = "Email address is not valid";
//         } else {
//           validationErrors.email = "";
//         }
//         break;
//       case "phone":
//         const phoneRegex = /^[0-9]{3}-[0-9]{7}$/;
//         if (!phoneRegex.test(value)) {
//           validationErrors.phone = "Phone number must be 10 digits, formatted as xxx-xxxxxxx";
//         } else {
//           validationErrors.phone = "";
//         }
//         break;
//       case "apartmentNumber":
//         if (!/^\d+$/.test(value)) {
//           validationErrors.apartmentNumber = "Apartment number must contain only numbers";
//         } else {
//           validationErrors.apartmentNumber = "";
//         }
//         break;
//       case "floor":
//         if (!/^\d+$/.test(value)) {
//           validationErrors.floor = "Floor must be a number";
//         } else {
//           validationErrors.floor = "";
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors(validationErrors);
//   };

//   const fields = [
//     [
//       { label: "User Name", name: "userName", icon: <Person /> },
//       { label: "Phone", name: "phone", icon: <Phone /> },
//     ],
//     [
//       {
//         label: "Password",
//         name: "password",
//         type: showPassword ? "text" : "password",
//         icon:  <Lock />,
//         endAdornment: (
//           <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
//             {showPassword ? <VisibilityOff /> : <Visibility />}
//           </IconButton>
//         ),
//       },
//       { label: "Apartment Number", name: "apartmentNumber", icon: <Home /> },
//     ],
//     [
//       { label: "Email", name: "email", icon: <Email /> },
//       { label: "Floor", name: "floor", icon: <Home /> },
//     ],
//   ];

//   const renderField = ({ label, name, type = "text", icon, endAdornment }, index) => (
//     <Box sx={{ width: '100%' }} key={name}>
//       <motion.div
//         initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
//       >
//         <TextField
//           label={<span style={{ color: '#a1e5c9' }}>{label}</span>}
//           name={name}
//           type={type}
//           value={user[name]}
//           onChange={updateValue}
//           onBlur={handleBlur}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           InputProps={{
//             startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
//             endAdornment: endAdornment,
//           }}
//           error={!!errors[name]}
//           helperText={errors[name]}
//           sx={{
//             marginBottom: 2,
//             '& .MuiOutlinedInput-root': {
//               '&.Mui-focused fieldset': {
//                 borderColor: '#a1e5c9',
//               }
//             }
//           }}
//         />
//       </motion.div>
//     </Box>
//   );

//   const renderRow = (rowFields) => (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         gap: 3,
//       }}
//     >
//       {rowFields.map((field, index) => renderField(field, index))}
//     </Box>
//   );

//   return (
//     <Box
//       display="flex"
//       flexDirection='row'
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       sx={{
//         padding: 5,
//         backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${closeBuilding2Image})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <Paper
//         elevation={10}
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           padding: 4,
//           borderRadius: 3,
//           bgcolor: "white",
//           width: "100%",
//           textAlign: "center",
//         }}
//       >
//         <ArrowBackIcon
//           variant="h5"
//           sx={{
//             cursor: "pointer",
//             fontWeight: "bold",
//             color: "#a1e5c9",
//             "&:hover": {
//               fontSize: "bigger",
//               transform: "scale(1.7)",
//               transition: "all 0.3s ease",
//             },
//           }}
//           onClick={() => navigate("/signUpBuilding")}
//         />

//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{ fontWeight: "bold", color: "#a1e5c9" }}
//         >
//           Sign Up
//         </Typography>
//         <>{fields.map(renderRow)}</>
//         <Box mt={2}>
//           <Button
//             variant="contained"
//             type="submit"
//             fullWidth
//             sx={{
//               bgcolor: '#a1e5c9'
//             }}>
//             Sign Up
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default SignUp;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signUp } from "../slices/userSlice";
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff, Email, Person, Phone, Home, Lock } from "@mui/icons-material";
import { getTenantsList } from "../slices/buildingSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import closeBuilding2Image from '../images/closeBuilding2.jpg';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = location.state || {};
  const { currentBuilding } = useSelector((state) => state.building);
  const { tenants } = useSelector((state) => state.building);

  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    phone: "",
    status: status === 201 || tenants.length === 0 ? "MANAGER" : "TENANT",
    apartmentNumber: "",
    floor: "",
    building: currentBuilding,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (!Object.keys(currentBuilding).length) navigate("/login");
    else {
      dispatch(getTenantsList(currentBuilding.id)).then(response => {
        if (getTenantsList.fulfilled.match(response)) {
          const tenantsList = response.payload;
          setUser(prev => ({
            ...prev,
            status: status === 201 || tenantsList.length === 0 ? "MANAGER" : "TENANT",
          }));
        }
      });
    }
  }, [currentBuilding, status, dispatch, navigate]);

  const validateField = (name, value) => {
    const validators = {
      userName: val => val.length < 3 && "Username must be at least 3 characters",
      password: val => !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val) && "Password must be at least 8 characters with lowercase, uppercase letters, and a number",
      email: val => !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(val) && "Email address is not valid",
      phone: val => !/^[0-9]{3}-[0-9]{7}$/.test(val) && "Phone number must be 10 digits, formatted as xxx-xxxxxxx",
      apartmentNumber: val => !/^\d+$/.test(val) && "Apartment number must contain only numbers",
      floor: val => !/^\d+$/.test(val) && "Floor must be a number",
    };
    return validators[name]?.(value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const validationErrors = {};
    Object.keys(user).forEach(key => {
      const error = validateField(key, user[key]);
      if (error) {
        validationErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(validationErrors);
    if (!isValid) return;

    try {
      const response = await dispatch(signUp(user));
      if (signUp.fulfilled.match(response)) navigate("/homePage");
      else if (signUp.rejected.match(response)) {
        if (response.payload.status === 409) {
          setErrors({ userName: "this name is taken" });
          setUser(prev => ({ ...prev, userName: "" }));
        }
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
    }
  };

  const updateValue = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10).replace(/(\d{3})(\d{7})/, "$1-$2") : value;
    setUser(prev => ({ ...prev, [name]: formattedValue }));
    handleBlur(e);
  };

  const fields = [
    [{ label: "User Name", name: "userName", icon: <Person /> }, { label: "Phone", name: "phone", icon: <Phone /> }],
    [{ label: "Password", name: "password", type: showPassword ? "text" : "password", icon: <Lock />, endAdornment: <IconButton onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton> }, { label: "Apartment Number", name: "apartmentNumber", icon: <Home /> }],
    [{ label: "Email", name: "email", icon: <Email /> }, { label: "Floor", name: "floor", icon: <Home /> }],
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ padding: 5, backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${closeBuilding2Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Paper elevation={10} component="form" onSubmit={handleSubmit} sx={{ padding: 4, borderRadius: 3, bgcolor: "white", width: "100%", textAlign: "center" }}>
        <ArrowBackIcon sx={{ cursor: "pointer", fontWeight: "bold", color: "#a1e5c9", "&:hover": { transform: "scale(1.7)", transition: "all 0.3s ease" } }} onClick={() => navigate("/signUpBuilding")} />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#a1e5c9" }}>Sign Up</Typography>
        {fields.map((row, index) => (
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 3 }} key={index}>
            {row.map(({ label, name, type = "text", icon, endAdornment }) => (
              <Box key={name} sx={{ width: '100%' }}>
                <motion.div initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}>
                  <TextField
                    label={<span style={{ color: '#a1e5c9' }}>{label}</span>}
                    name={name}
                    type={type}
                    value={user[name]}
                    onChange={updateValue}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment>, endAdornment }}
                    error={!!errors[name]}
                    helperText={errors[name]}
                    sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#a1e5c9' } } }}
                  />
                </motion.div>
              </Box>
            ))}
          </Box>
        ))}
        <Box mt={2}>
          <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#a1e5c9' }}>Sign Up</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
