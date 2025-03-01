// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal bg-custom-green text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent z-50">
        <div className="container mx-auto px-6 py-4 flex justify-center items-center">
          <div className="flex space-x-8">
            <Link href="/awareness" className="text-gray-600 hover:text-green-500 transition-colors">Awareness</Link>
            <Link href="/explore" className="text-gray-700 hover:text-green-600 transition-colors">Explore</Link>
            <Link href="/leaderboard" className="text-gray-800 hover:text-green-700 transition-colors">Leaderboard</Link>
            <Link href="/chatbot" className="text-gray-900 hover:text-green-800 transition-colors">EcoBot</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/LandingPage.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-opacity-30"></div>
        <div className="relative z-10 text-center" style={{ top: '-90px' }}>
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to EcoAware</h1>
          <p className="text-xl text-white">Join us in making the planet greener</p>
        </div>
        {/* Scroll Arrow */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>






      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#2E7D32] mb-8">Who We Are</h2>
          <p className="text-lg text-gray-700 mb-6">
            We are a community-driven platform dedicated to raising awareness about carbon emissions and promoting sustainable living. Our mission is to empower individuals and organizations to take actionable steps towards a greener future.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Through education, exploration, and collaboration, we aim to create a global movement for environmental sustainability.
          </p>
          <button className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg hover:bg-[#4CAF50] transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="bg-[#87CEEB] py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#2E7D32] mb-8">What We Support</h2>
          <p className="text-lg text-gray-700 mb-6">
            We support initiatives that reduce carbon footprints, promote renewable energy, and encourage eco-friendly practices. Our platform provides tools and resources to help you track your impact and make informed decisions.
          </p>
          <button className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg hover:bg-[#4CAF50] transition-colors">
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
}