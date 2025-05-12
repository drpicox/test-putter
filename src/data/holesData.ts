import { Hole, HoleProps } from "../models/Hole";
// Import the summary data at build time
import holeSummaryData from '../../public/data/holes-summary.json';

// In a browser environment, we'll fetch the summary from the public directory
const fetchHoleSummary = async (): Promise<Hole[]> => {
  try {
    // Get the base path for GitHub Pages deployment
    const basePath = typeof window !== 'undefined'
      ? window.location.pathname.startsWith('/test-putter') ? '/test-putter' : ''
      : '';

    const response = await fetch(`${basePath}/data/holes-summary.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch holes summary');
    }
    const data = await response.json() as HoleProps[];
    return data.map((holeData) => new Hole(holeData));
  } catch (error) {
    console.error('Error fetching holes summary:', error);
    return getFallbackHoles();
  }
};

// For SSR/SSG, we can use the summary directly
const getSummaryFromBuild = (): Hole[] => {
  try {
    // Use the imported JSON data
    return (holeSummaryData as HoleProps[]).map((holeData) => new Hole(holeData));
  } catch (error) {
    console.error('Error loading holes summary from build:', error);
    return getFallbackHoles();
  }
};

// Fallback data in case the fetch fails
const getFallbackHoles = (): Hole[] => {
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

/**
 * Gets hole data from YAML files
 * During build time/SSR, uses the pre-generated summary
 * In the browser, fetches the summary file
 */
export const getHoles = (): Hole[] => {
  // In a browser environment where window is defined
  if (typeof window !== 'undefined') {
    // Initialize with fallback data
    let holes = getFallbackHoles();

    // Fetch the data
    fetchHoleSummary().then(fetchedHoles => {
      holes = fetchedHoles;
    });

    return holes;
  } else {
    // Server-side or build time
    return getSummaryFromBuild();
  }
};

/**
 * Gets hole data asynchronously (for client-side fetching)
 */
export const getHolesAsync = async (): Promise<Hole[]> => {
  if (typeof window !== 'undefined') {
    return await fetchHoleSummary();
  } else {
    return getSummaryFromBuild();
  }
};