import { Hole } from '../Hole';

describe('Hole Model', () => {
  it('should create a hole with id and name', () => {
    const hole = new Hole({ id: '1', name: 'Easy Putt' });
    
    expect(hole.id).toBe('1');
    expect(hole.name).toBe('Easy Putt');
  });

  it('should throw an error if id is not provided', () => {
    expect(() => {
      // @ts-expect-error testing invalid input
      new Hole({ name: 'Missing ID' });
    }).toThrow('Hole id is required');
  });

  it('should throw an error if name is not provided', () => {
    expect(() => {
      // @ts-expect-error testing invalid input
      new Hole({ id: '2' });
    }).toThrow('Hole name is required');
  });

  it('should convert to JSON correctly', () => {
    const hole = new Hole({ id: '3', name: 'Challenging Curve' });
    const json = hole.toJSON();
    
    expect(json).toEqual({
      id: '3',
      name: 'Challenging Curve'
    });
  });
});