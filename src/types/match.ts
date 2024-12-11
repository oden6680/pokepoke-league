export type DeckType =
  | "kusa"
  | "hono"
  | "mizu"
  | "denki"
  | "esper"
  | "kakuto"
  | "aku"
  | "hagane"
  | "";

export interface Game {
  player1Score: number;
  player2Score: number;
  player1Decks: DeckType[];
  player2Decks: DeckType[];
}

export interface Match {
  id: string;
  player1: string;
  player2: string;
  games: Game[];
  matchDate: string;
}
