export default class Frame {
  bonus: string;
  _score: number;
  private setBonus() {
    if (this.isStrike()) this.bonus = 'STRIKE';
    else if (this.score() === 10) this.bonus = 'SPARE';
  }
  setScore(pins: number) {
    this.rolls[0] ? (this.rolls[1] = pins) : (this.rolls[0] = pins);
  }

  private validateRoll(pins: number) {
    if (this.rolls[0] + pins > 10) throw new Error('Invalid roll');
  }
  isStrike(): boolean {
    return this.rolls[0] === 10;
  }

  recordRoll(pins: number) {
    this.validateRoll(pins);
    this.setScore(pins);
    this.setBonus();
  }

  isCompleted(): boolean {
    return this.isStrike() || this.rolls[1] !== null;
  }

  score(): number {
    const s = this.rolls.reduce((a, b) => a + b, 0);
    return this.rolls.reduce((a, b) => a + b, 0);
  }

  rolls: Array<number>;
  constructor() {
    this.rolls = new Array(2).fill(null);
    this.bonus = 'none';
    this._score = NaN;
  }
}
