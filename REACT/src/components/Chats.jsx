import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsList } from '../slices/buildingSlice';
import { Card, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Chat from '../components/Chat';

function Chats() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentBuilding } = useSelector((state) => state.building);
  const { tenants } = useSelector((state) => state.building);
  const [selectedTenant, setSelectedTenant] = useState(null);

  // Fetch tenant list on mount
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

  // Handles tenant card click to start chat
  const handleCardClick = (tenant) => {
    setSelectedTenant(tenant);
  };

  return (
    <>
      {selectedTenant ? (
        <Chat otherUser={selectedTenant} />
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#82c7aa' }}>
            Select a tenant for chat:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
            {tenants.map((tenant) => {
              // Prevent showing the current user in the list
              if (tenant.id === currentUser.id) return null;
              return <FlipCard key={tenant.id} tenant={tenant} onClick={handleCardClick} />;
            })}
          </Box>
        </>
      )}
    </>
  );
}

// FlipCard component with animation for tenant cards
const FlipCard = ({ tenant, onClick }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#a1e5c9', mb: 1, textAlign: 'center' }}>
              {tenant.userName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>floor: {tenant.floor}</Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>apartment: {tenant.apartmentNumber}</Typography>
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
            <Typography variant="body2" sx={{ mb: 1 }}>For chat with:</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{tenant.userName}</Typography>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

export default Chats;
