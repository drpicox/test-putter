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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" fill="#81c784" stroke="#2e7d32" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#fff" />
        </svg>
      );
    case 'bunker':
    case 'bunkers':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M4 18C4 16 6 14 8 14C11 14 10 18 13 18C16 18 18 16 20 16" stroke="#b98f52" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M4 14C4 12 6 10 8 10C11 10 10 14 13 14C16 14 18 12 20 12" stroke="#b98f52" strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="2" y="16" width="20" height="6" rx="1" fill="#fff9c4" />
        </svg>
      );
    case 'water_hazard':
    case 'water':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M4 12C6 10 8 12 10 10C12 8 14 10 16 8C18 6 20 8 20 8V20H4V12Z" fill="#4fc3f7" />
          <path d="M4 16C6 14 8 16 10 14C12 12 14 14 16 12C18 10 20 12 20 12" stroke="#0288d1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'slope':
    case 'slopes':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="20" x2="21" y2="3" />
          <line x1="21" y1="20" x2="12" y2="12" />
        </svg>
      );
    case 'break_marker':
    case 'break_markers':
    case 'break':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v16" />
          <path d="M4 12h10" />
          <path d="M14 12l3 3-3 3" />
        </svg>
      );
    case 'fringe':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" fill="#a5d6a7" stroke="#2e7d32" strokeWidth="1.5" />
          <path d="M6 12C8 8 12 8 12 12C12 16 16 16 18 12" stroke="#2e7d32" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'distance_markers':
    case 'distance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case 'collar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" fill="#4caf50" stroke="#1b5e20" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="6" fill="#1b5e20" stroke="#4caf50" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="#a5d6a7" />
        </svg>
      );
    case 'tier':
    case 'ridge':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="8" x2="21" y2="8" />
          <line x1="3" y1="16" x2="21" y2="16" />
          <path d="M8 4v16" />
          <path d="M16 4v16" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
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