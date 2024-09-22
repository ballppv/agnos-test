// Abs Images
import epigastriumText from '../assets/images/abs/epigastrium-active.png'
import epigastriumPart from '../assets/images/abs/epigastrium-highlight.png'
import llqText from '../assets/images/abs/llq-active.png'
import llqPart from '../assets/images/abs/llq-highlight.png'
import luqText from '../assets/images/abs/luq-active.png'
import luqPart from '../assets/images/abs/luq-highlight.png'
import rlqText from '../assets/images/abs/rlq-active.png'
import rlqPart from '../assets/images/abs/rlq-highlight.png'
import ruqText from '../assets/images/abs/ruq-active.png'
import ruqPart from '../assets/images/abs/ruq-highlight.png'
import suprapubicText from '../assets/images/abs/suprapubic-active.png'
import suprapubicPart from '../assets/images/abs/suprapubic-highlight.png'
import umbilicusText from '../assets/images/abs/umbilicus-active.png'
import umbilicusPart from '../assets/images/abs/umbilicus-highlight.png'
import allOverPart from '../assets/images/abs/all-over-highlight.png'

// Finger Images
import dipText from '../assets/images/finger/dip-active.png'
import dipPart from '../assets/images/finger/dip-highlight.png'
import mcpText from '../assets/images/finger/mcp-active.png'
import mcpPart from '../assets/images/finger/mcp-highlight.png'
import pipText from '../assets/images/finger/pip-active.png'
import pipPart from '../assets/images/finger/pip-highlight.png'
import otherHighlight from '../assets/images/finger/others-highlight.png'

type ShapeType = {
  type: 'polygon' | 'circle'
  path?: string
  cx?: string
  cy?: string
  r?: string
}

export interface AbsDataType {
  id: number
  part: string
  partImage: string
  textImage: string
  shape: ShapeType
}

export interface FingerDataType {
  id: number
  part: string
  partImage: string
  textImage: string
  shapes: ShapeType[]
}

export const absData: AbsDataType[] = [
  {
    id: 1,
    part: 'ลิ้นปี่',
    partImage: epigastriumPart,
    textImage: epigastriumText,
    shape: {
      type: 'polygon',
      path: 'M41%,48% Q 40%,45.5% 48.5%,40.5% Q 53%,43% 55.4%,48% Q 51.5%,54.5% 48.3%,56.5% Q 44%,52.5% 42%,49% Z',
    },
  },
  {
    id: 2,
    part: 'ช่องท้องด้านล่างซ้าย',
    partImage: llqPart,
    textImage: llqText,
    shape: {
      type: 'polygon',
      path: 'M51%,68% Q 53.5%,66% 55%,63.5% Q 55%,63.5% 64%,63.5% Q 64%,74% 57%,77.2% Q 53.5%,71% 51%,68% Z',
    },
  },
  {
    id: 3,
    part: 'ช่องท้องด้านบนซ้าย',
    partImage: luqPart,
    textImage: luqText,
    shape: {
      type: 'polygon',
      path: 'M54.6%,61.5% Q 55%,60% 50.5%,56.4% Q 59%,44% 57%,50% Q 59%,57% 55.5%,49.2% Q 63.5%,46% 64.5%,61.5% Z',
    },
  },
  {
    id: 4,
    part: 'ช่องท้องด้านล่างขวา',
    partImage: rlqPart,
    textImage: rlqText,
    shape: {
      type: 'polygon',
      path: 'M32%,63.5% Q 40%,63% 42%,63.5% Q 45%,67.5% 45.5%,68% Q 44%,68% 40.5%,77.5% Q 30.5%,72% 32%,69% Z',
    },
  },
  {
    id: 5,
    part: 'ช่องท้องด้านบนขวา',
    partImage: ruqPart,
    textImage: ruqText,
    shape: {
      type: 'polygon',
      path: 'M32.5%,61.3% Q 31%,50.5% 39.5%,48.6% Q 43.5%,51.5% 46.2%,56.3% Q 44%,58.5% 42.2%,61% Q 39.5%,62% 32.5%,61% Z',
    },
  },
  {
    id: 6,
    part: 'ท้องน้อย',
    partImage: suprapubicPart,
    textImage: suprapubicText,
    shape: {
      type: 'polygon',
      path: 'M41.5%,77.5% Q 44%,69% 48.5%,68.5% Q 52%,69% 55.4%,77.5% Q 52%,81% 48.5%,82% Q 45%,81.5% 41.5%,78% Z',
    },
  },
  {
    id: 7,
    part: 'รอบสะดือ',
    partImage: umbilicusPart,
    textImage: umbilicusText,
    shape: {
      type: 'circle',
      cx: '48.5%',
      cy: '53%',
      r: '5.5%',
    },
  },
  {
    id: 8,
    part: 'all',
    partImage: allOverPart,
    textImage: allOverPart,
    shape: {
      type: 'polygon',
      path: 'M32%,113% L64%,113% L64%,103% L32%,103% Z',
    },
  },
]

export const fingerData: FingerDataType[] = [
  {
    id: 1,
    part: 'ข้อนิ้วส่วนปลาย',
    partImage: dipPart,
    textImage: dipText,
    shapes: [
      {
        type: 'circle',
        cx: '23.5%',
        cy: '26%',
        r: '2.6%',
      },
      {
        type: 'circle',
        cx: '35.8%',
        cy: '15.2%',
        r: '3.2%',
      },
      {
        type: 'circle',
        cx: '46.5%',
        cy: '11%',
        r: '3.2%',
      },
      {
        type: 'circle',
        cx: '58.5%',
        cy: '13.5%',
        r: '3.2%',
      },
    ],
  },
  {
    id: 2,
    part: 'ข้อโคนนิ้วมือ',
    partImage: mcpPart,
    textImage: mcpText,
    shapes: [
      {
        type: 'circle',
        cx: '32%',
        cy: '43%',
        r: '4%',
      },
      {
        type: 'circle',
        cx: '40%',
        cy: '39.5%',
        r: '4%',
      },
      {
        type: 'circle',
        cx: '48.5%',
        cy: '37.5%',
        r: '4%',
      },
      {
        type: 'circle',
        cx: '58%',
        cy: '37%',
        r: '4%',
      },
      {
        type: 'circle',
        cx: '71.6%',
        cy: '55%',
        r: '4%',
      },
    ],
  },
  {
    id: 3,
    part: 'ข้อนิ้วมือส่วนต้น',
    partImage: pipPart,
    textImage: pipText,
    shapes: [
      {
        type: 'circle',
        cx: '26.8%',
        cy: '33.5%',
        r: '3.3%',
      },
      {
        type: 'circle',
        cx: '37%',
        cy: '25.5%',
        r: '3.3%',
      },
      {
        type: 'circle',
        cx: '47.4%',
        cy: '22%',
        r: '3.6%',
      },
      {
        type: 'circle',
        cx: '58.5%',
        cy: '23%',
        r: '3.6%',
      },
      {
        type: 'circle',
        cx: '79%',
        cy: '43%',
        r: '3.5%',
      },
    ],
  },
  {
    id: 4,
    part: 'all',
    partImage: otherHighlight,
    textImage: otherHighlight,
    shapes: [
      {
        type: 'polygon',
        path: 'M14%,116% L83%,116% L83%,106% L14%,106% Z',
      },
    ],
  },
]
