import Game from './index';
describe('game', () => {

  let game: Game;
  beforeEach(() => {
    game = new Game();
  });
  
  it('should track the current frame', () => {
    game.recordRoll(1);
    expect(game.currentFrame).toBe(game.frames[0]);
    expect(game.currentFrame.isCompleted()).toBe(false);
    recordMany(game, [1,1]);
    expect(game.currentFrame).toBe(game.frames[1]);
  });

  it('should track the current frame - strike', () => {
    expect(game.currentFrame).toBe(game.frames[0]);
    game.recordRoll(10);
    expect(game.currentFrame).toBe(game.frames[0]);
    game.recordRoll(1);
    expect(game.currentFrame).toBe(game.frames[1]);
  });

  describe('scoring', () => {
    it('should score a total of 0 for a gutter game', () => {
      recordMany(game, new Array(20).fill(0));
      expect(game.score()).toBe(0);
    });

    it('should score a total of 20 for a roll of 1', () => {
      recordMany(game, new Array(20).fill(1));
      expect(game.score()).toBe(20);
    });
    it('should score a total of 8 for a roll of 5 and 3', () => {
      recordMany(game, [5,3]);
      expect(game.score()).toBe(8);
    });

    it('should score a total of 16 for a roll of 5 and 3 and 5 and 3', () => {
      recordMany(game, [5,3,5,3]);
      expect(game.score()).toBe(16);
    });

    it('should score 20 for a roll of 10 and a roll of 5 and 0', () => {
      recordMany(game, [10,5,0]);
      expect(game.score()).toBe(20);
    });

    it('should score 40 for a roll of 10 and a roll of 10 and a roll of 5 and 0', () => {
      recordMany(game, [10,10,5,0]);
      expect(game.score()).toBe(40);
    });

    it('should score 300 for a perfect game', () => {
      recordMany(game, new Array(10).fill(10));
      expect(game.score()).toBe(0);
    });
  });
});
function recordMany(game: Game, rolls:Array<number>) {
  rolls.forEach(roll => game.recordRoll(roll));
}

