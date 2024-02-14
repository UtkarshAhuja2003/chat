
export default function ConnectMessage({userName, connection}: { userName: string, connection: string }) {
  return (
    <div className="text-center mb-2">
      {
        connection === 'joined' && (
          <span className="text-[#FFDB70] text-sm tracking-wider">👋 ${userName} joined the conversation!!</span>
        )
      }
      {
        connection === 'left' && (
          <span className="text-[#FFDB70] text-sm tracking-wider">🚶‍♂️ ${userName} left the conversation!!</span>
        )
      }
    </div>
  );
}
