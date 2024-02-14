import axios from 'axios';
import Cookie from 'js-cookie';

const apiClient = axios.create({
  baseURL: process.env.NODE_SERVER_URI || 'http://localhost:8080/api/v1',
  timeout: 120000,
});

const loginUser = (username: string) => {
  Cookie.set('username', username);
};

const sendMessage = (content: string) => {
  const formData = new FormData();
  if (content) {
    formData.append('content', content);
  }
  return apiClient.post(`/chat-app/messages/chat`, formData);
};

// Export all the API functions
export {
  loginUser,
  sendMessage,
};
