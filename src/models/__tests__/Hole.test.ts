import { Hole, DifficultyLevel } from '../Hole';

describe('Hole Model', () => {
  it('should create a hole with id and name', () => {
    const hole = new Hole({ id: '1', name: 'Easy Putt' });

    expect(hole.id).toBe('1');
    expect(hole.name).toBe('Easy Putt');
    expect(hole.description).toBe('');
    expect(hole.difficulty).toBe('intermediate');
    expect(hole.par).toBe(3);
  });

  it('should create a hole with all properties', () => {
    const holeData = {
      id: '5',
      name: 'Double Break',
      description: 'An expert-level hole',
      difficulty: 'expert' as DifficultyLevel,
      par: 4
    };

    const hole = new Hole(holeData);

    expect(hole.id).toBe('5');
    expect(hole.name).toBe('Double Break');
    expect(hole.description).toBe('An expert-level hole');
    expect(hole.difficulty).toBe('expert');
    expect(hole.par).toBe(4);
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
    const hole = new Hole({
      id: '3',
      name: 'Challenging Curve',
      description: 'A test description',
      difficulty: 'advanced',
      par: 4
    });

    const json = hole.toJSON();

    expect(json).toEqual({
      id: '3',
      name: 'Challenging Curve',
      description: 'A test description',
      difficulty: 'advanced',
      par: 4
    });
  });

  it('should generate correct data URL', () => {
    const hole = new Hole({ id: '7', name: 'Test Hole' });

    expect(hole.getDataUrl()).toBe('/data/holes/hole-7.yaml');
  });
});