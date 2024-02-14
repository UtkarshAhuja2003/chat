import React, {createContext, useContext, useEffect, useState} from 'react';
import socketio from 'socket.io-client';

// establish a socket connection
const getSocket = () => {
  return socketio(process.env.NODE_SOCKET_URI || 'http://localhost:8080');
};

const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
      null,
  );

  useEffect(() => {
    setSocket(getSocket());
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export {SocketProvider, useSocket};
