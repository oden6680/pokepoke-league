import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deckIcons } from "../services/deckIcons";
import { allMatches } from "../data/dammyData";
import { DeckType, Match } from "../types/match";
import { useSwipeable } from "react-swipeable";
import { startDate, today, isBeforeStartDate } from "../utils/startDate";
import { getAllMatches } from "../services/firestore";

const renderDeckIcons = (decks: DeckType[]) => {
  return (
    <Box display="flex" gap={0.5}>
      {decks.map((d) => (
        <Box
          key={d}
          component="img"
          src={deckIcons[d]}
          width={20}
          height={20}
          alt={d}
        />
      ))}
    </Box>
  );
};

const getWeekNumber = (dateStr: string) => {
  const targetDate = new Date(dateStr);
  const diffTime = targetDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
};

const getMatchesForWeek = (weekNumber: number, matches: Match[]) => {
  return matches.filter((m) => getWeekNumber(m.matchDate) === weekNumber);
};

const getCurrentWeekNumber = () => {
  const diffTime = today.getTime() - startDate.getTime();
  if (diffTime < 0) {
    return 1;
  }
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const w = Math.floor(diffDays / 7) + 1;
  return w > 12 ? 12 : w;
};

const TabPanel = (props: {
  children?: React.ReactNode;
  value: number;
  index: number;
}) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

export const ResultsPage = () => {
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const initialWeek = getCurrentWeekNumber();
  const initialIndex = initialWeek - 1;
  const [value, setValue] = useState(initialIndex);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (value < weeks.length - 1) {
        setValue(value + 1);
      }
    },
    onSwipedRight: () => {
      if (value > 0) {
        setValue(value - 1);
      }
    },
    trackMouse: true,
  });

  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    getAllMatches().then(setMatches);
  }, []);

  return (
    <Box
      {...handlers}
      sx={{
        width: "100vw",
        height: "calc(100vh - 56px)",
        overflow: "auto",
        p: 2,
      }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto">
        {weeks.map((w) => (
          <Tab key={w} label={`Week ${w}`} />
        ))}
      </Tabs>
      {isBeforeStartDate && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          大会開始前のため、表示されているデータはダミーデータです。
        </Alert>
      )}
      <Box sx={{ marginBottom: 6 }}>
        {weeks.map((w, i) => {
          const weekMatches = getMatchesForWeek(
            w,
            isBeforeStartDate ? allMatches : matches
          );
          return (
            <TabPanel key={w} value={value} index={i}>
              {weekMatches.length === 0 ? (
                <Typography textAlign="center">
                  この週の試合データはありません
                </Typography>
              ) : (
                weekMatches.map((match, idx) => (
                  <Accordion key={idx} sx={{ marginBottom: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box position="relative" width="100%" height="40px">
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50%",
                          }}>
                          <Typography variant="h5" textAlign="center">
                            {match.player1}
                          </Typography>
                        </Box>
                        {(() => {
                          let p1Wins = 0,
                            p2Wins = 0;
                          match.games.forEach((g) => {
                            if (
                              g.player1Score > g.player2Score &&
                              g.player1Score >= 3
                            )
                              p1Wins++;
                            else if (
                              g.player2Score > g.player1Score &&
                              g.player2Score >= 3
                            )
                              p2Wins++;
                          });
                          return (
                            <Typography
                              variant="h5"
                              sx={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%,-50%)",
                                textAlign: "center",
                              }}>
                              {p1Wins} - {p2Wins}
                            </Typography>
                          );
                        })()}
                        <Box
                          sx={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50%",
                          }}>
                          <Typography variant="h5" textAlign="center">
                            {match.player2}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {match.games.map((g, i) => (
                        <Box key={i} mb={2}>
                          <Typography variant="h5" textAlign="center" mb={1}>
                            Game {i + 1}
                          </Typography>
                          <Box position="relative" width="100%" height="40px">
                            <Box
                              position="absolute"
                              left={0}
                              top="50%"
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "50%",
                              }}>
                              {renderDeckIcons(g.player1Decks)}
                            </Box>
                            <Box
                              position="absolute"
                              left="50%"
                              top="50%"
                              sx={{
                                transform: "translate(-50%,-50%)",
                                display: "flex",
                                alignItems: "center",
                              }}>
                              <Typography variant="h5">
                                {g.player1Score} - {g.player2Score}
                              </Typography>
                            </Box>
                            <Box
                              position="absolute"
                              right={0}
                              top="50%"
                              sx={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "50%",
                              }}>
                              {renderDeckIcons(g.player2Decks)}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
};
