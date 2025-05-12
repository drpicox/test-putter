import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HoleDetail from '../HoleDetail';
import { load } from 'js-yaml';

// Mock js-yaml
jest.mock('js-yaml', () => ({
  load: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('HoleDetail Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('mock yaml content'),
    });
    
    (load as jest.Mock).mockReturnValue({
      id: '1',
      name: 'Test Hole',
      description: 'Test hole description',
      difficulty: 'intermediate',
      par: 3,
      elements: [
        { type: 'green', description: 'Smooth putting surface' },
        { type: 'bunker', description: 'Deep sand trap' },
      ],
    });
  });

  it('should render loading state initially', () => {
    render(<HoleDetail holeId="1" />);
    
    // Should show loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should fetch and render hole data', async () => {
    render(<HoleDetail holeId="1" />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Test Hole')).toBeInTheDocument();
    });
    
    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('/data/holes/hole-1.yaml');
    
    // Check if essential elements are rendered
    expect(screen.getByText('Test hole description')).toBeInTheDocument();
    expect(screen.getByText('Par 3')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    
    // Check if hole elements are rendered
    expect(screen.getByText('green')).toBeInTheDocument();
    expect(screen.getByText('Smooth putting surface')).toBeInTheDocument();
    expect(screen.getByText('bunker')).toBeInTheDocument();
    expect(screen.getByText('Deep sand trap')).toBeInTheDocument();
    
    // Check if playing tips section is rendered
    expect(screen.getByText('Playing Tips')).toBeInTheDocument();
  });

  it('should handle fetch errors', async () => {
    // Mock a fetch error
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch error'));
    
    render(<HoleDetail holeId="1" />);
    
    // Wait for error to be rendered
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('should handle API errors', async () => {
    // Mock a non-OK response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });
    
    render(<HoleDetail holeId="1" />);
    
    // Wait for error to be rendered
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});