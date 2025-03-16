'use client'

import { useEffect, useRef, useMemo } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import Link from 'next/link'

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
    Italy: 305.49,                // Italy, San Marino and Vatican City
    'United Kingdom': 302.10,
    Poland: 286.91,
    Malaysia: 283.32,
    France: 282.43,               // France and Monaco
    Taiwan: 279.85,
    Thailand: 274.16,
    Egypt: 249.33,
    Kazakhstan: 239.87,
    Spain: 217.26,                // Spain and Andorra
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
  // For R: white is 255, dark red is 139 (255 - 116 = 139)
  // For G and B: white is 255, dark red is 0
  const countryColors: { [country: string]: string } = {}
  for (const country in emissionsData) {
    const emission = emissionsData[country]
    const adjustedRatio = Math.pow(emission / maxEmission, 0.2); // using square root to boost lower values
    const r = Math.round(255 - 116 * adjustedRatio);
    const g = Math.round(255 - 255 * adjustedRatio);
    const b = Math.round(255 - 255 * adjustedRatio);
    
    countryColors[country] = rgbToHex(r, g, b)
  }

  // Build a match expression for the fill color based on each country's "name" property
  const matchExpression = useMemo(() => {
    const expr: (string | string[])[] = ['match', ['get', 'name']];
    for (const country in countryColors) {
      expr.push(country, countryColors[country]);
    }
    expr.push('#ffffff');
    return expr as unknown as maplibregl.DataDrivenPropertyValueSpecification<string>;
  }, [countryColors]);

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
                // Cast the matchExpression to the expected type to silence TypeScript errors
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
    <div className="flex flex-col h-screen">
      <h1 className="text-center text-3xl font-bold py-4 bg-white">CO2 Emissions by Country</h1>
      <nav className="bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <h1 className="text-xl font-bold">World Map</h1>
          <div className="flex space-x-8">
            <Link href="/awareness" className="text-gray-600 hover:text-green-500 transition-colors">
              Awareness
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-green-600 transition-colors">
              Explore
            </Link>
            <Link href="/leaderboard" className="text-gray-800 hover:text-green-700 transition-colors">
              Leaderboard
            </Link>
            <Link href="/chatbot" className="text-gray-900 hover:text-green-800 transition-colors">
              EcoBot
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow bg-[#4CAF50] flex flex-col items-center justify-center p-4">
        <div className="w-4/5 h-3/5 bg-white rounded-lg shadow-lg overflow-hidden">
          <div ref={mapContainer} id="map" className="w-full h-full" />
        </div>
        <div className="w-4/5 mt-4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Additional Content</h2>
          <p>This is a new section below the map. You can add any content you want here.</p>
        </div>
      </main>
    </div>
  )
}
