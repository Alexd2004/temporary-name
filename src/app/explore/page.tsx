'use client'

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import Link from 'next/link';

export default function WorldMapPage() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    // Only initialize the map if it hasn't been initialized yet and the container exists
    if (!mapRef.current && mapContainer.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8, // Add the version property
          sources: {
            countries: {
              type: 'geojson',
              data: '/custom.geo.json' // Point to your GeoJSON file in the public folder
            }
          },
          layers: [
            {
              id: 'countries-fill',
              type: 'fill',
              source: 'countries',
              paint: {
                'fill-color': '#888888',
                'fill-opacity': 0.4
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
        minZoom: 1,
      });

      // Fetch and add the GeoJSON data to the map
      fetch('/custom.geo.json')  // Assuming the GeoJSON file is placed in the public folder
        .then((response) => response.json())
        .then((geojsonData) => {
          if (mapRef.current) {
            mapRef.current.on('load', () => {
              // Add the GeoJSON data dynamically (not needed in this case as it's part of the style)
            });
          }
        })
        .catch((error) => console.error('Error loading GeoJSON:', error));
    }

    // Cleanup function to remove the map when component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex flex-col h-screen">
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
