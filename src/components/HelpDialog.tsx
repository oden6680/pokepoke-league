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
      <DialogTitle>ポケミアリーグSeason1レギュレーション</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          1. 拡張パック「幻のいる島」発売日(12/17)から開始されるリーグ戦です。
        </Typography>
        <Typography gutterBottom>
          2.
          各週4名が総当たりで試合を行い、各試合では先に3ゲーム勝利したプレイヤーがその週の該当試合の勝者となります。
        </Typography>
        <Typography gutterBottom>
          3.
          試合の勝利数に応じて、勝者には3点、敗者には0点の勝ち点が与えられます。
        </Typography>
        <Typography gutterBottom>
          4.
          12週間のリーグ戦を終えた時点で、合計勝ち点の多い順に順位が決定されます。
        </Typography>
        <Typography gutterBottom>
          5.
          勝利数が同じ場合は、合計スコア(各ゲームでの獲得ポイント数の総和)差で順位を決定します。
        </Typography>
        <Typography gutterBottom>
          6. スコア差も同じ場合は、直接対決の結果で順位を決定します。
        </Typography>
        <Typography gutterBottom>
          7.
          各試合でプレイヤーは3種類のデッキを用意し、1試合目の開始前にそれぞれのデッキで使用するエネルギーを相手に伝える必要があります。この時、どの対戦でどのデッキを使用するかを伝える必要はありません。
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
