import Frame from './Frame';
export default class Game {
  score(): number {
    let score = 0;
    for (let i = 0; i < 10; i++) {
      if (this.frames[i].bonus === 'STRIKE') {
        score += this.frames[i].score() + this.frames[i + 1].score();
      } else {
        score += this.frames[i].score();
      }
    }
    return score;
  }
  frames: Array<Frame>;
  currentFrame: Frame;
  private frameIndex: number = 0;
  private scores: Array<number> = new Array(10).fill(0);

  setFrame() {
    if (this.currentFrame.isCompleted()) {
      this.frameIndex = this.frames.indexOf(this.currentFrame) + 1;
      this.currentFrame = this.frames[this.frameIndex];
      this.setFrameScores();
    }
  }

  private setFrameScores() {
    for (let index = 0; index < this.frameIndex; index++) {
      let frame = this.frames[index];
      if (frame.bonus === 'none') {
        frame._score = frame.score();
      } else if (!Number.isNaN(this.frames[index + 1]._score)) {
        try {
          //if strike, add next two rolls
          if (frame.bonus === 'STRIKE') {
            frame._score = frame.score() + this.frames[index + 1]._score;
          } else {
            //if spare, add next roll
            frame._score = frame.score() + this.frames[index + 1].rolls[0];
          }
        } catch (e) {
          frame._score = frame.score();
        }
      } else if (frame.isCompleted()) {
        frame._score = frame.score();
      }
    }
  }
  recordRoll(pins: number) {
    this.setFrame();
    this.currentFrame.recordRoll(pins);
  }

  constructor() {
    this.frames = new Array<Frame>(10);
    for (let i = 0; i < 10; i++) {
      this.frames[i] = new Frame();
    }
    this.currentFrame = this.frames[0];
  }
}
