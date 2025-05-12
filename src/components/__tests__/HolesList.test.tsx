import React from 'react';
import { render, screen } from '@testing-library/react';
import { HolesList } from '../HolesList';
import { Hole } from '../../models/Hole';

describe('HolesList Component', () => {
  const mockHoles = [
    new Hole({
      id: '1',
      name: 'Test Hole 1',
      description: 'Test description 1',
      difficulty: 'beginner',
      par: 2
    }),
    new Hole({
      id: '2',
      name: 'Test Hole 2',
      description: 'Test description 2',
      difficulty: 'intermediate',
      par: 3
    }),
    new Hole({
      id: '3',
      name: 'Test Hole 3',
      description: 'Test description 3',
      difficulty: 'advanced',
      par: 4
    }),
  ];

  it('should render the list of holes', () => {
    render(<HolesList holes={mockHoles} />);

    // Check if the component renders a title
    expect(screen.getByText(/available holes/i)).toBeInTheDocument();

    // Check if all hole names are rendered
    mockHoles.forEach(hole => {
      expect(screen.getByText(hole.name)).toBeInTheDocument();
    });

    // Check if descriptions are rendered
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
    expect(screen.getByText('Test description 3')).toBeInTheDocument();

    // Check for difficulty and par info
    expect(screen.getByText('Par 2')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Par 3')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Par 4')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('should display a message when no holes are available', () => {
    render(<HolesList holes={[]} />);

    expect(screen.getByText(/no holes available/i)).toBeInTheDocument();
  });

  it('should render holes with proper styling', () => {
    render(<HolesList holes={mockHoles} />);

    // Check if we have the correct number of hole cards
    const holeCards = screen.getAllByTestId('hole-card');
    expect(holeCards).toHaveLength(mockHoles.length);

    // Verify each card has the expected structure
    holeCards.forEach(card => {
      expect(card).toHaveClass('bg-putting-green');
    });

    // Check for 'View Details' links
    const detailsLinks = screen.getAllByText('View Details');
    expect(detailsLinks).toHaveLength(mockHoles.length);

    // Check for 'Play Hole' buttons
    const playButtons = screen.getAllByText('Play Hole');
    expect(playButtons).toHaveLength(mockHoles.length);
  });
});