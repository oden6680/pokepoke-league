export type DeckType =
  | "kusa"
  | "hono"
  | "mizu"
  | "denki"
  | "esper"
  | "kakuto"
  | "aku"
  | "hagane"
  | "normal"
  | "";

export interface Game {
  player1Score: number;
  player1Deck: DeckType;
  player2Score: number;
  player2Deck: DeckType;
}

export interface Match {
  id: string;
  player1: string;
  player2: string;
  games: Game[];
  matchDate: string;
}
