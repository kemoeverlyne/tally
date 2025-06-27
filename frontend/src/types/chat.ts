export interface ChatMessage {
  question: string;
  response: string;
  timestamp?: string;
}
 
export interface HistoryResponse {
  history: ChatMessage[];
} 