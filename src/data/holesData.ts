import { Hole } from "../models/Hole";

/**
 * Stub data for golf holes
 */
export const getHoles = (): Hole[] => {
  return [
    new Hole({ id: '1', name: 'Gentle Slope' }),
    new Hole({ id: '2', name: 'Dogleg Right' }),
    new Hole({ id: '3', name: 'Water Hazard Challenge' }),
    new Hole({ id: '4', name: 'Bunker Alley' }),
    new Hole({ id: '5', name: 'Double Break' }),
    new Hole({ id: '6', name: 'The Long Putt' }),
    new Hole({ id: '7', name: 'Challenging Elevation' }),
    new Hole({ id: '8', name: 'The Island Green' }),
    new Hole({ id: '9', name: 'Championship Finisher' }),
  ];
};