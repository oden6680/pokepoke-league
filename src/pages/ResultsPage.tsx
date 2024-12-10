import { useEffect, useState } from "react";
import { getAllMatches } from "../services/firestore";
import { Match } from "../types/match";
import { Box, Card, CardContent, Typography } from "@mui/material";

export function ResultsPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    getAllMatches().then(setMatches);
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>試合結果一覧</Typography>
      {matches.map(match => (
        <Card key={match.id} sx={{mb:2}}>
          <CardContent>
            <Typography variant="h6">{match.player1} vs {match.player2}</Typography>
            <Typography variant="body2">日付: {new Date(match.matchDate).toLocaleDateString()}</Typography>
            {match.games.map((g, i) => (
              <Box key={i} display="flex" justifyContent="space-between" mt={1}>
                <Typography>{match.player1}: {g.player1Score} ({g.player1Deck})</Typography>
                <Typography>{match.player2}: {g.player2Score} ({g.player2Deck})</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
