import Game from '..';
import Frame from './index';

describe('frame', () => {
  let frame: Frame;
  beforeAll(() => {
    frame = new Frame();
  });
  it('should consists of two rolls', () => {
    expect(frame.rolls.length).toBe(2);
  });

  it('can be incomplete', () => {
    expect(frame.isCompleted()).toBe(false);
  });

  it('is complete after one roll iff ten pins are knocked down', () => {
    frame.recordRoll(10);
    expect(frame.isCompleted()).toBe(true);
  });

  describe('recordRoll', () => {
    let frame: Frame;
    beforeAll(() => {
      frame = new Frame();
    });
    it('should record first roll', () => {
      frame.recordRoll(5);
      expect(frame.rolls[0]).toBe(5);
      expect(frame.isCompleted()).toBe(false);
    });
    it('should record second roll', () => {
      frame.recordRoll(5);
      expect(frame.rolls[1]).toBe(5);
      expect(frame.isCompleted()).toBe(true);
    });

    it('should throw error if total pins in frame is > 10', () => {
      frame.recordRoll(5);
      expect(() => frame.recordRoll(6)).toThrowError('Invalid roll');
    });
  });

  describe('scoring', () => {
   it('should score a total of 8 for a roll of 5 and 3', () => {
      const frame = new Frame();
      frame.recordRoll(5);
      frame.recordRoll(3);
      expect(frame.score()).toBe(8);
    });

    describe('bonus', () => {
     it('should be awarded the bonus STRIKE if the first roll is 10', () => {
        const frame = new Frame();
        frame.recordRoll(10);
        expect(frame.bonus).toBe('STRIKE');
      });

      it('should be awarded the bonus SPARE if the first roll is not 10 and the total is 10', () => {
        const frame = new Frame();
        frame.recordRoll(5);
        frame.recordRoll(5);
        expect(frame.bonus).toBe('SPARE');
      });
     });

    describe('isStrike', () => {
      it('should return true if the first roll is 10', () => {
        const frame = new Frame();
        frame.recordRoll(10);
        expect(frame.isStrike()).toBe(true);
      });

      it('should return false if the first roll is not 10', () => {
        const frame = new Frame();
        frame.recordRoll(5);
        expect(frame.isStrike()).toBe(false);
      });

      it('should throw an error for roll of 10 and 0', () => {
        const frame = new Frame();
        frame.recordRoll(10);
        frame.recordRoll(0);
        expect(frame.score()).toBe(10);
      });

    
    });
    });
  });

