import { Match } from "../types/match";

export const allMatches: Match[] = [
  {
    id: "1",
    player1: "oden",
    player2: "sakabun",
    games: [
      {
        player1Score: 3,
        player2Score: 2,
        player1Decks: ["kusa"],
        player2Decks: ["hono"],
      },
      {
        player1Score: 4,
        player2Score: 2,
        player1Decks: ["mizu", "denki"],
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
        player2Score: 1,
        player1Decks: ["denki"],
        player2Decks: ["hagane", "kusa"],
      },
      {
        player1Score: 2,
        player2Score: 3,
        player1Decks: ["esper"],
        player2Decks: ["mizu", "aku"],
      },
      {
        player1Score: 2,
        player2Score: 3,
        player1Decks: ["mizu"],
        player2Decks: ["hono"],
      },
    ],
    matchDate: "2024-12-17",
  },
  {
    id: "3",
    player1: "oden",
    player2: "nayuta",
    games: [
      {
        player1Score: 3,
        player2Score: 2,
        player1Decks: ["esper"],
        player2Decks: ["mizu"],
      },
      {
        player1Score: 4,
        player2Score: 2,
        player1Decks: ["hono", "kusa"],
        player2Decks: ["aku"],
      },
    ],
    matchDate: "2024-12-20",
  },
  {
    id: "4",
    player1: "sakabun",
    player2: "kanekyo",
    games: [
      {
        player1Score: 3,
        player2Score: 1,
        player1Decks: ["hono"],
        player2Decks: ["kakuto", "denki"],
      },
      {
        player1Score: 1,
        player2Score: 3,
        player1Decks: ["mizu", "hagane"],
        player2Decks: ["esper"],
      },
      {
        player1Score: 4,
        player2Score: 2,
        player1Decks: ["esper"],
        player2Decks: ["mizu"],
      },
    ],
    matchDate: "2024-12-20",
  },

  {
    id: "5",
    player1: "oden",
    player2: "kanekyo",
    games: [
      {
        player1Score: 1,
        player2Score: 3,
        player1Decks: ["esper"],
        player2Decks: ["aku", "mizu"],
      },
      {
        player1Score: 1,
        player2Score: 3,
        player1Decks: ["hono"],
        player2Decks: ["kusa"],
      },
    ],
    matchDate: "2024-12-27",
  },
  {
    id: "6",
    player1: "sakabun",
    player2: "nayuta",
    games: [
      {
        player1Score: 3,
        player2Score: 1,
        player1Decks: ["kusa"],
        player2Decks: ["denki", "aku"],
      },
      {
        player1Score: 2,
        player2Score: 4,
        player1Decks: ["mizu", "hono"],
        player2Decks: ["hagane"],
      },
      {
        player1Score: 1,
        player2Score: 4,
        player1Decks: ["denki"],
        player2Decks: ["mizu", "hono", "kusa"],
      },
    ],
    matchDate: "2024-12-27",
  },
  {
    id: "7",
    player1: "oden",
    player2: "nayuta",
    games: [
      {
        player1Score: 3,
        player2Score: 2,
        player1Decks: ["hono"],
        player2Decks: ["hagane", "kakuto"],
      },
      {
        player1Score: 4,
        player2Score: 1,
        player1Decks: ["mizu"],
        player2Decks: ["denki"],
      },
    ],
    matchDate: "2024-12-30",
  },
  {
    id: "8",
    player1: "sakabun",
    player2: "kanekyo",
    games: [
      {
        player1Score: 3,
        player2Score: 2,
        player1Decks: ["mizu", "denki"],
        player2Decks: ["kakuto"],
      },
      {
        player1Score: 4,
        player2Score: 2,
        player1Decks: ["esper"],
        player2Decks: ["kusa", "hono"],
      },
    ],
    matchDate: "2024-12-30",
  },
];
