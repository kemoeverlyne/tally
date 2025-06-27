import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import { fetchHistory, sendQuestion } from './services/api';
import { ChatMessage } from './types/chat';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7b2ff2' },
    secondary: { main: '#f357a8' },
    background: {
      default: '#f4f6fa',
      paper: 'rgba(255,255,255,0.85)',
    },
  },
  typography: {
    fontFamily: 'Poppins, Inter, Roboto, Arial, sans-serif',
  },
  shape: {
    borderRadius: 18,
  },
});

const App: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    setLoadingHistory(true);
    setError('');
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      setError('Could not load conversation history.');
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError('');
    const userMessage: ChatMessage = {
      question,
      response: '',
      timestamp: new Date().toISOString(),
    };
    setHistory(prev => [...prev, userMessage]);
    setQuestion('');
    try {
      const aiResponse = await sendQuestion(question);
      setHistory(prev => {
        // Find the last user message without a response and add the AI response
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].response === '' && updated[i].question === question) {
            updated[i] = { ...updated[i], response: aiResponse };
            break;
          }
        }
        return updated;
      });
    } catch (err) {
      setError('Could not send question.');
      // Optionally, remove the optimistic message or mark as failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -2,
        background: 'linear-gradient(135deg, #e0e7ff 0%, #5f3dc4 100%)',
        transition: 'background 0.5s',
        animation: 'gradientBG 12s ease-in-out infinite alternate',
        overflow: 'hidden',
      }}>
        <svg width="900" height="700" viewBox="0 0 900 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: -120, left: -180, zIndex: -1, filter: 'blur(60px)', opacity: 0.22 }}>
          <ellipse cx="400" cy="300" rx="300" ry="180" fill="#5f3dc4" />
        </svg>
        <svg width="900" height="700" viewBox="0 0 900 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: -120, right: -180, zIndex: -1, filter: 'blur(80px)', opacity: 0.18 }}>
          <ellipse cx="600" cy="500" rx="260" ry="140" fill="#a5b4fc" />
        </svg>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
      <Header />
      <Container maxWidth="lg" sx={{ pt: { xs: 1, md: 6 }, pb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 900,
            minHeight: 750,
            margin: '0 auto',
            borderRadius: 48,
            boxShadow: '0 8px 32px #5f3dc433, 0 1.5px 8px #a5b4fc55, 0 0 0 2px #7b2ff244',
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            padding: '0 0 24px 0',
            marginTop: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeSlideInCard 0.9s cubic-bezier(.23,1.01,.32,1)',
            transition: 'box-shadow 0.3s, background 0.3s',
            border: '2.5px solid transparent',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}
          tabIndex={0}
          onFocus={e => (e.currentTarget.style.boxShadow = '0 8px 32px #7b2ff299, 0 0 0 4px #7b2ff288')}
          onBlur={e => (e.currentTarget.style.boxShadow = '0 8px 32px #5f3dc433, 0 1.5px 8px #a5b4fc55, 0 0 0 2px #7b2ff244')}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px #7b2ff299, 0 0 0 4px #7b2ff288')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 32px #5f3dc433, 0 1.5px 8px #a5b4fc55, 0 0 0 2px #7b2ff244')}
        >
          <div style={{ textAlign: 'center', padding: '2.2rem 0 0.7rem 0' }}>
            <span style={{ color: '#5f3dc4', fontWeight: 800, fontSize: 32, fontFamily: 'Poppins', letterSpacing: -1 }}>
              Tally Assistant
            </span>
            <div style={{ color: '#444', fontSize: 18, fontWeight: 500, marginTop: 4, opacity: 0.7 }}>
              Your smart conversation partner
            </div>
          </div>
          <div style={{ width: '100%', borderTop: '1.5px solid #e0e7ff', margin: '0 0 12px 0', opacity: 0.7 }} />
          <ChatWindow
            history={history}
            loadingHistory={loadingHistory}
            error={error}
            question={question}
            loading={loading}
            onQuestionChange={setQuestion}
            onSend={handleSend}
          />
          <div style={{ width: '100%', borderBottom: '1.5px solid #e0e7ff', margin: '12px 0 0 0', opacity: 0.7 }} />
          <style>{`
            @keyframes fadeSlideInCard {
              from { opacity: 0; transform: translateY(60px) scale(0.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
        <footer style={{ marginTop: 32, color: '#888', fontSize: 13, opacity: 0.8 }}>
          © {new Date().getFullYear()} Tally Assistant. All rights reserved.
        </footer>
      </Container>
    </ThemeProvider>
  );
};

export default App; 