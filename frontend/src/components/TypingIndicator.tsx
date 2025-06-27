import React from 'react';
import { Box } from '@mui/material';

const TypingIndicator: React.FC = () => (
  <Box display="flex" alignItems="center" pl={5} py={0.5}>
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[0, 1, 2].map(i => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7b2ff2 0%, #f357a8 100%)',
            animation: `typing-bounce 1.2s infinite ${i * 0.2}s`,
          }}
        />
      ))}
    </Box>
    <style>{`
      @keyframes typing-bounce {
        0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
        40% { transform: scale(1.2); opacity: 1; }
      }
    `}</style>
  </Box>
);

export default TypingIndicator; 