import { Match } from "../types/match";

interface PlayerStats {
  playerName: string;
  points: number;
  wins: number;
  losses: number;
  matches: number;
  deckUsage: Record<string, number>;
  totalScored: number;
  totalConceded: number;
}

export function calculateRankingData(matches: Match[]): PlayerStats[] {
  const playersSet = new Set<string>();
  matches.forEach((m) => {
    playersSet.add(m.player1);
    playersSet.add(m.player2);
  });

  const playerStatsMap: Record<string, PlayerStats> = {};
  playersSet.forEach((p) => {
    playerStatsMap[p] = {
      playerName: p,
      points: 0,
      wins: 0,
      losses: 0,
      matches: 0,
      deckUsage: {},
      totalScored: 0,
      totalConceded: 0,
    };
  });

  for (const match of matches) {
    const { player1, player2, games } = match;
    const p1Wins = games.reduce((acc, g) => acc + g.player1Score, 0);
    const p2Wins = games.reduce((acc, g) => acc + g.player2Score, 0);

    playerStatsMap[player1].totalScored += p1Wins;
    playerStatsMap[player1].totalConceded += p2Wins;
    playerStatsMap[player2].totalScored += p2Wins;
    playerStatsMap[player2].totalConceded += p1Wins;

    let winner: string;
    let loser: string;
    const totalGames = games.length;

    if (p1Wins > p2Wins) {
      winner = player1;
      loser = player2;
    } else {
      winner = player2;
      loser = player1;
    }

    const isFullLength = totalGames === 5;
    playerStatsMap[winner].points += 3;
    if (isFullLength) {
      playerStatsMap[loser].points += 1;
    }

    playerStatsMap[winner].wins += 1;
    playerStatsMap[winner].matches += 1;
    playerStatsMap[loser].losses += 1;
    playerStatsMap[loser].matches += 1;
  }

  return Object.values(playerStatsMap).sort((a, b) => b.points - a.points);
}
