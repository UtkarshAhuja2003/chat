
export default function Message({user, message, timestamp}: { user: string, message: string, timestamp: string }) {
  const username = sessionStorage.getItem('username') || '';

  return (
    <div className={`flex flex-col mt-2 ${user === username ? 'items-end' : 'items-start'}`}>
      <div className="text-sm text-gray-500 mt-1">{user}</div>
      <div className={`${user === username ? 'bg-[#FFDB70] ml-auto rounded-l-lg rounded-se-lg text-[#232325]' : 'bg-[#353535] rounded-r-lg rounded-ss-lg text-[#FAFAFA]' } py-2 px-4 max-w-[70%]`}>
        {message}
      </div>
      <div className="text-sm text-gray-500 mt-1">{timestamp}</div>
    </div>
  );
}
