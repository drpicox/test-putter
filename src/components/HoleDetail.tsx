'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { load } from 'js-yaml';
import { DifficultyLevel } from '@/models/Hole';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import TestRunner from './TestRunner';

interface HoleDetailProps {
  holeId: string;
}

interface Parameter {
  name: string;
  type: string;
}

interface TestCase {
  name: string;
  code: string;
  expected?: unknown;
  expected_error?: boolean;
  hint: string;
}

interface SolutionApproach {
  name: string;
  description: string;
}

interface HoleYamlData {
  id: string;
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  par: number;
  function_name: string;
  parameters: Parameter[];
  return_type: string;
  starting_code: string;
  tests: TestCase[];
  solution_approaches?: SolutionApproach[];
  learning_objectives?: string[];
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

export default function HoleDetail({ holeId }: HoleDetailProps) {
  const [holeData, setHoleData] = useState<HoleYamlData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [showSolutionApproaches, setShowSolutionApproaches] = useState(false);

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
        setCode(data.starting_code);
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
          <div aria-live="polite" className="sr-only">Loading challenge data...</div>
        </div>
      </div>
    );
  }

  if (error || !holeData) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-100 p-4 rounded-lg text-red-800">
          <p className="font-semibold">Error</p>
          <p>{error || 'Failed to load challenge data'}</p>
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
              src="/file.svg"
              alt="Code File"
              width={32}
              height={32}
              className="dark:invert mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">{holeData.name}</h1>
              <p className="text-foreground text-sm">Challenge #{holeData.id}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">Par {holeData.par}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(holeData.difficulty)}`}>
                {holeData.difficulty.charAt(0).toUpperCase() + holeData.difficulty.slice(1)}
              </span>
            </div>
            <button 
              className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
              onClick={() => setShowSolutionApproaches(!showSolutionApproaches)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {showSolutionApproaches ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-6">
          <p className="text-foreground">{holeData.description}</p>
        </div>
      </div>
      
      <div className="p-6 border-b border-primary/30">
        <h2 className="text-xl font-semibold text-primary mb-2">Function Signature</h2>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
          <p>
            <span className="text-blue-600">function</span> 
            <span className="text-purple-600"> {holeData.function_name}</span>
            (
            {holeData.parameters.map((param, index) => (
              <span key={param.name}>
                <span className="text-green-600">{param.name}</span>: 
                <span className="text-orange-600">{param.type}</span>
                {index < holeData.parameters.length - 1 ? ', ' : ''}
              </span>
            ))}
            ): <span className="text-orange-600">{holeData.return_type}</span>
          </p>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Your Implementation</h2>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <CodeMirror
            value={code}
            height="200px"
            theme="light"
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCode(value)}
          />
        </div>
        
        <TestRunner code={code} tests={holeData.tests} />
      </div>
      
      {showSolutionApproaches && holeData.solution_approaches && (
        <div className="p-6 bg-primary bg-opacity-10 border-t border-primary/30">
          <h2 className="text-xl font-semibold text-primary mb-4">Solution Approaches</h2>
          <div className="bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="space-y-4">
              {holeData.solution_approaches.map((approach) => (
                <div key={approach.name} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-primary">{approach.name}</h3>
                  <p className="text-sm text-foreground">{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {showSolutionApproaches && holeData.learning_objectives && (
        <div className="p-6 bg-primary bg-opacity-5 border-t border-primary/30">
          <h2 className="text-xl font-semibold text-primary mb-4">Learning Objectives</h2>
          <div className="bg-white bg-opacity-70 p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-foreground">
              {holeData.learning_objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}