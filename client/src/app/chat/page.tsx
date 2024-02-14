'use client';
import {IoIosSend} from 'react-icons/io';
import {sendMessage} from '@/api';
import {ChatMessageInterface} from '@/interfaces/message';
import {socket} from '@/context/SocketContext';
import {useEffect, useState} from 'react';
// import ConnectionMessage from '@/components/messages/connection';
import Message from '@/components/messages/message';

// const CONNECTED_EVENT = 'connected';
// const DISCONNECT_EVENT = 'disconnect';
const MESSAGE_RECEIVED_EVENT = 'messageReceived';

export default function Chat() {
  // const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [message, setMessage] = useState('');

  // Function to send a chat message
  const sendChatMessage = async () => {
    if (!socket) return;

    try {
      await sendMessage(message);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // const onConnect = () => {
  //   console.log('Connected to the server!');
  //   setIsConnected(true);
  // };

  // const onDisconnect = () => {
  //   console.log('Disconnected from the server!');
  //   setIsConnected(false);
  // };

  const onMessageReceived = (message: ChatMessageInterface) => {
    setMessages((prev) => [message, ...prev]);
  };

  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:
    // socket.on(CONNECTED_EVENT, onConnect);
    // socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);

    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      // socket.off(CONNECTED_EVENT, onConnect);
      // socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    };
  }, []);

  return (
    <div>
      <div className="w-[80%] text-[#FAFAFA] bg-[#232325] mx-auto my-[4vh] md:my-[7vh] rounded-md py-4 px-4 md:px-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border-[#303030] border-[1px]">
        <div className="overflow-y-auto h-[70vh] p-2 pr-4">
          {/* <ConnectionMessage connection='joined' userName='John' /> */}
          {
            messages.slice().reverse().map((message, index) => (
              <Message key={index} message={message.content} user={message.username} timestamp={message.timestamp} />
            ))
          }
          {/* <ConnectionMessage connection='left' userName='John' /> */}
        </div>
        <div className="md:flex items-center">
          <input
            placeholder="Type a Message"
            name="message"
            value={message}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendChatMessage();
              }
            }}
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
