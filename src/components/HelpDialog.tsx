import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

 const HelpDialog = ({ open, onClose }: HelpDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ゲームのルール</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          1. 毎週火曜日から開始される総当たりリーグ戦です。
        </Typography>
        <Typography gutterBottom>
          2.
          各試合では2～5ゲームが行われ、先に3ゲーム勝利したプレイヤーがその試合の勝者となります。
        </Typography>
        <Typography gutterBottom>
          3. 勝利した試合数が多いプレイヤーが上位にランクされます。
        </Typography>
        <Typography gutterBottom>
          4. 各ゲームのスコアと使用デッキのタイプが記録されます。
        </Typography>
        <Typography gutterBottom>
          5. 勝利数が同じ場合は、合計スコア差で順位を決定します。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;