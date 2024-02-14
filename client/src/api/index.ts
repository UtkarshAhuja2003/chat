
const API_URL = process.env.NODE_SERVER_URI || 'http://chat-app-backend-6lg7.onrender.com/api/v1';

const loginUser = (username: string) => {
  sessionStorage.setItem('username', username);
};

const formatTimestamp = (timestamp:any) => {
  const options = {hour: '2-digit', minute: '2-digit', hour12: true} as Intl.DateTimeFormatOptions;
  const formattedTime = new Date(timestamp).toLocaleTimeString([], options);
  return formattedTime;
};

const sendMessage = async (content: string) => {
  const username = sessionStorage.getItem('username');
  const timestamp = formatTimestamp(Date.now());

  if (!username) throw new Error('No username found');
  if (!content) throw new Error('No message found');

  const response = await fetch(`${API_URL}/chat-app/messages/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
      username: username,
      timestamp: timestamp,
    }),
  });

  try {
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};


// Export all the API functions
export {
  loginUser,
  sendMessage,
};
