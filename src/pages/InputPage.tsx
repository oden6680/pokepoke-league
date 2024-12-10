import { useState } from "react";
import { addMatch } from "../services/firestore";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Container,
} from "@mui/material";
import { DeckType, Game } from "../types/match";

const deckTypes: DeckType[] = [
  "kusa",
  "hono",
  "mizu",
  "denki",
  "esper",
  "kakuto",
  "aku",
  "hagane",
  "normal",
];

const players = ["oden", "sakabun", "nayuta", "kanekyo"] as const;

export function InputPage() {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [games, setGames] = useState<Game[]>([
    {
      player1Score: 0,
      player1Deck: "",
      player2Score: 0,
      player2Deck: "",
    },
  ]);

  const addGameRow = () => {
    setGames([
      ...games,
      {
        player1Score: 0,
        player1Deck: "",
        player2Score: 0,
        player2Deck: "",
      },
    ]);
  };

  const updateGame = (
    index: number,
    field: keyof Game,
    value: number | string
  ) => {
    const newGames = [...games];
    newGames[index] = { ...newGames[index], [field]: value };
    setGames(newGames);
  };

  const handleSubmit = async () => {
    if (player1 === "" || player2 === "") {
      alert("両方のプレイヤーを選択してください");
      return;
    }
    const matchData = {
      player1,
      player2,
      games,
      matchDate: new Date().toISOString(),
    };
    await addMatch(matchData);
    setGames([
      {
        player1Score: 0,
        player1Deck: "",
        player2Score: 0,
        player2Deck: "",
      },
    ]);
  };

  return (
    <Container maxWidth="sm" sx={{ overflowY: "auto", height: "100%", py: 2 }}>
      <Typography variant="h5" mb={2}>
        スコア入力
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          select
          label="Player1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          sx={{ minWidth: 120 }}>
          <MenuItem value="">プレイヤーを選択</MenuItem>
          {players.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Player2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          sx={{ minWidth: 120 }}>
          <MenuItem value="">プレイヤーを選択</MenuItem>
          {players.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
        {games.map((g, i) => (
          <Box key={i} display="flex" flexDirection="column" gap={1}>
            <Box display="flex" gap={1}>
              <TextField
                label="P1スコア"
                type="number"
                value={g.player1Score}
                onChange={(e) =>
                  updateGame(i, "player1Score", Number(e.target.value))
                }
                fullWidth
              />
              <TextField
                select
                label="P1デッキ"
                value={g.player1Deck}
                onChange={(e) => updateGame(i, "player1Deck", e.target.value)}
                fullWidth>
                {deckTypes.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                label="P2スコア"
                type="number"
                value={g.player2Score}
                onChange={(e) =>
                  updateGame(i, "player2Score", Number(e.target.value))
                }
                fullWidth
              />
              <TextField
                select
                label="P2デッキ"
                value={g.player2Deck}
                onChange={(e) => updateGame(i, "player2Deck", e.target.value)}
                fullWidth>
                {deckTypes.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        ))}
        <Button variant="outlined" onClick={addGameRow}>
          ゲーム追加
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          登録
        </Button>
      </Box>
    </Container>
  );
}
