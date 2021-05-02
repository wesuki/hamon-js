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
    max: iMax + level.waveSpeed * 2,
    center: (iMin + iMax) / 2
  };
  let jRange = {
    min: jMin - level.waveSpeed * 2,
    max: jMax + level.waveSpeed * 2,
    center: (jMin + jMax) / 2
  };
  // console.log(iRange, jRange);

  let dx = game.gameWidth / Math.max(1, iRange.max - iRange.min);
  let dy = game.gameHeight / Math.max(1, jRange.max - jRange.min);
  let d = Math.min(dx, dy);
  // console.log(dx, dy);
  let stones = levelStones.map((ls) => {
    let x = (ls.i - iRange.center) * d + game.gameWidth / 2;
    let y = (ls.j - jRange.center) * d + game.gameHeight / 2;
    return new Stone(game, { x: x, y: y }, ls.targetN, ls.initN);
  });
  // console.log(stones);
  return {
    stones: stones,
    waveRange: level.waveRange * d,
    waveSpeed: level.waveSpeed * d
  };
}

export const levelTestSolved = {
  name: "just click",
  difficulty: "tutorial",
  howtosolve: `
  Touch (click) the stone to make a wave.
  `,
  stones: [[0, 0, 0, 1]],
  waveRange: 1,
  waveSpeed: 1
};
export const levelNoClick = {
  name: "no click",
  difficulty: "tutorial",
  howtosolve: `
  When there is an "X" on the stone, you can not make a wave from it.
  But when another wave reaches it, it is reactivated.
  (There is no way to solve this one.)
  `,
  stones: [
    [0, 0, 0, 1],
    [2, 0, 2, 0]
  ],
  waveRange: 3,
  waveSpeed: 1
};

export const levelThisAndThat = {
  name: "this and that",
  difficulty: "tutorial",
  howtosolve: `
  When reached by a wave, a stone will restore its outer layers indicated by the dashed circle.
  `,
  stones: [
    [0, 0, 0, 1],
    [2, 0, 1, 0]
  ],
  waveRange: 3,
  waveSpeed: 1
};

export const levelTestOutOfMove = {
  name: "bound to fail",
  difficulty: "tutorial",
  howtosolve: `
  The game will detect when there is no move available.
  (There is no way to solve this one.)
  `,
  stones: [[0, 0, 3, 1]],
  waveRange: 1,
  waveSpeed: 1
};

export const levelRT345 = {
  name: "right triangle",
  difficulty: "hard",
  howtosolve: `
  - Touch the upper left corner stone. 
  - Before the wave reaches the right, touch the right stone.
  - After the wave passes, touch the bottom stone. 
  - After the wave passes, touch the center stone.
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
  name: "alice",
  difficulty: "hard",
  howtosolve: `
  - Touch the top stone.
  - After the wave passes, touch the bottom stone. 
  - Before the wave reaches the right, touch the right stone.
  - After the wave passes, touch the left stone.
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
  difficulty: "medium",
  name: "order",
  howtosolve: `
  - Touch the stones in the right bottom stone.
  - After the wave passes, touch the bottom-left and the top-right stones.
  - After the waves pass, touch the top-left stone.
  - After the wave passes, touch the center stone.
  `,
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
  name: "timing",
  difficulty: "hard",
  howtosolve: `
  - Touch all the corner stones.
  - *After* the first wave passes the center but *befor* the second wave arrives, 
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

export const levelDual = {
  name: "dual",
  difficulty: "easy",
  howtosolve: `
  - Touch any stone.
  - Before the wave arrives at the other stone, touch the other stone.
  `,
  stones: [
    [2, 2, 1, 2],
    [0, 0, 1, 2]
  ],
  waveRange: 4,
  waveSpeed: 1
};

export const levelEcho = {
  name: "echo",
  difficulty: "easy",
  howtosolve: `
  - Touch the center stone.
  - After the wave reaches the other two, touch the other stones.
  `,
  stones: [
    [0, 0, 0, 0],
    [2, 0, 2, 1],
    [4, 0, 0, 0]
  ],
  waveRange: 3,
  waveSpeed: 1
};

const sqrt3 = Math.sqrt(3);
export const levelTest = {
  name: "test level",
  difficulty: "???",
  howtosolve: `
  - Touch any stone.
  - Before the wave arrives at the other stone, touch the other stone.
  `,
  stones: [
    [0, -sqrt3, 0, 1],
    [2, -sqrt3, 1, 0],
    [-1, 0, 0, 1],
    [3, 0, 1, 0],
    [0, sqrt3, 0, 1],
    [2, sqrt3, 1, 0]
  ],
  waveRange: 3,
  waveSpeed: 1
};

// export const levelTest = {
//   name: "test level",
//   difficulty: "???",
//   howtosolve: `
//   - Touch any stone.
//   - Before the wave arrives at the other stone, touch the other stone.
//   `,
//   stones: [
//     [0, 0, 0, 1],
//     [2, 0, 1, 0],
//   ],
//   waveRange: 3,
//   waveSpeed: 1
// };

export const allLevels = [
  // levelTest,
  levelTestSolved,
  levelNoClick,
  levelThisAndThat,
  levelTestOutOfMove,
  levelDual,
  levelEcho,
  levelJunban,
  levelAlice,
  levelRT345,
  levelTiming
];

// export const testLevel = levelRT345;
