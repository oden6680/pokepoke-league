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
  Alert,
} from "@mui/material";
import { allMatches } from "../data/dammyData";
import { isBeforeStartDate } from "../utils/startDate";

export function RankingPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    getAllMatches().then(setMatches);
  }, []);

  const rankingData = calculateRankingData(
    isBeforeStartDate ? allMatches : matches
  );

  return (
    <Box sx={{margin:1}}>
      {isBeforeStartDate && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          大会開始前のため、表示されているデータはダミーデータです。
        </Alert>
      )}
      <Typography variant="h5" mb={2}>
        ポケミアリーグ Season1
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "5%", textAlign: "center" }}>#</TableCell>
            <TableCell sx={{ width: "40%" }}>Player</TableCell>
            <TableCell sx={{ width: "7.5%", textAlign: "center" }}>
              終
            </TableCell>
            <TableCell sx={{ width: "7.5%", textAlign: "center" }}>
              勝
            </TableCell>
            <TableCell sx={{ width: "7.5%", textAlign: "center" }}>
              負
            </TableCell>
            <TableCell sx={{ width: "15%", textAlign: "center" }}>
              +/-
            </TableCell>
            <TableCell sx={{ width: "7.5%", textAlign: "center" }}>
              差
            </TableCell>
            <TableCell sx={{ width: "10%", textAlign: "center" }}>点</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankingData.map((p, index) => (
            <TableRow key={p.playerName}>
              <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
              <TableCell>{p.playerName}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{p.matches}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{p.wins}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{p.losses}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {p.totalScored}-{p.totalConceded}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {p.totalScored - p.totalConceded > 0 ? "+" : ""}
                {p.totalScored - p.totalConceded}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{p.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
