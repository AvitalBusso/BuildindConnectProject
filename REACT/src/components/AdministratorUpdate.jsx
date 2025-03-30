import { Box, Typography, Card, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsList } from '../slices/buildingSlice';
import { useNavigate } from 'react-router-dom';
import { update } from '../slices/userSlice';
import { motion } from 'framer-motion';

function AdministratorUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { tenants } = useSelector((state) => state.building);
  const { currentBuilding } = useSelector((state) => state.building);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getTenantsList(currentBuilding.id));
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    fetchData();
  }, [dispatch, currentBuilding.id]);

  // Handling card click to open the dialog with the selected tenant
  const handleCardClick = (tenant) => {
    setSelectedTenant(tenant);
    setOpenDialog(true);
  };

  // Toggling user status (Manager <-> Tenant)
  const toggleStatus = (user) => ({
    ...user,
    status: user.status === 'MANAGER' ? 'TENANT' : 'MANAGER',
  });

  // Confirming status change and updating both users
  const handleConfirm = async () => {
    try {
      await dispatch(update(toggleStatus(currentUser)));
      await dispatch(update(toggleStatus(selectedTenant)));
      navigate('/login'); // Redirecting after the update
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#82c7aa' }}>
        Enter the next manager:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
        {tenants.map((tenant) => {
          if (tenant.id === currentUser.id) return null;
          return <FlipCard key={tenant.id} tenant={tenant} onClick={handleCardClick} />;
        })}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#a1e5c9' }}>Confirm Change</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to choose <span style={{ color: '#a1e5c9' }}>{selectedTenant?.userName}</span> as the next manager?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirm} sx={{ color: '#a1e5c9' }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdministratorUpdate;

const FlipCard = ({ tenant, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }} 
    >
      <Card
        sx={{
          width: 200,
          height: 300,
          perspective: '1000px',
          cursor: 'pointer',
          '&:hover .card-front': { transform: 'rotateY(180deg)' },
          '&:hover .card-back': { transform: 'rotateY(0deg)' },
          bgcolor: "transparent",
          borderRadius: 20
        }}
        onClick={() => onClick(tenant)}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Front Side */}
          <Box
            className="card-front"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#f2f2f2',
              borderRadius: 2,
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              padding: 2,
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              transition: 'transform 0.6s',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#a1e5c9', mb: 1, textAlign: 'center', }}>
              {tenant.userName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              floor: {tenant.floor}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              apartement number: {tenant.apartmentNumber}
            </Typography>
          </Box>

          {/* Back Side */}
          <Box
            className="card-back"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#a1e5c9',
              color: 'white',
              borderRadius: 2,
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              transition: 'transform 0.6s',
              textAlign: 'center',
              padding: 2,
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              The next manager will be:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              {tenant.userName}
            </Typography>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};
