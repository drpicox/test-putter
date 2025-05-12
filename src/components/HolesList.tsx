import React from 'react';
import { Hole } from '../models/Hole';
import Image from 'next/image';

interface HolesListProps {
  holes: Hole[];
}

export const HolesList: React.FC<HolesListProps> = ({ holes }) => {
  if (holes.length === 0) {
    return (
      <div className="w-full p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Available Holes</h2>
        <p className="text-foreground">No holes available at this time.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Available Holes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {holes.map((hole) => (
          <div 
            key={hole.id}
            data-testid="hole-card"
            className="bg-putting-green bg-opacity-20 rounded-lg p-4 border border-primary shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
          >
            <div className="flex items-center justify-center mb-3">
              <Image
                src="/golf-flag.svg"
                alt="Golf Flag"
                width={32}
                height={32}
                className="dark:invert mr-2"
              />
              <h3 className="text-xl font-semibold text-primary">{hole.name}</h3>
            </div>
            
            <div className="mt-4 flex justify-center">
              <button className="px-4 py-2 bg-primary text-white rounded-full text-sm hover:opacity-90 transition-opacity flex items-center">
                <Image
                  src="/golf-ball.svg"
                  alt="Golf Ball"
                  width={16}
                  height={16}
                  className="invert mr-2"
                />
                Play This Hole
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};