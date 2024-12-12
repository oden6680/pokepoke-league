import { Match } from "../types/match";

export const allMatches: Match[] = [
  {
    id: "1",
    player1: "oden",
    player2: "sakabun",
    games: [
      {
        player1Score: 3,
        player2Score: 1,
        player1Decks: ["kusa"],
        player2Decks: ["hono"],
      },
      {
        player1Score: 4,
        player2Score: 2,
        player1Decks: ["mizu"],
        player2Decks: ["aku"],
      },
    ],
    matchDate: "2024-12-17",
  },
  {
    id: "2",
    player1: "nayuta",
    player2: "kanekyo",
    games: [
      {
        player1Score: 3,
        player2Score: 0,
        player1Decks: ["denki"],
        player2Decks: ["hagane"],
      },
    ],
    matchDate: "2024-12-29",
  },
  {
    id: "3",
    player1: "oden",
    player2: "kanekyo",
    games: [
      {
        player1Score: 3,
        player2Score: 2,
        player1Decks: ["esper"],
        player2Decks: ["mizu"],
      },
    ],
    matchDate: "2024-01-03",
  },
  {
    id: "4",
    player1: "sakabun",
    player2: "nayuta",
    games: [
      {
        player1Score: 4,
        player2Score: 1,
        player1Decks: ["hono"],
        player2Decks: ["kakuto"],
      },
    ],
    matchDate: "2024-01-10",
  },
];
