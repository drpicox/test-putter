'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { load } from 'js-yaml';
import { DifficultyLevel } from '@/models/Hole';

interface HoleDetailProps {
  holeId: string;
}

interface HoleElement {
  type: string;
  description: string;
}

interface HoleYamlData {
  id: string;
  name: string;
  description: string;
  elements: HoleElement[];
  difficulty: DifficultyLevel;
  par: number;
}

// Helper function to get color for difficulty level
const getDifficultyColor = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-200 text-green-800';
    case 'intermediate':
      return 'bg-blue-200 text-blue-800';
    case 'advanced':
      return 'bg-yellow-200 text-yellow-800';
    case 'expert':
      return 'bg-orange-200 text-orange-800';
    case 'championship':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Helper function to get icon for element type
const getElementIcon = (type: string): React.ReactElement => {
  switch (type.toLowerCase()) {
    case 'green':
      return (
        <div className="w-6 h-6 rounded-full bg-putting-green flex items-center justify-center">
          <span className="text-white text-xs">G</span>
        </div>
      );
    case 'bunker':
    case 'bunkers':
      return (
        <div className="w-6 h-6 rounded-full bg-sand-bunker flex items-center justify-center">
          <span className="text-amber-800 text-xs">B</span>
        </div>
      );
    case 'water_hazard':
    case 'water':
      return (
        <div className="w-6 h-6 rounded-full bg-water-hazard flex items-center justify-center">
          <span className="text-white text-xs">W</span>
        </div>
      );
    case 'slope':
    case 'slopes':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      );
    case 'break_marker':
    case 'break_markers':
    case 'break':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    case 'fringe':
      return (
        <div className="w-6 h-6 rounded-full bg-green-300 flex items-center justify-center">
          <span className="text-green-800 text-xs">F</span>
        </div>
      );
    case 'distance_markers':
    case 'distance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      );
    case 'collar':
      return (
        <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-white text-xs">C</span>
        </div>
      );
    case 'tier':
    case 'ridge':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
  }
};

export default function HoleDetail({ holeId }: HoleDetailProps) {
  const [holeData, setHoleData] = useState<HoleYamlData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoleData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/data/holes/hole-${holeId}.yaml`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch hole data: ${response.status}`);
        }
        
        const yamlText = await response.text();
        const data = load(yamlText) as HoleYamlData;
        
        setHoleData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading hole data:', err);
        setError('Failed to load hole data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHoleData();
  }, [holeId]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-4 bg-primary/20 rounded w-48 mb-2.5"></div>
          <div className="h-3 bg-primary/20 rounded w-64"></div>
          <div aria-live="polite" className="sr-only">Loading hole data...</div>
        </div>
      </div>
    );
  }

  if (error || !holeData) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-100 p-4 rounded-lg text-red-800">
          <p className="font-semibold">Error</p>
          <p>{error || 'Failed to load hole data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-putting-green bg-opacity-20 border border-primary rounded-lg overflow-hidden">
      <div className="p-6 border-b border-primary">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Image
              src="/golf-flag.svg"
              alt="Golf Flag"
              width={32}
              height={32}
              className="dark:invert mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">{holeData.name}</h1>
              <p className="text-foreground text-sm">Hole ID: {holeData.id}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">Par {holeData.par}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(holeData.difficulty)}`}>
                {holeData.difficulty.charAt(0).toUpperCase() + holeData.difficulty.slice(1)}
              </span>
            </div>
            <button className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity">
              <Image
                src="/golf-ball.svg"
                alt="Golf Ball"
                width={16}
                height={16}
                className="invert"
              />
              Play This Hole
            </button>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-6">
          <p className="text-foreground">{holeData.description}</p>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Hole Elements</h2>
        <div className="grid gap-4">
          {holeData.elements.map((element, index) => (
            <div 
              key={`${element.type}-${index}`} 
              className="bg-white bg-opacity-60 p-4 rounded-lg flex items-start gap-3"
            >
              {getElementIcon(element.type)}
              <div>
                <h3 className="font-medium text-primary capitalize">
                  {element.type.replace('_', ' ')}
                </h3>
                <p className="text-sm text-foreground">{element.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 bg-primary bg-opacity-10 border-t border-primary/30">
        <h2 className="text-xl font-semibold text-primary mb-4">Playing Tips</h2>
        <div className="bg-white bg-opacity-70 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>Study the green carefully before putting</li>
            <li>Pay attention to the {holeData.elements.find(e => e.type.includes('slope'))?.type || 'slopes'}</li>
            <li>Adjust your stroke for the {holeData.difficulty} difficulty level</li>
            <li>Focus on speed control for optimal results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}