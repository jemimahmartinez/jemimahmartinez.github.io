import Grad from "../pics/grad.jpg";
import OwnMyData from "../pics/ownMyData.webp";
import PushpayInternship from "../pics/pushpayInternship.jpg";
import TronBTS from "../pics/tronBTS.jpg";
import GenerosityValue from "../pics/generosityCoreValue.png";

export type TimelineEvent = {
  year: string;
  endYear?: string | null;
  branch?: "above" | "below" | null;
  level?: number;
  title: string;
  description: string;
  image: string | null;
};

export const imageMap: Record<string, string> = {
  "grad.jpg": Grad,
  "ownMyData.webp": OwnMyData,
  "pushpayInternship.jpg": PushpayInternship,
  "tronBTS.jpg": TronBTS,
  "generosityCoreValue.png": GenerosityValue,
};

export const PX_PER_YEAR = 320;
export const PADDING_X = 96;
export const BRANCH_OFFSET_BASE = 50;
export const LANE_SPACING = 190;
export const CARD_GAP = 14;
export const CARD_HEIGHT = 240;
export const CARD_WIDTH = 260;
export const MIN_LANE_SPACING = CARD_WIDTH + 80;
export const TRACK_PADDING_Y = 24;
export const YEAR_LABEL_HEIGHT = 22;
export const MOBILE_BREAKPOINT = 600;
