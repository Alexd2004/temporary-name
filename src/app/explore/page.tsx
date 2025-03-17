'use client'

import { useEffect, useRef, useMemo} from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import Link from 'next/link'
// import BarChartComponent from '../components/BarChart'; // Adjust the path as needed

// Helper function to convert RGB to hex string
function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

export default function WorldMapPage() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  // const [navInverted, setNavInverted] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // When scroll position is beyond the hero section (i.e. window.innerHeight)
  //     if (window.scrollY > window.innerHeight) {
  //       setNavInverted(true);
  //     } else {
  //       setNavInverted(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // Emissions data: country name -> fossil emissions (in 1,000,000 tons per year)
  const emissionsData: { [country: string]: number } = {
    China: 13259.64,
    'United States of America': 4682.04,
    India: 2955.18,
    Russia: 2069.50,
    Japan: 944.76,
    Iran: 778.80,
    Indonesia: 674.54,
    'Saudi Arabia': 622.91,
    Germany: 582.95,
    Canada: 575.01,
    'South Korea': 573.54,
    Mexico: 487.09,
    Brazil: 479.50,
    Turkey: 438.32,
    'South Africa': 397.37,
    Australia: 373.62,
    Vietnam: 372.95,
    Italy: 305.49,
    'United Kingdom': 302.10,
    Poland: 286.91,
    Malaysia: 283.32,
    France: 282.43,
    Taiwan: 279.85,
    Thailand: 274.16,
    Egypt: 249.33,
    Kazakhstan: 239.87,
    Spain: 217.26,
    'United Arab Emirates': 205.99,
    Pakistan: 200.51,
    Iraq: 192.91,
    Argentina: 183.78,
    Algeria: 180.36,
    Philippines: 161.29,
    Uzbekistan: 137.90,
    Ukraine: 136.20,
    Nigeria: 127.94,
    Qatar: 127.91,
    Bangladesh: 124.79,
    Netherlands: 122.87,
    Kuwait: 111.63,
    Colombia: 100.86,
    Oman: 93.09,
    'Czech Republic': 90.51,
    Venezuela: 84.60,
    Belgium: 84.31,
    Chile: 84.00,
    Romania: 70.77,
    Morocco: 69.86,
    Turkmenistan: 65.99,
    'North Korea': 64.27,
    Libya: 61.26,
    'Israel and Palestine': 61.25,
    Austria: 58.82,
    Peru: 58.40,
    Singapore: 57.07,
    'Serbia and Montenegro': 56.12,
    Belarus: 54.18,
    Greece: 51.67,
    Ecuador: 45.33,
    Norway: 44.07,
    Hungary: 43.83,
    Azerbaijan: 42.77,
    Bulgaria: 39.79,
    Bahrain: 37.43,
    Portugal: 36.17,
    'New Zealand': 35.80,
    Sweden: 35.39,
    Slovakia: 34.86,
    'Hong Kong': 34.67,
    'Switzerland and Liechtenstein': 34.22,
    Myanmar: 33.37,
    Ireland: 32.48,
    Finland: 32.27,
    Tunisia: 31.50,
    'Dominican Republic': 31.35,
    Angola: 28.23,
    Mongolia: 28.12,
    'Trinidad and Tobago': 27.22,
    Denmark: 26.77,
    Laos: 26.02,
    Syria: 25.59,
    Ghana: 24.16,
    Bolivia: 23.81,
    Jordan: 23.58,
    Cuba: 22.07,
    'Bosnia and Herzegovina': 22.00,
    Kenya: 21.73,
    Guatemala: 21.35,
    'Sudan and South Sudan': 21.27,
    'Sri Lanka': 20.52,
    Tanzania: 19.37,
    Cambodia: 17.97,
    Nepal: 17.93,
    Croatia: 17.46,
    Lebanon: 17.33,
    Ethiopia: 16.71,
    Panama: 14.72,
    'Ivory Coast': 14.41,
    'Puerto Rico': 13.82,
    Lithuania: 13.11,
    Georgia: 12.86,
    Slovenia: 12.08,
    Senegal: 12.02,
    Zimbabwe: 11.74,
    Estonia: 11.44,
    Honduras: 10.95,
    Yemen: 10.90,
    Cameroon: 10.76,
    Kyrgyzstan: 10.46,
    Moldova: 9.93,
    Mozambique: 9.74,
    Brunei: 9.72,
    Tajikistan: 9.31,
    Uruguay: 8.82,
    'North Macedonia': 8.76,
    Afghanistan: 8.71,
    'Costa Rica': 8.57,
    'El Salvador': 8.38,
    Paraguay: 8.25,
    Zambia: 8.06,
    Armenia: 7.73,
    Botswana: 7.42,
    Congo: 7.25,
    Uganda: 7.22,
    Cyprus: 7.18,
    Luxembourg: 7.01,
    Jamaica: 6.86,
    Mali: 6.66,
    Latvia: 6.55,
    Malawi: 6.45,
    Benin: 6.44,
    'New Caledonia': 6.21,
    'Burkina Faso': 6.00,
    'Papua New Guinea': 5.95,
    Nicaragua: 5.73,
    Gabon: 4.93,
    Mauritania: 4.65,
    Albania: 4.59,
    Namibia: 4.36,
    Mauritius: 4.21,
    Madagascar: 4.10,
    'Democratic Republic of the Congo': 3.80,
    'Equatorial Guinea': 3.78,
    Guinea: 3.72,
    Haiti: 3.54,
    Guyana: 3.30,
    Iceland: 3.09,
    Macao: 3.01,
    Maldives: 2.88,
    Niger: 2.82,
    Suriname: 2.63,
    Chad: 2.57,
    Réunion: 2.57,
    Togo: 2.49,
    Curaçao: 2.43,
    Fiji: 2.21,
    Bhutan: 1.99,
    Malta: 1.68,
    Bahamas: 1.68,
    Rwanda: 1.65,
    Liberia: 1.64,
    Palau: 1.44,
    Eswatini: 1.39,
    'French Polynesia': 1.26,
    Seychelles: 1.24,
    Guadeloupe: 1.17,
    Martinique: 1.09,
    'Sierra Leone': 1.07,
    'Cape Verde': 1.01,
    Lesotho: 0.88,
    Somalia: 0.87,
    Burundi: 0.84,
    Barbados: 0.80,
    Djibouti: 0.75,
    'East Timor': 0.70,
    Gibraltar: 0.69,
    Eritrea: 0.67,
    Gambia: 0.61,
    Greenland: 0.58,
    Aruba: 0.53,
    Samoa: 0.47,
    'Solomon Islands': 0.42,
    'French Guiana': 0.38,
    'Central African Republic': 0.37,
    'Cayman Islands': 0.36,
    Bermuda: 0.35,
    'Guinea-Bissau': 0.35,
    'Antigua and Barbuda': 0.32,
    Comoros: 0.32,
    'Saint Lucia': 0.30,
    Vanuatu: 0.29,
    Belize: 0.28,
    'Western Sahara': 0.26,
    Tonga: 0.22,
    'São Tomé and Príncipe': 0.21,
    Grenada: 0.14,
    'Cook Islands': 0.14,
    'Saint Kitts and Nevis': 0.12,
    'Turks and Caicos Islands': 0.10,
    Kiribati: 0.10,
    'Saint Vincent and the Grenadines': 0.10,
    Dominica: 0.08,
    'British Virgin Islands': 0.08,
    'Saint Pierre and Miquelon': 0.04,
    Anguilla: 0.02,
    'Falkland Islands': 0.02,
    'Saint Helena, Ascension and Tristan da Cunha': 0.02,
    'Faroe Islands': 0.00
  }

  // Use the highest emission value for normalization (here, China's value)
  const maxEmission = 13259.64

  // Compute a color for each country using linear interpolation:
  // At 0 emissions: white (#ffffff)
  // At max emissions: dark red (#8B0000)
  const countryColors: { [country: string]: string } = {}
  for (const country in emissionsData) {
    const emission = emissionsData[country]
    const adjustedRatio = Math.pow(emission / maxEmission, 0.2)
    const r = Math.round(255 - 116 * adjustedRatio)
    const g = Math.round(255 - 255 * adjustedRatio)
    const b = Math.round(255 - 255 * adjustedRatio)
    
    countryColors[country] = rgbToHex(r, g, b)
  }

  

  // Build a match expression for the fill color based on each country's "name" property
  const matchExpression = useMemo(() => {
    const expr: (string | string[])[] = ['match', ['get', 'name']]
    for (const country in countryColors) {
      expr.push(country, countryColors[country])
    }
    expr.push('#ffffff')
    return expr as unknown as maplibregl.DataDrivenPropertyValueSpecification<string>
  }, [countryColors])

  useEffect(() => {
    if (!mapRef.current && mapContainer.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            countries: {
              type: 'geojson',
              data: '/custom.geo.json'
            }
          },
          layers: [
            {
              id: 'countries-fill',
              type: 'fill',
              source: 'countries',
              paint: {
                'fill-color': matchExpression as unknown as maplibregl.DataDrivenPropertyValueSpecification<string>,
                'fill-opacity': 0.8
              }
            },
            {
              id: 'countries-borders',
              type: 'line',
              source: 'countries',
              paint: {
                'line-color': '#000000',
                'line-width': 2
              }
            }
          ]
        },
        center: [0, 0],
        zoom: 1,
        maxZoom: 6,
        minZoom: 1
      })

      mapRef.current.on('load', () => {
        console.log('Map loaded.')
      })
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [matchExpression])
  return (
    <div className="flex flex-col bg-white">
      {/* <nav className={`fixed top-0 left-0 w-full ${navInverted ? "bg-white" : "bg-transparent"} z-50`}>
        <div className="container mx-auto px-6 py-4 flex justify-center items-center">
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`${navInverted ? "text-black hover:text-[#2E7D32]" : "text-white hover:text-green-500"} transition-colors font-bold`}
            >
              Home
            </Link>
            <Link
              href="/awareness"
              className={`${navInverted ? "text-black hover:text-[#2E7D32]" : "text-white hover:text-green-600"} transition-colors font-bold`}
            >
              Awareness
            </Link>
            <Link
              href="/explore"
              className={`${navInverted ? "text-black hover:text-[#2E7D32]" : "text-white hover:text-green-700"} transition-colors font-bold`}
            >
              Explore
            </Link>
            <Link
              href="/chatbot"
              className={`${navInverted ? "text-black hover:text-[#2E7D32]" : "text-white hover:text-green-800"} transition-colors font-bold`}
            >
              EcoBot
            </Link>
          </div>
        </div>
      </nav> */}
        <nav className="fixed top-0 left-0 w-full bg-transparent z-50">
        <div className="container mx-auto px-6 py-4 flex justify-center items-center">
          <div className="flex space-x-8">
          <Link href="/" className="text-green-700 hover:text-green-500 transition-colors font-bold">
                  Home
                </Link>
                {/* <Link href="/awareness" className="text-gray-700 hover:text-green-600 transition-colors font-bold">
                  Awareness
                </Link> */}
                <Link href="/explore" className="text-green-700 hover:text-green-700 transition-colors font-bold">
                  Explore
                </Link>
                <Link href="/chatbot" className="text-green-700 hover:text-green-800 transition-colors font-bold">
                  EcoBot
                </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover"
          style={{ 
            backgroundImage: "url('/carbon3.jpg')",
            backgroundPosition: 'center bottom'
          }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Global Carbon Emissions
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover how countries contribute to global CO2 emissions and learn how we can work together for a sustainable future.
          </p>
          <button
            className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => {
              document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore the Map
          </button>
        </div>
      </div>

      {/* Map, Legend, and Explanatory Text Section */}
      <main className="flex-grow flex flex-col items-center justify-center pt-20" id="map-section">
      <div
  className="w-4/5  shadow-lg p-4"
  style={{ border: '8px double #8B4513' }}
>
  <div className="flex">
    {/* Left Column: Map and Legend */}
    <div className="w-3/5 " style={{ border: '8px double rgb(122, 60, 9)' }}>
      {/* Map Container */}
      <div className="bg-white overflow-hidden"
        style={{ borderBottom: '2px solid rgb(122, 60, 9)' }}
      >
        <div ref={mapContainer} id="map" className="w-full h-[400px]" />
      </div>

      {/* Legend (attached directly below the map) */}
      <div className="bg-white p-4 rounded-b-lg">
        <h3 className="text-center font-bold text-[#2E7D32] mb-2">Legend</h3>
        <div
          className="h-4 w-full"
          style={{ background: 'linear-gradient(to right, #ffffff, #8B0000)' }}
        ></div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-[#2E7D32]">Lower Emissions</span>
          <span className="text-[#2E7D32]">Higher Emissions</span>
        </div>
      </div>
    </div>

    <div className="w-2/5 bg-white p-6">
  <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">
    What Does This Map Mean?
  </h2>
  <p className="text-black mb-2">
    This map visualizes the total carbon emissions of countries worldwide. The color gradient represents the intensity of emissions, with lighter shades indicating lower emissions and darker red hues representing higher emissions.
  </p>
  <p className="text-black mb-2">
    By exploring this map, you can see which countries are the largest contributors to global CO2 emissions and understand the scale of their impact on climate change.
  </p>
  <p className="text-black mb-2">
    Whether you&apos;re an environmental researcher, policy maker, or simply interested in the global impact of carbon emissions, this tool offers insights that can help inform better decisions and strategies.
  </p>
  <p className="text-black">
    Use this tool to gain a deeper understanding of global emission trends and learn how we can collectively work toward a more sustainable future by adopting innovative and eco-friendly practices.
  </p>
</div>
</div>
</div>


        {/* Top 10 Contributors and Bar Chart Section 
        <div className="w-full mt-8 bg-[#2E7D32] p-4 rounded-lg shadow-lg">
          <div className='w-3/5 mx-auto'>
          <h2 className="text-2xl text-center font-bold text-white mt-5 mb-20">
            Top 10 Contributors to Global CO2 Emissions
          </h2>
          <div className="flex">
            {/* Top 10 Contributors List 
            <div className="w-1/2 pr-4">
              <ul className="space-y-2">
                {Object.entries(emissionsData)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 10)
                  .map(([country, emissions]) => (
                    <li key={country} className="text-sm text-white">
                      {country}: <span className="font-bold">{emissions.toFixed(2)}M tons</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="w-4/5 mb-4">
              <h4 className="text-lg font-bold text-white ">Emissions by Country</h4>
              <div className="w-full h-64">
                <BarChartComponent data={Object.entries(emissionsData).slice(0, 10)} />
              </div>
            </div>
          </div>

          </div>
          
        </div>
        */}
        {/* Section discussing contributors and solutions */}
        <section className="w-full mt-20 mb-20 bg-[#2E7D32] p-10 rounded-lg shadow-lg text-center">
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
    A Planet in Peril: The Role of Top Emitters
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 mt-10">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-[#2E7D32] mb-4">
        The Biggest Contributors
      </h3>
      <p className="text-black ">
        The story of climate change is one of imbalance. A handful of nations bear the greatest responsibility for global carbon emissions. <strong>China</strong>, emitting <strong>13,259.64 million tons</strong> annually, stands at the forefront, followed by the <strong>United States</strong> (4,682.04 million tons) and <strong>India</strong> (2,955.18 million tons). These countries, along with <strong>Russia</strong>, <strong>Japan</strong>, and <strong>Iran</strong>, are the primary drivers of the climate crisis.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-[#2E7D32] mb-4">
        The Path to Change
      </h3>
      <p className="text-black  ">
        Their reliance on fossil fuels, expansive industrial sectors, and growing transportation networks have created a legacy of environmental harm. Yet, within this challenge lies an opportunity. By embracing renewable energy, advancing green technologies, and adopting sustainable practices, these nations can transform from contributors to champions of change.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-[#2E7D32] mb-4">
        The Power of Collective Action
      </h3>
      <p className="text-black  ">
        But the power to shape the future doesn&apos;t rest solely with governments and industries. It lies with each of us. By making conscious choices—supporting clean energy, reducing waste, and demanding accountability—we can collectively rewrite this story. Together, we can turn the tide. Let&apos;s work hand in hand to build a world where progress and sustainability go hand in hand.
      </p>
    </div>
  </div>
</section>
<section id="innovation" className="bg-white ">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-[#2E7D32] text-center mb-8">
      Innovative Solutions for a Sustainable Future
    </h2>
    <p className="text-lg text-black mb-6 text-center">
      Discover groundbreaking strategies that are transforming our approach to sustainability. Our innovative solutions integrate advanced technologies with eco-friendly practices to build a cleaner, more resilient future.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
      {/* Innovation Box 1: Renewable Energy */}
      <div className="bg-[#F0F0F0] p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold text-[#2E7D32] mb-4">
          Renewable Energy
        </h3>
        <p className="text-black mb-4">
          Renewable energy harnesses the power of natural resources such as sunlight, wind, and water. Advances in photovoltaic technology, wind turbine design, and hydroelectric engineering have significantly improved efficiency and output. With increasing investment and research, renewable energy systems are now capable of powering entire cities and reducing dependency on fossil fuels.
        </p>
        <p className="text-black">
          This approach not only minimizes greenhouse gas emissions but also creates new job opportunities and fosters economic growth through emerging green industries.
        </p>
      </div>
      {/* Innovation Box 2: Carbon Capture & Storage */}
      <div className="bg-[#F0F0F0] p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold text-[#2E7D32] mb-4">
          Carbon Capture &amp; Storage
        </h3>
        <p className="text-black mb-4">
          Carbon Capture and Storage (CCS) is a technology designed to trap CO2 emissions from industrial processes before they reach the atmosphere. This method involves capturing carbon dioxide, compressing it, and then transporting it to be stored in secure geological formations deep underground.
        </p>
        <p className="text-black">
          Beyond reducing emissions, CCS offers a transitional solution for heavy industries, enabling them to operate more sustainably while new technologies continue to evolve.
        </p>
      </div>
      {/* Innovation Box 3: Energy Storage Systems */}
      <div className="bg-[#F0F0F0] p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold text-[#2E7D32] mb-4">
          Energy Storage Systems
        </h3>
        <p className="text-black mb-4">
          Energy Storage Systems are crucial for balancing energy supply and demand, especially as renewable energy sources become more prevalent. Advanced battery technologies, along with other storage methods like pumped hydro and thermal storage, allow excess energy to be captured and used when renewable sources are intermittent.
        </p>
        <p className="text-black">
          These systems not only stabilize the grid but also pave the way for smart energy management, ensuring a reliable power supply while reducing energy waste.
        </p>
      </div>
    </div>
  </div>
</section>

<footer className="bg-[#2E7D32] w-full mt-10 text-white py-10">
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
            <Link href="/" className="text-gray-200 hover:text-white transition-colors">Home</Link>
          </li>
          {/* <li>
            <Link href="/explore" className="text-gray-200 hover:text-white transition-colors">Awareness</Link>
          </li> */}
          <li>
            <Link href="/leaderboard" className="text-gray-200 hover:text-white transition-colors">Explore</Link>
          </li>
          <li>
            <Link href="/chatbot" className="text-gray-200 hover:text-white transition-colors">EcoBot</Link>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div >
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



      </main>
    </div>
  );
}
