import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, getMessages } from '../slices/messageSlice';
import { Box, Typography, Paper, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import chatImage from '../images/chat.jpg';

function Chat({ otherUser }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { messagesList, loading } = useSelector((state) => state.message);
  
  // State for the new message
  const [newMessage, setNewMessage] = useState({
    date: '',
    text: '',
    receiverId: otherUser.id,
    sender: currentUser
  });
  const messagesEndRef = useRef(null);

  // Converts the current date to the required format
  const convertDateFormat = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setNewMessage((prev) => ({ ...prev, date: formattedDate }));
  };

  // Fetches messages when the component is mounted
  useEffect(() => {
    convertDateFormat();
    const fetchData = async () => {
      try {
        await dispatch(getMessages({ senderId: currentUser.id, receiverId: otherUser.id }));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchData();
  }, [dispatch, currentUser.id, otherUser.id]);

  // Scrolls to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesList]);

  // Handles sending a new message
  const handleSendMessage = async () => {
    if (newMessage.text === '') return;
    convertDateFormat();
    setNewMessage({ ...newMessage, text: '' });
    await dispatch(addMessage(newMessage));
  };

  // Sends message on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // Formats time for message display
  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Formats date for message display
  const formatDate = (date) => new Date(date).toLocaleDateString();

  if (loading) {
    return (
      <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#82c7aa', textAlign: 'center' }}>
          Loading the chat...
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '10px', backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url(${chatImage})`, backgroundSize: 'cover', width: '100%' }}>
      <Typography variant="h6" sx={{ textAlign: 'center', p: 2, color: '#82c7aa' }}>
        Chat with {otherUser.userName}
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
        {messagesList.reduce((acc, message, index) => {
          const messageDate = formatDate(message.date);
          const isNewDate = messageDate !== (index > 0 ? formatDate(messagesList[index - 1].date) : null);

          // Add date separator if needed
          if (isNewDate) {
            acc.push(
              <Box key={`date-${messageDate}`} sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'gray', border: '2px solid #a1e5c9', borderRadius: '50px', padding: '5px 10px' }}>
                  {messageDate}
                </Typography>
              </Box>
            );
          }

          // Add message bubble
          acc.push(
            <Box key={message.id} sx={{ display: 'flex', justifyContent: message.sender.id === currentUser.id ? 'flex-start' : 'flex-end', mb: 0.7 }}>
              <Paper sx={{ p: 1, maxWidth: '80%', bgcolor: message.sender.id === currentUser.id ? '#b7e89c' : '#faaaad', borderRadius: 2 }}>
                <Typography variant="body1" sx={{ mb: 0.5 }}>{message.text}</Typography>
                <Typography variant="caption" sx={{ textAlign: message.sender.id === currentUser.id ? 'left' : 'right', color: 'gray' }}>
                  {formatTime(message.date)}
                </Typography>
              </Paper>
            </Box>
          );
          return acc;
        }, [])}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: '1px solid #ddd', bgcolor: '#fff', borderRadius: '10px' }}>
        <TextField variant="outlined" fullWidth placeholder="Type a message" value={newMessage.text} onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })} onKeyDown={handleKeyDown} sx={{ flexGrow: 1, mr: 1, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#a1e5c9' } } }} />
        <IconButton sx={{ color: '#a1e5c9' }} onClick={handleSendMessage}><SendIcon /></IconButton>
      </Box>
    </Box>
  );
}

export default Chat;
