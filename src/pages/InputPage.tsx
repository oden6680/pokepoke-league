import { useState } from "react";
import { addMatch } from "../services/firestore";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  Container,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { DeckType, Game } from "../types/match";
import { deckIcons } from "../services/deckIcons";

const deckTypes: DeckType[] = [
  "kusa",
  "hono",
  "mizu",
  "denki",
  "esper",
  "kakuto",
  "aku",
  "hagane",
];

const players = ["oden", "sakabun", "nayuta", "kanekyo"] as const;

export function InputPage() {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");

  const [games, setGames] = useState<Game[]>(
    Array.from({ length: 5 }, () => ({
      player1Score: 0,
      player2Score: 0,
      player1Decks: [],
      player2Decks: [],
    }))
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateGame = <K extends keyof Game>(
    index: number,
    field: K,
    value: Game[K]
  ) => {
    const newGames = [...games];
    newGames[index] = { ...newGames[index], [field]: value };
    setGames(newGames);
  };

  const handlePlayer1DeckChange = (
    index: number,
    event: SelectChangeEvent<DeckType[]>
  ) => {
    const value = event.target.value as DeckType[];
    if (value.length <= 3) {
      updateGame(index, "player1Decks", value);
    }
  };

  const handlePlayer2DeckChange = (
    index: number,
    event: SelectChangeEvent<DeckType[]>
  ) => {
    const value = event.target.value as DeckType[];
    if (value.length <= 3) {
      updateGame(index, "player2Decks", value);
    }
  };

  const validateData = (): string | null => {
    if (player1 === "" || player2 === "") {
      return "両方のプレイヤーを選択してください";
    }

    if (player1 === player2) {
      return "同じプレイヤーを選択しています";
    }

    let player1Wins = 0;
    let player2Wins = 0;
    let gameEndIndex: number | null = null;

    for (let i = 0; i < games.length; i++) {
      const g = games[i];
      const p1Score = g.player1Score;
      const p2Score = g.player2Score;

      let winner: "p1" | "p2" | "none" = "none";
      if (p1Score >= 3 && p1Score > p2Score) {
        winner = "p1";
        player1Wins++;
      } else if (p2Score >= 3 && p2Score > p1Score) {
        winner = "p2";
        player2Wins++;
      }

      if (winner === "none") {
        return `Game ${
          i + 1
        }は勝敗が確定していません (3点以上のプレイヤーがいません)`;
      }

      if (player1Wins >= 3 || player2Wins >= 3) {
        gameEndIndex = i;
        break;
      }
    }

    if (player1Wins < 3 && player2Wins < 3) {
      return "5試合終了後も3勝したプレイヤーがいません";
    }

    if (gameEndIndex !== null) {
      for (let j = gameEndIndex + 1; j < games.length; j++) {
        const g = games[j];
        if (
          g.player1Score > 0 ||
          g.player2Score > 0 ||
          g.player1Decks.length > 0 ||
          g.player2Decks.length > 0
        ) {
          return `Game ${gameEndIndex + 1}で3勝目が確定した後に、Game ${
            j + 1
          }に入力があります`;
        }
      }
    }

    for (let i = 0; i < games.length; i++) {
      if (
        games[i].player1Decks.length === 0 ||
        games[i].player2Decks.length === 0
      ) {
        return `Game ${
          i + 1
        }で両プレイヤーのデッキを少なくとも1つ選択してください`;
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validateData();
    if (error) {
      setErrorMessage(error);
      return;
    }

    const matchData = {
      player1,
      player2,
      games,
      matchDate: new Date().toISOString(),
    };
    await addMatch(matchData);

    setErrorMessage("");
    setPlayer1("");
    setPlayer2("");
    setGames(
      Array.from({ length: 5 }, () => ({
        player1Score: 0,
        player2Score: 0,
        player1Decks: [],
        player2Decks: [],
      }))
    );
  };

  const renderDeckIcons = (decks: DeckType[]) => (
    <Box display="flex" gap={0.5}>
      {decks.map((d) => (
        <Box
          component="img"
          key={d}
          src={deckIcons[d]}
          width={24}
          height={24}
          alt={d}
        />
      ))}
    </Box>
  );

  const scoreOptions = [0, 1, 2, 3, 4];

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {errorMessage && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box display="flex" gap={1} mb={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="player1-label">プレイヤー1</InputLabel>
          <Select
            labelId="player1-label"
            label="プレイヤー1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value as string)}>
            <MenuItem value="">プレイヤーを選択</MenuItem>
            {players.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel id="player2-label">プレイヤー2</InputLabel>
          <Select
            labelId="player2-label"
            label="プレイヤー2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value as string)}>
            <MenuItem value="">プレイヤーを選択</MenuItem>
            {players.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {games.map((g, i) => (
        <Box key={i} my={2}>
          <Typography variant="subtitle1" mb={1} textAlign="center">
            Game {i + 1}
          </Typography>
          <Box display="flex" gap={1}>
            <Box display="flex" gap={1} flex={1}>
              <FormControl variant="outlined" sx={{ flex: 1 }}>
                <InputLabel id={`p1deck-label-${i}`}>デッキ</InputLabel>
                <Select
                  multiple
                  labelId={`p1deck-label-${i}`}
                  label="デッキ"
                  value={g.player1Decks}
                  onChange={(e) => handlePlayer1DeckChange(i, e)}
                  sx={{ width: "100%" }}
                  renderValue={(selected) =>
                    renderDeckIcons(selected as DeckType[])
                  }>
                  {deckTypes.map((d) => (
                    <MenuItem key={d} value={d}>
                      <Box
                        component="img"
                        src={deckIcons[d]}
                        width={20}
                        height={20}
                        alt={d}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" sx={{ width: 60 }}>
                <InputLabel id={`p1score-label-${i}`}>点</InputLabel>
                <Select
                  labelId={`p1score-label-${i}`}
                  label="スコア"
                  value={g.player1Score.toString()}
                  onChange={(e) =>
                    updateGame(i, "player1Score", Number(e.target.value))
                  }>
                  {scoreOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" gap={1} flex={1}>
              <FormControl variant="outlined" sx={{ width: 60 }}>
                <InputLabel id={`p2score-label-${i}`}>点</InputLabel>
                <Select
                  labelId={`p2score-label-${i}`}
                  label="スコア"
                  value={g.player2Score.toString()}
                  onChange={(e) =>
                    updateGame(i, "player2Score", Number(e.target.value))
                  }>
                  {scoreOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" sx={{ flex: 1 }}>
                <InputLabel id={`p2deck-label-${i}`}>デッキ</InputLabel>
                <Select
                  multiple
                  labelId={`p2deck-label-${i}`}
                  label="デッキ"
                  value={g.player2Decks}
                  onChange={(e) => handlePlayer2DeckChange(i, e)}
                  renderValue={(selected) =>
                    renderDeckIcons(selected as DeckType[])
                  }>
                  {deckTypes.map((d) => (
                    <MenuItem key={d} value={d}>
                      <Box
                        component="img"
                        src={deckIcons[d]}
                        width={20}
                        height={20}
                        alt={d}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      ))}

      <Box mt={4} textAlign="center">
        <Button variant="contained" onClick={handleSubmit}>
          保存
        </Button>
      </Box>
    </Container>
  );
}
