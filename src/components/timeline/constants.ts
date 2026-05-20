import Grad from "../pics/grad.jpg";
import OwnMyData from "../pics/ownMyData.webp";
import PushpayInternship from "../pics/pushpayInternship.jpg";
import TronBTS from "../pics/tronBTS.jpg";
import GenerosityValue from "../pics/generosityCoreValue.jpg";

export type TimelineEventDetails = {
  body?: string;
  linksTitle?: string;
  links?: Array<{ href: string; label?: string }>;
  gallery?: string[];
};

export type TimelineEvent = {
  year: string;
  endYear?: string | null;
  branch?: "above" | "below" | null;
  level?: number;
  title: string;
  description: string;
  image: string | null;
  details?: TimelineEventDetails | null;
};

export const imageMap: Record<string, string> = {
  "grad.jpg": Grad,
  "ownMyData.webp": OwnMyData,
  "pushpayInternship.jpg": PushpayInternship,
  "tronBTS.jpg": TronBTS,
  "generosityCoreValue.jpg": GenerosityValue,
};

export const PX_PER_YEAR = 260;
export const PADDING_X = 78;
export const BRANCH_OFFSET_BASE = 40;
export const LANE_SPACING = 153;
export const CARD_GAP = 11;
export const CARD_HEIGHT = 195;
export const CARD_WIDTH = 210;
export const MIN_LANE_SPACING = CARD_WIDTH + 140;
export const TRACK_PADDING_Y = 20;
export const YEAR_LABEL_HEIGHT = 18;
export const MOBILE_BREAKPOINT = 600;
export const MAX_BELOW_LEVEL = 2;

export const MOBILE_LANE_SPACING = 115;
export const MOBILE_CARD_HEIGHT = 175;
export const MOBILE_BRANCH_OFFSET_BASE = 30;
export const MOBILE_YEAR_LABEL_HEIGHT = 16;
export const MOBILE_CARD_GAP = 9;
export const MOBILE_TRACK_PADDING_Y = 16;
export const LANE_SPACING_MAX_FACTOR = 2;
export const TRACK_PADDING_Y_MAX = 80;
