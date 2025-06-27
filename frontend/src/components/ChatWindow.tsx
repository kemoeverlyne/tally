import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Stack, TextField, IconButton, Paper, Skeleton, InputAdornment, Popover, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { ChatMessage } from '../types/chat';

// If emoji-mart is not installed, you can use a simple emoji list as fallback
const emojiList = ['😀', '😂', '😍', '👍', '🙏', '🎉', '😎', '🤔', '😢', '🔥', '🥳', '❤️'];

interface ChatWindowProps {
  history: ChatMessage[];
  loadingHistory: boolean;
  error: string;
  question: string;
  loading: boolean;
  onQuestionChange: (q: string) => void;
  onSend: () => void;
}

function isNewDay(current: string | undefined, prev: string | undefined) {
  if (!current) return false;
  if (!prev) return true;
  const d1 = new Date(current);
  const d2 = new Date(prev);
  return d1.toDateString() !== d2.toDateString();
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  history,
  loadingHistory,
  error,
  question,
  loading,
  onQuestionChange,
  onSend,
}) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [emojiAnchor, setEmojiAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, loading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      onSend();
    }
  };

  const handleEmojiClick = (event: React.MouseEvent<HTMLElement>) => {
    setEmojiAnchor(event.currentTarget);
  };
  const handleEmojiClose = () => setEmojiAnchor(null);
  const handleEmojiSelect = (emoji: string) => {
    onQuestionChange(question + emoji);
    setEmojiAnchor(null);
  };

  return (
    <Paper elevation={6} sx={{
      p: { xs: 1.5, md: 4 },
      mt: { xs: 2, md: 6 },
      mb: 2,
      borderRadius: 6,
      minHeight: { xs: 400, md: 650 },
      height: { xs: 500, md: 700 },
      maxWidth: { xs: '100%', md: 820 },
      bgcolor: '#fafbfc',
      boxShadow: '0 8px 32px #7b2ff233',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      animation: 'fadeSlideIn 0.7s cubic-bezier(.23,1.01,.32,1)',
    }}>
      <Box sx={{ flex: 1, maxHeight: { xs: 320, md: 540 }, overflowY: 'auto', mb: 2, pr: 1 }}>
        {loadingHistory ? (
          <Stack spacing={2}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={48} sx={{ borderRadius: 3 }} />
            ))}
          </Stack>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : history.length === 0 ? (
          <Typography align="center" color="text.secondary">No conversation yet. Start by asking a question!</Typography>
        ) : (
          <Stack spacing={0.5}>
            {history.map((item, idx) => {
              const prev = history[idx - 1];
              const showDate = isNewDay(item.timestamp, prev?.timestamp);
              return (
                <React.Fragment key={idx}>
                  {showDate && item.timestamp && (
                    <Divider sx={{ my: 2, fontSize: 13, color: '#aaa', fontWeight: 500 }}>
                      {new Date(item.timestamp).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </Divider>
                  )}
                  <MessageBubble message={item.question} sender="user" timestamp={item.timestamp} />
                  <MessageBubble message={item.response} sender="assistant" />
                </React.Fragment>
              );
            })}
            {loading && <TypingIndicator />}
            <div ref={chatEndRef} />
          </Stack>
        )}
      </Box>
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'rgba(255,255,255,0.82)',
          pt: { xs: 1.5, md: 2 },
          pb: { xs: 1.5, md: 2 },
          zIndex: 2,
          borderTop: '1.5px solid #e0e7ff',
          boxShadow: '0 8px 32px #7b2ff233, 0 1.5px 8px #a5b4fc33',
          borderRadius: 5,
          transition: 'box-shadow 0.22s, background 0.22s',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mx: { xs: -1.5, md: -4 },
          mb: { xs: -1.5, md: -4 },
          mt: 2,
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '2.5px solid #e0e7ff',
          boxSizing: 'border-box',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question..."
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          size="medium"
          inputRef={inputRef}
          sx={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 4,
            boxShadow: '0 2px 12px #7b2ff211',
            '& .MuiOutlinedInput-root': {
              fontSize: 18,
              fontWeight: 500,
              paddingRight: 0,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.95)',
              '& fieldset': { borderColor: '#e0e7ff', borderWidth: 2 },
              '&:hover fieldset': { borderColor: '#7b2ff2' },
              '&.Mui-focused fieldset': { borderColor: '#f357a8', boxShadow: '0 0 0 2px #f357a822' },
              transition: 'box-shadow 0.18s, border-color 0.18s',
            },
            '& input': {
              padding: '16.5px 14px',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleEmojiClick}
                  size="medium"
                  sx={{
                    color: '#7b2ff2',
                    background: 'rgba(123,47,242,0.07)',
                    borderRadius: 2,
                    mr: 0.5,
                    transition: 'background 0.18s, color 0.18s, transform 0.12s',
                    '&:hover': { color: '#f357a8', background: 'rgba(243,87,168,0.13)', transform: 'scale(1.13)' },
                    boxShadow: '0 1.5px 6px #7b2ff211',
                  }}
                >
                  <EmojiEmotionsIcon fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Popover
          open={Boolean(emojiAnchor)}
          anchorEl={emojiAnchor}
          onClose={handleEmojiClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          PaperProps={{ sx: { p: 1, borderRadius: 2, boxShadow: '0 2px 8px #7b2ff233' } }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 200 }}>
            {emojiList.map((emoji) => (
              <IconButton key={emoji} onClick={() => handleEmojiSelect(emoji)} size="small" sx={{ fontSize: 22 }}>
                {emoji}
              </IconButton>
            ))}
          </Box>
        </Popover>
        <IconButton
          color="primary"
          onClick={onSend}
          disabled={loading || !question.trim()}
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #7b2ff2 0%, #f357a8 100%)',
            color: '#fff',
            boxShadow: '0 4px 16px #7b2ff244',
            ml: 1,
            borderRadius: 3,
            width: 56,
            height: 56,
            fontSize: 28,
            transition: 'background 0.18s, transform 0.12s, box-shadow 0.18s',
            '&:hover': {
              background: 'linear-gradient(135deg, #f357a8 0%, #7b2ff2 100%)',
              transform: 'scale(1.12)',
              boxShadow: '0 8px 32px #f357a844',
            },
            '&:active': {
              background: 'linear-gradient(135deg, #7b2ff2 0%, #f357a8 100%)',
              boxShadow: '0 2px 8px #7b2ff233',
            },
            '&.Mui-disabled': {
              background: 'linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 100%)',
              color: '#bbb',
              boxShadow: 'none',
            },
          }}
        >
          <SendIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </Paper>
  );
};

export default ChatWindow; 