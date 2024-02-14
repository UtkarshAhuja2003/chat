'use client';
import {IoIosSend} from 'react-icons/io';
import {sendMessage} from '@/api';
import {ChatMessageInterface} from '@/interfaces/message';
import {useSocket} from '@/context/SocketContext';
import {useEffect, useRef, useState} from 'react';

const CONNECTED_EVENT = 'connected';
const DISCONNECT_EVENT = 'disconnect';
const TYPING_EVENT = 'typing';
const STOP_TYPING_EVENT = 'stopTyping';
const MESSAGE_RECEIVED_EVENT = 'messageReceived';

export default function Chat() {
  const {socket} = useSocket();

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState(false); // To track if someone is currently typing
  const [selfTyping, setSelfTyping] = useState(false); // To track if the current user is typing
  const [message, setMessage] = useState('');

  // Function to send a chat message
  const sendChatMessage = async () => {
    // if (!socket) return;
    socket?.emit(STOP_TYPING_EVENT);

    try {
      const response = await sendMessage(message);
      console.log('Message sent:', response.data);
      setMessages((prev) => [response.data, ...prev]);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (!socket || !isConnected) return;

    // Check if the user isn't already set as typing
    if (!selfTyping) {
      setSelfTyping(true);
      socket.emit(TYPING_EVENT);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const timerLength = 3000;

    typingTimeoutRef.current = setTimeout(() => {
      // Emit a stop typing event to the server for the current chat
      socket.emit(STOP_TYPING_EVENT);
      setSelfTyping(false);
    }, timerLength);
  };

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const handleOnSocketTyping = () => {
    setIsTyping(true);
  };

  const handleOnSocketStopTyping = () => {
    setIsTyping(false);
  };

  const onMessageReceived = (message: ChatMessageInterface) => {
    setMessages((prev) => [message, ...prev]);
  };

  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:
    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);

    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    };
  }, [socket]);

  return (
    <div>
      <div className="w-[80%] text-[#FAFAFA] bg-[#232325] mx-auto my-[4vh] md:my-[7vh] rounded-md py-4 px-4 md:px-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border-[#303030] border-[1px]">
        <div className="overflow-y-auto h-[70vh] p-2">
          <div className="text-center mb-2">
            <span className="text-[#FFDB70] text-sm tracking-wider">👋 John joined the conversation!!</span>
          </div>
          <div className="flex justify-end mt-2">
            <div className="bg-[#FFDB70] rounded-l-lg rounded-se-lg py-2 px-4 text-[#232325] max-w-[70%]">
                Hello! How are you doing?
            </div>
          </div>
          <div className="text-center mb-2">
            <span className="text-[#FFDB70] text-sm tracking-wider">🚶‍♂️ John left the conversation!!</span>
          </div>
          <div className="flex justify-start mt-2">
            <div className="bg-[#353535]  rounded-r-lg rounded-ss-lg py-2 px-4 text-[#FAFAFA] max-w-[70%]">
                Hi there! I am good, thanks. How about you?
            </div>
          </div>
        </div>
        <div className="md:flex items-center">
          <input
            placeholder="Type a Message"
            name="message"
            value={message}
            onChange={(e) => handleOnMessageChange(e)}
            className="bg-[#232325] border-b-2 my-4 border-[#383838] focus:outline-none w-[100%]"
          />
          <button
            onClick={() => sendChatMessage()}
            className="py-2 px-6 md:ml-4 mx-auto text-[1.3rem] bg-[#383839] rounded-xl text-[#FFDB70] flex items-center">
            <IoIosSend />
            <span className="ml-2">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
