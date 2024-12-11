import kusaIcon from "../icons/kusaene.png";
import honoIcon from "../icons/honoene.png";
import mizuIcon from "../icons/mizuene.png";
import denkiIcon from "../icons/denkiene.png";
import esperIcon from "../icons/esperene.png";
import kakutoIcon from "../icons/kakutoene.png";
import akuIcon from "../icons/akuene.png";
import haganeIcon from "../icons/haganeene.png";
import { DeckType } from "../types/match";

export const deckIcons: Record<DeckType, string> = {
    kusa: kusaIcon,
    hono: honoIcon,
    mizu: mizuIcon,
    denki: denkiIcon,
    esper: esperIcon,
    kakuto: kakutoIcon,
    aku: akuIcon,
    hagane: haganeIcon,
    "": ""
};
