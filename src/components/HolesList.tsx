import React from 'react';
import { Hole, DifficultyLevel } from '../models/Hole';
import Image from 'next/image';
import Link from 'next/link';

interface HolesListProps {
  holes: Hole[];
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

export const HolesList: React.FC<HolesListProps> = ({ holes }) => {
  if (holes.length === 0) {
    return (
      <div className="w-full p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Available Challenges</h2>
        <p className="text-foreground">No challenges available at this time.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Available Challenges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {holes.map((hole) => (
          <div
            key={hole.id}
            data-testid="hole-card"
            className="bg-putting-green bg-opacity-20 rounded-lg p-4 border border-primary shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Image
                  src="/file.svg"
                  alt="Code File"
                  width={28}
                  height={28}
                  className="dark:invert mr-2"
                />
                <h3 className="text-xl font-semibold text-primary">{hole.name}</h3>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold mr-2">Par {hole.par}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(hole.difficulty)}`}>
                  {hole.difficulty.charAt(0).toUpperCase() + hole.difficulty.slice(1)}
                </span>
              </div>
            </div>

            <p className="text-sm mb-4 text-foreground line-clamp-2">{hole.description}</p>

            <div className="mt-auto pt-2 flex justify-between items-center">
              <Link
                href={`/holes/${hole.id}`}
                className="text-xs text-primary hover:underline flex items-center"
              >
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href={`/holes/${hole.id}`}
                className="px-4 py-2 bg-primary text-white rounded-full text-sm hover:opacity-90 transition-opacity flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Start Challenge
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};