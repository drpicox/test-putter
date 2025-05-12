import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import * as holesData from '../../data/holesData';
import { Hole } from '../../models/Hole';

// Mock the holesData module
jest.mock('../../data/holesData');

describe('Home Page', () => {
  beforeEach(() => {
    // Create proper Hole instances with all required properties
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
      })
    ];

    // Mock implementation for getHoles
    (holesData.getHoles as jest.Mock).mockReturnValue(mockHoles);
  });

  it('should render the home page with hole list', () => {
    render(<HomePage />);

    // Check if page title is rendered
    expect(screen.getByText('Test Putter')).toBeInTheDocument();

    // Check for the holes section title
    expect(screen.getByText('Available Holes')).toBeInTheDocument();

    // Check if holes from mock data are rendered
    expect(screen.getByText('Test Hole 1')).toBeInTheDocument();
    expect(screen.getByText('Test Hole 2')).toBeInTheDocument();

    // Check if difficulty and par are displayed
    expect(screen.getByText('Par 2')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Par 3')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });
});