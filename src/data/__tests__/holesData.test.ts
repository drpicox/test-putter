import { getHoles } from '../holesData';
import { Hole } from '../../models/Hole';

describe('Holes Data', () => {
  it('should return an array of Hole objects', () => {
    const holes = getHoles();
    
    expect(Array.isArray(holes)).toBe(true);
    expect(holes.length).toBeGreaterThan(0);
    
    holes.forEach(hole => {
      expect(hole).toBeInstanceOf(Hole);
      expect(hole.id).toBeDefined();
      expect(hole.name).toBeDefined();
    });
  });
});