import Stone from "/src/stone";

export function buildLevel(game, level) {
  let levelStones = level.stones.map((params) => {
    return { i: params[0], j: params[1], targetN: params[2], initN: params[3] };
  });
  // console.log(levelStones);

  let iMax = Math.max(...levelStones.map((ls) => ls.i));
  let jMax = Math.max(...levelStones.map((ls) => ls.j));
  // console.log("iMax: " + iMax + ", " + "jMax: " + jMax);

  let iMin = Math.min(...levelStones.map((ls) => ls.i));
  let jMin = Math.min(...levelStones.map((ls) => ls.j));
  // console.log("iMin: " + iMin + ", " + "jMin: " + jMin);

  let iRange = {
    min: iMin - level.waveSpeed * 2,
    max: iMax + level.waveSpeed * 2
  };
  let jRange = {
    min: jMin - level.waveSpeed * 2,
    max: jMax + level.waveSpeed * 2
  };
  // console.log(iRange, jRange);

  let dx = game.gameWidth / Math.max(1, iRange.max - iRange.min);
  let dy = game.gameHeight / Math.max(1, jRange.max - jRange.min);
  let d = Math.min(dx, dy);
  // console.log(dx, dy);
  let stones = levelStones.map((ls) => {
    let x = (ls.i - iRange.min) * d;
    let y = (ls.j - jRange.min) * d;
    return new Stone(game, { x: x, y: y }, ls.targetN, ls.initN);
  });
  // console.log(stones);
  return {
    stones: stones,
    waveRange: level.waveRange * d,
    waveSpeed: level.waveSpeed * d
  };
}

export const levelTestOutOfMove = {
  stones: [[0, 0, 3, 1]],
  waveRange: 1,
  waveSpeed: 1
};

export const levelTestSolved = {
  stones: [[0, 0, 0, 1]],
  waveRange: 1,
  waveSpeed: 1
};

export const levelRT345 = {
  howtosolve: `
  - Touch the upper left corner stone. 
  - Before the wave reaches the right, touch the right stone.
  - Touch the bottom stone. 
  - Touch the center stone.
  `,
  stones: [
    [0, 0, 3, 1],
    [4, 0, 2, 2],
    [0, 3, 1, 3],
    [1, 1, 0, 0]
  ],
  waveRange: 4,
  waveSpeed: 1
};
export const levelAlice = {
  howtosolve: `
  - Touch the top stone. Wait until the wave fades out.
  - Touch the bottom stone. 
  - Before the wave reaches the right, touch the right stone.
  - Touch the left stone.
  `,
  stones: [
    [2, 2, 3, 1], // a
    [5, 3, 1, 3], // b
    [3, 5, 2, 2], // c
    [0, 3, 0, 0] // d
  ],
  waveRange: 4,
  waveSpeed: 1
};

export const levelJunban = {
  stones: [
    [2, 2, 0, 2],
    [0, 0, 1, 2],
    [4, 0, 2, 2],
    [0, 4, 2, 2],
    [4, 4, 3, 2]
  ],
  waveRange: 4,
  waveSpeed: 1
};

export const levelTiming = {
  howtosolve: `
  - Touch all the corner stones.
  - _After_ the first wave passes the center but _before_ the second wave arrives, 
  touch the center stone.
  `,
  stones: [
    [2, 2, 3, 2],
    [0, 0, 3, 2],
    [4, 0, 3, 2],
    [0, 4, 3, 2],
    [4, 4, 3, 2]
  ],
  waveRange: 5,
  waveSpeed: 0.75
};

export const testLevel = levelRT345;
