import { useEffect, useState } from "react";
import { getAllMatches } from "../services/firestore";
import { calculateRankingData } from "../services/rankingLogic";
import { Match } from "../types/match";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export function RankingPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    getAllMatches().then(setMatches);
  }, []);

  const rankingData = calculateRankingData(matches);

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>ランキング</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>プレイヤー</TableCell>
            <TableCell>終</TableCell>
            <TableCell>勝</TableCell>
            <TableCell>負</TableCell>
            <TableCell>点</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankingData.map((p) => (
            <TableRow key={p.playerName}>
              <TableCell>{p.playerName}</TableCell>
              <TableCell>{p.matches}</TableCell>
              <TableCell>{p.wins}</TableCell>
              <TableCell>{p.losses}</TableCell>
              <TableCell>{p.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
