import React from 'react';
import { render, screen } from '@testing-library/react';
import { HolesList } from '../HolesList';
import { Hole } from '../../models/Hole';

describe('HolesList Component', () => {
  const mockHoles = [
    new Hole({ id: '1', name: 'Test Hole 1' }),
    new Hole({ id: '2', name: 'Test Hole 2' }),
    new Hole({ id: '3', name: 'Test Hole 3' }),
  ];

  it('should render the list of holes', () => {
    render(<HolesList holes={mockHoles} />);
    
    // Check if the component renders a title
    expect(screen.getByText(/available holes/i)).toBeInTheDocument();
    
    // Check if all hole names are rendered
    mockHoles.forEach(hole => {
      expect(screen.getByText(hole.name)).toBeInTheDocument();
    });
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
  });
});