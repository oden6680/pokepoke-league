import { useEffect, useState } from "react";
import { getAllMatches } from "../services/firestore";
import { calculateRankingData } from "../services/rankingLogic";
import { Match } from "../types/match";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { allMatches } from "../data/dammyData";

export function RankingPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    getAllMatches().then(setMatches);
  }, []);

  const rankingData = calculateRankingData(allMatches);

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        ポケミアリーグ Season1
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>プレイヤー</TableCell>
            <TableCell>終</TableCell>
            <TableCell>勝</TableCell>
            <TableCell>負</TableCell>
            <TableCell>+/-</TableCell>
            <TableCell>差</TableCell>
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
              <TableCell>
                {p.totalScored}-{p.totalConceded}
              </TableCell>
              <TableCell>
                {p.totalScored - p.totalConceded > 0 ? "+" : ""}
                {p.totalScored - p.totalConceded}
              </TableCell>
              <TableCell>{p.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
