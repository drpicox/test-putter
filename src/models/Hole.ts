export interface HoleProps {
  id: string;
  name: string;
}

export class Hole {
  readonly id: string;
  readonly name: string;

  constructor(props: HoleProps) {
    if (!props.id) {
      throw new Error('Hole id is required');
    }
    
    if (!props.name) {
      throw new Error('Hole name is required');
    }

    this.id = props.id;
    this.name = props.name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}