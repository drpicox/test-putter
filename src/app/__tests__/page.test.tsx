import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import * as holesData from '../../data/holesData';

// Mock the holesData module
jest.mock('../../data/holesData');

describe('Home Page', () => {
  beforeEach(() => {
    // Mock implementation for getHoles
    (holesData.getHoles as jest.Mock).mockReturnValue([
      { id: '1', name: 'Test Hole 1', toJSON: () => ({ id: '1', name: 'Test Hole 1' }) },
      { id: '2', name: 'Test Hole 2', toJSON: () => ({ id: '2', name: 'Test Hole 2' }) },
    ]);
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
  });
});