import KafeKrayon from "../pics/kafeKrayon.gif";
import TRON from "../pics/tron.gif";
import Yumble from "../pics/yumble.gif";
import RecordLine from "../pics/recordLine.gif";
import FreqRelay from "../pics/freqRelay.png";

import oracleData from "../../oracle.json";

const slides = [
  { src: TRON, ...oracleData.slides.tron },
  { src: Yumble, ...oracleData.slides.yumble },
  { src: KafeKrayon, ...oracleData.slides.kafeKrayon },
  { src: RecordLine, ...oracleData.slides.recordLine },
  { src: FreqRelay, ...oracleData.slides.freqRelay },
];

export default slides;
