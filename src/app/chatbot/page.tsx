

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';

// type Message = {
//   content: string;
//   sender: 'user' | 'assistant';
// };

// export default function ChatBotPage() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messageSent, setMessageSent] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const addMessage = (content: string, sender: 'user' | 'assistant') => {
//     setMessages((prev) => [...prev, { content, sender }]);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     // Hide disclaimer on first message
//     if (!messageSent) {
//       setMessageSent(true);
//     }

//     // Add the user message
//     addMessage(message, 'user');
//     const userInput = message;
//     setMessage('');
    
//     // Construct the API messages (using a custom system prompt for EcoBot)
//     const apiMessages = [
//       {
//         role: 'system',
//         content:
//           "Hello, I'm Alejandro, your friendly environmental assistant. I'm here to provide eco-friendly tips, sustainable living advice, and help you reduce your carbon footprint. Ask me anything about living a greener life!",
//       },
//       ...messages.map((msg) => ({
//         role: msg.sender === 'user' ? 'user' : 'assistant',
//         content: msg.content,
//       })),
//       { role: 'user', content: userInput },
//     ];

//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ messages: apiMessages }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error response:', errorData);
//         if (errorData.message.includes('exceeded your quota')) {
//           addMessage('You have exceeded your quota. Please check your billing details.', 'assistant');
//         } else {
//           addMessage('Something went wrong. Please try again.', 'assistant');
//         }
//         throw new Error('Request failed');
//       }

//       const data = await response.json();
//       if (data?.reply) {
//         addMessage(data.reply, 'assistant');
//       } else {
//         console.error('Invalid response from assistant');
//         addMessage('Sorry, I did not understand that.', 'assistant');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       addMessage('Sorry, something went wrong. Please try again.', 'assistant');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/greenForest.jpg')" }}
//     >
//       {/* Navbar */}

//       <nav className="fixed top-0 left-0 w-full bg-transparent z-50">
//         <div className="container mx-auto px-6 py-4 flex justify-center items-center">
//           <div className="flex space-x-8">
//             <Link href="/awareness" className="text-gray-600 hover:text-green-500 transition-colors font-bold">
//               Awareness
//             </Link>
//             <Link href="/explore" className="text-gray-700 hover:text-green-600 transition-colors font-bold">
//               Explore
//             </Link>
//             <Link href="/leaderboard" className="text-gray-800 hover:text-green-700 transition-colors font-bold">
//               Leaderboard
//             </Link>
//             <Link href="/chatbot" className="text-gray-900 hover:text-green-800 transition-colors font-bold">
//               EcoBot
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Oval Chat Container */}
//       <div className="flex items-center justify-center h-screen pt-20">
//         <div className="bg-white w-[800px] h-[90vh] shadow-lg flex flex-col overflow-hidden">
//           <div className="flex-1 overflow-y-auto px-6 pt-6">
//             {/* Disclaimer shown until the first message is sent */}
//             {!messageSent && (
//               <div className="mb-6 p-6 bg-white rounded-lg shadow-md text-center">
//                 <p className="text-gray-600">
//                   EcoBot is here to help you with eco-friendly tips and sustainability advice. This demo is for informational purposes only.
//                 </p>
//               </div>
//             )}

//             {/* Conversation messages */}
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-3 flex ${
//                   msg.sender === 'user' ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 <div
//                   className={`rounded-lg py-2 px-4 max-w-[70%] ${
//                     msg.sender === 'user'
//                       ? 'bg-gray-800 text-white'
//                       : 'bg-gray-200 text-black'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}

//             {/* Typing indicator */}
//             {isLoading && (
//               <div className="mb-3 flex justify-start">
//                 <div className="rounded-lg py-2 px-4 max-w-[70%] bg-gray-200 text-black">
//                   Typing...
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           {/* Chat Input */}
//           <div className="p-4 bg-gray-100">
//             <form onSubmit={handleSubmit} className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
//                 disabled={isLoading}
//               />
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// 

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Message = {
  content: string;
  sender: 'user' | 'assistant';
};

export default function ChatBotPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (content: string, sender: 'user' | 'assistant') => {
    setMessages((prev) => [...prev, { content, sender }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!messageSent) {
      setMessageSent(true);
    }

    addMessage(message, 'user');
    const userInput = message;
    setMessage('');
    
    const apiMessages = [
      {
        role: 'system',
        content:
          "Hello, I'm Alejandro, your friendly environmental assistant. I'm here to provide eco-friendly tips, sustainable living advice, and help you reduce your carbon footprint. Ask me anything about living a greener life!",
      },
      ...messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: userInput },
    ];

    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        if (errorData.message.includes('exceeded your quota')) {
          addMessage('You have exceeded your quota. Please check your billing details.', 'assistant');
        } else {
          addMessage('Something went wrong. Please try again.', 'assistant');
        }
        throw new Error('Request failed');
      }

      const data = await response.json();
      if (data?.reply) {
        addMessage(data.reply, 'assistant');
      } else {
        console.error('Invalid response from assistant');
        addMessage('Sorry, I did not understand that.', 'assistant');
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage('Sorry, something went wrong. Please try again.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/greenForest.jpg')" }}
    >
      {/* Outer white border wrapper with background and overflow-hidden */}
      <div className="rounded-lg border-2 border-white bg-white overflow-hidden">
        {/* Inner green border wrapper with background and padding */}
        <div className="rounded-lg border-4 border-green-700 bg-green-700 ">
          <div className="bg-white rounded-lg w-[800px] h-[80vh] shadow-lg flex flex-col overflow-hidden">
            {/* Header attached to chat container */}
            <div className="px-3 py-2 flex flex-col justify-center items-center border-b">
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-green-800">EcoMinded</h1>
              </div>
              <div className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-500 transition-colors font-bold">
                  Home
                </Link>
                {/* <Link href="/awareness" className="text-gray-700 hover:text-green-600 transition-colors font-bold">
                  Awareness
                </Link> */}
                <Link href="/explore" className="text-gray-800 hover:text-green-700 transition-colors font-bold">
                  Explore
                </Link>
                <Link href="/chatbot" className="text-gray-900 hover:text-green-800 transition-colors font-bold">
                  EcoBot
                </Link>
              </div>
            </div>

            {/* Chat Conversation Area */}
            <div className="flex-1 overflow-y-auto px-6 pt-6">
              {!messageSent && (
                <div className="mb-6 p-6 bg-white rounded-lg shadow-lg text-center">
                  <p className="text-gray-600">
                  EcoBot is a demonstration tool provided by <strong className='text-black'>Nullus </strong> , offering general sustainability tips and eco-friendly advice. Please note that all content is for educational purposes only and should not be considered professional or personalized guidance. Always consult a qualified expert for advice tailored to your needs.
                  </p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg py-2 px-4 max-w-[70%] ${
                      msg.sender === 'user'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="mb-3 flex justify-start">
                  <div className="rounded-lg py-2 px-4 max-w-[70%] bg-gray-200 text-black">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-gray-100">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow p-2 text-black border border-gray-300 rounded-lg focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
