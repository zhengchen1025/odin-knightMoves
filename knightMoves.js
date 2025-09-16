//
const moveRules = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function isValid([x, y]) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function findShortestPath(start, target) {
  if (!isValid(start) || !isValid(target)) {
    return "Invalid start or target position";
  }
  if (start[0] === target[0] && start[1] === target[1]) {
    return "start and target positions are the same";
  }

  console.log(
    `The knight is moving from position ${start} to position ${target}`
  );

  const queue = [{ position: start, path: [start] }];
  const visited = new Set();
  visited.add(`${start[0]},${start[1]}`);

  while (queue.length > 0) {
    const { position, path } = queue.shift();

    if (position[0] === target[0] && position[1] === target[1]) {
      console.log(
        `The knight reached the target position in ${path.length - 1} steps`
      );
      console.log("Path taken:", path);
      return path;
    }

    const validMoves = getKnightMoves(position, visited);

    for (const move of validMoves) {
      const moveKey = `${move[0]},${move[1]}`;
      visited.add(moveKey);
      queue.push({ position: move, path: [...path, move] });
    }
  }
  return "No path found";
}

function getKnightMoves(position, visited) {
  const validMoves = [];

  for (const move of moveRules) {
    const newX = position[0] + move[0];
    const newY = position[1] + move[1];
    const newPosition = [newX, newY];
    const newPositionKey = `${newX},${newY}`;

    if (isValid(newPosition) && !visited.has(newPositionKey)) {
      validMoves.push(newPosition);
    }
  }

  return validMoves;
}

findShortestPath([0, 0], [7, 7]);
