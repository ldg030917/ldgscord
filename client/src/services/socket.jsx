import React, { createContext, useEffect, useRef, useContext } from "react";
import io from 'socket.io-client';

const SocketIoContext = createContext();

export const SocketIoProvider = ({ children }) => {
  const socket = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    socket.current = io('http://localhost:5000', {
      auth: {
        token
      }
    });

    socket.current.on('connect', () => {
      console.log('Socket connected:', socket.current.id);
    });

    socket.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    
    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <SocketIoContext.Provider value={socket.current}>
      {children}
    </SocketIoContext.Provider>
  );
};

//useSocket 커스텀 훅
export const useSocket = () => {
  const context = useContext(SocketIoContext);
  //console.log("context: ", context);
  //if (!context) throw new Error('useSocket must be used within a SocketProvider');
  return context;
};
