import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { addMessage, getMessages } from '../slices/groupMessageSlice';
import groupChatImage from '../images/groupChat.jpg';

function GroupChat() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { groupMessagesList, loading } = useSelector((state) => state.groupMessage);
  const { currentBuilding } = useSelector((state) => state.building);
  const [newMessage, setNewMessage] = useState({
    date: '',
    text: '',
    sender: currentUser,
    building: currentBuilding,
  });
  const messagesEndRef = useRef(null);

  const convertDateFormat = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    setNewMessage({
      date: formattedDate,
      text: newMessage.text,
      sender: currentUser,
      building: currentBuilding,
    });
  };

  useEffect(() => {
    convertDateFormat();
    const fetchData = async () => {
      try {
        await dispatch(getMessages(currentBuilding?.id));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchData();
  }, [dispatch, currentBuilding?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [groupMessagesList]);

  const handleSendMessage = async () => {
    if (newMessage.text === '') return;
    convertDateFormat();
    await dispatch(addMessage(newMessage));
    setNewMessage((prevMessage) => ({ ...prevMessage, text: '' }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (date) => new Date(date).toLocaleDateString();

  if (loading) {
    return (
      <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 3, boxShadow: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#82c7aa',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
          }}>
          loading the chat...
        </Typography>
      </Paper>
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxHeight: '100%',
          borderRadius: '10px',
          paddingTop: 2,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url(${groupChatImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {groupMessagesList.reduce((acc, message, index) => {
            const previousMessage = index > 0 ? groupMessagesList[index - 1] : null;
            const previousSenderId = previousMessage?.sender?.id;
            const previousDate = previousMessage ? formatDate(previousMessage.date) : null;

            const currentDate = formatDate(message.date);
            const isNewSender = message.sender?.id !== previousSenderId || currentDate !== previousDate;
            const isNewDate = currentDate !== previousDate;

            if (isNewDate) {
              acc.push(
                <Box sx={{ textAlign: 'center' }} key={`date-${currentDate}-${message.id}`}> {/* Use both date and message.id for uniqueness */}
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: 'center',
                      display: 'inline-block',
                      my: 1,
                      color: 'gray',
                      border: '2px solid #a1e5c9',
                      borderRadius: '50px',
                      padding: '5px 10px',
                    }}
                  >
                    {currentDate}
                  </Typography>
                </Box>
              );
            }

            acc.push(
              <Box
                key={`message-${message.id}`} 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.sender?.id === currentUser?.id ? 'flex-start' : 'flex-end',
                  mb: 0.7,
                }}
              >
                {isNewSender && (
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      color: 'gray',
                      textAlign: message.sender?.id === currentUser?.id ? 'left' : 'right',
                    }}
                  >
                    {message.sender?.userName}
                  </Typography>
                )}
                <Paper
                  sx={{
                    p: 1,
                    maxWidth: '80%',
                    bgcolor: message.sender?.id === currentUser?.id ? '#b7e89c' : ' #faaaad',
                    borderRadius: '10px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.sender?.id === currentUser?.id ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {message.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'gray',
                      }}
                    >
                      {formatTime(message.date)}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            );
            return acc;
          }, [])}
          <div ref={messagesEndRef} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderTop: '1px solid #ddd',
            bgcolor: '#fff',
            borderRadius: 2,
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type a message"
            value={newMessage.text}
            onChange={(e) =>
              setNewMessage((prevMessage) => ({
                ...prevMessage,
                text: e.target.value,
              }))
            }
            onKeyDown={handleKeyDown}
            sx={{
              flexGrow: 1,
              mr: 1,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#a1e5c9',
                }
              }
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{ color: '#a1e5c9' }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default GroupChat;
