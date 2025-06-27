import { ChatMessage, HistoryResponse } from '../types/chat';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function sendQuestion(question: string): Promise<string> {
  const res = await fetch(`${API_URL}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error('Failed to send question');
  const data = await res.json();
  return data.response;
}

export async function fetchHistory(): Promise<ChatMessage[]> {
  const res = await fetch(`${API_URL}/history`);
  if (!res.ok) throw new Error('Failed to fetch history');
  const data: HistoryResponse = await res.json();
  return data.history || [];
} 