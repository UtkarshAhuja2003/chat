import {IoIosSend} from 'react-icons/io';

export default function Home() {
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
            className="bg-[#232325] border-b-2 my-4 border-[#383838] focus:outline-none w-[100%]"
          />
          <button className="py-2 px-6 md:ml-4 mx-auto text-[1.3rem] bg-[#383839] rounded-xl text-[#FFDB70] flex items-center">
            <IoIosSend />
            <span className="ml-2">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
