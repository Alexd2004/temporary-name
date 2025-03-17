


import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent z-50">
        <div className="container mx-auto px-6 py-4 flex justify-center items-center">
          <div className="flex space-x-8">
          <Link href="/" className="text-gray-800 hover:text-green-500 transition-colors font-bold">
                  Home
                </Link>
                {/* <Link href="/awareness" className="text-gray-700 hover:text-green-600 transition-colors font-bold">
                  Awareness
                </Link> */}
                <Link href="/explore" className="text-gray-800 hover:text-green-700 transition-colors font-bold">
                  Explore
                </Link>
                <Link href="/chatbot" className="text-gray-800 hover:text-green-800 transition-colors font-bold">
                  EcoBot
                </Link>
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
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to EcoMinded</h1>
          <p className="text-xl text-white">Join us for a greener tomorrow</p>
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



      <section id="about" className="bg-white py-20">
  {/* Centered Header */}
  <div className="text-center mb-10">
    <h2 className="text-4xl font-bold text-[#2E7D32]">Who We Are</h2>
  </div>

  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
    {/* Text Content */}
    <div className="md:w-1/2">
      <p className="text-lg text-gray-700 mb-6">
        We are <strong>Nullus</strong>, a group of passionate university students committed to creating a greener, more sustainable future. Our mission is to raise awareness about carbon emissions, environmental sustainability, and the urgent need for collective action to combat climate change.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        As students, we believe in the power of innovation and education to drive meaningful change. Through this project, we aim to empower individuals and organizations to take actionable steps towards reducing their carbon footprint and adopting eco-friendly practices.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Our platform is designed to be a hub for environmental education, collaboration, and action. From interactive tools like <strong>EcoChat</strong> to resources on sustainable living, we strive to make environmental awareness accessible and engaging for everyone.
      </p>
      {/* <button className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg hover:bg-[#4CAF50] transition-colors"> */}
        {/* Learn More
      </button> */}
    </div>

    {/* Image on the Right */}
    <div className="md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
      <img
        src="/nullusCreators.jpg" // Replace with your image path
        alt="Nullus Team"
        className="rounded-lg shadow-lg object-cover"
        style={{ width: '500px', height: '400px' }} // Inline styles to control size
      />
    </div>
  </div>
</section>



      {/* Call to Action Section */}
<section className="bg-[#2E7D32] py-20">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-white mb-6">
      Ready to Make a Difference?
    </h2>
    <p className="text-lg text-white mb-8">
      Discover how you can contribute to a greener future with <strong>EcoChat</strong>, our interactive chatbot designed to provide personalized eco-friendly tips, answer your sustainability questions, and guide you on your journey to reducing your carbon footprint.
    </p>
    <p className="text-lg text-white mb-8">
      Whether you&apos;re new to sustainability or a seasoned eco-warrior, EcoChat is here to help you take actionable steps towards a healthier planet.
    </p>
    <Link href="/chatbot">
      <button className="bg-white text-[#2E7D32] px-8 py-4 rounded-lg hover:bg-[#4CAF50] transition-colors text-xl font-semibold shadow-lg">
        Try EcoChat Now
      </button>
    </Link>
  </div>
</section>
<section id="support" className="bg-[#FFFFFF] py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-[#2E7D32] text-center mb-8">What We Support</h2>
    <p className="text-lg text-gray-700 mb-6 text-center">
      We support initiatives that reduce carbon footprints, promote renewable energy, and encourage eco-friendly practices. Our platform provides tools and resources to help you track your impact and make informed decisions.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
      {/* Policy Box 1: Carbon Pricing in Canada */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-[#2E7D32] mb-4">Coal Phase-Out in Canada</h3>
        <p className="text-gray-700 mb-4">
          Canada has committed to phasing out unabated coal-fired electricity generation by 2030. This policy aims to reduce greenhouse gas emissions and transition towards cleaner energy sources. The goal is to increase the share of non-emitting electricity sources to 90% by 2030, up from 82% in 2024.
        </p>
        <a href="https://www.canada.ca/en/services/environment/climate-change/clean-electricity-regulations.html" className="text-[#2E7D32] hover:underline">Learn more</a>
      </div>
      {/* Policy Box 2: Renewable Portfolio Standards in Germany */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-[#2E7D32] mb-4">Renewable Portfolio Standards in Germany</h3>
        <p className="text-gray-700 mb-4">
          Germany&apos;s Renewable Energy Sources Act (EEG) establishes a feed-in tariff system that guarantees fixed payments for renewable energy producers. This policy has significantly increased the share of renewable energy in Germany&apos;s electricity generation, promoting a transition to sustainable energy sources.
        </p>
        <a href="https://www.bmwi.de/Redaktion/EN/Artikel/Energy/renewable-energy-sources-act.html" className="text-[#2E7D32] hover:underline">Learn more</a>
      </div>
      {/* Policy Box 3: Emission Trading Scheme in South Korea */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-[#2E7D32] mb-4">Emission Trading Scheme in South Korea</h3>
        <p className="text-gray-700 mb-4">
          South Korea operates a national Emission Trading Scheme (ETS) that covers approximately 525 entities from 23 sectors. Launched in 2015, it is the second-largest carbon market globally, aiming to reduce greenhouse gas emissions by setting a cap and allowing trading of emission permits.
        </p>
        <a href="https://unfccc.int/news/south-korea-launches-national-emission-trading-scheme" className="text-[#2E7D32] hover:underline">Learn more</a>
      </div>
    </div>
    <div className="text-center">
      <a href="/awareness" className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg hover:bg-[#4CAF50] transition-colors">
        Check out our Awareness Page for More!
      </a>
    </div>
  </div>
</section>


<footer className="bg-[#2E7D32] text-white py-10">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Nullus Information */}
      <div>
        <h3 className="text-xl font-bold mb-4">Nullus</h3>
        <p className="text-gray-200 mb-4">
          A group of passionate university students striving for a greener, more sustainable future.
        </p>
        <Link href="https://www.nullus.ca/">
          <button className="bg-white text-[#2E7D32] px-4 py-2 rounded-lg hover:bg-[#4CAF50] transition-colors">
            Learn More About Us
          </button>
        </Link>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/awareness" className="text-gray-200 hover:text-white transition-colors">Awareness</Link>
          </li>
          <li>
            <Link href="/explore" className="text-gray-200 hover:text-white transition-colors">Explore</Link>
          </li>
          <li>
            <Link href="/leaderboard" className="text-gray-200 hover:text-white transition-colors">Leaderboard</Link>
          </li>
          <li>
            <Link href="/chatbot" className="text-gray-200 hover:text-white transition-colors">EcoBot</Link>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.948 13.948 0 011.671 3.149a4.908 4.908 0 001.523 6.574 4.905 4.905 0 01-2.229-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.934 4.934 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.925 13.925 0 007.547 2.209c9.054 0 14.002-7.496 14.002-14 0-.213-.005-.425-.015-.636A10.017 10.017 0 0024 4.557z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.768.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    {/* Copyright Notice */}
    <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
      <p>&copy; {new Date().getFullYear()} Nullus. All rights reserved.</p>
    </div>
  </div>
</footer>






    </div>
  );
}