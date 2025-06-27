import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';

interface MessageBubbleProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp?: string;
}

// Custom avatar images (royalty-free, modern look)
const avatarUrl = {
  user: 'user.jpeg', // modern person avatar
  assistant: 'robot.jpeg', // modern robot avatar
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender, timestamp }) => (
  <Box display="flex" flexDirection={sender === 'user' ? 'row-reverse' : 'row'} alignItems="flex-end" mb={2} sx={{ animation: 'slideIn 0.5s cubic-bezier(.23,1.01,.32,1)', position: 'relative' }}>
    <Avatar
      src={avatarUrl[sender]}
      sx={{
        ml: sender === 'user' ? 2 : 0,
        mr: sender === 'assistant' ? 2 : 0,
        width: 44,
        height: 44,
        fontWeight: 700,
        fontSize: 20,
        bgcolor: sender === 'user' ? '#5f3dc4' : '#a5b4fc',
        color: sender === 'user' ? '#fff' : '#232526',
        boxShadow: '0 2px 8px #5f3dc433',
      }}
      alt={sender === 'user' ? 'You' : 'AI'}
    >
      {sender === 'user' ? 'YO' : 'AI'}
    </Avatar>
    <Box sx={{ position: 'relative' }}>
      <Paper
        elevation={3}
        sx={{
          p: 1.5,
          background: sender === 'user'
            ? 'linear-gradient(135deg, #5f3dc4 0%, #a5b4fc 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #e0e7ff 100%)',
          color: sender === 'user' ? '#fff' : 'text.primary',
          borderRadius: sender === 'user' ? '22px 22px 8px 22px' : '22px 22px 22px 8px',
          maxWidth: 420,
          minWidth: 60,
          boxShadow: sender === 'user' ? '0 4px 16px #5f3dc499' : '0 2px 8px #a5b4fc33',
          position: 'relative',
          '::after': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            ...(sender === 'user'
              ? {
                  borderWidth: '12px 0 12px 16px',
                  borderColor: 'transparent transparent transparent #5f3dc4',
                  right: -16,
                  top: 12,
                }
              : {
                  borderWidth: '12px 16px 12px 0',
                  borderColor: 'transparent #e0e7ff transparent transparent',
                  left: -16,
                  top: 12,
                }),
            zIndex: 1,
            filter: sender === 'user' ? 'drop-shadow(0 2px 6px #5f3dc499)' : 'drop-shadow(0 2px 6px #a5b4fc33)',
          },
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
      {timestamp && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', textAlign: sender === 'user' ? 'right' : 'left' }}>
          {new Date(timestamp).toLocaleString()}
        </Typography>
      )}
    </Box>
    <style>{`
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `}</style>
  </Box>
);

export default MessageBubble; 