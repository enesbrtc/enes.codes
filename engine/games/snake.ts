import { setInteractiveMode } from "../kernel/terminalKernel";
import { terminalBuffer } from "../kernel/terminalBuffer";

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: Position;
  score: number;
  gameOver: boolean;
  gridWidth: number;
  gridHeight: number;
}

let gameState: GameState | null = null;
let gameLoop: NodeJS.Timeout | null = null;

const GRID_WIDTH = 20;
const GRID_HEIGHT = 10;

function createInitialState(): GameState {
  return {
    snake: [{ x: 10, y: 5 }],
    food: { x: 15, y: 5 },
    direction: { x: 1, y: 0 },
    score: 0,
    gameOver: false,
    gridWidth: GRID_WIDTH,
    gridHeight: GRID_HEIGHT
  };
}

function generateFood(snake: Position[]): Position {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
}

function moveSnake(state: GameState): GameState {
  const head = state.snake[0];
  const newHead = {
    x: head.x + state.direction.x,
    y: head.y + state.direction.y
  };

  // Check wall collision
  if (newHead.x < 0 || newHead.x >= GRID_WIDTH || newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
    return { ...state, gameOver: true };
  }

  // Check self collision
  if (state.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    return { ...state, gameOver: true };
  }

  const newSnake = [newHead, ...state.snake];

  // Check food collision
  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    return {
      ...state,
      snake: newSnake,
      food: generateFood(newSnake),
      score: state.score + 10
    };
  } else {
    newSnake.pop(); // Remove tail if no food eaten
    return { ...state, snake: newSnake };
  }
}

function renderGame(state: GameState): string[] {
  const grid: string[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    grid[y] = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      grid[y][x] = ' ';
    }
  }

  // Draw snake
  state.snake.forEach((segment, index) => {
    if (index === 0) {
      grid[segment.y][segment.x] = '●'; // Head
    } else {
      grid[segment.y][segment.x] = '○'; // Body
    }
  });

  // Draw food
  grid[state.food.y][state.food.x] = '🍎';

  const lines = [
    "🐍 SNAKE GAME 🐍",
    "Use arrow keys to move, ESC to quit",
    `Score: ${state.score}`,
    "",
    "+" + "-".repeat(GRID_WIDTH) + "+"
  ];

  grid.forEach(row => {
    lines.push("|" + row.join('') + "|");
  });

  lines.push("+" + "-".repeat(GRID_WIDTH) + "+");

  if (state.gameOver) {
    lines.push("");
    lines.push("💀 GAME OVER! 💀");
    lines.push(`Final Score: ${state.score}`);
    lines.push("Press ESC to exit");
  }

  return lines;
}

function startGameLoop() {
  if (gameLoop) clearInterval(gameLoop);

  gameLoop = setInterval(() => {
    if (!gameState || gameState.gameOver) {
      if (gameLoop) clearInterval(gameLoop);
      return;
    }

    gameState = moveSnake(gameState);
    // Clear previous game output and push new render
    terminalBuffer.clear();
    const gameLines = renderGame(gameState);
    gameLines.forEach(line => terminalBuffer.push(line));
  }, 200);
}

export function startSnakeGame(ctx: any): string[] {
  gameState = createInitialState();

  setInteractiveMode("snake", (input: string) => {
    if (!gameState) return;

    switch (input.toLowerCase()) {
      case "arrowup":
      case "w":
        if (gameState.direction.y === 0) {
          gameState.direction = { x: 0, y: -1 };
        }
        break;
      case "arrowdown":
      case "s":
        if (gameState.direction.y === 0) {
          gameState.direction = { x: 0, y: 1 };
        }
        break;
      case "arrowleft":
      case "a":
        if (gameState.direction.x === 0) {
          gameState.direction = { x: -1, y: 0 };
        }
        break;
      case "arrowright":
      case "d":
        if (gameState.direction.x === 0) {
          gameState.direction = { x: 1, y: 0 };
        }
        break;
    }
  });

  startGameLoop();

  return renderGame(gameState);
}

export function stopSnakeGame() {
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
  gameState = null;
}