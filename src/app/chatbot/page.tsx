'use client'


// export default function ChatBotPage() {
//   return (
//     <div className="min-h-screen p-4">
//       <div className="bg-custom-green w-full h-32 rounded-lg flex items-center justify-center">
//         <h1 className="text-black text-2xl">Chatbot</h1>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import Link from 'next/link';

export default function ChatBotPage() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = () => {
    setMessageSent(true); // Hide the disclaimer after sending
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar (Fixed at the Top) */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Title on the Left */}
          <div className="text-2xl font-bold text-[#2E7D32]">
            EcoBot
          </div>

          {/* Links on the Right */}
          <div className="flex space-x-8">
            <Link href="/awareness" className="text-gray-700 hover:text-[#2E7D32] transition-colors">Awareness</Link>
            <Link href="/explore" className="text-gray-700 hover:text-[#2E7D32] transition-colors">Explore</Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-[#2E7D32] transition-colors">Leaderboard</Link>
            <Link href="/chatbot" className="text-gray-700 hover:text-[#2E7D32] transition-colors">EcoBot</Link>
          </div>
        </div>
      </nav>

      {/* Header (Below Navbar) */}
            {/* <div className="bg-[#2E7D32] w-full py-20 flex items-center justify-center shadow-md mt-16"> {/* mt-16 to account for navbar height */}
         {/* <h1 className="text-white text-4xl font-bold">Welcome to EcoBot</h1> */}
     {/*   </div>  */}
 
      {/* Disclaimer (Visible until message is sent) */}
      {!messageSent && (
        <div className="max-w-2xl mx-auto mt-30 p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-gray-600">
            EcoBot is here to help you with eco-friendly tips and information. Please note that this is a demo and no real chat functionality is available.
          </p>
        </div>
      )}

      {/* Chat Input (Fixed at the Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow p-2 bg-transparent focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg hover:bg-[#1B5E20] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}