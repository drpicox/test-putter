import { getHoles, getHolesAsync } from '../holesData';
import { Hole } from '../../models/Hole';

// Mock the fetch function for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: '1', name: 'Test Hole 1', difficulty: 'beginner', par: 2 },
      { id: '2', name: 'Test Hole 2', difficulty: 'intermediate', par: 3 }
    ])
  } as Response)
);

// Mock the require function for the summary file
jest.mock('../../public/data/holes-summary.json', () => [
  { id: '1', name: 'Test Hole 1', difficulty: 'beginner', par: 2 },
  { id: '2', name: 'Test Hole 2', difficulty: 'intermediate', par: 3 }
], { virtual: true });

describe('Holes Data', () => {
  it('should return an array of Hole objects from getSummaryFromBuild', () => {
    const holes = getHoles();

    expect(Array.isArray(holes)).toBe(true);
    expect(holes.length).toBeGreaterThan(0);

    holes.forEach(hole => {
      expect(hole).toBeInstanceOf(Hole);
      expect(hole.id).toBeDefined();
      expect(hole.name).toBeDefined();
    });
  });

  it('should fetch holes asynchronously', async () => {
    const holes = await getHolesAsync();

    expect(Array.isArray(holes)).toBe(true);
    expect(holes.length).toBe(2);

    expect(holes[0].id).toBe('1');
    expect(holes[0].name).toBe('Test Hole 1');
    expect(holes[0].difficulty).toBe('beginner');
    expect(holes[0].par).toBe(2);

    expect(fetch).toHaveBeenCalledWith('/data/holes-summary.json');
  });
});