export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'championship';

export interface HoleProps {
  id: string;
  name: string;
  description?: string;
  difficulty?: DifficultyLevel;
  par?: number;
}

export class Hole {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly difficulty: DifficultyLevel;
  readonly par: number;

  constructor(props: HoleProps) {
    if (!props.id) {
      throw new Error('Hole id is required');
    }

    if (!props.name) {
      throw new Error('Hole name is required');
    }

    this.id = props.id;
    this.name = props.name;
    this.description = props.description || '';
    this.difficulty = props.difficulty || 'intermediate';
    this.par = props.par || 3;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      difficulty: this.difficulty,
      par: this.par
    };
  }

  /**
   * Gets the complete hole data URL for this hole
   */
  getDataUrl(): string {
    return `/data/holes/hole-${this.id}.yaml`;
  }
}