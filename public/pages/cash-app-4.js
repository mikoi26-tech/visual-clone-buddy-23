
const {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} = React;
const G = '#00D632',
  BG = '#000',
  W = '#fff',
  G1 = '#777',
  G2 = '#181818',
  G3 = '#282828';
const F = "-apple-system,'SF Pro Display',system-ui,sans-serif";
const RED = '#FF3B30';
const SvgIc = ({
  d,
  sz = 22,
  c = W,
  sw = 1.8
}) => React.createElement("svg", {
  width: sz,
  height: sz,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: c,
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, React.createElement("path", {
  d: d
}));
const HomeIc = ({
  c
}) => React.createElement(SvgIc, {
  c: c,
  d: "M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
});
const CardIc = ({
  c
}) => React.createElement(SvgIc, {
  c: c,
  d: "M2 7h20v3H2zM2 5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm4 9h4"
});
const ChartIc = ({
  c
}) => React.createElement(SvgIc, {
  c: c,
  d: "M3 17l4-6 4 4 4-7 4 4"
});
const ClockIc = ({
  c
}) => React.createElement(SvgIc, {
  c: c,
  d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4l3 3"
});
const BellIc = () => React.createElement(SvgIc, {
  c: G1,
  d: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
});
const ChevR = ({
  c = G1
}) => React.createElement(SvgIc, {
  c: c,
  sz: 18,
  sw: 2.5,
  d: "M9 6l6 6-6 6"
});
const BackArrow = ({
  c = W
}) => React.createElement("svg", {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: c,
  strokeWidth: 2.5,
  strokeLinecap: "round"
}, React.createElement("path", {
  d: "M19 12H5m0 0l7 7m-7-7l7-7"
}));
const SearchIc = ({
  c = G1,
  sz = 17
}) => React.createElement("svg", {
  width: sz,
  height: sz,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: c,
  strokeWidth: 2,
  strokeLinecap: "round"
}, React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), React.createElement("path", {
  d: "M21 21l-4.35-4.35"
}));
const UserIc = () => React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: G1,
  strokeWidth: 1.8,
  strokeLinecap: "round"
}, React.createElement("path", {
  d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
}), React.createElement("circle", {
  cx: "12",
  cy: "7",
  r: "4"
}));
const Av = ({
  init = 'C',
  bg = '#1a1a3e',
  sz = 44,
  img
}) => {
  const [err, setErr] = useState(false);
  return React.createElement("div", {
    style: {
      width: sz,
      height: sz,
      borderRadius: '50%',
      background: bg,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: sz * .38,
      fontWeight: 700,
      color: W,
      overflow: 'hidden',
      border: `2px solid ${G3}`
    }
  }, img && !err ? React.createElement("img", {
    src: img,
    alt: init,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    onError: () => setErr(true)
  }) : init);
};
const DEFAULT_USERS = [{
  name: 'Tyler Brooks',
  tag: '$tyler4683',
  init: 'T',
  bg: '#1a2e3e'
}, {
  name: 'Marcus Johnson',
  tag: '$marcusj7291',
  init: 'M',
  bg: '#1e3a1e'
}, {
  name: 'Aisha Carter',
  tag: '$aishac5514',
  init: 'A',
  bg: '#3e1a1a'
}, {
  name: 'Sophia Williams',
  tag: '$sophiaw4821',
  init: 'S',
  bg: '#1a1a3e'
}, {
  name: 'Devon Smith',
  tag: '$devsmith2961',
  init: 'D',
  bg: '#2a1a3e'
}, {
  name: 'Destiny Flores',
  tag: '$destinyf628',
  init: 'D',
  bg: '#2e1a3e'
}, {
  name: 'Jordan King',
  tag: '$jordank3155',
  init: 'J',
  bg: '#3e2a1a'
}, {
  name: 'Chloe Martinez',
  tag: '$chloe8472',
  init: 'C',
  bg: '#1a3e2e'
}];
const hashStr = s => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
const STOCKS = [{
  sym: 'SOL',
  name: 'Solana',
  price: '172.44',
  ch: '+5.32%',
  up: true,
  col: '#9945FF'
}, {
  sym: 'TSLA',
  name: 'Tesla',
  price: '248.42',
  ch: '+2.14%',
  up: true,
  col: '#CC0000'
}, {
  sym: 'NVDA',
  name: 'NVIDIA',
  price: '891.10',
  ch: '+1.87%',
  up: true,
  col: '#76B900'
}, {
  sym: 'META',
  name: 'Meta',
  price: '512.33',
  ch: '-0.64%',
  up: false,
  col: '#0866FF'
}, {
  sym: 'AAPL',
  name: 'Apple',
  price: '189.30',
  ch: '-0.22%',
  up: false,
  col: '#555'
}];
function App() {
  const [screen, setScreen] = useState('home');
  const [flow, setFlow] = useState(null);
  const [amount, setAmount] = useState('');
  const [lastDigitKey, setLastDigitKey] = useState(null);
  const prevLen = useRef(0);
  const [searchQ, setSearchQ] = useState('');
  const [results, setResults] = useState(DEFAULT_USERS);
  const [searching, setSearching] = useState(false);
  const [selUser, setSelUser] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [balance, setBalance] = useState(789.13);
  const [txns, setTxns] = useState([]);
  const [kbShift, setKbShift] = useState(true);
  const [kbNum, setKbNum] = useState(false);
  const [kbPressed, setKbPressed] = useState(null);
  const audioRef = useRef(null);
  const sfxBufRef = useRef(null);
  const SFX_URL = 'data:audio/mpeg;base64,SUQzAwAAAAAAKFRTU0UAAAAUAAADTEFNRTMuMTAxIChiZXRhIDIpAAAAAAAAAAAAAAD/+7BkAA/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARMQU1FMy4xMDEgKGJldGEgMilVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAxIChiZXRhIDIpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7smQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMSAoYmV0YSAyKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAxIChiZXRhIDIpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7smQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMSAoYmV0YSAyKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAxIChiZXRhIDIpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7smQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMSAoYmV0YSAyKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAxIChiZXRhIDIpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7smQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMSAoYmV0YSAyKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAxIChiZXRhIDIpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7smQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMSAoYmV0YSAyKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAxIChiZXRhIDIpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV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icfPackoSicfeycmIkmR97JiSSaYu6tMRJJpi60ZLepMQU1FMy4xMDEgKGJldGEgMimqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7smQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMSAoYmV0YSAyKaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAxIChiZXRhIDIpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==';
  const keyClick = useCallback(() => {
    try {
      if (!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const play = buf => {
        const s = ctx.createBufferSource();
        s.buffer = buf;
        s.connect(ctx.destination);
        s.start();
      };
      if (sfxBufRef.current) {
        play(sfxBufRef.current);
        return;
      }
      const bin = atob(SFX_URL.split(',')[1]);
      const ab = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) ab[i] = bin.charCodeAt(i);
      ctx.decodeAudioData(ab.buffer).then(buf => {
        sfxBufRef.current = buf;
        play(buf);
      }).catch(() => {});
    } catch (e) {}
  }, []);
  const [cardName, setCardName] = useState('Lachy');
  const [renameOpen, setRenameOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [editBal, setEditBal] = useState(false);
  const [balInput, setBalInput] = useState('');
  const commitBal = () => {
    const v = parseFloat(balInput.replace(/[^0-9.]/g, ''));
    if (!isNaN(v) && v >= 0) setBalance(v);
    setEditBal(false);
  };
  const [notif, setNotif] = useState(null);
  const [agOpen, setAgOpen] = useState(false);
  const [agAmt, setAgAmt] = useState('25.00');
  const [agActive, setAgActive] = useState(false);
  const [agHotkey, setAgHotkey] = useState('F8');
  const [agCapturing, setAgCapturing] = useState(false);
  const [agCount, setAgCount] = useState(0);
  const agActiveRef = useRef(false);
  const agTimerRef = useRef(null);
  const agAmtRef = useRef('25.00');
  const agUserIdx = useRef(0);
  const [sfilt, setSfilt] = useState('All');
  const deb = useRef(null);
  const [time, setTime] = useState(() => {
    const n = new Date();
    return n.getHours() + ':' + String(n.getMinutes()).padStart(2, '0');
  });
  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date();
      setTime(n.getHours() + ':' + String(n.getMinutes()).padStart(2, '0'));
    }, 15000);
    return () => clearInterval(id);
  }, []);
  const fmt = n => n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const pressKey = useCallback(k => {
    setAmount(prev => {
      let next;
      if (k === '⌫') {
        next = prev.slice(0, -1);
      } else if (k === '.' && prev.includes('.')) {
        return prev;
      } else {
        const raw = prev === '0' && k !== '.' ? k : prev + k;
        const [, dec] = raw.split('.');
        if (dec && dec.length > 2) return prev;
        if (raw.replace('.', '').length > 7) return prev;
        next = raw;
      }
      if (k !== '⌫') setLastDigitKey({
        key: Date.now(),
        idx: next.length - 1
      });else setLastDigitKey(null);
      prevLen.current = next.length;
      return next;
    });
  }, []);
  const buildResults = useCallback(q => {
    if (!q.trim()) return DEFAULT_USERS;
    const clean = q.replace(/^\$/, '').trim();
    const words = clean.split(/\s+/);
    const first = words[0] || 'User';
    const last = words[1] || '';
    const name = last ? `${first} ${last}` : first;
    const tag = `$${clean.replace(/\s/g, '')}`;
    const h = hashStr(clean);
    const colors = ['#1a5cff', '#7c3aed', '#e11d48', '#059669', '#d97706', '#0891b2', '#c026d3', '#dc2626', '#2563eb', '#16a34a', '#9333ea', '#ea580c', '#0d9488', '#db2777'];
    const primary = {
      name,
      tag,
      img: null,
      init: first[0].toUpperCase(),
      bg: colors[(h * 7 + clean.length * 13) % colors.length]
    };
    const fillers = DEFAULT_USERS.filter(u => u.name.toLowerCase().includes(clean.toLowerCase()) || u.tag.toLowerCase().includes(clean.toLowerCase())).slice(0, 3);
    return [primary, ...fillers, ...DEFAULT_USERS.slice(0, 3 - fillers.length)].slice(0, 5);
  }, []);
  useEffect(() => {
    if (!searchQ.trim()) {
      setResults(DEFAULT_USERS);
      setSearching(false);
      return;
    }
    setSearching(true);
    clearTimeout(deb.current);
    deb.current = setTimeout(() => {
      setResults(buildResults(searchQ));
      setSearching(false);
    }, 380);
  }, [searchQ]);
  const openAmount = () => {
    setAmount('');
    setLastDigitKey(null);
    prevLen.current = 0;
    setSelUser(null);
    setSearchQ('');
    setResults(DEFAULT_USERS);
    setFlow('amount');
  };
  const goSearch = () => {
    if (amount && amount !== '0') {
      setKbShift(true);
      setKbNum(false);
      setFlow('search');
    }
  };
  useEffect(() => {
    if (flow !== 'search') return;
    const down = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.repeat && e.key !== 'Backspace') return;
      if (e.key === 'Shift') {
        setKbShift(true);
        return;
      }
      let id = null,
        action = null,
        del = false;
      if (e.key === 'Backspace') {
        id = 'bksp';
        del = true;
        action = () => setSearchQ(q => q.slice(0, -1));
      } else if (e.key === ' ') {
        id = 'space';
        action = () => setSearchQ(q => q + ' ');
      } else if (e.key === 'Enter') {
        id = 'return';
      } else if (e.key === 'Escape') {
        setFlow('amount');
        return;
      } else if (e.key.length === 1) {
        const ch = e.key;
        id = ch.toLowerCase();
        action = () => setSearchQ(q => q + ch);
      } else return;
      e.preventDefault();
      keyClick(del);
      setKbPressed(id);
      action && action();
      setTimeout(() => setKbPressed(p => p === id ? null : p), 140);
    };
    const up = e => {
      if (e.key === 'Shift') setKbShift(false);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [flow, keyClick]);
  const pickUser = u => {
    setConfirming(true);
    setTimeout(() => {
      setSelUser(u);
      setConfirming(false);
      setFlow('confirm');
    }, 1000);
  };
  const doSend = () => {
    if (!amount || amount === '0') return;
    setFlow('paying');
    setTimeout(() => {
      setBalance(b => b - parseFloat(amount));
      setTxns(t => [{
        id: Date.now(),
        name: selUser?.name || 'Someone',
        tag: selUser?.tag || '',
        img: selUser?.img || null,
        init: selUser?.init || '?',
        bg: selUser?.bg || '#333',
        amt: parseFloat(amount),
        ts: new Date()
      }, ...t]);
      setFlow('success');
    }, 1100);
  };
  const donePay = () => {
    const paid = parseFloat(amount || 0).toFixed(2);
    const name = selUser?.name || 'someone';
    setFlow('amount');
    setAmount('');
    setLastDigitKey(null);
    prevLen.current = 0;
    setSelUser(null);
    setSearchQ('');
    setResults(DEFAULT_USERS);
    setNotif({
      msg: `You sent $${paid} to ${name}`,
      k: Date.now()
    });
    setTimeout(() => setNotif(null), 3800);
  };
  const runAutoGiftStep = useCallback(() => {
    if (!agActiveRef.current) return;
    const u = DEFAULT_USERS[agUserIdx.current % DEFAULT_USERS.length];
    agUserIdx.current = (agUserIdx.current + 1) % DEFAULT_USERS.length;
    const amt = agAmtRef.current;
    const p = parseFloat(amt);
    if (!p || p <= 0) {
      agActiveRef.current = false;
      setAgActive(false);
      return;
    }
    setFlow('amount');
    setAmount('');
    setLastDigitKey(null);
    prevLen.current = 0;
    setSelUser(null);
    setSearchQ('');
    setResults(DEFAULT_USERS);
    const digits = amt.replace(/[^0-9.]/g, '').split('');
    const DSPD = 120;
    digits.forEach((d, i) => {
      setTimeout(() => {
        if (!agActiveRef.current) return;
        pressKey(d);
      }, 500 + i * DSPD);
    });
    const afterType = 500 + digits.length * DSPD + 350;
    const tag = u.tag.replace('$', '');
    setTimeout(() => {
      if (!agActiveRef.current) return;
      setFlow('search');
      setSearchQ('');
      setResults([u]);
    }, afterType);
    const CSPD = 80;
    tag.split('').forEach((ch, i) => {
      setTimeout(() => {
        if (!agActiveRef.current) return;
        setSearchQ(tag.slice(0, i + 1));
      }, afterType + 250 + i * CSPD);
    });
    const afterSearch = afterType + 250 + tag.length * CSPD + 350;
    setTimeout(() => {
      if (!agActiveRef.current) return;
      setConfirming(true);
    }, afterSearch);
    setTimeout(() => {
      if (!agActiveRef.current) return;
      setSelUser(u);
      setConfirming(false);
      setFlow('confirm');
    }, afterSearch + 1000);
    setTimeout(() => {
      if (!agActiveRef.current) return;
      setFlow('paying');
    }, afterSearch + 1900);
    setTimeout(() => {
      if (!agActiveRef.current) return;
      setBalance(b => b - p);
      setTxns(t => [{
        id: Date.now(),
        name: u.name,
        tag: u.tag,
        img: null,
        init: u.init,
        bg: u.bg,
        amt: p,
        ts: new Date()
      }, ...t]);
      setFlow('success');
    }, afterSearch + 3000);
    setTimeout(() => {
      if (!agActiveRef.current) return;
      setFlow('amount');
      setAmount('');
      setLastDigitKey(null);
      prevLen.current = 0;
      setSelUser(null);
      setSearchQ('');
      setResults(DEFAULT_USERS);
      agTimerRef.current = setTimeout(runAutoGiftStep, 700);
    }, afterSearch + 4500);
  }, [pressKey]);
  const toggleAutoGift = useCallback(() => {
    if (agActiveRef.current) {
      agActiveRef.current = false;
      setAgActive(false);
      clearTimeout(agTimerRef.current);
      setFlow(null);
    } else {
      const v = parseFloat(agAmtRef.current);
      if (!v || v <= 0) return;
      agActiveRef.current = true;
      setAgActive(true);
      setAgOpen(false);
      runAutoGiftStep();
    }
  }, [runAutoGiftStep]);
  useEffect(() => {
    const down = e => {
      if (agCapturing) {
        e.preventDefault();
        if (e.key !== 'Escape') setAgHotkey(e.key);
        setAgCapturing(false);
        return;
      }
      if (e.key === agHotkey && !e.ctrlKey && !e.metaKey && !e.altKey && flow !== 'search') {
        e.preventDefault();
        toggleAutoGift();
      }
    };
    window.addEventListener('keydown', down, true);
    return () => window.removeEventListener('keydown', down, true);
  }, [agHotkey, agCapturing, toggleAutoGift, flow]);
  const [islandOpen, setIslandOpen] = useState(false);
  const DI = () => React.createElement("button", {
    type: "button",
    className: `cash-dynamic-island${islandOpen ? ' open' : ''}`,
    "aria-label": islandOpen ? 'Collapse Dynamic Island' : 'Expand Dynamic Island',
    "aria-expanded": islandOpen,
    onClick: () => setIslandOpen(v => !v)
  }, React.createElement("span", {
    className: "cash-island-camera",
    "aria-hidden": "true"
  }), React.createElement("span", {
    className: "cash-island-live",
    "aria-hidden": !islandOpen
  }, React.createElement("img", {
    className: "cash-island-icon",
    src: "/cash-app/assets/cash-app-mark.svg",
    alt: ""
  }), React.createElement("span", {
    className: "cash-island-copy"
  }, React.createElement("strong", null, "Cash App"), React.createElement("span", null, "Tryhard visual is active")), React.createElement("span", {
    className: "cash-island-pulse"
  })));
  const SBar = ({
    dark = false
  }) => {
    const c = '#fff';
    return React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 54,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 26px 10px',
        zIndex: 400,
        pointerEvents: 'none'
      }
    }, React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: c,
        letterSpacing: -.3
      }
    }, time), React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, React.createElement("svg", {
      width: "17",
      height: "12",
      viewBox: "0 0 17 12",
      fill: c
    }, React.createElement("rect", {
      x: "0",
      y: "7",
      width: "3",
      height: "5",
      rx: ".5"
    }), React.createElement("rect", {
      x: "4.5",
      y: "5",
      width: "3",
      height: "7",
      rx: ".5"
    }), React.createElement("rect", {
      x: "9",
      y: "2.5",
      width: "3",
      height: "9.5",
      rx: ".5"
    }), React.createElement("rect", {
      x: "13.5",
      y: "0",
      width: "3",
      height: "12",
      rx: ".5"
    })), React.createElement("svg", {
      width: "16",
      height: "12",
      viewBox: "0 0 16 12",
      fill: c
    }, React.createElement("path", {
      d: "M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
    }), React.createElement("path", {
      d: "M8 6C6.2 6 4.6 6.7 3.4 7.9l1.4 1.4C5.7 8.4 6.8 8 8 8s2.3.4 3.2 1.3l1.4-1.4C11.4 6.7 9.8 6 8 6z"
    }), React.createElement("path", {
      d: "M8 2C5 2 2.2 3.2.4 5.2l1.5 1.5C3.3 4.9 5.5 4 8 4s4.7.9 6.1 2.7l1.5-1.5C13.8 3.2 11 2 8 2z"
    })), React.createElement("svg", {
      width: "27",
      height: "13",
      viewBox: "0 0 27 13",
      fill: "none"
    }, React.createElement("rect", {
      x: ".5",
      y: ".5",
      width: "22",
      height: "12",
      rx: "3.5",
      stroke: c
    }), React.createElement("rect", {
      x: "1.5",
      y: "1.5",
      width: "19",
      height: "10",
      rx: "2.5",
      fill: c
    }), React.createElement("path", {
      d: "M23.5 4.5v4a2 2 0 000-4z",
      fill: c
    }))));
  };
  const Nav = () => React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 'max(18px,env(safe-area-inset-bottom))',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 50,
      pointerEvents: 'none'
    }
  }, React.createElement("div", {
    style: {
      background: 'rgba(44,44,44,.72)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: 6,
      pointerEvents: 'auto',
      boxShadow: '0 6px 30px rgba(0,0,0,.5)'
    }
  }, [{
    id: 'home',
    icon: React.createElement(SvgIc, {
      c: screen === 'home' ? W : '#8a8a8a',
      sz: 24,
      d: "M3 21h18M4 10h16M6 10V21M10 10v11M14 10v11M18 10v11M2 10l10-6 10 6"
    })
  }, {
    id: 'pay',
    icon: React.createElement("span", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        color: '#8a8a8a',
        lineHeight: 1
      }
    }, "$")
  }, {
    id: 'activity',
    icon: React.createElement(ClockIc, {
      c: screen === 'activity' ? W : '#8a8a8a'
    })
  }].map(t => React.createElement("button", {
    key: t.id,
    onClick: () => {
      if (t.id === 'pay') {
        openAmount();
      } else {
        setFlow(null);
        setScreen(t.id);
      }
    },
    style: {
      width: 60,
      height: 52,
      borderRadius: 100,
      border: 'none',
      cursor: 'pointer',
      background: screen === t.id && !flow && t.id !== 'pay' ? 'rgba(255,255,255,.14)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, t.icon))));
  const NotifBanner = () => notif ? React.createElement("div", {
    key: notif.k,
    className: "nd",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      pointerEvents: 'none',
      padding: '60px 10px 0'
    }
  }, React.createElement("div", {
    style: {
      background: 'rgba(30,30,32,.88)',
      backdropFilter: 'blur(48px)',
      WebkitBackdropFilter: 'blur(48px)',
      borderRadius: 22,
      padding: '11px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      boxShadow: '0 6px 32px rgba(0,0,0,.55)',
      border: '0.5px solid rgba(255,255,255,.1)'
    }
  }, React.createElement("img", {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAYAAAA+s9J6AAAgAElEQVR4Xuy9CbglVXku/K6a93DGnkegGUUBsVVsJpkEEQVRRMQJY8TEJH9yk/yJSW5yvdeYmD/XxPubmBAgAooaUOMQBxwAEQeURgFl6mbopuc+855qrvu836ra5/ShG1qaPqfP2ft9evfeu6p2napV613ft771DQpzFGvvvbqc1B5z/AFzsdujFttOtcd17eWe5xyZwVyZQa3JsswN03hRFscLIiReEMZWFEUIkxhJkiBEjF1BHYmZztFWmNswMmDQ64elDDjKhGNacGwbrmHBtixYmUJvtZIgNXZ5hhlYjtmwlTkUheE9Y+Ot9Wg1t43ujrb31PqHt7R6Whtf94lgLraIOpQvOssy9bovvWOFj9ZhyszOaFWSV9Q9/6UTRrAmzCLEKkaURVAqg1IKMA15zwCk+Z0p05D3NONWIEGGVI4AEiNF5Ewe28XMQmWAEQNmasCAks5o8j0DTO6DEqJmaQokqWwn+J5lGbi5WunD2PAYFvYsRNwMUM7sR3vNvp8YLXO90YgfrcTpL7/ztq9um9k7+/VwSHW/tddcXR4uPXSC0YvjJ8rBOXa/+46JoAbXM6GyVMiTlD0EcYQkSmGaJmzb5lZ5KO1XTkIhZH6HlHXFdyEsIJ+TLNYHdDErMExb/q5K9bNDmgnJVKbfhZRKE7R4vvKdz9I04GchsjiGYdsoGS6MyEAw0USPVZHPTqJQVh7C8fAztoE7jbr5wKlLVj14w9k3+LNyw3vBrJNw7acvWNZw/LPGnPg31YB1TuymaDkBWiWqjC2gZAFJBIQJ3GoPgrExoLcfyAwYCZAGoXxG8WCmkWwP6CfZ/iqQYbX9rYuZhDyPKQ+peA7585NHkyRQpikDLkESJlmqnyPFpJkA5RIwPg54VaDRBBwPKlEwUsBTNhpjdSxesBC1kQnYpiUEz+L0ngWBd+2RI6XvfPfy726Wk88SpnfTGcOLbzrznPFK7Y+SAfN1aY+FlgJS10IQhsgcCzESGCUHaRDop5FGfCJA2QKyCEhjTb4s1yfzByeYSrbp26d+F5HJB9re0sVMI58uEIWa2UbxvLiteE3dXnwhkblPGbAdB3EUaelomFrNVQqRH8Blf4q05sO/YzcUFjQ9pOPJt6pW9f9/7OLbv5mfdEYxpUcefFx9zdXlu3o2vyUcaN2QLMownIwicYHEBkKSwbChYMMyHUSUcIYlJKHKaagMQdTQJIzq1F8AywVSmxO9PR8UH1BxZzzvHkScfsvTv3cxo0g1sfgU9iAgwcdoWZAJRpuAU56tbLOAmBNLEwhDwMx3UoK6LjIO4jb7SCTfSch0Ygyqpw9mquCELqJWjFKpBMdXcIfD31pgrPnMAxd8uqFPdPAxYz3wqFvOf+9Y39h18cIMZr+D4dERKM+BMlOknJcZJlscFkzErRjVah9a9QZKtieETNiIjoFIZTA9CwlVkSiGIdJQP6DiIRZzhuJzAdmbzxnloctcUf+mi5lHMefjoxQpmE8lCkMZv8ckWPE8c6kpGiwHV76iCMrz2hdP0jnVKkLRoDRhTctCEidCTL7KA/1oTtT0iZySHsSbdRn8jThFT+Zl1s7kfTtf/9Pr2yc+iDjoJHzxzRddECxNvzVaHYXfF6HRGgYqHmB4Wp0MW/lIlQCGAbCxhFgGLBIzTmBkCo7joBVEMBwbURhAObZ+aGmyd8LthZh7A/fKQ+1ixkHikYBTScjntYe12tAELKzb8jy5PyeYMjJknJqIJpWrtlR+KEGjXAvib9iXimO4LYoA12trSqZlIA1DGIaBJIhhBiYWxFU4W7ILt1x+97f0iQ8ODlr3O+WLF67cYO28OVthntlyW0g451MGMhhI2Qi0QfOvcwfbVyVaxZRXLp04AZd3ktIEMk6qOUHX5xGoMKfS3vFcN5g95xFdHEzoBaVJEhL7fpo52o+M/UO/9niK7C9yzsn5JvsMUXSt4iTF31Sp3s//eUZut8jZVobKSPK9gebAVRvffOcWffQLi4PSA4/70oXv2z0w9G/hkgg1syZ3rhIXKuXLRGoYyEyqGbJYlzdMiozmTpq0SERij6dBInKOSDKyqTii8VhOtJ/lsT3LLo2D0gRd7C8mWTEJPpK9bH4GeEzRV6ZhTwLy+96fs6IuWgzyQkEDmUqRcgFTRoYIdkuhr2GlA8Pl92649Ec3tH/8AmHvV/Y8cdWnrvJuW/Hkl8YHGhf6pRZSFcJUBgwShxPozESiLK1utP9yqnmXj4QkqH4IezbiHsTkiz+SMesAsT8Pu4uDg331Pnn+7W97Yo/tetpCq+gzMaVvyPnYydpbclDUkYT8aLcHdxkXVCwEdWyFsOXDhQenbsHbaf3nhePHXnnDe164dcZnXNbzxSuvv/Sk7SuHfzGyLEDDHAWSAHa1H6qRwEwtJEohUQYSWe7JG08ugDebitdECgOJ6PXcP+XSZOKQk446PN/ZUtK4z3EL+3qYXRwaeI7HtwfyZzkpPDktcXQfaJ+nOCgnYVtSFiScSk72IS5R5f2NmhZ/Ll1LS8IsDmGVS4j9AEhKGEyrcIeAhaPmiQ9e/t0H2+c6APw6TbBPrL3ujIsmVuG/GktMbFfjyCqm+P2lfgg3pXgHQs6LyS/5iwaQcn6nCaVJyE85SXlcrqNrlZPb8saL9SyOKsMzyLoXTD6wveM5ft7FQUbxfJ7xHIrvU55fcWz70Fxy8b39+5x0un8QBfmKE00lY/774ow5AdvHym7aL2zAjwDlwEtsusZhYudwtmjCPGv7m39+lz74+aN9P88XJ33xtPeP9vn/6g9Y2BXVgL5yvrBO5qVwLFtsL+IkXdwv7zHVYr9oLO7mTwrutdtMRqu8QfgxnzbyOH2IvgV9rj3f9wfPePhdzCio5BBTH9ezPZO9EXHP4wvyFeeZ1hHa5CygPXF0x5k8v/yWBkTbAVo+UOoB6k2xtDoO1xszpLt8DGxx373r7T+9Sf/q+eFZbve5ccp1F/z+pqPGPr67vynqZmVgAI1aDYgD2D09iLhWU6D4S7zJLIORpXKjmaifShtHhZu6FeiNxI+cPwrhcnLSnsMli3iqEOQ7fzb9vYtDHtNJuMczfTYUPxDWFFJtGuSY6SfSx+nBOpeK/DLlY2Exb19LnEKZlri8pWmK2PdhejZcuDAnDCSbWlc333rftfnRvzamX+F+Y911r//9iZXRx59YMoxWfwYECdAKALcMw9ZrLm3vBVmr4V2ROVQ/6Zy7JwmlEdgAfCpcxKXgzBs6ofZakJBilc3O5Q5ptekj26+J4mF2MSsoJE+B/SahIJ/TTUUxWhdon3CSfBraCqp/r53FCVpRp14Sf821SRKQjgM8nWXb2omA50gy9AYlOE/G7x+6/J5/a//w18B+3ep0HH3Ty66qrbQ+1ejP0HDjXHrlpyruYF9nLm5WOyNpghJT75ybp30v2rLY3m7bLuYv+Iz5vKe/T8W+OspzgqR85gDO0009xfTTE3v8iSSDbdhwahEqW8xLd122/svtffuJ/b3iNl766dNeM3ZY8u2dAwFaDidnFGe/9mm66GLug7YHx0LWaKFk2XB2Zlg+svzVD7/5G7+WsebXYs8pn33tiTsX1O4fGwzQLKUI0wCwnPb+LrroKFBMUp1NFHqyMuiXgpEQSxq9xz16+R2P7m9b7DcJz/rUVd62I7e3RnpbGEpGUe7rRbM5AVhW+5guuugs5PGM9RCuMQDPdmGkMapDBs7ddG7phvd8aL8W9PebhKu//erbRlaE59dbY0BPVSIYbNtBlNB3s4suOhG0o6Zw3RL8Go08BkwzRKkB9G93v7jljT+5bH9aZb9I+KLPvfa9W48euW7CG4XVtwjxRF3SEBiOi5TRD1100ZHIHUcYkWF6gGUCSRMV20O2w0fP1tIVO9/2s/94rqZ5ThK+4nPnr3p88fDm+tIQoRUAkQfDdsQWk3EZgiEiXXTRqQh8lBYsQKs2LoHFBtcSmY4laGKgOYDVT1dX3n/57VufrXmek4QrvnX6d0aWj50XeykiqsCRg5RrdSUTGf8YTb17MeN20cW8B9nD7A9Mu8JoDGqFXC3wHEC1YNVtVJ5yvjv+xp+95tna4llJyIDcbcfu+tZozwjMxIKZ2DBTuqEZCO1idT1fiO+ii04D2ZMzSILLxcOLGSJIzkyspvYosHKofP6Tl/zwO/tqnmcn4V2XZBsGHkfoNWGGHpzYEY+C2MhJWKx3dknYRSeiTcJMIqL0J6WddhQlZAo7AxbudnHBE+fv01q6TxIe/tmz3j2+un7DxICPxEy0FExMEXziRsapIH/dJWEXnYzcpUalOjcqQZdKISHjguIQC1sOBrf3/N4jl9z+T/khe2CvJGRWtG8d83BjaOEEfIM5PwzJTCUe60aqg3LFFU/7gnYlYRedi9zdW7zGtH+qdiDTthKTkfm1EH31Mi6P1nmf2Euq/r2S8KTPvvYdm47Y+emxngaUUUbGnFgSMkKxl7ubF+iqol10MKb6lmYiATUnGKDAj47pgt6dRs1Haatx9fY3PTPaYq8kPOabZ4Y7VzbscafFjLx5aoqccAUR2+zb6ym66KIjkAf9aOknrzxSKGOWQJbQUBJh1FeqojpiYesZdz+DMM/YcPItr3n10Mr6ndudGuIK4zaYWIkTQQsqMfLwohiZEeWGUZmFFj/voouOgpFnjuA0TSArBvlnZoxQls6x5Cv0+WXY26LXbr/sx7flBwiewZ7Fn3vxrf6R5mVpn4d64gNWTrIuCQ9JaHVoMrpcf2fmujwjAQ0GWZHFgAewLhUxxcmiiMmTn2gzn6hWPEERn1ccswemxf10IIqsbrptOVVj+xXtacjyoQUHRmLCaWXobbm3bTv7B6+d2lR7tOCJN126eOeqbTsai2JVZz5P5tcoUsHxhMWDkPdcHe3whzCbILE4EitlSqYBPicnAcK4BZSZGh5Ay4BnVKAyC61mDXavgTglEcusGwcg1M9T5jEJDATyZFOT1j0biAzYLlPFj3OCo9M9NBpApQK0GoCZJ1rqUEwOgkUKTuaiKeqk2FCBA1sZUFYM+AG8uoK3KVuy810P7CqabI/We/EXznnD1iUTXx3rZf5+UtiCEek8n2znSbZPcrD93sWMgx1ARQm8chXNyJdaDK5dgeUZaDR3AWUPbsuFGZqS79X2TERmHU3fh20PIIxSKNF0UpiZATMLYaEly0+BwZJzNpzERRS04FYtZJaCX2/B6++BH0zAcBykPgfkLgkz2k3IDaOVCylKQReqZcO1HQQYh2cZUOMhlu6uXvbExfd8segwe7Tegs+svcE+sffdu+0JJGSzkUG1k7nkKo/8ASKfkXbwA5htMDuBZShEgZ42sLZH1vRlu1tykbRCuHUbVaOKiCUEWHjHqMkSk2FUkYRSfkcbEFgTAjEMktDINAkzE25qIw0DmJKOOkNqKrQQIeszEIZNwOrp6D7QloRtErIGhk59wVymZlSCZVkIMYEsDeFFFvq3e/+143U/fUPRf9okZIHO7Yf9cnR0Qewwbb3Z4yGZGNMFM2ROwZGR5yYJaf3RIrBIitPFbCAvGZdXHSIRXcNGMFzDArsfxkj0mF33fifcGf1qodcvMWf1UjNbhV48jQlqOVlfftnj7cuf/AT0YYVdUU8DWAVgzNzVA6N8XjRoX7erUkfUa8KPwk7WRnPr6BQSKpIwl4SZCSstS2n2zGhAuQYqmYfSVhN9rbVeUd67zaCVnznzhNYR0QPxohLGgxGxgFoVB3FITxuK1pJ+Z7qzjFmzJ0nYwVOC2QWfXpJqErJiERPUhhmWGYMwNybXbrnsB1cfjAu86lMf8r69+p71O7yx41VvisTs3JjSSRLma4TTSIjAgmGbSEuRHihbEXrH+7D44dJLNl59x6/YnpMk/NrpV44tD29uWBnnk5KDXzmseMMGZo2qil4vZIPnJKQoZnGXLglnCwZTf+n6fPTgtx24UQZvS/rE+IX3Hnkwr2rNLeetHjvS21SzhxFZe3WJ7AjsYZgRqyhzd+bqKEyYmadLspstIPJhVPpRGXXQu8H5ra1X3HkNf90mYe/XX3pja1X2rsQsSc0+00iRsBinm7M67tXMNhm+FAsJmZYwNroknC2IdRQmkiiC5bJ4agIVRujf7V2++8L1tx7s63K/f9pX0oH04k4nobaM5iRkWFNhN5ElClOXabNDQASahWrQA+8xfG3ozXdfzMPaJOy/66RgrL/lGFa/VMtNogZMVtFVtPYYUGGvuK8JCVUMI+lKwtkGSWhnJtI4guu6CJtNlFjX8YHG6pHfeJxTuYOKnh+f/YdBufmxkB2sQ8FnoA2Wer2QJGTKCw1DVyFLE8ClyKRKquAEHla2FuOJU78p/JP/TvnMm1Y+cexTm3Z744ZpDEiIhGTItiPEYnLNScg/JPp/ouegog93JeFsge3vwEKWsD67IVVms7EArbMeag+uBxN9t7/qT1oLsr/rZBIKppKQcYX6kzwfBUsqUXNqJxWpI6CkKqjstuDt6lmw5fLbRuT4E7/8ulM2L3v6J2PlJhxrACphhuEQmZ0gNXXZYcU5Yca1Ik3Cwo+7ax2dPYgkNAzEQQjbMWH6GUpj5u3D59x37kxc1eBdp3293he/rkvCnISUTFLOocjoTW8l5gdOYdr0RWL0fYYSyiiPAmpT/PKht9+3Xkj40m++9t2/Km+8QS11kEQOzMyBaSm0oibgaCuoonWUi/aUhDxzIXEnNdouZhwcAmNkSGCwrPREhvIO8/+tXfzL/z0Tl7Lo3tOzcSdASG+QDoVkkicF6F1G5DVUChh8QnEsWTBY9jtJE7iZg0rDhLE7uXroDfddK79cfOsr/jk7Vn2g5jThBwqmaSFJMpiOiYTyEwaMhCZTaqpFBVMRg10SzipomeFTZy2PFNVWCX2b03O2XrL+joN9WS/69Nplmw6LtsX9NkIu5Hco2uUciror00loGEg4XaCwMpRIRTs1UA4U3AnrX3ad89MPyC8HvvHK7wcL/DPpBdGKYqlAo02uXOvQZzQZTo8UqZk7AMsvJYyii9kE/T8jPnkLfa0qlj1kLHzk3d8bPtiX9KKbTz9v6Cj/O+OlrGNJqOd8WhJmbRKyMnXhTptqEqaahIpFciUVRoZyotDf8h7Ysu7HJ8mhK39xYTaOYdSiCfGUgWsjqTUBtyQmVhLNzCvksq48g3szcf4tpGEXswWGylBr4VNf2BzA0CnfznvDwcWxXzvzv+9aXvtw3QHoXtyJIAmtNMvTveTVgqeQcLJQaV56jWvqJssAZnCTDINBubntFT+qKNy7tmz7ZsOpGrB6TIzHE3pl33B1QtOI0pAkJJtjpCwhrFKkRb7RLglnDWIASCO4lg0/TFHd7n6xdsHP9ivr84Fi5XfO+MnOZeOnMOlXpxrnqHaShKRAJLM1XUxTxxhSUJGNqQ4HZIQTmUnPJsk9E2GwWcXZT610FX50waChdg87ZRuxFSGOm0DFAcwS0OKEW0fVGzSzijVGi196ygjzuyTMLWHPhFZJctP1HtA1Goln78A8pig7vLfjaA6PYGcKhm/D2Wz+7sQb7/vn9u6DiIW3n5KNLm8hYeHIov5kjqnt8cw20NLByHKDBusB7u3W5gC0JCQXMiSFOip+1pqEGjoaiXN2ebEeJ4kZR5J3ZtHoMX2q90frjkqtaEPgAqmjdPREQuOLmHOKVtQdJ48TlW9ztOFeaBQBs220G5/9kg+DGgPbMe+IKoGhIhhZKMUnk8zRWcyTVIpPmqZC0GxC2SYyriuxAzvs6BaY7RnlMuC39HaOsHSeCAz0jrjo3+q+fPPld6/Xf+jg4cx/Pn/VhpPqm3f31RDTbU7un/fN+2Rn450bMCxTXFu1R0n+Y8m9ksBOdJFY5rCVAX2Oonj22oayF4hzaW7I5H+8VXrVZAl66mUcsWnZGrXwJy9bGxnq3oaXIWbQJh98yrB8rW4mxYKgNPDeRrnORpuEU/V/gZZ1WtLxAbEj6gakIwQ7IkkoyWKLfayNbppCrr6+PoyPjkLZtizGy4M0mHBLweIxmYGINRCyFL1ZFdWtBqxN2eDmD9w9ml/AQcMJN15wycjRE1/eUR5D4hShTJyu8G4TZGI/4NKZJVqYvr+8k+b3zjYgpOJym6FzEfsgXwE+VzFu5v1CVFRuS1BtlHH4rsHT1OE/P+us0aR+R8NJEds8oW42k2qCqAxTKup2STgNWvWgFMiY1oANLI2ck04GLjYaO5zMzMXhQULeU1v3XWYwQAzb9aS9YxKRx8nakoM0yiQy21EMBoxh0WuQgbzM4kXpGJnbymGlHj9Rf2jj+39wafvSDiJO+MxZfzt05MQHd1eaiO1+rRalCSyDROTgEomxQmsCOQFlxNZtJZgUIZPj1pzE8yAhkWXoaXg4bHzZ+eqoDee+fff4+GfaJKQkNJhnlMd1SfjcYCdjw7KR8wYW5A+Hb7n6ob/kaSNSnRwWBh17Y5g0XzcClN0qXNgIJgL0uT1IWgnjRLenteBLVcN73GpED1ZLzlY3Lu08trGsecN7bpjxEIaTvnb+j7evGHpVrS9FK8gHFEbdqETGD6pgqbZETMllU3TWfI5bfGVdk/lMwnafeCYJK00PRzaW/qY6cdPrf3/T7h0f34OErC4T64O7kvBZQH2fzguEJMKazMJMySiTc27gSMiOKoRlrQKST6slVpqgBBPxRIhBtxeopahvrX1n0Oi9KRtPf7kgSx9b//71zfy0s47f+8bvube5G/2nBrYgNEcAt1+clEXisZ+J5MtboZAAWaFwUmPg/uI2cgLOaRIW2JdEnDowF1qRbhshYbTsQ+rkLRf/zRM7tv1Z080QWZwphxIk2iXhfoAjungQaRKK4zuthe311HxfnvSHYUdGZoqVWWURnEihhzlIWgYaQ/XrSpH5+RXO4p//+PLbGFV9SOLMa9/6oscXDz00cVgDUX8kkRuGYSJRFjJRw3nDvF++CmmojXr8T/gmJMyZOC8ISOwPCYmciCSh7+LYaPU/qZN3vPm6jU8/9d5WSSEmCWMmebJl3iGLi9054T7BjtX2mODoL/0qlwjSuXKLci4ZrNSAFSuYfgq7kaDcKP9Xz5ae//PwB277rhwwB/CWW97i/MIfu3J0efODI+7osaBLsWvA5PyVbSF9jh1yslO2eZZLgSI7NfdQRs4vA99zkTFvDZWi0nJwnLHyBvWynZd9+rFNT7zDLxuIbSXRv4zQfi4Szq+Ge36QqY1IPq7RUvrlO4jii6QRVLAYUhYY8CYUSjXj7/sazr8++Pa7n9AHzU0c8cVzDmu44+8Nq9ZfGiUDkZ0iMmMk0haaZqmsA+aSkVAcmLSFVPbPu8wMz0HCXAGgAbTkWzjeWvWf6sVPX3LX00Pbz5jgelOxREE/Nzpw01jAlX/58V5IyFd7mOtEsHPphqBbH/N2mqaBII4Al75MNMhksE0P1mgMa3v4J33x6usZQzbfWuuwm097U7rY/KfGYLisYTWEjOJYntgwlA3DcBBHLCbEZZUYpmsiodbFFHCTPXMe4DlIOIUwpcjEi+yVd6mXbHnDLzbv3nlSl4TPB7n5nS8mdrUNWWxvtRriRVH2ehHXQyTb/OsHxqt/OfTO9dvbP52nWPnpl5+ljrCvG1a1I9HjIOTShePCH2vA7e2FW7YxMUGDjgFlmshidsrOJeFxzoqH1Is2X7R9y8jupbVCEqaTkpBqFHNQdiXhsyBNYbmMw4yQRQEMx4JnW8iaCeyxDMZ2vHrsrQ/e1T6+Q7D8c+tOjZe5N9Yr4VFZr4k41VnIovERlBcNosVUidQYFAsOzWUSFpJt+j1Ml4jPlIReZOIYb/mT6qhNF45tGx3qa1J9KEjIdBZx2iXhfsAxTYS+D8MxYZkKYb0JqwFU684nXuq9/E/uPHvm1/EOJSz4wro3ZgPGf2b9QEs1QS+9SAIBuHzDjpq79c1ZHAAJY4U15WUTas2mC9IdoyOqScsB1wlzEhaJnGiYET/R7pzwGZD2iTJx/UxjHxWnhFITSDc2rhh522P/0T6ww3HVp67yvmHd/4FstfexRjVGzKRHJh2AIihGYUzvv3MKk6TSKG5mXyQskMEhCftXperwx1+T7ZwYRYs16J+NhPnJu4aZSYh1VCl4ygFaIXp9F2pD9LJt77735+2Dumhj9c2nr0mXWNfXK9FZ9awJu89FkEViWZ67eP4ktBOFVZWlUKs3npftro3tlYT0hue59krC4m9Mv4aOgl54LYU2qjutyH3cP2LLb9+/taOa4HlgxedPe3+4wvzXWjlE5CRICq+jOYnpBNh/ErIE/TJnAdTSJ87NRidGEdBSzIBDBvTSbS3JxHeU59J/Zr6SkHdXNBxRNOrUbYTebuS6k4TRpUBP7KE8hJY13LtyPi49HCys/uTpa7KjvG8FveHRda8F32LqFHqSFEcUnZidd8ozkXlksWl6x54NtC84x69HwoWlAajqxtOzKA0RSLhMcaBO1aZJOL0zzifkLkQy0mhHYwbJEpLoWNSATOIw04zRDhkqqSeeIS0zhhOVcNj2gdS4P1n16J9+Z9t8apmZwpH/fvrfBWuyP9nVFyK0QjhMYsy4SUaI2HQFDGVxX56J+N16up9TY5M17bkLuh4PlPugzMdekaVpqmPAJOyGo01OPHHAnc8oSMh71dnkJknIkcyEbTqIQh+Gx2WbGLbPsB0gq7owtjI/j3Xyhv/2o1/Ij7p4XjjymnVvHD4a/xksVmiFdRieBcsrIWyyCKn2sOGAqEno6B+RgG2hMTdBQWeKL/FDJ1Pv1HcxnYAFKectnknCtvrD7UVJuCSB4SqkXAdMEgyU+jG+rYGFY/3v3vHGu27Kf9jFAeDIG05f2zg8uXdigFqGj8wPUK6U4GehtklIHCb7p3Z3E/OqGCbmLhHFsIeChFMhSxE5AfmiLjZvMUlClYca6fAjbsuDm1GS+nLUjKKgCZejdNXrEnwAACAASURBVF3Besr8j/E333fFvG2aWcCxn3vN8tphwdZajw+kAYLUR+zaEn1PwumMBPp5MWpD99VZuNAXEJqED79M30YhDQsU3ztCErJwB4fbPN+qlLbSaimofloubCMDy7gHYQ3VcQerN6xc9qv3fGOHPqiLFwqrPnfy8vBwc+uwmoA5UEbAaRIFID2TmLiMmcwgZf/0+mI+l5+7oF/avkg4VS2dr+AtigWK0RAcVQ2kkq+co60moYIrBE0bE3A8F2nko7TZeE/t0l/dMF+bZbax7NaTPuwfaf73UU9b6gXMe8RVNObBRYbQZNpNfuR/c3jKZFh7UUcLdBgJTdE+FVIGpwo5c8tbmMCuVODwYddaKPkqGDp1vad3dnEwcNy/nrqucYr5o6etXUDJ1csSIVOCMO0K89gwGiOP45zz8YiUhAUJp5OuE9RRIZu+V5KQa4A6BZ8hqxMiEbk/TmBEKcotC87TxltGLr/3C7qRujgYWHvN+cc9ffzYw7uWMPsctRJWI2Y2eCouTBc5uTQhCswcFoRMd7JvSdgJaJOQtTYymKKZkoiWVkvpTpU0oSwTjp+hb7yS7DrzRzTTHRI4646rvG3D2w5HFq2IzfhohXRVaiovsZJKDLUUJrio2TLT5KksM8ec1N5VhrvRiOPhUKlNj7zp4NeseD542a1veP3GhVu+Vl8a5+nlaQklCTl3D4SE7eieuayKCqZKwk6EkJCWt1T4xpTmHFYpDROTSXmZyLYB17aRDLfQs8n67dG3/vJfZ7OpLrjlLYPDZuucxys735kOGBfTcqszIDB5lLb26lQbOrmuFCKhuEiVWOLMzNIZomN6bBjbk6HmV/tR/UGPb/7i/ivv+NVs3luBw7969jdrq4LX1isBgoTij/fjyWqEkYRiIU04YsoAOtctpF0StknIPkwS8tkmykRUkNAKYNYD9LQ8rHjEWvar9/xsViyix37y7GNriyb+KBzA+3wvgVMtI1YZIhXlKhnnSXynlalwuicXuQxMDyglSaYsSTaVewIlBly4MCKgNV5DBU5g+PH/KjVL33niiu//TJ9hZrHqs2f+0fiR8f+esMYlO6TJ58AlCVkp065e5F1q5+uFtM4UNzsHwcfVlYQFpO9msJJCEuZW0qSOcmLD2YbvjV34wHnt42cIa6+5uuwPPPWP2/t3X+0Pxkh6TFGP/REfTqmESFIr5lKBokKke76AXczri04qlkSRjbJNEhdnFiyDTgkpmGKIuYWMAFhgDWT+k40/LZtLPrfxzV/aok9wcPGqf7/gNzccWb+2tjSk6UWuNAsTbcBmNA9z19Asw9uQuWLOzjk8KeyScCpEtdF1GGWkpRRUGRy6Te0KsWJ84W88cdHdn2ofPwN4ybXnnjhxuP+zkWrNSXoypK5C4DNHC2CWeySaX75M9RqZvqQkBUimbCPx6A8sm7QLnmU6yFgLwzARNGowXVfyv5ScMpKJEHbd/lTvePzJ7Zf9/N7iNC80jr/2rHeMH5l8eke1DmPQRtSow+DyBA0XmYKT6HxHocOKYbkElEFk7krBAp0tCaUBdAeVeRTHXhlmSUCmXoihwgSDrV4sf2xgzQPv+vaTutkOPl5+48UnP71s9L7xJU341RBoNQCnBIQZDLuElH6TQia9zingnDYfTzjCyufc6i1TJ2ZUl428P4o9A4hTXRQ2CKEsC8oykKYRzLKDZGwYKFeAiRjVpBd9tdJ99sbkA0+9/+579NlfGLz02vMu2X1M68sjgy2kJQtB0NTFjFwXcZrInNaNLYnGDx2asamhaAeLecDBziah1PfLtAFDV0+i1z6NnzEMVZd68HZiYWF9YbJl3Q9mzCp69TVXl+9asXl0x+LAGav4gMUqTClc00IwVofplfUcqb2spN+IySpR+l2XMuBXfRDr209hqC6NnkYyd2SSqtj3YXkeYj+EW+lBGCTiZFxVJQQjDQxmZQTDta9govUnQ+9+5DF9ouePkz7/mvO3LR25baI/QOCyIhivywbskiwNidSTObuu+5GJVxPd1xj3yrq3XUk4p7FXEoojN+sq1GExNV/Iake4tX7Jo5fP1M0ef9NJfzt2ePWDI70KviMmQV04Jo7hGZakDsxsC4y7nlRF2Vs1v3SRGg2SUKShhKTReJMfXxCRtctIUKZnpGuY4yCNMymlZ5muvHP+yCmYqTK4lomo1UQahqjsdP/6DWOXfuSG93zoedXDeOUnLzpj07FDd+0eHAd6bAkRgx/D4N9lfUxeGx22i2gJ+o8mTAyVIWMNjy4J5wvysZRJaklCOgZLxw5gpyGsIEJlm/lHQ2945B9m4o7P+tQb+zesfmy03mvD92yWAM3np4GM/rxWksxI2WnzpMPThMFUEhbQxxSEnY4popS/53/tk06SW97zc5C3VBH7g544ezg4Y+t7fvgTfcT+4Ygbz3hlslrdM9oXoOEG7RQXWtoRnA/yvSCgflMSTcF73te9zD10/JxQP12a7/kxX6SXBx/DSSL0KSB8sH7e+Nue+N5MPN4Xf2HdBdtWDH2rWXEQWxayNI+f4xxVOh+/0CChfSpnvTOGAUoND8t2lf78iUt/+Lf6Yp8dh//T2lNaL7Z/Mj4YIWRE/bRBpNPQJeGUUZ6dOxNJSJCECcxaHQueSE/c8o4nHsx3HFQcd+ur/3znYWMfGa8mrC+Tlx0zUCyLxblRcNJE/wxBNoMQczLMIMNA04XaHH79osbay56tXNuaT5xwQulVSx940h1FM6OxyZvF6z800PEkLAjYljC5+kWp48Qpqn4C+xEs2fmuB3blOw4qjv7PV1+/e3X9NybKdNniXI35FKl+akOLGGRIQMb1EHSjnFXNLJPURCr00ZeU0V/vQbQ5OXLzXupsvOSzp5w4Oti8vzYI1MoGMo9JSBkh3z6kI9HRJCyMGFTp2tOo/AP30VhXqkc46bHB0p3vuXOfo/sLiSO/etqndq5uXOXbCrF4nzl6gJB5Id3oeHG0kuQ/mEVJKG1Xi+FUXGR2hNhvoN/uQTacQA2p316z2rhp/cvXN9feu7a8aad/pTNQurZhh1BVD2FsohkGUF7uctfB6JJQSMgpVq7v0cVL1go1CSt14ITHTijd+Swq1guJNV9e91c7V9f+Z0Trp6RwcPS6NCUfw6ukyAyJmE+kZlGK0EhSdnvh+y0kaQ0weH0Ryk4ZXmAjbkYwlQVlW4jtBI3Ih1etoBWGyAID5WoPmkm9S8JOduCmtKOapzt5TkJZRhPRAzc2MBi6OO3JZe6tl9/KdGsHHcffesol21bVvhx4NmK6zmWWVJROmRc2JyErQJmpJXZdmSPOmmEjV9/jGHA9GJRozMOTRjDSWJZHWEA0ZhygW0IYscGpXkeAPVkBrNPRJWFKi2iqSchOFDOXCQWMKSSs1BRO2HD8jEnC028+fWDz0trIRK+JlmcgEp/JvJtKbb9Ecq2YstFAbDAQeZa6Mf+uTKpJLC4pMG8t53gBHFchTgKx4qb0bjFKyLgIL79h2TSmNSwsTbN1A4cGuiR8DhL2Ni0c/8ixM0ZC4iWfXXvt8OH2b+6u+oh7uGTZAkILjrKRML4u935JuFrPjj9LKJwdOBikko4wr0fPy6OXi4SI0drMtb/c8ZoqK5db6CUuN0HrbzHB7Ux0PAn3mBOShAlJqD1KuRhtjYRYMXFY76OXfLU2U13k3BvPXbBzuTG0qX8CNXcIWNwLezSBk5rwVYqE6p+Vp2jk3HCW5oVsJTvRa5eROFvnJCRErTdg6RgknbGAxiWSkLFTRSItWYLpknCWHuGhgcI6qqVL4aOoSWgnBnpiC+pn8fKh989sgc9zb7z47A2L67fvOtqHH+2UpQjTKSFhQtzKAGCUgIBSZfbWKGROreOgtZRrq6epeJtxn8y5lULCaA7ZT8nJH+UWUbFGd9XRjiZhG9J52EcmOwQNknYzAh7xX9Z898YZr7T00mtf+7rHj5z4em1hAK9kwm9NwKtU4JN8qQtYjuTn1IuFs4NCkxBysQ2FXGmhMQvJJGdPEbXBNRZZGsqrflGedjYHO1sdnRyApTfor23ViB0pgxclGNhmXbblop9/Md8xozjmU+cfF6wxHx61xpBWWYFtHDYzU8cMO+d8i47Ms0RCIV/ONlnaYRtqScgvMp4JAdmmMiEUJ3HJIZppa3TM+oRdSdjBknBKJ9IDee7ELX0qhpElcJMY1lPp39QufuQvZMcsYeVnzvxbe5X7wWapgbrlI7JMpJaBJItnb51tmgQrpJuQUFwA2Y6FBNRzQyFhxkS+ut2T2bTuHiLoaMPMJAlTybdCEkreUT4ckhARUr+Bpa3Bp3actv6I2X5mJ3zyojW7Fw7/TXy4emvDqSO0E6TKmUVJIgusulkktGhyrmcktqiq2jJazBm1qkowgwGho0Dy+WGHokvCaZIwzSWhUhEUQphZgsF6L3o2LOzb+I5vThwK/WTNzacc3ai0PmQv8q5sMOWFuJemiKjtFaFNRceW+dek5s271fv1fbchG7ltmngrJNgUUJLJUSRZppMlZ2L1pIqpC+kYiSkOBQWSnGzF/M9Ico3DmEVJfoigS0J2pKkjsYzenA8mEr9nmArmboVVI8tfveGSb9/VPu4QwMmfuHh5Y8nIFcFi42OBC0yYEeKKidBkAHAA2MxancLhon4rkOBe5ZgwXRtB2ASsgmCyRgNwnpY7DokhRfLT5PO5gqNiSI4n53TKzJ0JZEKoD5LsbiTrJIE1+SZJWOzrdCkobdHJbmsaeUcRUZiTkB4p0sliifbuTfqgHov/ceyye/9QH3zo4dibzjknWmh/sFGNXjNhNaGqJgIVSnFTm2RMEliWBT+hit0C+ipAzKRR+f1TjeSSQi4JWRhHDCYS2jVJJh5n0G1O1M5MPHYKYk3FdEFbYG/Hdjo6noS0gIo6VRgQZJ1QS0LOC82SjWg0wfJgMUpjL/I2vu4TuavHoYl1110wuLvSuMhY4X50RzayPKhmiJwMKRfHWd9NmbAsG3G9BcN0YBgWUvp5MrmTYioMnQ6DekAqWoKpidPWFnJLcs4mvU9v7uL5oaNJSFso/TBFyzJ0fUJKBk1CzlUS3XlTB71+FaWNuGLn2374H+3WO8Rx3KfOOry+KH6r34uPpj0mGgiQGDEs20BGdVsp0KdayqKL5NcE5KudIErW8TTD5P+2JGt/0OiS8HmjS0KSTfwaSUJmW+OcR2fzknoH9DnmvvEUi5q9O3adfseyduvNIRxz/dknNQbx5qA3+sugHCCrpKjHE4Bn68iGzNHrebK4R9WcJOXHYg2yUE/5maKwMPxQVZ1GyKnYBzkLdbWrnnZJuKcklDoNeY10WWxm+gbxlAaUi97Aw8Bmddmmi38wKwv3LxTW3HLW6eNu7Q/d5eVLxwwfkYw/tkTtSz5TcfykSxw/6qV0vYaaG1MkwJjHSMN1SXiA6GxJmKe+52isJSFN57oks0hBdjKqapxL0VI41MSidCF2r/v+swz9cwfH3XjugqDXfmO9Gn0sKDf7glKMwA0BW1s4xTKa2iL0tBsayZdrCIWtZn9F2TSJ2JWEk+hoEkoDSH+jAUJbRYulCfo76u2WSAOugdGIYdcMVJ/Gnw5f+tP/L2/DeYHDvrDuZL+U/WHYF78jLKcIHMYq0gMmnyeTgIJ8va/tHNol4YGiw0nI4bx4sZPFMLNAmJnIhIjWxJKeJ8UtSaDrmi68YQNLn/SOe/Sddzzabsl5gnW3XDC4NRl/n7HK/uiQGkXWZ6HBSHg6i0cxjFIVaRzCMhTiOIZh0EE71xiIPT7vhaDFrvx9fwXpfEaXhOIhQxLSABHBAEnI+SAlgA20TNheBRki7aeZhBiwBuBuTTfveM3dh83XznHVp67yvj/wy/cGC4x/CnqAlqPQjHzA0Q4AiELYTJcf07CVQ7J8PwcRuyR8BrokVHly3TQWVzVmuhaVi3NAzodiB45yEbI4JY2ItkLWCLHQ6EW6sXbjyGU/v0qfYP5i6edf+S6sMm6sl3wEVoLMNWQdMfMjKDMPLi74RSK2C9XQirp3EnYxiS4JOeeTjsEU86z1R6sgVVM9F7JTl/VtEWcpYr8JZ7APYRDADlMsiHsRbKj/99Er7v1I0aDzFVmWqaW3nvz/ZCvdjze9AL4Zw3BtJDHXFrnumDs9kGcFCfmtS8LnRGeTUAZpko1zFG14aFv9uDEDHGUibLXgVHsRhtpsr0yFLGjBjIFF9iLUHxr9nfoVv/hk8cv5jBNvemdlZ99D/+gPNN+X9huIMxuZqb1qOFBxwUdNnSdOE4R6wOtiKjqbhNICmmw6rwwtojTGsLNwvTCGZSSIQjpDezC9CpJGKPMhq2LCtgy0xuoo+yVUn85+a9cV91+Tt+u8x4u/+KrTWouMu3fZTURlDkwmkiylLqHVUUV7apeE+4MOJ6Fk7hTOKWZdU3aelo/zQaYWDJGmNZhlVq5l7TwTMHtYIQ8ZfCStCRiOhX6vF8HOBKWdzoeHLr3nr9qt2wHo+frJf1tfHHzQdV2xL0fMLyN58fdBwgJdidhGl4R7I6GoqDQ9hDDtEDFTDlYqkkkC8HT9BCOEbZGMTP8ewXZ64dVdOE+bX3jD+DHvfLaiKPMNK24785ykkn6v5YZo2QEiK4ViiBMbli5xRB6lUSxNEN3lCY0OJ6F0BT1YUx2lBJTlCoLjOl/sOfQUITFpcCj2S5wBDCbnZRSCooebg3LoojxuheWtpVc8eeX3HsgPnvdYe83bFtaO2/7T7ZWRI/yeFFHItUUXcMo6IXCUwKSRJorhOA5afguGWwIV2E5Hl4QHgMLtTWZCrJRk0LPEhOMD7oiJgRHrdza9+Z6OMNgQtKAu+vbJX6r1h2/0+spoGkAUhYDL0tcAF4NC1qNHBsdjWnwmAd6Xvto56JLwACAkTLV5XmeXFnGoK5cFCiXfgDdqPFAazd755JX3dIxUXPiVV34mWJi83S9HMFmBKU2QtkLxulFlB5nfBJIIpuchiahtdDYRuyQ8AJCE9K3ki0YIUWfzJMJ8mWkGJ0jhNgzYQ8bfrF798o+sf/m/URTMe6y54/zrGqXae0eTUaBiIa2UEVPyUSWtuEBtNA+h4hy8S8Kunep5I58vChHZoXSlJD2HpPGGIpE2nBhe00B/2Ivw8db7ht65/rr2KeYxjvzyaV9Xy9Xrhqw6xkoKKLvA6ARQKek0+DRw0WOpwy00XUl4IBBRyI4ktctgMBt1mqeDKOouJE3AdqTGheub6IuqKNVNBLvCq17bfM1/3PCeD81rK+pxX37V1tYKtXyTGgYGe3QiKZ/rrtQaWMVJG8U6GV0SHggKEgpMIaGSQvPsV9prxHBMpL4PZZvI/BBl5cKKM7ipCacFZEPR757fd+L1N5w9P5c0zrrl4qM2VXds2Hl4hqZRh1I2TBZcVBbiKAGsziYg0SXhAUNr80W8nfCSyZHEEcdAxo7muTrkp9UQUmapzmfKVIRmS6HsOzCHjY8uDVdcf9/lX90oJ5pHOO6GU67e/uLsmvE+HwgCmIYNW5XhhzEUHeKLVBkdii4JDwBilEnzKAwVImPJL5GMJGaeDkIMD9oZXB+nHcXlPQOsxIKVGrBCBeVnKPvmbeVm6eNnjBx153xa8F/13TMeGFoWnOArHxlrUaSOLOcwKbCUTOtgdEl4AGDNdpW4+ZcImclYxFCytGkUJGSaiDwbtYz6eY4WmTqaMqVk9jN66RhpAie04dUMePXyR8ut8qc3Xv69h/SP5y5WXP/Kk8aPUb9o9IbI7BRVpweNWg1w8qpOHYwuCQ8EUochl3Qi3UIoRHk4VGF0zjNYF5msJV3EpFE+k4ljbmVlOWymlGDuT3qYBApeZCMdjh5cmCz4yIJlx3xtLi9xLPzi6TePrkquTPoYFMxMBWy3DmegtEAnV2U6YOQ5aIRcWsIx8oIElHmOSL3CzS3vcCSucE5vp/fpZD/ksoZ4AAA8j+QCVfDgQY2lKLVcVGreP1eC3psfufy/flz8aq7gRded/5KRte6DO81dgEmrsRKrcaeLwi4JDwQkT+6frNfn9cJ9IQR1ARSSkcfqeaLekUtEogiAld9OCtBUUgqyfHcImCYcy0bmxzBDBZfz0CBJrQnnz8tDi7/w9FVfflz/6tDHkm9dcP/48uBEXw0BZQMIuyTskvBAQMbQR42gZEtNcWObdPLmR6bKyJcxJtmp3wkJm8pJqBTMjJZVHqfzDFqOicBvQrmWbGeUUBIyF44JKzThNSqwR/Cd3pb5iSff+v2vtc97iGLlLeddObTKv9lYGKHZGgas6uTg1KHokvCAQP8YqqD8XKibearEHNr8nhM1X87YAyIVtQhU/D1PljJCg1MmA3EYwymVEDaaMDxPb/N9wLJgmdRcI3hMftNQUONAqWZ9uBr1f/5QNeYc96V3Ldg08OiQNZDAt3zERu5l1MHoknAPYkztDJNEmkROpkKiMZSJ2mYu+VhURu+ZbvHLicq5Ir+SmIW0lBw33EqjDEuKJUiTSHYZysoLtmRSUSmKUyGh5HNhNaTUB1RdjEK2WYUKLDihB7fpQA2lP+v1e//sibd963v6Dx06WHLb2b9o9I+dFFViRBJ32CXh1F7YYdCSjBDSkBiyXkCCTKqVJJDsF6tnPlcrPGVSq+0l82xok1LehZH6+zNaX29od8spbN6T2ASNODTg0Fncgimq8KQV1klMeHXTd0bxnm2X/ODz7Z/NMo6+5by/2LVq+K/r/SzdZnclYdc6mi8PCOGKXl6Qb9JYQgK0DS3FkgJR1GLIydQWktOwJwmnYB/H7xemnEuX++Y25kwlF/MTpwrmRIYVUV9kbwwvf/w9P/6y3jF7OO2rb73wwcHHvjHR3wQMOnNPb5TOQpeEhdpZqIcE1+skJX4GO9WlodmlmRBYKtNOLZypWKtdp26YiulkPGgklIj/4qXtRCxyo8mYygoABxM3LaHHL8F8onnHirHSVevf/93N7fPMME64+aI1Ty7f8ni82oIf6GWYTkZnk1CePclEC+WUbiDqZiJEtISEWlIm9P8E1Sdn0lHbCHKVMP9tjhkjIclXpOUQNzpNwoKIEa/NNIE4AWIXS5JelIdSVLdnL3/wqjvWty94BrHulrcMPnnYtuEd3hCUXeqqox2tjpKE5BI7cuFpJtKFfZqspKVySu8s5oucf8UGqxoiNmNdKqzAPsi4x3xu6ucDkYS8TBpp6KdqMFVjLhEJcR6IYTsmolYdhuvChoW0HqGUOsjGIiwZHbhg41tu/7b+wcxi6Y9PzXZUxqG4/tmVhB1smBES6ryjSGiZZB9mnFuhbaaahNzPnYUVLzVgMj0Ku7msA07pwPtDwhcMUw1L5qRE1BevvW6iAAbDqJiMimXflAnXK8NvNNE70Ys1v1p8xC9++8tP6R/MHBbdvS6rL4ngR6xlcVAaZ86gsyUhGSMGlhR2QrlGlZO+nFTxNKFUoueGNMjoPDJ8tqk2kjKtBTv+VBP7PiTbdPWUOGBi8qSG5GHMPW643JFnjWsPDKkO2fMDOJYlZA2NDEkYwFMLsHCj8/0tl95+VnH0TOGI+8576slky2GqXDrwdpjj6HgSStrCLCehMhBx/a1NwhRmksFkNV9F1XNS6gl3uTAv5dOeHwmJA+qAPKmpSaioHvPixFlA6Zyf+UuliQQSmxJEpZDYLA/OqWwJfbttLHksOfaRq+9+LD/rjGDpXWf8ZHigdgoHPbnWDkZHk5B9OEtilGwXKsnghyGMcgkxHamlYyRA6MO2LUlrqGxHJytKFQxlI40zGKalS0wrJTUY6HqWsnQYX3tZhJ5OxgMmYTEfpUGGanLxVZZU+Mo3CCgt9byW0tJILHiJBfvx8A/GLrvn/7QPmwEs+8EZv9rVO358ZuVJgjsYHU1CwjYtRM0mLMfVqQsVYNs2wmYTyjDRa3uoT9Q0WSwTVsVDlEQSmGpaFtKEhpF8Xlk4Y4sbmpL6DDxuKl5QEgraeqdYc/XpWGGXGyQRfU5GHpcbljJDCMtjk7COvonKbeNn//S1+WlmBMt+eNaTQ71jh3clIZ9KJxtm2IGpl3HSlHKpQZf5QjOGHZKA/fB3Rd+rVnu+n4XJQOaZ/21CTSCrZIhLPpKoBWVU9IpGromKFBQS0ujDDGzTWJejIOOBkJBzUivR2cpik65sellCXkzjz8sQVTonofwt/pffN8WnB3hbMt8/8z6ums8Ylv3gzGx4oIaYTX8AbTAf0PEkVG4ZWb0Gc2EVyegY7NTEwqyKgVZl59MPbD6zdvUje8yVln3tNb/frNY+HiyK4FshDBaJoes1JR99RylNZdkgZ9leVFLihSChkVqwEltiFCOLSyW5GxvJJUsUuYSWg/P34npkcqsDkfvGSuH4KevzFAEzg6V3nZaNDDYRyQAxM3/zUEWHk5D9leoZF7QBM7HQ1zBQ3ZE9eM7oS165rxwvh9185uuCo/H1IWsUmZnX4iMMJQ7W7OhSIoxScXqa970LxueJIscN/wZPXMQv5i+i+PPty5hCTM59/RYWjvffN/Tq9WuLrQcbXKx/YtmW4eH+OhKq7JMX15HoeBIycsGzXQRBgp6mhYGd9i8O33XEujv3QcACx336vLMmVkZ3NAZC+DZLqOnafBzVaaCRSAf29oNJQjl1nruGXjKiFmv1UwYGeU3OGYWYwk1NWFqFSyngPKk+OvqGB/+sOOxgY+01563e8uLapuG+ZpeE8pg6ek6YSXJe1ywDNQvmpvS+yxsnnrYvCTgdx37y7GNHjw8fGRlswGSRTGRSKJNdXFTTvZFwOg6ElFQ/WS6YzEoK66g2vDA8iEsu2iBD6ZxLxiyWdU+S1UlSWK0UgzvLr9t08b3f1AccfJx0wxvO33HM0G27eyeQGV2PmXlEwqm9mR1/igQQ0HKoj5H/ZW6UwcoyyYjdM9b7yDFbDz/5uSTgdBx347kLdiwdu82sOmtjD/DNMJVzUQAAIABJREFUAKGVIjMpEqeQbPrltUHStL/IXLG9rDDl93u1qhpkXh5elUdRWIkpBpuEBISJdIrjQSH99DJGhnJkonfUweKNJ1TWv3/mamQc9dlz/mD86OAfh8s1ucbunHDOS8Kil7Jn8cVOTWMJ1TQLkg8iasE06ZYWSy1BSgnV24NsIkQ58lB+OvrZ64eOP3N/JeDe8KKbz/rT2oLko61FKYazEaDPA0jEiNlHTaRBLJZXepfxmljdXZyqpTy3tqJy0aAgoeSYyZc6eIuUXiRPsf6XUsIKMwtDjLaWUjhm9JoRpwNWibIk4S7/hsVg4zARqZ3ZNspDNtZs6v/jn7/j6x9r38gMYOBbr/pKuNS8uGn7OQHzQadDMU8kIXtgHmQrEpCdmgYLfmavjJgNAknYkk7K4pVJnMKJKyhtwc8uHT7mgAhY4OQbX7+utrh1a21RumLcrsPPGoBjA2mMcqUXQcvX3p4pr5Vii6W5LZ1jJtFre1xSoAqbFqvuOXQEv/4sRBQJR1bm9y2xjwoGc9TInFD86oDIh9FTAYIIaZSi3+tBFCRIYoXF4/0458lTSzNdD6Nv/bqsbqZIeI9yn10STlN05haKjkmVTEZVGVl1hSS9MJ3CtgxE/jiUbaFkV2D4CmbTgLfT+MmFw0ed/UIQcCqO/czrf6u+wv+X4co4omqIRPlaHaTECzmPs/PafLpUGKUciVjcy6Skk296g+zLVWzZnpOQZKMHT8yk+sxqzZLf5HSMLNPJiN2SiaBZ04U5xwLJ1lZq2Vi2s3rCw1fc+Ut90pnBqq+c9vKhlbWfhXSOsE2kKVN5dEk4Z0moJYfujFmRv0X6KTstJQxgMc06i1SqSNKuM91ltemhMmI++JrRY/e5DHGgOPfGdy142H38j4Ml4QezQYV61kRoJPBKPfBDkoPhU5RW/JfBVHSu1p1Rah0KyfKTCUT85R+Ld/FVE4IasQsj1WuGFKyZwUEphG1niMImbNdG2oix2BiAM5whfWzkFU//1i/v1SeaOaz57in/84m+4b+qLFiMRpMJgGfubx+qmNPqaJuEIj20ab7dcUU9S5FxpM1iSRlohRb6gyq8HcZPz9295tUHi4BTsfaaM5bVe+zfGVsa/EW9N0TgZYhVBJO+m3SmTkgkTayUNyQeNnzPT8A5odzTFEbmaTf0mmCoraQZ/V/pCZNbZQtVj2o658hNhcVxH3qfBpYO2cfeffX3ZtRhu8DC752Y1Ven8OsR4JRyA1lnY/6RMIcmJ62UsY5MShV64zLiRxqPrq2tfemvawU9UFAyPuptvDBZan+86QULUtasKLRmE4goGFWm3d5UqjOtkaT5kscenZUck7wVTF/B5MAkIdPx02CaL32LC55Cynli08BAWEVlq/lnT11250f1SWYer/rim057as3WuxnMiyQvITBn9bAXDnOahHIDIhFyQSFBBVpK0P6YGBlSNwNqNbiVAdjbQqwc6Tv2kTfNbNjOdLA4SrY4ucJe6n1w3B9FbGfIXAuJqSQnDAcPsXQahpCQ5fwmlxo0GXVkP/MNZ0hkTkW1IIHD+SHnlyFfQI/qA3ZGfzm4w7v+4ff/YLu+gtnBks+99EujR2eXhtUQSEw4Tgkhq/V2OOY8CQWFkMglhE40xvi/DKmtc6yoiQSLxys/2XnWPevyow8JHPe5Vx0e2MkJaY9xhvKcd0dGtjjWy/5aPXUsid4PaN1lFH9+u05CbdOCkTlIJX9MBKbR9TjzpfEnzD6uGulXN715/R2Hwo2+9OYzj96+pP7Y2DITgZvqZROaebmE0uGY+ySUiWH+FDMFO56MqYtoBocPuGXYzQyVp5MPj73+/r/Sew9NnHjTH1dK8YbD4kq2JEnC1YEVHh1W1IrATY61eq3jafhthvUWgnRHCe6Wst+3S9WzEc9XT7l+/Egp6nnk9t++deuhdnfHfmXddTuXtt5b73ERW1wjpVWUQ0rXMjO3SUjykYQFRBIq7bql08YAJQNJGKOSuggfGf/n6LKHfzc/uosZwlnXXfSSJ48cenB4YQTfcBHLskQEo+whDcOOnxfOIxLqtIQ0wHA+NZn7NkXiR7CUi0XpYLL9Fd/p6j8zjFWfX/sT/wh1yojLpFNVUUGjtJU7WBRroB0KxaQjc9ltrVBDxTqT66C55wiJKMYNOoilKUpeBclwiN4R+zd3vv6H1+uDuzjYePHnzrxydHV080Q5RORZyGKFMAolmFiCqblE0yXh3F2sb5OQED9LLQ25Qy9R6LVCIo0DlIwqKnUL5d3Z+Zsv+eF38l92cZBwymcuXPnEouGno1U2JuIAaRzCsctQlpIg5DT0AeZL7ZJwjpOw8CKRPGIkHKMHyE5NQsSh5IWJOfo2A/SgAreWwRrOrtrxpvU35j/u4iBg2VfXrg8P8142nNVhlMsyMCZNH45rIkwbefoPPWh2LOa8OloQTTAZJ0eXr7RIhltxgKEdQG8VJdNAMtpAr9ODsJEg25r9Ue1N9/9Dx3aAg4j+m47+x/gE7w+arN1hc1Geyy0u0KjDdE0kaQO26yKil0Knk1D9SkvCfA14jmFPEtJhS1wpJYqAFTSphwZAXy+weyescglGmCCNEmQO6/hZcDdn/zL65p9/YI7d+CGNl/3Lee/bcvLIv+3qHYehqkhZt8Nmie8YpkSVMFcqsxEwFtLt2PQW2qnEhCo/ua4RtIJyQncpxt4VvovthED6rVgJaJO1eJ91fb4goZ777XGdewws3KFTQPDWuZ8BsLavUB7CnUfXFrz5x5ffNlIc3cXzw0uuPfUdzWONT28bGIHv+FCpdizPWIewHenP4OJInhVjO+emADhw0OW3V5XGVOWJdfWgFVTER3F/STi1c886CZ8/xKgax+hJylgw0ZNgs3/aU++6+572AV38WnjJv7360qHVjS+NLfThuwHg0pPOgqJzbOrmJNTHGkyuJa7mnUtCOpUMqGpD9W1YV68HfkXCZzqQhCW7hOboOPqqfbDqKVpPjv2P5hWP/C/dVbrYXxx23Zm/Yb2o//pd3hAaThM9vQ7GGzXAKLIckIjar1cs1hL/qefvnTonJAkXmD1DqmfDaVubQXM5m4NZwrR34nNIQqJ4n8OSUEAHYisPkI1T2IGJvpr7SHkjLtt89c9+pQ/q4tlwxL+c+pHGUaU/H++LEJRZNLUl1aBAgwwtoOxLEi7CKA9d7zGVeEf2n84loZ2QhNXdqnfjug0N3z+K6qhhmp1FQpXBrLpImnVJeYGGD7vcA9MHkt0BvBHjb/qSI/96y+W3tto9ros2LrjlLYO/CB+7xTii99xGnwHfUwhrQ0B/D9BsQbkesqgo/EjC5cVLkSGVBFWcHlJKFiN6Z4EkXKjKm1T1sVN/HgStl8asY8DiHJ0kCcUywBGbAX0KcD2dsLdRh1PtlUKaPRNm2rfTftuTV/7kls7qIs+OE//9nHPqi/1v+ytNc5caR5zEQMnVyxD0gpGsATq7AcmnacbAa27XMZMiBTtYEjoxMJhWfqV6N5z6o2aruY7BMwZJOD1p7TxXRxk4S7c2VlxihSaS0PQcJEELZcuBGaUw6im8hvVQuBPvH71y/d26YToT6265YHCzsesfzMW9766VfYy6E+KMXfV64PsxYhphSiWt5rNKFbX9lOpnjNRgvQwKvqL4aieqopPzNydWWJh6P1QDj536X/VW8yKRgDYXUTlK0Xw1/0lY+JcScv+MRmckhqkQR3Sp4hc64yQwYhM9YQXlMfch86nsd7a87+4787bsCLzllrc4D0abrq6vVJ+olWKEjoHQSZBYzBOTwmwqOMpFmDLnKdM4sj/ZMKMYBphmMtPZ1aS5JY2AHNJ5yxOTJPRIwqh8u1qw4dTrm77/GxGXKIy8hgIJyBcJmSsS89Mwwx6hDQZmGksxUFOq8ubpJmSgzo1UaQYjUagGDpzAhFlLm6Wx0nut3hP+c+PrPhHk7TovsfxLJ14RD9o3hVXHDm2FloqRWZR0VClDPWZzbpfn65BipQKd40YyHOgc/fk80IShUwhIW7eTHc9JFPdaYNq9iFFqSoBBYfBklF1kYmlY+Q81+NgZf98KGn8cU2VgeoVOIyEXjyUOMYXNuUteGjsyOVgb2oGBDc0BjOkTMyVETaNQ0iYuihaitbH2Z33xwls3vv+bj7dbeI7j9E+ePvCUqr09Ocb9xHhvDL+kkDLqgURjzn0zD8qV9Pv8xO267iFJyAGNYWSxmeQEZCfUJdkkP2rK7HKagJ1KwnJoYlmr8q+q/9FX/Y/ADz4UcyZoGaCBZg9JKEzeiyScD5h6L3l2NkmVz5E+L7ApSYSVBSUl0NgHEyiDZcgCme+4kQcnLiNrGPS+edgZjz9hpd5Xt1x++yEX3b4/OPLml60NeqKrwx7zavRVEZoeWipDICn3fcBmHUc9d5aKViIB84GK/zMdv0gDzgNTZFbOUtlkSPoRJihOYeVJjLloP58kYYFp97Q3SRhYWNHs/Zjqe+SVfxL44d8xCn2fJCRyIs4rEhJTiSgjje5A8irmjDL6W1JpSUsBuvjR/1EBMS2sNiyrjDTKkNabsmtZdUHd/+noX73JOOWaf5vBOg+/LjjXu3fbyHHZouBCtcT4yGhp2JxwfGRlDxmzoSUVTTRKMko/ZyoJ2Xhuew2QL70EQb5RXRU9X/8hcjHRroIkbMw1af5cJGR+zJzEdHW0wLR7YrtMISBV1EpgY+lEz4dV38OnXB0EwTWiGpgGYqbd47F7ISExvyRiPoJLZ2A27CkdouhYoq5yBMpVKjYOR3PYsDIFK4t0UiZGi4t5J0DZdhHWfSzb2Y9j7l912Hc/eOtmfdJDA6tvPmGNnaSvjJz4jWrForeOG7EkJs4YYsRolJKFOE1guhZiqWNRBEnz+rX6KBKMG4ySlogyNqUSRM3EVGw+IaH+iSQKt2MlLU41n+q+HgBFl53DeJ4kRIJyy8Hykeofqp6HX/WG0G99VUhnmdKR9AhFVnYKCfNe0m44qlla/RTIfp2yXlQvdqbUgaUs2IjQChqAa0uIThTRVSsDGgGODtZgw2nfn9ryM4ajvvF7bt9DT/V4hn+46jVetMsef3GtF68JF+FljayOHlchUDFariVLpIbnSa0K0y7p9PxcrkGoo9/p1MDMblKjJlc2bUpG3hrXAg0YcSpLESSolO4u1uA5upOgTMCVky2W5mWb5qpVJ5DwGTeZoNJ0sGK4522q+sC6V0dR405x3eo4ErKj5I1TpMQQD472Jq1+i7MxO10+OHEhmqCUlLjFnLBBA06JnTWBUjbKDya3D7/l/nP1zoOLtX9/8UVPLRm/PF5tH5+UWi/vpSbZqiHwffQuHMS2eh1GtYIwjeG4LsqmiXq9DrvsSN2LoDkh+9P6BOA5cEtlBPT9zLMUyEiSaQdsaRP6hHLgzpvCFnc0bdRq50nlr3KVngYbLUVJwEKKclGfmsasjFMvEHKHA9GipmLKd9Gk8s/FcWmKMkk40v9q1fvL/9velUZZVpXXfef73qtX1VVFT3THRgYJaAAZQhSQbiQCMSbBhRBUIihqNLqyVlzmhz/yN39ciStRo1HBIQiBEMUsMUyKICAgYUYQbGi76bnGN97h3Ju1v3Puq1fdXd1FVw80dXevrvfqvTvUPefsc77zje88K4raj2QeqwQ5UGKst3X9c1kJ5Ux9ox6KG3AAH8kNaMRMKTut6/oVJCw0djR5ie2Ux0oCXraLKWLCQZiy1G0NiHUpM4+1Lzod+G6AwfWVL2y79KF/lAsdZBx348VPbj8mPqUx2AT8tmQUQJbA9T2k7S5QHQRsxvTZgO0BnRheJUQSMeFSDtd3kMoz8zmMVNAjD6FJRPJJy7DrOXHJP2qVzYdGoSURE4yVK8RYEphiqkgVZhXkqxQ1PVLHkCGgNI9JYtzPE2lPjhfNE2qF9aPys1RIuGL76FnW4GNrj+/mUy9mtRxplsK1KlBKG657LkYySBkdrRuSnUFjBl+PfC/4mYmEA2ZX7D4+ZAjqhuR3XARJQKsCzw+QNMZQcV34sQ3vN97anR989OfmhIOGD9z8AeeBobF0cnWKtpowGpBA/60Uo8UEw2ezoSS+yMzcQhwSSK9Qgp5kYH7VL7ohpOjObg3SO0Vgfpk5rthLFm1ZTOzyyZ4a+AiCXuVlYmGbsy2N4kniJoUrnAzJEl+OVZx0qGGn7qBpYfnU8jXW0T8746htQbJDDXElpHaeTre5TJoyc/EinM1URV9cLswodq4GbEZ27pHckAsBR5eC7YXIOpSzcnh+Bi/N4HQchM9ZK3dc8+jW3uEHCWd+dd2J609Jnh8fasH1qbDNtC8sIxio0cwz+AnnVReR45nJuphMjnTFyOGElhREUSV20wy20ouViOPkis39tYLDgj2Zi5SNb9PM1UJt2sGKsbWhdcavPlF92X2uNR00keYxkHjw/IoupddpAIGR6wsS0jhmp2LU5k0XNwk5/2htqZOFcGniUS2oWCFQdUR/eP8hmZ1OueGiv9rxVvWdLfkWOBVdGEYJCXWHCwlFWrIRUxTtkbAk4MLQR0KSzcrgpNpzSPWTMMvh5K5seUhCbqctq4PaZI6LNp5EhgG1+07P2/UYVt2Fm4WIuyzYkcCpBVAZC1zuQkJL53Mh9iSeLCpQErVdOMwsnXKkt1FzBpFtzO7rXPTg+YeiLd72wwv/5ZWVjc92hjMo+rxmGTx/AAk1nEZM8kxCpYQpBvlW7HnFalhi/2DsyFyMSDa2M0kIC6lt6k0aEtJBgXtCxRqZjgVbRQinsLlxzlOrhEFHP/iuB8Zq0++M8hascInUNE+7bcDj1+xEkpBGWSP/liTswWb9+UxplX7oy6B3tiocu2HF51+88u4v9g48iDjhzgvyHasSTCY74FWr7C1EzRhOJYRiTXtL+70S9FTR82ZJwoVjbhLSiV276xkxVRRctKLacGwHdtJFMJ7f21z7zDrpjpHbTv+SdUL4t+NoIudFKYtSuxbQIZezuyahxaVXNFwUR/UmfHGvhEbDR7FP0ait3y+dXoI3/ap23mOfvPughz2dcfOFQ1tWdCY3V5vAsAMrSpHTD9auMHaht/9j3xGFHqRIinxE60UOO/q1o0xcRVsp25ZOL460LZWbFh0goGN1uX1zLAduO4E9pv6p855nPyddctIdF3/sxXDDN9MRB351ADHLOVO08qnpYaVXktCb0QTxcqYzFzU4E4l2tCuxmL7jIOl2MDo+hD94Zeioez5yz9jBbp8T/+uPz9y5ZvrRsUqkU8t3KP7YqPghuqlCLsZ2CjSzbVmFn+xiTrS0cBQ2Qjbo3CRku9NgI8YbFn/NXPiNFN64uqZxydPfFiqdevOF525Z07p/qt5BRG8Jz0MQhoha04Cvl1ErLUio7SElCUXqEJsac2lanVjIOFCrob4lxMZ1vzwk09TJP1n7yZdXTH+tE7Kz6STgyjbEs110GVjLPJ/SYfpFE7FI/ViScGHQ3NDivRFHuXujKcK2kNFMIWK/2IiMvdCFo1wEExkGN6uzt17+5CNy+ttv+7OjNw9vf3V8SQeZz8BeXolf0d+IJ5KE2vDKTuQnOn8kMTO7Lj4Y0V1lqGT0JlVSsDPcYN2289LH/+JQtMeJd53/ny8tm7hchVS5UXDJYbFSr3QbnaT5NxZiE6fpkoQHDqZtBVyclJncTPJp+Z6SCPmUaKkpoqV2EAMTDpaurxz1/EfuGevN1qt/dl4yNtJ2O7QLhh6QKlgOl1S98gkJ5Z0OepX4Melc3amLE8aP1KFWmYmlE4Sei8HN/o2bL77/g4eiTdb89Lx8w/JxbZzvkdD0h02B0wwG+W/6yuIekYeXK+HCYEgoxOC2TZm9NiVG0+4Z7e/0rGqbqJIQ1SjAyHgVm87/mZzZI+GK/z7ruu4J7jUtVyHJY1pAdJpyI80UJKSSlbNrSUINaiIt1luwHfH2okJ51Xgdr5xzV69tDxbO/tKVy9efuX7rjtEmYPn04AQoxfC/iKaO7idZBTlYZpOQKLcVCwFtgX0roSGhblNPE5RaaTq6swCOa8GxQ2B7guVjw9/f/L6ff4hH9gbK8T84/6pXRie+668YQJuspdeH50HJUso+pY8gt/FaHM1sukWxF03HLkqY9ujGcOpLoFo067hYOlnF771Qf/f/ffQnPz2YzXLyLZd8btOanV+cpr9oPjAjctK3tZCLTMoJGTCGgPK/2COWWAD6VkKxIvSR0KLnDNudmfw6QIWHZchbCYaTEQyudz+24Yr7ruNVeiRcddO6U5tv7jzRClOkVoSBgSVoNqeMYqYk4R4hE1SMSlhF1M7hOj7ipIN64uGoiTqS39irN33q4ETYH/+9C06PjvMe217bhog+aRlJyMgG/k000keaaPTUkKBkSi/8m00EQ9H1JRkXAENCIi8cWJiVoY+EqY0gdBF1doj5ajAYhv1qimXrh0/6zTV3Ps9TZ1bC2z8bTIw80RrzGg78DA48bddwqVbNeyshc4foUJVyJRQS8n8nhu0tQZYkcBjj2o0xkAeojIcYeDX8Qn3a/1E1xJairQcxKK9MFtiM2z0a+M6qPSaMOnZ4In98YEV2CYC7Nz44MjnkX6HeFPzzTmcaqMcS/2mpOsCiKxLRTpslL0Wxk25UhWabV+MgYZ/2ur4k4oLA1U5HkUhQA1OjsElJQjAtCifBDJnbgZUlsLs2VkYj2aWTp1X/1SQI6+sJoHLHqTflR1evyEMganTgVwPE9CclCSnFSDYykpAOqsYbn/vGRSyO+p6HuNEBgmEd2uS0AHSB9jSWeKNwWyOwYgdKTSCzYii6LFkWAuVIuozU0+RgPJ4tWuki8txFlnsIvRqiRowllRqSpINO1kZey9ENUyhfaX/f3IOdsgSZx/wRmoR2S1TijH7hSkgy8j707NArIplrFGvlarj/4GpHO6AoukhCTorsU0PCxIXDylNeG1amYLVyDG31vr/zfY/LfpCYRcJlt53z/snl0a3JkIOcPoiujq0j+RgEU5BNbkJHYO5BFvWekI3BEezCcms6eTBDiQYcuKqLNGZoy6iILZbTRkZPe4lGp9TIwW9SAZo2FilR2pcdSxGSwYw+HCdA3lUSd82ZVtkKShm3QlZ6ZfhMWkPO42mP2mUlFHFU9if0oJF8emYlLPaQ+r4l9gdmuybRf2YlpKQoJLSB2ILnu9oHO04xmAXwX8al2y977IfmArNJeNb1f7Li18dNvNocVTb8WEJhnJaNQLHzIskdIo6pRdQ0b1LOpKYdzAZdTDp6whK7al6ol3UVon6w47SISMyQUNtgi70GyaiP1dDX0CIlCVQMAm+GSxJgyovrX+k4XBCud7/itSTg/kP6mw0o+zNZDR0JiAYSTrY0SbCPEgXPDlFNPWAyRvBCvGL7x5/ZZq4ym4TE6E/OvmVspboMQ1SvKnisZqsyKKcjJKSYpDejYizUKDuyxGKETITmwZnQmCkduf/jNCzZxlkiPAPaMazMRzDtYFm3fsPvLrzvw/3NtRsJT7r73As3jDTualPlWh+ExTTmknVNz+S0h+mzDPNko6HfliixuGBIyBcJVdIS0UwaD4qnokyRzHz1CR/DG5ect/7y2Y79u5GQGH3wFNUcqNqq6kFFXSPG8IL8VotHcgMRRQvRtESJxQexnXMR6pmBir03TUGirZFajaHrYXhbpbtl7S8ZmDsLe2TPmtvP/Oj4KL7VsLpwKjWdSZlKBfJNwvd5ot7465vu8TIlSryhoaVRQ0J55xo+8NfYrIYZPMeDM5Vg6CXrQ9uufOL7uzbKHtnDlBeb46dbrSFLwmESl8lcGb5PM1NgtKWahNTkLe6YwhKLGf3bQm0t0CTkSijSo8tSCR4q2zw1ecGDhqGzsUcSEqO3nvbp+E3OVxIfiF1mmOZ2k8oaT/uhIhIjsfYjnfMyJUq8cSHDnsQjkeiyxoVPb9f0vjDXTkw7chy9ffmHN73/zhv21Bh7Zc/RD5yTTw600PFjvcyazadmv950liQssWhB9tCmS31opqQOR0Eorau0YSc5RqaGJ7eff++w+Wo37JWEa24555Kta8Zuj4YVEIeahK6HPO6IIV9q3NPoXKLEYgTZwxLrXSZQpp0whevlSNJIolfcxENtOshrm+rnbr7ypw/O1UR7JSExcOcJdzSXqffAq0ksFDU9Tr0O1ZjS9kKaLEqUWIwge6IurJFR5JMNbbjPGgjqVUSdFEutZQify6/beNkvPra35tknCY+/de3qiVXjG8cHufejSxQ9lHNYbo48jksSlli8IHvoS5hZEvCg4jbskHvDBHnHxsC2avKOyWNX3HH5LeN7a6R9kpA47gdnXb1xZXZ9vJRO2y7A3CXdaYQDNURdqmJ7h5YosXjAcU8fXGoo0xw+q3KlbeTtCMvdpaj8Fhe/ctlDd+yrQeZNn5EfnnXT1ErrClW14FQDLY4yktj3ShKWWLyQCl3akZ6B8DXHw5IoRPuF8a9MfOjZz8ynYeZNwquvvzp8+OTx1u+8rXYrn8LA0FLJOB2pqCRhiUUJbgE914VSCipXqNkVhG0XzsvJU9sve/jU+TbKvElIvO1LZ5+y8/Tm4zvqHdvyRpAmGSyf5Z5KDWmJxQeSMI9SDAwPojm5DYE9gCXT9dzfFK7eeOVdm+fbIq+JhMSJN59ywc7V2T1TTginPgCmzpfQGTGMaLO9tpGYpLP6455nQeHrbSJwNEz9tplvd8XMnylOsn3Q+9FyElis4LgqMKObmPlwZuTMOkAw+3j9S//1CB1WZnxAd4Wc5sCKFWqZjXrTy5313h9t+sj9j/SOmQf2dOl9YtUNZ17VXTX43c4Q0PW7yKyuNl0EnqRgzyTQ1wLCEEiL+ng6hSlpymTQUjpK7t7nCM4sYLs1An/QQYBvdO7/fiKKX+uslXguQu5y4R72qwlKHDC81n6Z6Xs9sesxI94pRUBP3zjqvfKHpPgw1zUnkolnAAAInUlEQVTpPhjkLGOG40qOZzHPme9t10NKu3jg64so+lAzWFfpxMppFzVrCUY2AuGL0fkvfubR+/QN5o+5nnSfeMtNF107OZp8ozHaQcdtoVatIYoiKJXCDn2oJNL18YiM6Rv0zYSETI/Br+TuhjTSWCYQdTfxlq5BPNiQMDPlm0sSvgFgWLIb5hqau5OQkCDnYhj1jR85Rj7keXSy1ucXr/0B0DLCqOmUA/T3Kk7gDdaRTE8BtVBrQ9MYbrWKtB0hRIhgq8Kyl/w/ffGT9/9Yn/zaMNeTzgsnffPcq6ZOjL/bHEqRJS46aQZVdWFVme+yA7RbsBz6mpJExqdOEqOaZ5wVQc4fRePxdVciGuwijs6NOc7frdMX1AQlFoz59sdc/W76uf+0YvkjZPI246Z/vMkrV0A91mbIyvN1Wk+iElQRRQloCUxZIoKk5VDOE4RpgGVjddTWd9/7648/fLs55TVjrieeN97yrVMvbRzj3JrVqlY+VMX2aByoOkA0hcqSIUSNlqxedOMpCNiDvDcNw6fmDCZPXzTsXETqw5yknOvc+XZ6iUOD+fbHHP08nzEyi3h9t+CtDfmKqlVCQCn6yevmQMREZw4Cv4pKEKA12YTvOciyDMNTPsKns/PW/83DC6q+NdcTvyac+p13r5s6Jr1na9iwupUUqBiZWdGzxoR2yK1m8jRa2UyhUfl9177gOVwxe3L+HH9tb1mdC/PppBKvX+ytb+caE/yh+13GVW9w6c/6FwJGPVgMPypCkJgZjftECcrlvi8HGg1YXgirlSFMPAxZg1IOPftt+/TN1/7qcXOp/caeHmG/cOJX152Yvz14dksw5jScFmpDg2i1GZVPmPR6cjeueswCVmRwI9g4fY3dRyq9ke7fdEvLmW/NXrEk4RsY+yAhoYfILGjemXHClJ2SGbsgYf/46c9Gx3v1kZDlrdIWnME6nE4Ca0JhNZZDbVTPptsbF2361JMHJLHzASMhQYP+/w48df3UyuQvuwMR8oAPxaJ5zEtj4hklT6YxZRSNwdeCSPJqNFTSflTCsAHlS825fhHEpBXYf/Rdq8RhwEL6jtD9JyIl38yawItXY2KQQaWj3XsTv6yCMxO5bJ3keKZOIxmV1OoMUh9DzQqSJ6a/OPHXz39eX/nA4ICSsMCbb3nHB3YMN2+yV4R2C8yTyQcsHlKnYZcG6r970WJFpxgNqDSubJ75iw6UZAP2GrhXdWh/UZLw8GKhfacndD1OZshUlO6Tj/hGfp0ZR72lsxh2MqxmJv/ijcsa8w2FoW4V9c32upeu/MW95ogDhn4aHFCc/R+XrH5lcOrLraPiP48qESqVClrdjiQNzlgqSiL1c4A1vtlwkhGa6TNoz9Cl2RymV2TWYtFesRrUbBIKEY3WdTcULC3sQnOiJOHhxXxJOEc/SQIyS6f4NPbkPLOQ5xYy2vwcV4q4pp1IJ7PmNsi24Tg2kqQNhKnY+uygjqzRgRuGYutmNnS/66Ay7cPZmHx5WWvlPzz96R9P9O57ALGvEbpgHHPjuWuD48N7djS22nT+zgeqaDOJMIuWWBZcy5fyYokqCmlQcg2Qt5lhmptmvRIK94SEetJi8WE9BfaRUDxvCiywc0scIsynn+bqI1FrzvQ7bXwkHhxYVLBI6hV+zp8OHN8Xu59vu0iiCG7AcgNdIGOVXUeqGyfNLobcAXgNCwNT/pP5VnXNhmsfWrDyZW846CQs8ObrTru2evLoN7Y5kxjPI7hDI4hVDEST8CseYoZHeSanKQOFmes0CIBuKn3AeomEVJ4l5JUdUJQh3hWH7NFKHDLQqN7X1+xih/u6goSFswddXfglJ+ocdhAga5myDlwRLQcVz4WiBp+U9Tx0szYG3AqqkYtgh5VUXvUve+Hq+36kL3xwcUhH6trrrw6fCx6/rHLc0u+NqwiRFSGoKyRZSyp+s6QCfFc3IN3dFP3dWPiSDW1EjcLgyhWQs6DMYqYTZpHRPNo+xdESr3/saZI1XSz/jXgkrybhrowF41o2MQ4MDokLmhVluqpyN0boBHBUADu1kba6yCaiZ6ot5++2X/XMXb17HAIcthF6wm0XvKtR7f59x2+9N68CilvD0EMXCTJGKA8PIYsiLYlIWjeqmUlGlvBmyzC1hmlo2Wjvgj4t2WwctkcuMS/sQrhZk2hh0jKQPtbfF/k/qdnU2nNqNlmlxQJ8SlSRpKN3ggH4yobDCKCYBbRsBNP+vw+PDf7bi9fc9YS58iHFYR+Rp958wapG2HlXZDsfVUF2YddTsOoumoql2VgezPj2GSiLed7yQvzXG/N+FJ1WkHA3UfWwP3KJvWIOEvbv/fpgc//HgZBp5Z3oEHiOzTLmFlRuwc1duLkHN7ZgtzLULC9Pxttfr6TWjSvUyDMPXX7HXtNPHGy8rkbkJ77+ieoDwca3x5X4DGvIO7/pTL8/cmJknkLu51LgKPFyFj9FIrUx+klW7BV3eaQ5V8QCr6smWITYnViz0C/lzCKhJqVl0dgOeLkFO8vhKht2msNWDuzUgZ14qGYh0My/FbS9u5yW+8tfX3v7ht5lXgd43Y/AM/7nfUc1Oo3f79ZaZ8S17LTMx3mJg+MYDqU4+wnpNNFowtAbcv2eJKU6uug6+Z59aZ5aHOYNSfWqqh13i+9LHFyQPCIx9nFLtODs0T5JZuazotNmzsnSHJ5lw7cdeJnTtPLsWadjPeh2rKesVuWRys5oy9Of/sVBMS0cKByxw43lvZ1kg9+Kppe7djrqOm4l8bOj4WZLvMBZnvvukGXnVcvH8ty1lyrbqjhudlTm2PU0R41SipTLtHMkTNzqOJhoTppS4HpvMat1+gZKiQMDN3MwEtYR5K6YqRzX7toqn3aU1c6yrOmkdsNSajxLra1WmrRU157K4mQqT7DFbmebE9WZribYsjM4tvHWVi2995pvF36SRxT+H0U6lbFXY2e7AAAAEGRlQkc5RTY2N0MwMzM3MkU1OTU2tpfHHAAAAABJRU5ErkJggg==",
    alt: "",
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      flexShrink: 0,
      objectFit: 'contain'
    }
  }), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 1
    }
  }, React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: W
    }
  }, "Cash App"), React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,.45)'
    }
  }, "now")), React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 400,
      color: 'rgba(255,255,255,.8)',
      lineHeight: 1.35,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  }, notif.msg)))) : null;
  const Shell = ({
    children
  }) => React.createElement("div", {
    style: {
      background: BG,
      height: '100svh',
      color: W,
      fontFamily: F,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 430,
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }
  }, React.createElement(DI, null), React.createElement(SBar, null), React.createElement(NotifBanner, null), React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: 110
    }
  }, children), React.createElement(Nav, null));
  if (screen === 'home' && !flow) return React.createElement(Shell, null, renameOpen && React.createElement("div", {
    onClick: () => setRenameOpen(false),
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0,0,0,.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 28px'
    }
  }, React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "fin",
    style: {
      width: '100%',
      background: '#1a1a1a',
      borderRadius: 24,
      padding: '24px 22px'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 700,
      color: W,
      marginBottom: 6
    }
  }, "Card name"), React.createElement("div", {
    style: {
      fontSize: 13,
      color: G1,
      marginBottom: 16
    }
  }, "This shows on your cash card"), React.createElement("input", {
    autoFocus: true,
    value: nameInput,
    onChange: e => setNameInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter' && nameInput.trim()) {
        setCardName(nameInput.trim());
        setRenameOpen(false);
      }
    },
    style: {
      width: '100%',
      background: '#0d0d0d',
      border: '1px solid #333',
      borderRadius: 14,
      padding: '14px 16px',
      fontSize: 16,
      color: W,
      fontFamily: F,
      outline: 'none',
      marginBottom: 18,
      caretColor: G
    }
  }), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, React.createElement("button", {
    onClick: () => setRenameOpen(false),
    style: {
      flex: 1,
      background: '#2a2a2a',
      color: W,
      border: 'none',
      borderRadius: 100,
      padding: '14px 0',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: F
    }
  }, "Cancel"), React.createElement("button", {
    onClick: () => {
      if (nameInput.trim()) {
        setCardName(nameInput.trim());
      }
      setRenameOpen(false);
    },
    style: {
      flex: 1,
      background: G,
      color: BG,
      border: 'none',
      borderRadius: 100,
      padding: '14px 0',
      fontSize: 15,
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: F
    }
  }, "Save")))), React.createElement("div", {
    style: {
      padding: '56px 20px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement("button", {
    type: "button",
    onClick: () => setNotif({
      msg: 'QR scanner ready',
      k: Date.now()
    }),
    "aria-label": "Open QR scanner",
    style: {
      width: 42,
      height: 42,
      borderRadius: 14,
      border: 'none',
      background: G,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      padding: 8
    }
  }, React.createElement("img", {
    src: "/cash-app/assets/cash-qr-mark.svg",
    alt: "",
    style: {
      width: 28,
      height: 28
    }
  })), React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: -.5
    }
  }, "Money")), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement("div", {
    onClick: () => {
      setNameInput(cardName);
      setRenameOpen(true);
    },
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: '#1e1e1e',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement(SearchIc, {
    c: W,
    sz: 19
  })), React.createElement("div", {
    onClick: () => setFlow('account'),
    style: {
      position: 'relative',
      cursor: 'pointer'
    }
  }, React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: '#1a1a3e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: W,
      fontSize: 16,
      fontWeight: 700,
      border: '2px solid #2a2a2a',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg,#5d9a6a,#3a6a4a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 700
    }
  }, (cardName || 'L').trim().charAt(0).toUpperCase())), React.createElement("div", {
    style: {
      position: 'absolute',
      top: -3,
      right: -3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: RED,
      color: W,
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "1")))), React.createElement("div", {
    style: {
      margin: '22px 20px 0',
      position: 'relative'
    }
  }, React.createElement("div", {
    style: {
      background: 'radial-gradient(120% 140% at 15% -20%, #2ff4c2 0%, #0da7a7 34%, #37ba38 69%, #11341d 100%)',
      borderRadius: 28,
      height: 190,
      position: 'relative',
      overflow: 'hidden'
    }
  }, [{
    t: 38,
    l: 120,
    r: -10
  }, {
    t: 26,
    l: 230,
    r: 8
  }, {
    t: 40,
    l: 335,
    r: -6
  }, {
    t: 88,
    l: 40,
    r: 6
  }, {
    t: 96,
    l: 155,
    r: -12
  }, {
    t: 84,
    l: 265,
    r: 10
  }, {
    t: 96,
    l: 365,
    r: -8
  }, {
    t: 146,
    l: 5,
    r: -8
  }, {
    t: 152,
    l: 105,
    r: 10
  }, {
    t: 142,
    l: 215,
    r: -6
  }, {
    t: 152,
    l: 320,
    r: 8
  }].map((p, i) => React.createElement("svg", {
    key: i,
    width: "44",
    height: "30",
    viewBox: "0 0 44 30",
    fill: "none",
    style: {
      position: 'absolute',
      top: p.t,
      left: p.l,
      transform: `rotate(${p.r}deg)`
    }
  }, React.createElement("path", {
    d: "M10 3l3 7M34 3l-3 7",
    stroke: "#fff",
    strokeWidth: "2.6",
    strokeLinecap: "round"
  }), React.createElement("path", {
    d: "M6 16c5 10 27 10 32 0",
    stroke: "#fff",
    strokeWidth: "2.6",
    strokeLinecap: "round"
  }))), React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      background: 'rgba(0,0,0,.45)',
      borderRadius: 100,
      padding: '9px 15px',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement("img", {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArUAAAFoCAYAAABJ6AMtAAAgAElEQVR4Xuy9CbxlV1nm/ay19nCGO081V5KqVCoDGSCBECBICBC0QWRSEQeICnQ7Czai7dCNLbZi0/SnfuLcKoiogJ8o0MEkJsyGJBCSEMhMkkrNt+5whj2s9f2etfa+99atqlRSVUnq1n3/9bt1hr3PPufs/Z69n/Wud1AQBEEQBEEQhBWOWuGfXxAEQRAEQRBE1AqCIAiCIAgrH/HUCoIgCIIgCCseEbWCIAiCIAjCikdErSAIgiAIgrDiEVErCIIgCIIgrHhE1AqCIAiCIAgrHhG1giAIgiAIwopHRK0gCIIgCIKw4hFRKwiCIAiCIKx4RNQKgiAIgiAIKx4RtYIgCIIgCMKKR0StIAiCIAiCsOIRUSsIgiAIgiCseETUCoIgCIIgCCseEbWCIAiCIAjCikdErSAIgiAIgrDiEVErCIIgCIIgrHhE1AqCIAiCIAgrHhG1giAIgiAIwopHRK0gCIIgCIKw4hFRKwiCIAiCIKx4RNQKgiAIgiAIKx4RtYIgCIIgCMKKR0StIAiCIAiCsOIRUSsIgiAIgiCseETUCoIgCIIgCCseEbWCIAiCIAjCikdErSAIgiAIgrDiEVErCIIgCIIgrHhE1AqCIAiCIAgrHhG1giAIgiAIwopHRK0gCIIgCIKw4hFRKwiCIAiCIKx4RNQKgiAIgiAIKx4RtYIgCIIgCMKKR0StIAiCIAiCsOIRUSsIgiAIgiCseETUCoIgCIIgCCseEbWCIAiCIAjCikdErSAIgiAIgrDiEVErCIIgCIIgrHhE1AqCIAiCIAgrHhG1giAIgiAIwopHRK0gCIIgCIKw4hFRKwiCIAiCIKx4RNQKgiAIgiAIKx4RtYIgCIIgCMKKR0StIAiCIAiCsOIRUSsIgiAIgiCseETUCoIgCIIgCCseEbWCIAiCIAjCikdErSAIgiAIgrDiEVErCIIgCIIgrHhE1ArCKsE5x9/70j+N++/X/uvfDyDdEc4HSfL4zwsXX+wAWADLb6GU4n1BOIgldqiB+yOAdrfU5vYqoDQ4YA1MJ4IqNHZHCsqEdVzp0CocZscdJl2BIVsATQtkDrgQwEMOuLis7LC2SSf2KAinPo//4iUIwklPJRgi7N6d4qaHmph7OMH+rsH07vaO+x9tdfbsH56Z2z/W3zM/2evObUDRm1B5kbrCxtqVMUrddCofjKwxygCqNE4Z58B/cLAwzmlLweBKpXOt1IyL1B6dRrvS9uCu1ujIo4MbJ/cPrh+fHRldP4uNa7rAQImhNMNFl/WxBn2lVHHS70jhuHDOUbAmmL6/gZGZFPs6CTq9BuYPNDE3NzTbnx63/fk18wd2X6pcPmqBxNosVqVuWOXagGsqVcQ2L2JrXWT8VrW/Xlld2KiMnNXWGmXyUqsCpepDo3AqKqDTfTpuPKDixgNxMvJge3x858DA4Cx0q4Ok3UV7qI9xkwFDPeD5GYBCKUWbFgRhhSOiVhBWGAvClZ6uPXsSfP6rrQN33TOwZ3pPc37XgYH5Hbs2dXfvPmt21+5z1fz8pkaBoagsW00gTpwaSLRuoigbyuZGFQWULRFpDWMMNE8JpQ2uXAdY652uHv+uldsroMHFThlYrVymqTYw34XqFBF6HeO6OdR+l8bT6eDIt1vrhu8ZGlnzrdHN6x5pjUzMt08b7zXOO/MALrusByAHUCqlFt9QOOlxztEODbAnwdzNTezLB7JsV2Pfzm+vcZ39W20+e64tZraWnQNrkM+PwPWasS2bkS6b2rlUGRc7t3jIw7QBCc+p6lZ7o1tcr54D4DCrtsvCOpRWw9KKdQxnGrBKZw7NTuHMXJ6XmUXUSdOB/e2BgW/rZuub/cbE/c3W1CMDa9fvTNqT0xhdMwuc3+fmKrEr9igIKwgRtYJwklOJ2BY+f+cE7r93AnffNzF99z1T+x7cMTDz6M6xcq6zYX62s9EVxbrY2rGmMaPaukFd5FEzUjCO/lXvY4WigLAFbFnC0u+qE//tjQqilmLBlSXfk+42qKWniOAoW4BXe2NiLz0cNEoF5A4onfW3Fg5xs4XClsido2LN+toeyKH2RbHZpRuN3aaZ3oVW69H2hjXTk1s27R294PxpbNlwAOvGH1YXXLB/4c2EkwLnXAx8eQg7H1iP/tya7iN3jUXdvSMzc7OT/X53Xdmf22TL/qQqi/Xa5ZONFC1V9mDLDNrmUNoi0rS38HVy77MPUlap8CRvazFbPxewC2LWoyy85gyKl0v9IMybOCIoP9UQITINOBX5ARhFL9+P6xT8T6c9q9Qu65JH6NlVjdF7myPjuxqDaw80Bsf2YGRyJ9ZueRTYuBdY05EQBkE4uTn4KiUIwkmBc87gxlvGDjx872m9u+9Z/8jX7jxz123fOL/cuXvrYNetG3RqslGaZuyKKDaR9l5WRgXkJVUpEq0QG4M861SS04H6QDsLrenJct7DWjiFwlIfBGEQ4gxqL1n4V98/HD4qwW893HMwUPT6KgNlNPKsqAIaDWA4P2yR2RKOn1cDrTS2c71uf9ahXwzEM3Ox3jcdJzuHtm/58uaLLrplZOuZj4xfcO6DuPzifUopetCEpxBvh/u/MoB810Sx64FN3QPfPnN2dsf2/tzeC9E7cNpANjOcIh/Qrmg65U0LWjkvXv2wpqQDvvDjoTrE2qH0swHe7nTq7UfR2bvEKcpBFQdgXph6e6QYXVzuHykL5wrAlF78hoGYDq+l/SmDsrB+4MXlftLBaf88Vy3LklMRfnvKGLgoRQnjZjJd9E3UzXVzf9Qa3pGMrbuzPbzhjtbEhrtaw2vvgRnfgeEXzCulGLogCMJJxOGvVIIgPKV4D9iDDw7gK1+ffOjam7buvO3rp5f7ps+d3/Ho+WmWr43LYiLK7XBTlVFTKZjCwbrSX4yJcrxAO/qnvKjVll7WEjEv7n45RWeJ0ktM+rQUNL1XiPmySpIuEpZrlNzuMpaeNPh+9CN70cD3cHzX8B68jWGqxwaW7jmlUFKRRBG0VnA5Iw8oMBwKbjlKQOXag5nrpdGjHa13lGNDdzQ3rPvW5Flb7j7j0mfdlzz3uTvxjDP2i6h4cnDOtdD95BgeeHTz/L67z8pmd53Z3b9jm80ObFFZd0Nk8vEEKkl0CVVUHliOmChmvXANQpH2pqPI33LQRLHpKm+/X99plKVauF+LWr+ec9UAjNENh4paP6PAt9QlrKq27f+CvXJtbjdiGEK1zIfSuPB+hrbvFEzcQM6ZCX5G/1MKg66C2zQRChgUSItuz8xa1Xg0bq25e3Bg3R3jExvuw8Tp92Bq6l4MT+wBLqXIPfTHIgjCU4qIWkF4mnDOJbj++vVz9919yV1fuPlZD3z5qxvNzgPrJ2y0ZjjPx/Vsf7itdMuUZRCt/oJtYSrPKwVioeFFo4+LNQaRNoiV9jOyrrQoS3rJKuHghUYgxCEqOEsPV1heCw6GD/iltfergkKCz1WzvR4vIugx04vipH4NhUz9vlZp/5702zIsgaEKXgC5Eq1GCpdbZP0MEQxinfpwhb5zyLRx88b05hI11zFm33Sqd0XDg3s3nnPmg2c851lfH7vs2Z/DlZffr5Tq+DcSjgkvZPd8btOBe2+5Yt+ubz2jnH14c2QPrG3YzpQpOyOJ7bfjKDM8ypwR4DGmHXCGwNrCez2tK4J9MLzAGP+X5/TUBqEapCZtj37ZMBhbjNk+WLTW1PZzJPgeFKRBuNaaMtgd//i56D42nJ2obdFa2NKhdJzYCM/RFpMIYaCF3H8nimX/ZXSC0iWwLoWKBss8j+Z7uZ7JzeBeOzC+Kxpc88jY2nW3tzds/iImT7sduGxaYnEF4enhsc8YgiCccNx1uwbmb/jopQ/ecusrp+/+2la3f9fZ5ezcVLuIG22LOCqcSqxCGkUomchFccnLPi/KNnhhgwBgkgxjYSkkouC9KsrKu1oJy0o8BN+r8a+iuLTesUaxzLQa6x/z4k9va24Zbxte70MVKBDCQy9kDjppRPT0LnrKCD8n/cOcVC7LHEw/05rTwcFLSxHO19Ti2esGp/1rInp6KcY5EUw/sInRZ8gCv20aoTQG80Xf5s723ODA9EzSuH3snDPv2HTRJTeMv+yiz6qrrtrlNyocFT+oOvDxTd1Hbnv2rgceeE4xu/ucOO9emLjOcFrMN4zt6WbEGNUsCEbt5SMjB6pBkfazA7QRDqYY0kIoCLkSZxIYq83jHinvO62WM+iVHv5w/L149MsqI1siZmubWmZ1AT+AWjrwqkSxXhS1tOuwJKzDdf0yWqXW4TfFrVsFWwSPMpczhMKvz98KAyhKzkDwRxKjdEyMjBDHKYq8cJ3C5tY1Z9Aaf7A5uulr7Q1nfqk1vvVfsfG194i4FYSnlsOcKQRBONG4vXuHso9++vR7r/3idzx68x3PL/fNPGsk669v9aeTZtGJtDMq9tP1QZxSH3gPbBWHSiHBQMBaLFKq8tJM+cdFfL4WAoQSkYGM1CLeM+ov6mH6nxf68IjhCsEL7EVuJZ65rp/a9XGIQSjUojYEMyxKkJJiZemUsg97qGJ0KXj8uvwXPkclO/xrvOCovWf0qDlWKzVeDHHrESLkyJEoespYHoEBCgYmjtDPc3T43VvDeSeOsn1lvr872Pr64DO237jluZddt+H5l96Fq8RjtpyQdPi5gelvPbJ1/tGvXdHd+eWX6/7u82JnRxpwiS57scp7SLVFM+YIJPdC0Is7rfwRKDmVr4MorMMKfAyLP9aMg+Ugi1P/2gtF/3wds117+2kT3rbD7EPIhQy3IYSh9tzW3l1/czCO75GGz+eF7WIlBOLtuLJLvhehPfP35AdnHGQVGZKIQTIGtuB2ggCnGPfbYExwZat+2zrygzFadhIboNcJ21QtONO286qdzaM175rj96YDa67fvO38GzCw9Tas27JTqTNCrI0gCE8ahztVCIJwnFQVCww+9M+bZ77w2Td+4/ovvqz74ENntgo33FRRHNncaGtVUoSoPWPpNaIgpF+Tl/IQq7rohaqoxEG45PJCe7CYralFMW9rb5WPW1wqEJg97jcXhEjNYQVERS1ua+gpPhz1erVn7KDPUUFpsPT71a9ZusUghwNLX8/PyNCLfmTR92KYdUu1nctsMZOoucamjd9un3vGtef+hxf9Na688k6cfnq2Wr1mwRa/EmHH3WfuvONLr57bc99LdW/67IYpRhI1Hceuq511ijGsXpSyKJa/vxg+Uu9z/heOw+JR4rqHY9nhPoiD7YEH3m/8kFt1BPtaoLJpz7LqW4uWdTB8X74/qe3Pf5Ql26rvcfnSrS7/bWh6pf3gLvYVFxgclPO+Tmxm4qLnmpmLR3cOTm36yprNF/0rtj7zU8DFD0v8rSA8OSz7iQqCcDz4ovO33TY8/ckbL7r7+hu+e/prd1w5ODu3pd3N20M6QsrY0jL3HiAvGKoru68PW+FF4MKjwFKRSBYuupXoWC5sDxHDT4Dl2zoeFkTDET7f0T7n8tctpdQWNgLyPIOxDg2TwGiGKyjMGoXZNM13D6h7kzNO+/raSy/5m7Nf/fJr8YIXzKwGQbFQy3j6+nbvwdsvfvTbX/mh/t4Hv6Nh504fMjlSZFBFB/B9MCjblgnTyuAW9v9yNVdZYF1661TlaPa5KJ2rZLclu4qzGByydm2MvmpDNdd2zeDmf2+PnfHh0a3nXIPJDY8AF/dW62BLEJ4Mlp+pBEF4goTuSUhxww0T0x+7Yev919343f0Hdr46me9samtnYluwmhViCgRbQpU2lN/yUmK5fA2YZWLuSKKWkuJIwo/rHmnZU8VjfYajC4ajwzQheuh8AhoT5BSzfZigVKCDHEa30Wsk2AM81Bkf+PTm5z33H859xQu/he+6chfGxuZONUFRidkGHvi7tZ37v/KMvY/e+TJVHHh5XOzfom1P0xYjZ33ssjcqwyn7I4vaBY5R1B7p2J8sHI8N1q/0dkczZNiQ33XBy8196pPSWEUEKfpooOcasNHwdNqcuqMxvPHjg2ddfB22bL8PeA4HWyGrThCEY+bkPuMIwkmMF7MP71uPa//1rDs/+ZktD33hliuTHfufva5Up4/qxOisT32Fwubou9xHlLLEVmoiRCz+ztJBVSWA5dSitRYFvGAuvQAvFbU19brHc6F+MjnRn4/7gElujEZmKEKvzH1DiUhFaOoEholE1qIPhcIkyAcHigei3u4dxt6+5vztn97+0itvWfOG77sTmyZ2rnTvrRezc/dMYvdnz955561n9ffe88K43PcdUX/f+tjMR83IgSGg/giwkEbhUDAEIKr16skpak+UrTwZeNnq9x1FrQ6i1v+x0QnTyooqJIKKV8P6JLMEfRdui2gw75qJrzYnt107fvrZ/46pM76B0ZfdK5U8BOHYCVcZQRCeEO4+18C1f7v9mx/5/3549o7bX9rZvX/dVNIaHYqMcXMd6LxAYlgLswjtZ5nizyQqFoP3yVTM6GeSl0GuD/XA1ix3mNUcTtSuNoKoXWz8wBjdWjiHmMmQeEe/GSfZ+3DoG42+UbZrcGAmMg9PnX/ev2669HkfG3jNy7+mLl+ZHcyc+5eh4t77Lth5zx3f1dl593c1sv2b2qozGJVz8VBTw+Z9uCIkfHH/+AQvVjJwCjnDYfyefHJE7SnPgieaonZR3BqWN+O+0czUzOF8RRHla986zZjbCKVuoI/EHShUXuj27oGp0746tuGiDyUbL7kRoy/ZIZ5bQXjiLD9TCYJwBLw37NG5ibmP/935X/2nay7u3fmt5w/ct+MFU5EaT+MELs98vGwjSf0Pq9cPpVOZ+uWrE/gfnEYE7cUWk6w6LjvIUyui9olASUvpEISV9m1RWSmCAoLRjMrXvSW+yBirO9Bj5p8B+sZgPzA33YxvG7jonM+d/R9e8qXkRZdcpy69dG+1ykmN23fTMHZe/9w9995y5b5dDz6/FWXnNlR3xGSzPma2lWr05uYQRRGiKPGilnVjOSVOYcsqEjlLYomoPQ4q8e9oZ9UwywtbWhlrn+XQxvmye74KCcvTFbTOMBxQbFPNsnhxjHmXZJ1e4z7b2vDZjWe88IuD5178RQy86C4Rt4Lw+BFRKwiPA3ff/pHsnz/+8jv+4VOXd79572VRr7vZzM0NrTE6Nnl3wUNYsAQQO3tpFgkKRd9Zj4tNDigknDa+PFcIPSiRHCW7e7nD7LE4lun9Y3nNsXKi34tizOee66pEFAM8fDY6QxIUoiiUQ8uL3A8kkiQJjShYhirn/geKOPXidra0nX1p+nC6besNZ7/qqhuGXv2yG9WFZ99Xv9fJhHM3jpZ33vyiXQ9+8YXZjtte1NJz2xsqbvpWyLZEzM5tsOj3u4iTCAXjOn1pNparYie3UDYuPOd7JJ9MX28F4WBY3ou7m7VrOVCthG1d2YH2yBJlDENibWZ6a0MZvMg/F5U5iiILFRkoblWKXLW7GQb39PTonWee95JrsOb0j6upV929gnaMIDxtVD89QRCOxO6/+sj2b374Ez/Rve0br1gz05lsd7MBY3M0WZ+VhemLHD4TjPqVLTdZT9YYKNbcpICqNAO9hWEqnP8bRDFrY5Y+LnQptfjzVCW8jsZBr3kCwvFYX/dEeTLex4vaqoaoT9TxtW3DFDubBXhBERnfjMIoA8cDUTpERiPlFLC1KNkulTGmXJ403F6F/sOxeqRxwfZrTv/ul//hhl/48a+dLMlkoZXyB7ft+cZnX9/de/drG2rPGe18b0vbjtYufA/LAVWU+PbJjOVma2JHBVuHD1iqK1/t1z9UbGvxGKJ2+XF7opyI4/xkcrTv91ifXzOco7pf+hrP/CVzBiY8x1eyTB+3QVvzz7PtLwe2fK0rEVVJpFyb6/k/HdrzZqpRduzEvvbUts+Nn/asfzTnXvpPSq2MWQRBeLp47F+0IKxSfBLYtdduuvNPPvrqR/7t318T7dxz0fpGOpAUuUrzHIMmhmVpLsbFUtvSG+YfLTYu8CV+/IXPeM+hL9tVtZHlBc/7bXxMY93e82DPbBBnR76orna4n1k9wu9vn3nOBJ2wV3wb4UpYWB2K5TsfaOvbl1XllzRUwTq/odMa12OcaV9bN6vd/N5GfFfzwu3XXPYjr/0wrr76dqV8/aunHG+L+z66fvftN7569uE7vr+R7TpnEMWQth0D5XuthfAWxnQu+XSW7YsVrYuqvd5Pxt+nCObrFpOZhGMhxG4v2iHPBf6pKkGMQQZ+wOWfDEcnSOFwf/H52mL5JI9JiMHNrUIX7X4ZT+0xE1s/Obrxkg82nvGMm5S6Yq5eXRCERUTUCsIy3Oe/PXbnh37/+x+45oY3Te6ZPyvdPz0wEsW6aZTq97qIncKgjrwnkB6VUgUxWzcTqCUCRalylFOhQULoxqW9l4YXMMpgRicsFa4iao8NygLu3fqERr8Z9yr/2JrXTwd7r9yi7KMI9K14eQx1EBIstRa8vBY9o+xsu5E91IzvHXnBsz556Y9f/X687GUPqdDy6inBuS+N77/1urfuueeLL4/mHjx/0HQHm2VmYtY5ZrKhDp5BxnDymwSvfxBUxIusqiOYp7rD7x7uiKA9Hhg/6/e2F7R1R7Pw6+bxYXhCELUhgawWsFyR64b1g4e3rnPLR8GDXvrQhZKtonXqpm0r70br9jQmz7z+tLMu+X+x+eovPl0DLUE4WalPdYKw6nHODeA3/+SyWz/8kR8vv3HPFcMoJ8p8DqkyiJsxFDO6MosUMRIdIS9DMhLFLP8YVkD4f502wuVBzFZ+G25CsaZqEBuss6qPEGIgntrHphayIahjkSApONgIXcfqRDwvJ6xGzKR0/9jLDr+81CUshS2PHitWVN61qNGCaw3invl5TA8PfvHs7//u39n4g+/+lLpEhSzAJwnnXJLd8rtnPvzQ5/6Hnnv4ZY3udDIUhxjOfm/O207SaKJwiV9fsSYvPze7xIVI4/ob+/CXWtTW9VMpgoOoooSq9+QSatFbc4j4rW122etWE5W3n7DWbxC1pd9X3L9cYnyYAW2JXfUoZuvX8FzAwUbhj0O1NrTl8WT74RAjXpQ9qNjBpgaZjjFTxMjQtvHo5lvaY1t/b/zCV34K7RftXukl6QThRLGKz0iCEPCxih++Ye0dH/rw93S+dNPPjuzZd8aI7akUJeJWgk7RQ6dgwodBjAYM4xJ9DGeQtLwkBWHLe+Fizx8Wl3JSkbcUtFzihRZr11Ze3ZieXBG1x0SQB4uSrJZZIZgjlEqz/POPtd/PxrLNVjg2fI1v2uC9uqXvUMbpeh5TNidg62J6P/t8j2gIM60m7tblg27Lpg+89K2v+Wu85S27lFI9v/kThHM3xbjv1vUP3XvD5Wr22z+mDzx4eQNd3eBnp0e/8vBZbUIcsDNVPHHh0+YY5l1/48BSURu+m8/Mr0SqZUzxwh5cgojao3OQqC28SOV+pcDlXe9x5WyA39Wh5Fc4ENVrdAmnmCRGy6Xopbc2hmLx4GodYxz6rhfi8GOD0qTo2whZkaBvh3broU2fPuOCF/4xtl10i1IvmPUvEoRVzLIzmSCsLtzNOyZ3/eVfXn77xz7xPcmunS9ba9WaEZTQZR+wfahYhYSigslfMRQSZIWPUkRqUriSXrGQ8xwmvAO1rPD+lirWLiSlBAHsl1UdiI6UDCae2qMTJn8DvFfvayZC1Uv8sfGer0B9nPg8ez3xlVwWfGPVcWJ5MC61FknUQL8ofY3brBG73Shm9Ujr+tFnPeNjW3/2R6/Di1/MkITFwOhjIHSl++T4zOf/73NmHvzyG9Ni75VpPjPRTCJN72yelb5LGrOK4qQBpxXyvI+UU9T8/LUQYsysrmyOG6YH0d8L0+F1HVUKLD/QqmYNRNQeG977yj3svd6LoUc1msmiS8Qvb+tfO2cGNPrBs2tZn6MOCwnHKwxeFEpnkFuNsggd83yJNuN98zhQGvTU0K2DE+d9cO0FV34Km75PSoAJqxoRtcKqxHtn/+4ft93xJx96/b6vfO0tg3PFuqlGS2UHdiOBw8jAIPpZB3nWR6zor6u0J7tX0S9WFbL3OeS1Z2aJNg0XOSbbMzU/iCXiJ7yrqW16ah9LuD7WMiEQWrxW+7t6jjBa1ssIGwYcPH5cHhJ6QkJYiGQMaTu1qCW8ZWtTPxABqwgUvgyWF5JscxzzPtzDKt+zf+OGj1/6Q6/98PAPvOYrauvWA+HdnxjeFu/6k3N2fOvfXqdmvvmaQezbFhUzSVxm4JhJmRgmanrvLEvB9Vltg9/EOCS0Rn6xuk6qi70HkWbHxDj/XSmSqv0URG01Fe73G5/nBpZdCqrlC0j4wWGhF5b7mvuw/s1XT/jjoXxC3iLeBv3i4NE11byCP4YeHqswUObyXlYiTdvQesDbgitDuTrtbbhAGRv0VQNz2VDXpZtvXL/9hf87vfj7/02pKUkkE1Yly85kgnDqw0SwXX/711fc+jcffcPk7COXr430hHNas7xW5AwcPWLWoulbJISLO+scFGCrWw0T0b/nUBQFouoX5BNBlpQHohjltS1M7YbrXO2Z9aK2Wo/3lnp4ayg1RNQ+Nn7/VmKr3oM8DtzHjJcNg4zFfUs/2oKoVcFjSU8a1w9bCUdj8VGATQpYMJ/vx3JZvYwBCRbNwVHMKjP3AMrb1l1x6V+f8863/CMuu4ydoA7ewBEIrW3/7+Ts1665bNd9d/5Amu9/SdvNjrV0F6nOYbMedByjnxWsRAYVJ3RB+wRFliczkfI1j0mwrTDdze8dhJOfHgB9uf79qv1Dwv/Be1st8c8sIKL2ccGQkNrCFvY5cdGCV3wRC6cZphDibv25xMYLNklbtuxAVq3LLcVV2AK3xXJt4XzCI81GDg7WZUjSJgrVxHy/UXTjkVtba8790Jozn/cZbHnjnZJIJqw2lp3JBOHUxTkX4W8/cd5NH/jg907/+x2vnOr2tm9Is0T359DlBUJHvjg9L9APimAAACAASURBVCJJwQlsShz6uXjhZ2tRjcyyuS2nDRnvZnxdWsKi/p5KDCw4a6qLXe0Zq4Xt4mIRtcfKUlFbUwsJDggOFrUh6MNLuCpEgceKopY+3XAUw7o85kHsBTRrvjp2KqMM0YjjNAhHq+CsQSeNyvvT8tv5lo3XXPCDr/zU1Nt/9p+VUv2FDRwBt+sTl+/88oe+t9h//4tcNnvmoEEjVTlcfx7aFUhjjZyqlVX6FSs0UAhX9Xc1n+LnCpYUYmX5+cKsQYArsYScDzyon1zAryui9rhgrVoSBC3xLvIlv/d6v1fecsU4WgpbungjaJv6I8F4bsvndfD4+jhpJiry/JBn/j7PN7QDzhJZZ6AiBVPbA5tqxE30bFTu6Ua73MiWLw1ve86fTzzzrdeK11ZYTSy59ArCqYtzrtl/z/uv/NKff/AtyY5Hnzeh49Go19fNsuoKxEv8UvFpg8fv4DjZpQLqYDG1yKHigbrjYI/N4lpH2orw+Fg6eCBH2s9k6b6uj0mIyQ1rLRd+fFSLW252YXnVBY5Jfy7S6LsSqpViWhfzexqNh7d/51V/s/HH3vc/1PNUN7zgYJxzaeeW37jqkTtueNcI9jyjUcwP8H0oUFhSLAjUgy2DVQq8GD/Md176zRYDXcjiiiEI42Dq7yY8CVTnkYP3etjfITGswoeNVHerAVotakk4gm7hsV0yePbrs1sZm454zcyVNAqVoqcH+jPxmq8NrL3ogyMXvfbvMX7ZI09lKTpBeLo45PQoCKca7rqbJu78oz/6wfs+8Zmr1+XFWVNaJf3OATWctmFzltw59IJfIzGtpzZB1BLeq+0gnBZDKhUJ6ywIWy8s2O6U2qL0tYaLLAPiCL0ocveU5fTQpc/84+de/cPvU2/+3kf9iyvc7KenHr7xE6/Ndt36sxNxZ6vOp03kQlcvChcfZ10Lmuo2iNhFURue42etPa3CaoXJaQy1oaj1AyIf40thG6OfDBe9eM2uTrz22s3bXvw+XPDmrx5vQqMgnOyIqBVOadwHPvys2/78b35t9pZvXLHWoJ24XJs8Q8zkH+/ZMD4p6EiIqD21qY88peEh3swlpZlqvKhl3SwOhKggfEiCRWwiqESjU+bYpwq3b2h4fnqofeuVb/vxv2j+wk/8KV/r7v/oOQ/c+k//Rc0+eNVIOTdqylmtTB+ahfb5HtVUdh024U/OS9yyQdQe+hmF1QtNhaUGOTCnp3bpQKgwMbqlc1k8mhXNjfeMbb30t9rPfNdfi8dWOJURUSuckrB4/a5f+I0XPvDRT/1O86GdF445o9qRRl70AFsgKksvDxgduxgPdygiak9tgr8zlFmq7YDTul4cVN7Tpfe5rk/gqxLNKEQTXy+WZd5yqFijbETYD2C3LtzOpn30kte/8A82fccZN+/rPnj13plvXdWM+wOjht61Hly02PQhTB8vn3I+2DhF1AoHUbc/Zsy1r2oRntbeOOm+deghQl833JxZMxNPXPgHm5776v+JwRfte7wJjYKwkniMy7kgrDx8RvnnPrduxx9/5BUPffL6tzd37z1zqtHUmm1P+7No6gZSdgMrMiQqQd/lImpXNcHz6SWAL8kUqhwEj1fIQNcu3Nb4Khf01LoIbMfBEACHLrQpUTqLns2RGQU7EmF/8wCaZzX7I9tHy5Ftw81kNFZW9aCKHqII6LOuRr1x76kN4pkfoPa6HUxYuY79Xp4oJ6wyajswTB4L9YnptWWCmS9XZzPkrkShI8y4Jg5EE9nAmgs/vOncy/8AG19+uySRCacaImqFUwYvaD957ZbPv/f33mluvvP7N2TlYBsWs509SJM20jRFNtdjk1sYZhHb0E70sYSBeGpPdUKiju8ppoMd1Ak7hILWe2v5oBIQdek2doAyuhHsSPfBiluFzdG3fdgkQ97uYfOFk8CERTacod8qkE600RgbAKICPTb4SBJf1WCR+r0PDoZYFLgiaoVFfKkvX6Iu1LUNMwjKlyb0lROKDFGk0bMFyihF3hjD/n6Sp0Obv75222V/YM75kb9ValI6kQmnDCJqhVMCdmTq/cXHN//7e//wp9Rdd735tMiMml4HOXpQkYZppeh1M7jcoq3biLynrYpbFFG7amGTBsrIw4va0IGrDkEI9TAoK8Npsw5bYIev+azrS73FAwpzdg+ikQxnXLQRaM4DA2zB20WXXtk2kIy20BgfhBppIyuLStSGrlRLRe1SuEoQtmGKmfd9jK2cwQXfqIFdOirbcZSziQ9JMCrC3Pw84qZBFMeY63dRsitZOlDsnW/dsuWZr/8dc/Gb/0WptfOyI4VTATklCisedmQ68Nt/deFX/vKvfqR517dfsxl2/ZAq0cmnYRoJpvsdmDRGHKVQpQaTzVm1vhWlsMWSi8FhEE/tqU0tVMuq+D11o5/C9YlbzCsP3jBTe2kX/g8iVBmNbpGj2RxAbnLsL3Zh7PQm1pw9CBsdgG6VQNmBdQVUApQJ0E+AeLSNZN0k9QcKXbVErUIfFrbNKIc6ecz/TzF7sKglImxXL5a1iSubCQmN/GOcbQyoCHmpkDRSlGWOXq+DOFKIDQ2LMeDD/Z3Z+i9vvvAlf27Ou+LTaD3/UYmzFVY61WlREFYm7j7XePD9v/SKb37smjdN7u1ePj6fDzVd3/vf+ugBJiRSeNHgq3hyei5CZJVvcek9YiJqVyXe+1mL2qptaR1XW5d5sxZIVeqbcljLtcqq0YZF4QoUyNBstZGpAnOYQ2tDgjXbh6HGM1h1ALA9oMyhuWHW/oroES5RNmMUAxFaG6fgUufFMWUGY3LpMaaUXRC2VYyv/7y89Qur5xVb+q7Kw7fqCTYSwlSMVd426o54Voc6yv6PdueMtxuW/oqsRWRdKPsVj+U789aDzQ3nf2r9s1/6exh/7TdF2AorGTkdCisWhhw88OafefmuL3zxv+p791wwBZ0MFkywyUIbSRS+jmPwdfECwOnikLVOzxsvBlz+WIin9tRlUdTSWkJrjcXQAz7P4IQY1nGZBXvMscscW5lS3LI7VOF6yNw81KDB2BkjGDh9EGj30Df7oU0Ogxy6YNkElgLjNvluJWyiULQMiqEI6egA4qEBFhqFtdZ7b51RyB07TwUbrc2ULZYJO6HRNl1w0wmrkFrU0oqNjfwgnY1kaJel5rnPIqee9V3lYj+YN1YHYesKL3g7DKYZGMP+rD2rh7f+5cYrr/4NNXDFQbWVBWElIWdEYUXibnLxXb/1kz+x55Of/JHW/IHzUhXHA0mKOLfQtkDiS5Kz7z0FSA1FysH4C8PCI2E1EURtwIvapR57P+iJfB3jeljE9b2XFbkXoDAFOvl+NMcMBk5LMLipDYwz57yHLO/AaOvFw8Koiu1unUZRMrGMoQgOs4YxtikGRoahBxpAbLxyLVWJXJeVcFlMTqOopZj13tpqmbA6oQmU3hAUTJmEgTqnFhSbeeRVS156a1lyLgVc4j22wWS4zCJTGaKkgX6mMFcMTDenLvjg5PNe95tq8lWPrM69Kqx05JQorDgoaL/5Gz/5jof+77VvP6M3NzKA0uSRYpisL4ZvrGOaBAxbRi4oiiBKKFOIX3XJfWF1EnynJFiEF4le0AZPLZ9lHjkdohkYUpADMT2oOfpqDvEgsGbbCOKNKZDMoa87XnnGfA1fXdCjWxmf1rDOoKxqJLNDas9QWABJK8LA5CgwMsi5ZD/LUEYOVitfrqnGx9NSxlQ1bUXUrl7owad9+jAUGwdR6+2jgOLAq4qztSzu5VKUjLOtazJzwMRBHGcdyhxNE6NwKaZ77Y6Z2P75qWd/19vU5jfds3r3rrBSEVErrCjcNTcNf+W/v+/H+jfd/Isbs2I8LnoqVgUKThE7BWPolXBBOOhQKJ9GHqbm+FUrMVD9BbUhrF7q4x/Ku/n46krUMjSBQyPKghy5zzC3SQ4b9XxJrrJZYPN5E9DDDmhZZKYDa/rewiIHxNx0EfnAWHp46d1lj1LmfkU2Ct5XFsdnBQR6bEcaSMeGgIEUaGhvsJkv17TorWWJMU+VQCasZlj1oD6P0TZCaBXNzsfX+nJ0fjQVKnUoXcXYMn6c4Ql8nUZE2+r3oOnRjVPsztLcTZ7z0U3nf+d/xpa3PCQxtsJKQkStsGJwN92x7uZf/M2fm/7cZ6/eZqMx05/3DW6ZHOEjIpX2orZkXKJzMDxbs42pj6ENHjjCSd1wQueJvxY1wuqjth6Wdlsc5pDaU6uVRuYyOG2hkgIdN4NM5xiaMBjZ1ELztBSIM5SOncEymKiAYqwrNaw3rcTbImMfLUUxdazXzpTLBq4soGONgl5bipCBGK01Y8BIC4iBzBbeU+vFi9fAtYQRhDCwCXHgPni2GqRT3Aavra9S55eHyhpctx4k8bEuDSKtoMoC1uU+YbHjIsxF491uuvkfT7/kFb8bb3nrrUqxZpggnPzIuVFYEbjrHpn40q++/aeym27+T2cl8UR/fhdSY6AKTq0xaYY+MPphS3/hjylwmRnOGDN/4g++uPpkXp/0RdSuZjgVG6oHaHo+FQVp2B9B1FIKcIpW+Xa2he6gb2YRDQFTm4eQnjYMG+2Dbjm6v4Aiq5RCEBFBVYSELuUMnHe3Wl/RgO/lNTSNMo78VAJFbT8GouEUyfgA9GAKGxsUXq9YnxTGTZKF/MalccDCKqOKra5sINRNjv2tr3ZA0UubZrIiGGdb14Hj8tS/hqbqK3okqU+X7PR7iOImrEmxpx9laG34zJZnv/ZXcOZbKGzF2ISTHhG1wkmP+9JD459958+/qbjp6z+zxbpNqrMbkWFoAcUEPWH0egXBwFO08ZWTKGiLkK0OIFdMvgltJIPIqDwZh6SOCauHRVHL4RAnaevpW/5fSwWVMPVrFh07i3QSWHfmCJJ1baDRA+Ju8HDlfC3FqQFY+5hqNWboQg7luzyFJDFG6DKO0SfzMC5W0UVb+kWuoZBpB1bBN0MGzYkhJCODKCK3IGzrhDH/WuqZWuU+BsvXkJP+qUMYjIWQGT9g9+EyvnxGELEqg6YNMsZWhXAEZWmLaRWiUEBFBvMF2zVHaDabKIoCRZYjag5ibxFNJ5PbPzR6wSv/V7rxTfcqpYL3QBBOUuT8JpzUuF27Br7wvT/6feUd33zXhtxuwf5p1fYigSWW4srzqquL/OJFn9d6em3rx1yPMbdLCd6uIGGElcqRnEdHOq4HP1+gRMr2oUXuPVYN0IPFBEPrk8MKxmtHXXTVNNLxEuvPHoVZFwNmFgV6MCxk722JqpMKclFCHiRCD/k8DJcJYsRTvY7e2NxYFEahHzmMbF4L5WNsDTL/aUs/RcztMm7cD+yWlPxiqS8ShHr4SPX9Gv42lj0lrGh4lBePaKhcy78wyK9r19aEONuwfkgoY4WEyA/6azuljZSMwdUNTOfJo9Hotr/d8Kzv+gBO+7G7xGMrnMzIuU04aXGPuvZd//Hq733ouht/aqw3f8GotUblBYaTFtDnyZsTZoxVDN5XsigiFp97bJaLDWFlcXyiVhuDvOSFnRUz2F6UEiA06SjY1tZk6EUzSCcsJs9oI1mrgGYPLuqGOFtqU8c6oIe3NVXVpj0SPp63fml9q4A8dujTodaK0JwaQTQ65DPW+y4Pzl6tfaMGEbXCsROsnPgKCX7Woha19TxFBBsN4EA+tM+MbP3rdc98xftw+vc/oLzhCcLJh4ha4aTEORfd+cM/+bpd/3z9Oyf63QsGWFWp34XKS7R1CpWHGrTMT+dtzeMRtQevIz+Blc0TFbU11XKlkbscDRMh1gq9vB+KwekEXdtBP+n6ZgprzmqjvWUAMDOAmwUShq1YuCpmeylL7SsE0D5xCl0iM0BXs45tA+2xEeihhq9JlzvG1zLxh6E1wfbrd1kajbDUW7uUpesu9+IKq4kQckML9mELFLS+8ge9u5VdGY1+GaHjhtAxY7vS0fP/94YrXvnHavCqXatpTwkrBzmlCSclt7/tF66+9yOf+LlNnXz7BGxc2h5UaX1pLu2M96pR0NpqSrbm8Yjagzma+BFObg4VlYGjHddQr5N/tJg40lBl5lvfGh3BGY0D5QHoMYfB9QnGzkiAYSZ3zYTsGh0Bti6LtDTMoGL546Nx0PoMnGFiGkPGDbquhBmMMbJ2HGDnMccCYxYqVihZaYFhDtUrl4fY8jdwOOFar3e4ZcLqgTG5fqbLx+JWXtpK1Ppb5dAvFJCOomsG3e7e6MODa7f/5abLX/F+EbbCyYic0oSTjod+5Tcvu/UP//L/bOwWW0b7uYnzvu/i1DANKBuhcCVSlfoySr7eYlX5gBwiLpawXOSGUk6SKLayOVZRy+MfSsCxQoZ1fS9zG1GMQufo0Evb7GJi6xCGTmsBozkcBa1i2aO6JlJlT3VS+GPY3lE5RNQ6X0/UJDFm+rkv+dUaS9CeHANajOlVKE2dQFbHhwdBQurHtPnHmowQUSsQxzCDJaLWMPmRDoOij0arhU6m0HENFI0JN1M0Z4fXnf0va176lh9V6pKO7EHhZOIxTneC8NTT+f0/2/Qv737PH2zv4jtHu5lJ2CGsKKCUQWwiFAUnXB2MitF1XR8FuTQJYrmo5eOlYtZf5JdMyIqoXekcu6j1VCW3nLNIOP0alTiQ74FrFZjY2sbg5jYwxm4KXRS0N5bfKnKgX4aWto/zbR4XS0y39rDSC8uuYjkccgPEIw20J0eAwZb3GOc6iN9FUUsWHx8ykFt2xhdRK5AjiVq2HNeJRq9foFQN2NYYpnsaKh2ZGzv94p9uP+/9/0cSx4STCRG1wkmBY3Dr3/3d1s/80m/96tod068fnu81mrDIKm9q6hMZSt/6Npx2HZx2VR3ag0XtciFbc5C4rYStiNrVDcNXaAMcJCFW6JUH0DX7MXq6wfjZY8BAD9b0fCY4q28ZJn4VGZQtfcJW4MQo26WC0w/OGPNqS+jY+BjaeetQpPTYtpGMDQMDCQovautXLf4Oao9tXfqrpn4PEbMCCeEHTIwMDcQpbH3YAQovbGPlkBd9P6Oh4hSd0iDXDZQ6dfuKgftOu/AVv5hc9Nx/UeoqVqIThKcdEbXCSYH7/Oc3fOI/vuM96+7Z+bqNvaKZFBkSFflEGWciGIYz2hypSmBdiQ5m0TJtZOXBjW6Wi9rDiduDOTGCRFiZsOlc5hgbGyHXmW+uMLQBmDorBSYZbNtFlmdQJoY2KVxWIIpKICnZ7it4V6uyXIezNS9OHwu+pKreQcFZN1gIzZ253AKlg+XvIAZ6LIMbA82JYSSTI3CpRuGbPdRCtRKzviZp2O6C13aZoK3eWljF+Dq33mpMKI1YEURt6ePMo4hlOBz6PNeaFDZK4FSKvh6w+9zovZsvePl74/Pf+edKsfiyIDy9yDlNeNphLdqbXv/WH8fNd7xjfT9b386KKqqQBcUNmKfAGrO8OMc+gYHLajEbLZShORyHExrC6qEWlV40Lnjnq+f8LEAJpRXKWGEOM9DDOTafPwqzmSUIdsOyyoB/TQNwUdie6gGaxeyrcNq61uyxQNHqP472opOC04tavql/Y2aLFX4dvg1Fbc4eD+0IeqCJ5vpJuIQJY8xiD95jf5/TxpptfvkZF38DwSu3KGyDgBZWIxS0dXto1qnlo3qQT/ujx1b7fIUQmODX1D44wc9c5DpB3zXyrL3xuk0Xv+GdOP1NX5VSX8LTjZzPhKcVt3fv0Nd/7p3fOfePN/zcaR17cZJ3osQXxad0ZZH5yAvawl/lfdVE0CHAqTEvWOm5rabODoeI2tUNpR5FrGb4wBKBG7DhfmIxr+ahR0qs2T6MdD3raO33tWgZ3ULTU64StZoe1QzWhKL1dJIeX6vlyrNaidqaBVHrlYRl3ANg2BXPoU/xGwO2adBaOw4z1IKKI2QuhzVUI5xSDhUZ2KRkaQhCqEW6mFwmonb1EkRtcA7QS0vpWgtbb3/sbFfVq62pB150OJQKSNpN3L872zO45SUfWPf8q96vBr9398LKgvA0IKJWeNpgLdpd7/qNF3/1j//0v26YthePl2U8oFjdwKLD6S+TQttowcvmKyoaxkCy/W3uPVBOJV5sHA4RtELwxjIkJVyla1vyUOQah0x3UbTnMX5GC4NnjwCNefTzfdDGedHHVsq+tSiDahVrxJYodRADLDF3XKK2rpzABg4HidqqQxkFKb1ljOX1Zs6WvZzHCGEIZriB9tQo1GDLxwdnbMEbKx9v7tdmg4alIQhLRC3xnz/cFVYZSz21Xqz6gVVVTmNB2IZ24jULoSv+ludjh7k+7Kwe/9bQ6Zf9ycRz3/hB1X7hjrCWIDz1yPlMeNpwH/mnDde8/Rd+ZdPe3pvGdZzauRkMRC30ih5yTnjpCMbWgpVSpAhF53VIYuAZVoF+3YNFhYhZoYZT8LQH65bFXvNybizKKEeezGF0cwNDZ7ZCYlg055cxCTFiamJwTS2YGW3woOn7JRf9J8wSUXsQ9WOKWZ8MWQYRrpUvaUdRURqgHwEDU6MwI4MA42tjoIzKMLOhKWZZ2cFRe4TNiqgVKoKoJbWorcXqUmFLO+Tjyh4re/XmpApkeRdDY2PYN5+XB9yae9ece9V72s/+Tx9Raq0kjglPCyJqhacFd9NNrS/8zH95Q+PmO35tTd9tomeJp02W72JsYCMaRLfIQ1ygo0OAp1FmenNqlQKFjxUMM2iWiFoRtKuN+thX4nAZvp2s9VVffV43s7gJ7aSMM3SiGbTWKkxtGwYmHUq717ejNWnku4Upq3yIQVCuS+Nfg1hmA5AjvffjYaFxwuFELRcYA8fPT3HK38gSAc3HXecQDyWIRwagRtpAO0ZhcvSZ5MMsOA4Gl4habtR/k+rM70V5uCusQhbtKYSsLIha/xQfRN4WF2Yj6kGYF8JVm+bwaswV7aLb3PKl9Re/+lej7W+7USkVYnQE4SlEzmfCU45zLr3z9W/50Uc/8ZmfPh/xNts7oNmcNEoS2KyHlkrDRdwniTkfZuBjaf3JU/m6nIzn4mPtT7iLX0FE7WrjsUUtCXG1DkYbH2dalqV/roi6yMdnsO7sUaRTERDPAWkGp0pkTPQ2VSUC/h3ijo29rYUw3SO/99GgMCALomHhbbTXtaEVbqhZa4J/Gbp0XnBznOebL8SAG4iRTAxBTwzCJtaLWh+GsCz8oJaw9UO5AKxyfOgWB2u0w9CdbhEaFweBS0Stt/VqHYpgEyHvddH02reNfeVghokL/mzti1/1qxJfKzwdyDlNeMrZ/9t/dNFX3/2+vzor1+fq3oxOoRlYEASsUkhjg7zf8xdxEiIIg0+MNUXpH8urGTImMtQXbBG0q5FlHs5lApP2ZJ0NVQB433IeoPTysGh2MHAuMHyaAZp86TyQ8gJfomDBAYbQ+tctCTHwt9V0LO97ozz4PZ8IRxO1tZ2HpC8mppVe1KqSsbb05CqfPNZLADWSorl2BBiKfaOGkp40vr4StbVXLkRThN+WXABWMd7mWPWAhsDZr2D7i78hilmW81r8jYX6x8GQaEd9n8Oo0dIKNqfNDWC/Gtrt1j3nPete/gN/qNTzutVLBeEpQc5pwlOK+8h1az/1rnd9esP9Oy9YV9KDFrLTM2SIkHhhy/jHVpwiy+cRexFbp/b4CeQq8zYkvNTJDiJoVzv1hbceCNG9ygFP8EJFzO5mHKor2fwTUUtDj2aYeM4AXLwfqhEBuoTtzUPHANIYLsu9fq1ZFLa1qF2iFI+Ro4lazkhYEwQtBTlFbeTL21VqmyiHDn3PLaC5bgRmbAA2AXqsVRuFms30VC/9qHVpL7kArGKYnFhXjvF2yJEcrWJxkBbssqonV9U+9kbKTne+WoLxMx+tJEbW43xbiiwawf5k3a6Rs17y9qFnv+ND0nFMeCqRc5rwlOHuu6/xlTf+3C8nN3/tl4d6HTXgL6sMLAjQG8Vr9YJnyT8blob/KWrDlKw/IdN6fR1FYbXi4/r8hZaWwb/YD3ocn1Q5tOtBuRIxQ1mcRZFYzNhplMMWZ1wwiXRtDsSdpYo1XOC9e9YG4bqUWnw+RdDGw+Bt8Q0XPqr/Xfi4BE+3LFE2gMFNE1CTQ76pRBlVwtuV/ibSxovjnN5qQ0+cXAJWNUvteWHGYanNH8k+wiCJYTD8rRSGRqp9Ym9uY/RUAzNm6u6t33H1q9RpP3jHwssE4UnmSBYrCCcUlu+6/ad/8TtnPviJ397e6W/v9vaqgaiJrOAJNJxYKWqrdf3tY/FE1hVOXZaLWoc4lIrXDDEoEbHJUdlHYlL0yy46cQ9qzKGxMcbklgG4dAYw2YI9LVArxyPZVy0AnmKRuxQveKvfDqeFc4pVtvIdTZGuZZmvFBnjahnvWBZe3HtRy1AfJpKx9u2iU04QnhB+kGRDm+aMMwKUE5YzAwz5MejpEVeOXvTe9S/8kd9Uo1dML7xQEJ5ERNQKTwmdv/iH51/za7/57k07Zi5fX+ZRigxlyeRYemoXC+PXPB6x6j27j2M94VSmVmW1qGVYSojN9j3sGX7gckRGY94eQNbsYWLLMAbPaAMjrCowHWofLxe13C6fO5J9nWSiloKVHt2MdWwNkEw1MbB+AjY1cDHLgBUhfKHy6lrG5vpyZ+GxIDxRKGqNC7NrBauM+FjtMHPmrEJuhtyBfM2Do2e/+NdHnvcrf6OU6lcvFYQnjeVnckE44bAN7pdf87b34uZv/NAmo1uY3Y92ZJAVXdY8OGZRKwjB1VgJWsb5ebHJRp6MO2U5OMbS8vke+vEs0imHyW0jUJMpEM3BseXtChW1xNd18ElkbJGrUagS8wWgBxWGN60BBhO4hkGunO84xrK3PpSh6hSlqhbT8nsTnii0I5a7Y3k7ts0Nvz82CmH4GG2xiUyNFrPR2i+c8YI3vENteuOXF14sCE8SImqFJ537f/5Xr3jgA3//u2dl7kJT9DRlbMfNoRU3UOSsdVi5j5YhF1rhaARJxtYEQbz6ONowTIJ25C0ChwAAIABJREFUlLapn36fL/dCj/Qxtb2JeH0DSJgERkHLRgblIYOqleCpDZ+S3dI4YxFELUVrpyh9E4ZktInGmmFgMEWRGvTZsITJPtw3NsRE0ru7FPnNCY8X2o9PJPP5DeH353Tfd9wzYJhLhNIl7oAbm1EbLv6j9S+5+jeUeu7MwgYE4Ulg+ZlcEE4o7h/+YeNnfvG9v7zpgf1vXF+Ugz07hxgRuiqHYmMFFrc/ghnyAishBsKRoKCl5dDx6EUtW9f65DCLiILW8cIaw8YlZrATQ5tiTD5jEBjIAdcDEtZI4HRpsLODOUqw6UkQfkAoJhZELT8WKyY41qkNbXTb60dgJgdhB5i8Ewrma+VgyiBq2ZZiKSJqhceNYy2auo4tB0i5/2PHxzokvWT5ucak3RmvvX3NWVf9UuvCd/2zOrTosyCcMJafyQXhhOH27h36xht++kc6n73p7RtKt7mZ50rZDH0UUINtzMzOo6XjJd2OjoxcbIXlhKADxtEChWJDDvotKW+BuOo0x/rHZdpHPjiHybNaaGyOgWgmJJixBCfrHB8iaMnKELWM+/UZ6Lry2LJMng4l8LosYTag0NowDky00TeA1cFTG7F272FELZHfmvC4oJeWQdoUtzQjR0HLPIkiOCRYIYFJZKaF/Wq0O6c3fXT7d73j19TIlfcsbEMQTjCHO5sLwglh93v+nxd943f/+L0bp+efOWCctv05JBQaLCofJT4LOyqWtvB8bORiKywlyNZQx7hQxZIuc0DENlsoYKPCN1lI1luMnTMMjPRRFPsRRaG0FYXgiha1WsMWBXTEThEaLs/D9zFhOviAdWifNoxkzTC6ifMinzokZtIY95bmMODgH6D8zoTHA0vnFVX4S2Stb4QTXLQhrp2zGUpZZFCYL5sub255SI8//7fWvux1f6HUJZ2FDQnCCURErfCk4K67aeLan3/XO9be8/DPjnf7qUbfTwszQYVj+EKHnuKGWdhHMENeXOUCKxwJilqDGIWvulpCxxFsqX0OVEyrMgW6eh/MaA9rn38akM4g17MwDTZOOri+8aHCdoV4aiuYgb4wqetvKSqArgGyNpCuHUE6NYyM3lqUSGrxKqJWOEaYHGZ9oqGtRK3z4WTEcbbAx9iymY5CaRMUyRh2lZNfO+uy73sHtv3YZyQMQXgyWH4mF4TjhjVpd//Uf3vpbX/1d797Wp6fM5iz00wWyitxub8JopbdwMhyUVGLWRG1wpHg5ZQR2Y4yTRX+Aqtcw1c8IGU0h6K5B5PbWki3NIC0Axsx7i9UR6grAJDl9rfiRS2/mrZ+VqQTA2q8gdbUCPRg6j3aISaYMbaSLCYcG7QjlvIKotYhtkBUhhjbUlv/52cG2JTBAf0ywYwezcvx837vtCve9ltq8Pm7FjYmCCeI5WdyQThu3N987PQb3/nbvz60Y88bR42NYpvDWGalM5uA11NKkTB5zGaLvkPYYRBBKxwNH7dnIuRlz9c8iNmnTisUto8ynUEyOYepiyeB5ABs0oNKU+R57tvmhgFVGDydMqLWC3obNDnrLWlgHkC/ATSn2mhOjQKNGAXjH/mzoydtyc9PfnPC4yWIWs4SOO+pjbyoTf2gks97YWtCnHcr1uj2CvR1ih3Z8FfPvOxH39644Cf+TSlVLGxQEE4Ah1cTgnCMOOdat7zyzW/L/vUL79po1YR1XRgUMGXpR+uKpYR8JCQlLmOyKGsDtbCQC6vweClhkcQJirzv7Sg2bd9oIFMdX8JrbItF85xhuGwHkDo4E/uMbEO95xPFKGpXbvWDpYQQBKoMPqp/Vewe5tDhsmGFwU1TwEiL/cdQ+ByfOmYhIL894fFCy6F4tZp5EQWiUntRy4EV8zQpem2kkfW7GE5jFEWBrlPoJGt684Pn/tmZz//h/64mX/bIwgYF4QQgolY4objf/4uXXfNf3/v7p83kZ7Z783CG0jVkWlNIcHKKflre+pPi0Sd6BeGwUMQxljbWMSyFKpNWtMG8nYFt9TC8KcLItoZPDrOYhU61X08rgzK3MPQieSs8dURtCMqo42stUNJ9ppGXFlkMtNYNQE0NwzUVMv+jrPalNDsRniA0MXbvY+ysd1j4ZiccKUXe++/P787XH0FcBXwXLoIZmsIjM/FDE2e/9FdHnvfuD0mnMeFEIqJWOGE455KbX/Sav8KXb3vdlHU66vfCbKiPuQoBB7zocto3GB7vMSJSEJ44XtQyw9ppRPzzw6cc82o/4jXsHNaG2ZzClvug0gLKONiihI5SuLzwdZJr61vp4Qf1/mAIRo2vKlIUdF8DtkTO6J8Rg3TtEOxoC3lyqKdWEB4/QdAGvUpBS/sLoyTWT+ajssjQajXR7c4DKoJO2uhziiBO3Vyy6YaNl7/jJ9S6F98eticIx4+IWuGEMfPeD5z97//9/Z/e0i03N4seYsXkACaIacQ+KYyeWeVH95Qfy0twS/iB8ETwbTkpVEtGFjT85TTHDMp0FoNbIrS3DQJDFHNziFONsuzD+K5j1dwo67qGufoVLGrrISG7OoWM9BrvPSvKcJb3X9Ohx9nhyRh63SjQjkXUCsfBkvO4M5X9Be+tdirEu7s+kiRBN2ciZwITjWB+vouRAYM9xfA8znr9H6157jvfoVj7SxBOACJqhRPGV174ut/RN339Z9bl/djYAs6yQmHIhg0Z6cpnw4bEFJ4Jg1+JJ8XlnjKZDhWORigZZGGtQuwG4VSBzO2BGZvHxFkJoi0DcG4eqhH5afasM4ukadjmCL7zgj0FRO2Szma1p5a3JEwJOyBjC90QmcCkMTus0Ngwhmi0jTyyob3wYeAvlJta7sytp5Z5673BwqpE+wYLtB3GcVeiVjPKnTYTRG2qS/SyHhAlUFETRdn0pR0TdDCLIewZeta926548xVq7KUPrsqdKJxwRNQKJwT3Wx/Y/MX/+fufGJ2ZO38o6/ts17Lfr3qAGxSMY3RB4vppKR+LxYvioR5bYfVQB6UcShBah5dbNeyeVaC0TEUcRBlZ5MkujJ7uMHZhCmA/EEVBwPr3YVB3N4i+quzXKW97HCxW9Z65GxhHmymgMdxGtH4MdlChZ0qkJuyPLMt84wYTG2RFgYjD0ioenjBwiLPHOROEFJBUjmBhdUJhW1tAXUVj8RmKW58d7M/9lMBas0IyC3PkyFQDM3qkHNz2HW8det77/rR6iSAcF3I+Eo4btsO99dVv/RX95a/+5Li2jSTvI2JVgzxHgsSHHPQ1xa1C6i+OFnmlJg4XhiCsHoKo9Spz2Zd+fKJWs/GCMui6FmzDIW/txpaL2ojWzgFJp3IrsrsYi7Uuitqw3RAHuJLtr/bKPtZ38B40Sgqt/W3pLNJmA3pqEFg/iJ7JYHxIEEuhlWGXMYnOhW5//IuqXhUsv8cGDmy5S1jGSby1wtGoZ95Ys7Z+zFCZfhlBTZ3/2dHn/tj3qclXSSUE4bgRUSscNwfe/yc/9MX/9r7f2TTTXzNECZt30YyNL9+lSl5IDfpG+dF66ttzUlQsTTIQViuHemofj5itCaK2UAq5bqAf9zGwqcSaZwwArZ1A0qOaqxp9RGEeXfe905bb53WWYTEr2QaPJmq9mNCMY+dK4TZneT2joccaiLeuQREXfj1uK3SAYr46q0MYqDJkth/OU0soauUiIhwNP1NQhZjxtha1hYowZyY70WlX/dKaF7z7D5RSefUSQTgm5HwkHBfOufT6F3/P7w7ccu+bJ+d7LeTziFGimcQoOX1p2cZUoRfxRKaQlhaRT895IuJFOFU5blFrHHplH6qRoBvNYsslU1CTfaC1Fw6ZdwD7iylLDfFW5+GsV5/5vLpd/hlWDkcTtTUcRDKsgKtlZekFvRswaG+dBIYTL3YzWwCR8TG2loNPraBZV5r7sHoPTiGXVZ4d35tiVy4iwrHgbSiOMV00yt7AeZ8787IfeLta/7qbFlYQhGNAzkfCceE+8PeX/tMvvOt/nW8bz27Oz5nCZUiSULarn/XR0M0QfuCnMxWaRRC1TBkj9LU9PgEjCMthTK1Fpnoo0wLpJDD1rDVAtAcY6MEyUbEWfbYStWxgVGvYWgie6qKWnjHLbhMqdFsrS/Bh2QDU2hZaa8eARoKe7cFqBRUpL2rpTYuqXVQni1lfMWIRuYAIx4ovQNKIMNs36JmpmeHTr3j/yPPf827x1grHg5yThGPGORff9h/e8M7O9V/6+Y19PdouS2Qq906xvMiRxgl0wSSxEIPHi2RaOiSOqWOUsuwNzuhbQTgWLEoOjtIMeXMGm86bANYrIJoF0r6vjOBD+TgDTyVL8eoz/Ze5F1eLqOUJ32gUjp5YB5sA3RYwvGEcenwIuSuR69J7a30F6aKE0WFH1R7h+g7/p9BljK4gHImlYQeHwDCgCMidgbVDeae97ZoNz3vrT6h133n/wjqC8AQ5grUJwtFx//AvG6/58Xf8z+199z3N+dm4iQjzyHxB/NIVGEwH4TIK1yBqeQGkqI0dvbUiaoVQlmspvs3rQdSPD16Pz7LBcq4LuEYHrXUZRs+fAOJpoJnD6cK36vTr+mQwPvCN6vmuVS+7akOHvOfK4ajhB1T1huXL6pCCqvSXtShjoGOAZLKJ1ppx2HaEvuJ+U9DcYGmhK8+sTx6r3st3BqwS7HzzFLmKCEegFrV1HO3S58I408FZhSRuu0d74/cMnPeq/zx66bs+Vr1cEJ4wcjoSjgl2D/vmW375NdMf/vtfP6OTnaXLvmL5n4wFtxsJsl7OiplIffUDIPeilkkn7C5GUUsoS8RTu5o5HlFbqgJF4tAze3HGhQNQm5gMth8ssUGhxT9/7VwQtZwu4C23VeWj8OEh77lyOJqoZdiBYlkzhhPwfpV97sMLolC3Vg8rtDZMQo8Noa+YeFciUhrOlf4CwU0zjpa3/z97bwInaVXe+//Ou1VV7/s6PSswbKIIqBAEESLuRtSIqIgii0vABXAXjXrd0Wg0UZN81MTEkNz7v7lGjcQEUeMWo4kJiX6IGgUUGGBmeqmqdznn/D+/c96q7p7unumuHu8NzPPlMzM91VU1Wn3e93zPc57zPPw7pZYHxNz7iNQKB+FgUuuygZSF1ha1Wi/ua/TM5kMP/72Jp73z7UqNzZdvIQgbQqRW6Aj79VtP+OplV71t/L/ueNJwcyFJ3P3KIC3rV/JUOSc/bvvyWxkPl7gOMz6L1pcB4swoUnsk46WWv1pi6f88UG55Hp/l3OlkFDL+xyhPM2qia9Ri7KQq0DMHVJuu4AElLIxiwOpFqaUB0uT47/HA2LJ/94HJoaT2YPCz52IzZ27tYA+6to7DsNZvoKHzAnEcuwQPXrfuo+OnpRQCbb3UMoWhvN4FYaO46tGl1CZRN+qmxyxUtn5j9IQnXKse+tJvtZ8oCBtAbkfChrHWBnOvf/9T//3jf/Lu8bn9x7DZAtWAk15RTnKhCXwpoPIgGKO1hZt5fUkvZfkoeWBLhbA51iO1rJXhSre7aE9ZMJXiGhWox3MY2VlF3zEhUN3nCqp60QpZFNN11HK1kF0uQim17t/UQFA8oKO0ZDNSS3TAhhXsMlZD1+Qw0Jug4OE7Tall5vui1BL+DERqhcMBM7fjIECRawRhDQtFjDwYvD+YeuSHBx7/gg8qdfK+9pMFYZ2I1Aobxu7Z0/uN815wde9//PS1g3ahu6ozBGUCIyNkhFLLL1tqsii1yxWm08lYeLDQWty08CODKur/9P+1DiwZU7hoLXNDs6COevccdj5sDGqCnbD2u5SEkJJmExcBigLrx5gLNZYjklKr2ArrgS+1m4WLioyHdbpCRMO9qE4OwYQGudG+CoIv9NuOxrptY+MjtdxG5scqkVqhE5zUWjb84DisIrcRbFCx++OZ70+dd+U1avLJN7efLAjrRKRW2DDpn/7pSV996Vtv2N3AuXHRQGizFdvFrqh9e4Ax847xMhbc9lLbQroRHekcXGoJUw3otMy/o9QiVIiCAAtqP5JpjYmTx4Cu/UAw7072u06cNkFRGCR8YZnL5wxMle9fph8cOG6PNNopCHEA0xOjd8c0kHABqn0ebRlJb+dBlh8QUzr4mAit0CmUWpuzEUiMzO2gRK6N7r26f3//w5/9pp6Tr/q4Uiptv0AQ1oFIrbAhrLXRD1/4sifs/+wXP7TDqO22yFzky+ctLspsq7mCw3UO81LL5AMX3SmlhQfHhCOXxSrFfjy0xkUbdsFiCSpXk5Zixeigdbl4zXg/hh9SRfdRVQBMPWDlDVe/C9aECKw68N38LY95fIGXtQd6R7HN4qKtEZBGQFFR6N2xBeiOfG6t+6y90PI6pdT6JCMfneX1rFp5CYKwQdwiqTCIK1U00twtZKOogjk1WNR7jvujrRdc8dtKnXFn+wWCsA7kjiRsCPuNbwx9/bJrXjn2X/e8uq+e1igZLTFpHQwjTkNcGSA21vSRHUbMWM7diW059MqCQe5r4chjPVLLRVFucie0YRxC69wJbtCfYuwRXcBwE8bOt9tbcdwxhzZkVNY5GPc3y7udG5M+l5QwTeZIToGhsCIO2WwYeQx0T40CQ11ANURTFf76ZW68O+DpFwT8fF1XMeYr28XorSBsBL9IgjuQmNbrrrGHirpQJEPYk/ffuuvci67G9KU3K3VAiRRBOAhyPxLWjbVW1d/8/od/76Mf/8jkQvrI7iyDckfBfJTWHwzzFMzG48QXcFK0iJ3h0izYTyxwZ9mJSO2RjRs7Lv63XGb9UoiRfYsoCpAWqROsJImRZU2EcYCBbRGqJyuY5G4EjDS68lUcZj7vMwxYn9X1dvW/KLJlai3TYIjz4AdhCsK6A6jGQsURCpsjZ2GI/hpqU4OwXQmaIQ/T+ZxkluFzP6tSaFnNhD+b0IjUCh1SSq3LCCoaLFeCDFXosB+p6V4Y2PnoN1V+7dpPSHkvYSOs99YnCJTa7h+f/9yXzH/j22/sml/o74tCBJzUXDRsUWr9xq7P1VuM9DB65ooylfm1XmdFao9sWpF9P2oWv2pJrgY708XI8sw9HldCLGSziHsspo7vh9pdINf3IO6OUbA2cnmgjGPO1WSl1DrK9xepXQYjtUEUodA5tCvvpdAzMw70V5BGBsYlvbO2tL9WmQdJqWWVE+3SjWQSETqEqUWsh6wzVAKNMEown4do5BGSaretV3b9+dR5r7pODZ99e/s1gnAIRGqFdWP/+ms7v3rx5X+yZbZ+esUFvnwzhZbULo21OTFxo8vLhH+OVxj/yEqZEY40OAZaRd94cEu7LUgOFV0e6HLNOmzoJJeP52GG+XAvurcoTD10GKjuhYmbPj+vjPy4LXU3Z65xe2OeaOvLB2GUdr3w+rSBL4rPyDZXpE1YVMf7EOycQG4bTmy5MA2tRcQcZX7OLvjtGunKQTGhcxRLxvk5IbK+GYpRVRQ2cDt9s2rstoHTXnBlz/FX3qIUy5UIwqFZ464vCMtxtWnf/jtPvvUdv/PZmbSoMV+xMDmScpIThI3D6Sx2C5sQDddggZEbVyGjPGnvW7IGCJEgRw6dFJiN7sXQsQFGjumFjed9vdlSYg8ptEIbl1tcfkyhC7sqpMogHqwh3D6OIimQxRZFqN01zsSh2Ib+ercUEn+QTCogCB3BWtJl3ejIFH5cqYor/VhAY180lIWT57174tzXvFep0bn26wThIMidX1gXrHrwtfMvfG/tlm+9Yjo37hAOD+yEIrVCx/hIrZdann5eHqllLDBgbixCxKigiSZ0VaNeux9bTu5HZdwAcR1WlS1vl+Cklr9a5byEFTipZQycTSoKRmSZK2thugJUpodhB6rIE9OW2lAxWssEBC+1XECI1AodQ6kt9+4itmR2ZeJin96iNObVIGZrD/n60edf9SLV/6jb2q8ThIMgUiusC/vV741+/tKX/O3W2+9+6FhWuFuRi4xpSR8QOmVRaoMy/YC3JP6NE1urYkbsIjohMjSRV5sIRjJMnTII9LDiAQ+QidR2AiWWdX3DMHRSS4qQpdKAcKwXXVODyCoGmdv5tSuk1qcfyPUvdIjbTeE9AIhNq8mHv/4ZrW2gF3swve+4Rz//+dh58ecVy58IwiEQqRXWxf3v+MRJ3/3Ah7+7bW42Hio0Cp0iUpE7aS4IneFLuzE2yyw6n1/dKvLFo/i8QbErWOBKetlYYy7ci+GjezBwXBU2mYWKslKGF3NpiURq14drbMHDdZpn6ixMFKDBiiVDVfRsH0eeMP2ggHGl+/jTUX6xAR+pFakVOmZJilBLaougVe4xQBNduCfrQu9RZ/3h5DkffKlSihe7IBwUMRJhXXzn8Rc/L//md/54upmh3xTI8qZ7nCW9WqttQdgorSoHCoz+e6n1v1rF4dhoAchsBlRzzCd7sfVh44inNEw8CxUUrn5tC8mp3RhMH2C+h2tTYS10qNAMDXRPhL5tYzDdEbKocCkhPFPHnwwbLrBphUitsCnKw50s3BcVLB+nXFUNd3jMMiEpwQJqaFR2/mDHk958ruo79d72awVhDURqhUPCfNqbdj7qDyfu2nvxmNWosIuYKWCMi/OI1Aods1RqSavEl18s8U9+J4MJDbJ4FmagiW2nTAH9C9DRXLt97lIoW3JQbJ0EFrqwLgXBNUdRcFKbVoCuySEkYz3Iw8LJhpPastmCSK2waQ6QWpfjHfr0A0qtYaOeMMZ9eqK57ZwrzlTbnvtP7dcKwhqI1AqHxN74uem/efGr/+6out7dF1jYbAFJEIjUCptmUWoZpXXTmYsalurkfq+jjqSmsM/eg+oUsOXkcaBrHkXYWGzf2trKLFMQRGzXCaU2swgT17XCtSROA+va5lZGulDbOooi0ihCA+N+VD79gKXQ2FRF0g+ETlmaIsTykLz+KbVWhVAmcmNM2wz7MYLBh174vNopr/tM+8WCsAYitcIh+cHlr/6N+Rs//8fTs2lPYgtEgUGuG0jCBMbVBPJiIggbx4+dVpMO35aDMuvTWqioBQ+IVZrIarOYPLEf1akQqC0gVw3fEayM+KygnDCFg1Ee9LK+HJorqRYBJlFIKxb9u6ZhKsa3zbXaPYdRXZsXrhGDlPMSNgUF1pVIZqTWIHedrQOEulIuWFPMqyE0B37twxNPu+LVSp268lSoICxhlZlAEBax1sbfe8pz34sv/+NLx5tpHLmDJQbGZK4NqXXhG5FaoVMWpZYonsY/UGpVikZlFrZ/ATMPGUI4YmDiBdggdxOiSO1mWJRaHhTjwU8dWpgYyGKgb/sYMFCDSYDU5q5ZA/EdAqX5grAJXD4LpdY38bHKIg9d82WEOnGPhZb7NL1Y6H/4t8fPf9FTVO8T97RfLwirIFIrHBR7880TX7v6DZ8Z+OGdZ49lhol3YPdRywmO20ZyUEzYBK0cWnf22UVrW1narH7g8+uysIF6fD+S8QIz7CLWl0HbOSjXwlWkdnOUUssFREtqA24DA1nIvNp+RDMjMEGOhs0QxBG01qiyGxRz6mUGETqFKSyuVi1Hn6+wwbxa7tXAJogNmzLUkQbduD8+6r7RRzzjicnul3ynfLUgrIrckoSDYm/46KO/8p4PfXrbvnRbb1MrFmtXlA+lYYwu5UMitcLG4ahhqgHVlFLL/EyXfuC6V7F/lXKP51ETc/Ee9G0LMXnSIFBpwBTzCCo+r1sitZthUWp9ugZzGtn8wiCLDNBfQdfuGVikaASFk9o8z9EVxjDl4R4RW6EjlkgtFA+KLpdaRmoTXYcNe7AHo2nXrnPe3HfWu9/jXyAIqyNSKxyUX152zWtu+8xfvG47wv5akyLrbjkuBaEwmUit0DEtqSWuSi1TEFThDiJFllLL+I1FFjcxX7kXE7u7MHhMFxDNwRYpVCWGNbmTMcmp7ZQlUsvUApbq4n9WuwNjujdAz/HbgahAk+XT4ghZljmp1XnhXiNSK3SEZZWDwI8flZd59b5OLSsfcCMm1hlUXME+01/YiYfdOPyET71IMdFWENZApFZYE2tt5V/OfPrv59/+pwsnwrCapL5ANg+IBMpCMwWhXU9UEDbGmlLLUWVY0sdLbVHL0Kjeh60P6Ud1JgTUPn8ALOKWeSFSuyn4mS+pQlHWn9WUWkbNuoHeY6aAnghppGFDtsfWqPJkuva1RUVqhY4opZZpRzpwezW+VS6PjanASW2YFwiiGA2bmObgsV8fPfu656nhs29vv4cgHIBIrbAm9tt3DH/lmRd8Zuque87rggnD3CBBVJZf8jchToatWI8gbARqFHNqGZmh1LqJTRWuVFTIfUhLqVUw3QXy/v3Y/rBhYKgB2P3cKgB4uCRw5Q8kUtsxXmoNP2/38yg7hRntTqKzXm3ftgGosV7kEZDz8waQaLfolfQDoXOWSS2LGpSRWlbg4DVtA8QF9w2YVw9br+362fAjLrki3nnJTe33EIQDEKkV1sR+4Qu7bnrWVX9+gsYpYZYjcDm0sct0tE43WDbbR3gEYaMsSi0jtTyg1PqKp54ZsWHlAwvbXcCOzPv6tD37ADMHhBFswe1v1xFApLZTlHFBb9eumCLR2nmxGpkyaAQ8LNaNeMswisQiDbQr6RXk2kfVJKdW6JBWvWOmHSxGasudm4BnkgMkvD9ojczkyGrbZ2u7n/Ge7tNe847yLQRhBSK1wprc/Za3nfezD3zmI9vmsmMS1z3MlNvElJHlNyFB2CgcORRYRmI0YhfxV05sGakt3GRXNw2E/QV6tgMDR1eB7jnkOkNQ1qX1h8TWkFrhkJQBWieoLVqPMR2EyYvRQILkmGnkaGIhLBDGEapBCJ3lADuRCUIH8FIPjJfawlUy8ekHRKvYSS1Mhihkow+Nuh1MzeSZnx16/CcuV0pl/pmCsByZCYQ1+cfnXHxF+LlvXb99vphkfdoCBhmjs9wxcqWXRGqFzcCatD6f00stT0O7AqgIrXZbkkWYwfY2MXxMgtpWNl2YQ87DYS5Ay8nuINUPhIPSkleyltSCssUNAAAgAElEQVS6RKPuANVdU0BNoR4bFKpAhafWDRcerH4iCBtnqdRqZhMpH/0ntnU/sLmTWptnyIN+kw6c9JXhp7/4QqWkXq2wOjITCKvCQ2JfOuuJb5j6/m2/NTNfDFA+WlLLSc8LLac8idQKnbKW1GpXzodSaysFdNcCpk8u82lrcyhs7iK1rKm6mtQy11Mk99CsR2p5EKwZWnRvGwZGul2ObVM33bZwqJh+JJFaoTNa6Qe8D6wltaHSriiHzlMU4SD2xdu+N3P2lReqmWfe5p8pCMsRqRVWxd783ZEvX3XVe7b8513PGW/oKo+H5TBgvQNOerETWi+1/uiIIGyUxYzsltS6BgyKHavYACCFjjLongZmzpgEavuA6qyriBAGrFHL0ednwZbEUmiX/l04OC2BbcvEso+NB/EUGoFFsmUA8WQ/8gpQd1KrEPFAT/u5grAxDpRaqqyfU0qp5X2AimJ5eJTVOHqwT235962Pfu4VatcVX/fvIgjLkTu/sCr2j2/c/aU3vPN3d96177EjmXbNMXk8jIlMjM0wHYH5kBQRkVqhM7zUcvxYjqi2iPqcWkptFtWRDGtMnDENRHtgK3XXeYhHmiwrSpVWLFLbGatJrcuZd3/3HcPYLjca70M8PYg0Mchsjlgp95zFn5kgbIy1pdZXROGfvK51kaESRVgwCRrhzH/17378tV2Pev1ftt5HEJYidyRhVe5/4/uf/P2Pfuzd22fT4wddWRUvtTwoRqlNyn5PrCoqUit0xupSGzDaqgqYoIE8rqN/exV9DxsEgnuBygIKRnC08pFa1wjLv64VpSUSqV0fB5dafqYGRQUwQ12ozgwjrRhX1isJAlh2FGutKgShA1xJr3IG4WJ1NallB7taNcZCGiCtbbnbjJ/2tsnzPviR8i0EYRkitcKq3PnyN1/6s09+9q2TjXS6T2s30XHbl/HZAApV5i2K1AqbYonUKi6OWLeSdyU+wkhtE0V1AVPHDSA8qgJE98GETdiQUssmAb7yQQuR2o1zMKl1jymDZggUvSF6jppEVrHQofWHdwreF2QKETYBa9W2wyLWjT2OQT8e+UXsmnxEoUVmEqTx0N5G7/Hv3/obfyxlvYRVkTuSsAJrbXT7c1/5ij3/+wuvHW02hmvsMMTJjjcdy0qWChXrj/dIpFbYDJzQvNR6xW0VY6fUFlEdRXUeW1mfdrKAife5dq2IgEBzv4CnSxazOl0zgPKQmIvU8teS6K2wkkWB8KyQ2sCiYS0aVWDo+BnorgC50mzm5ho0iNQKm6K83kNeuy5au1JqiS6aQNyFBd011+w59ve3Put9b1ZqR9O/iSAsIlIrrMD+9KcDP7jk2rdWv/2DK/qKrBKazEktWxdSJFhSsKIZs/UpCa11tiBsFB+pNW4i85JadhhCBhMtoOitY9vJY8AUe2buQ8Ee8ewJ715JsZWjSocTf437xYaXWiCzBs0a0L1tBOFoL1JVuMoHXEDw+heETuHo4aVPqSWFYttl36eS+bbGRu6eEMVAZhQaJkmzvmP/Yvr8l71a9Z5/T/k2gtBGpFZYgb3lOzP/+JLXvq//hz/9zf7AIDA5CkZmOFospTZAov3WsUitsBla6QduH8CNr8hJrVE58mgW4XCKqZOGgdEcJpiDCf2zI8pvO6orHC5WSK1lGT+4SG3X1kFEo/3IAl02yfAHyQShU1pSGxlfVWdRalnxIIA1VfecMLIoDJCbwCzUdt0y/YjLrlJHXfhv7TcShBK5JQkrsF/425O/9qLXvm/73vnHJroO2NzdcNyEt0RqOXhcSkL7lYKwMXxGHUeQl1plI1eMnVJbxHOoTRYYPqEPGEiRqXmoxItwaCLAsHq7j/AIm4efv1+q+pJq/kHjdmkWEqBrSz+i8UFkkWkvJlwtW0HoALcsKlNdYl7LANJQwSqLyBZ+0WprLuUtCHlPMMgLg/nKtn8ePvUFr6ode8XN5VsJQhuRWmEF+We/8Lh/uOy69x2XFw9BMQfF8kosdu8mPHZ5CRAZ425Gsv0obIbWMRGrWFejlFpOdkGGPJlF3zagf3c30D+PJpqIEj4ncAfFFssfiFgdDlZIrftBuDAa5kOgMtWHeGoQeWRhA9/0Qkv6h9Ahq0tt6Ba1kU0RuHtBF7RRsEHhxLYocuwPp3/ce+JzXj9wyrU3lm8lCG1EaoUV1D/06Qu+dd3b33tcbnZGaPhCXpbbQuWWr8urFakVNgvHEm9B3Hqk1HLLm8XiFqV26KgA3cdUgb4FpGiCXVkDrRC5FkSM1IrUbo7WgoDtShfTDxiMZZTW7fnGwDzlY6yK6tYRFAnvBdpJrZVIudAhvM55GTOjqKK91DaipVLLBiu9sG7xlLkUBKubmAvGfxnveMb1w2f99ifKtxKENiK1wjKsteE913/oop+87/ffuTPLpgPL9AMKByWCNxwvtmy8IJFaYXMcWmpHjo1QO6YC9PhIbRiELGGLUPOVNC2+hURqO+dgUsuTOwWQBJjn80YSdG+bQFFlkNy4BYakHwid0pZaa1HxGzUrpNbqHtggRoEUQZgjsE3Ug8m92fhT3jnxuHfeoJSSk6LCMkRqhWVYayt3XPW2K+791F+8ZWszHbR6DsqUSftM4mc9pSW1BSX9QOgc3+TW34QKJ6eBTdzI0k5q92HixCrio2Kgex5N66WWO94xOzD4txCp3RSHkFqtgWqEhSKHHY7Rs3MKuqZc7dAgVijcglcQNo5bMwVMP7CotaQ2jF2qwVKpVVEFqa47qY3RwLwaby4Mnf/RmSe/6S1Kjc75VwqCR6RWWIa1tvu2C1/5itn//bnXb8t1F1TqtiEDznjcDionvZbYitQKm8HnaftGHp7I/e6ldi8mTu5CvCMEkjmkyBCFoUvEC5mM5w6KidQeLlxOrctxZN58yzoKoJpgvshgB0L07ppC0aVYRRiK+Y+SUyt0SCtSqxip1VxFBUiD2EVqE9twgRStawgrVTTzJlSQI0GGejBiZvse/adbf+PK65Q69ZftNxQEkVrhQOyePb3fetpl1w3+2w9fM7wwF7OLGGHFA/f9soNQaPzfjURqhE3AkuuBYncwP87c4SOOKZXD9Cxg5OQE8aQBkgIICndAic/la4y2LqVW2DyUC1JWTFtCCMuDohWFZmJR2zEBNVhBxo5vAYvmt58oCBvCDR23eirHESXWNVswCJG7b6mggozlvsrc7UgBjaAfCz3H/PX0mZdfo0af8CP/boLgkUitsAx7n+275XHnv3bihz+6brDeDHUYuuhNpKN28SXSiuaUfWDKRwVhYzDS56WWjRRYzUDBmAxK5dCU2tOqiMe177MQZDwl5ps1B6HL62R2t7AJXK1fSq2/hkNWlHD+4B+HCt3CVUcBmrFG984J2KGKa8DAfFp2F5SfgNAZvjZtS2p5NVueSqS82tw9roIYuWECvZ+HQoRoBN2Y7dry7W2PffE1aug3v+7fSxA8cj8SlkGp/fuzznn99I9/fO1Qlgd5GZml1LLgukitcDg5lNROnN4DNZr7vFmmwoS+MrJI7WHiUFLLZti2gA0DLMQG3TvHgOGqa8AgUitsjkNLLU8jFqzCoXh/IAHqqgv7KzO37TznudeoiUv+T/kNQXCI1ArLsD/dO/DFJzzpjTv/6/ZXDWe5ysFi2KXUttuZMlLrbzISqRU2g5faCNayDjI7VVFwcye1ee8Cpn6tHxhOAZP7SO0SqWUagtu9FDpnA1I7Hxl07RhBMNqFvCyGz11hmUSEzuhcavfG0z856qxnX6NmLv//ym8IgkPuR8Iy7O37h7702Ce8edvPb796KE2hedqcNxl2cFoitUziZxqenwol/UDojMWc2uVSy5xa3VfH5KMHgcEGYDJAidQedtYhtTwOagKFuZCRWi+1RcSflhapFTbBoaXWInSHkf19QUGp0Edqo4mf7njU865Vuy79n/69BMEjUissw373FyNfvugZ12/52R0vH00z5LyZrCK1jNRSan31A5FaoTNaUusbCjECW0ZqgwJF7xwmHzPqGi/ANFwtW9ZGtZbyK5Haw8I6pJan0dkqtyW14Vh3O1KrDCtXCEJnsCWuYnUdd/UfSmptKbU92B9N/mzH6c+5Ru287C/LtxIEh9yPhGXYf/jPsZsued5btv38zpeMpTnSwA+RuC21Ph1BGR+pFakVNgsrHiyVWo0coSqg++YxcfYI0DvvpTbQUCEnN5aTKic59zqhYw4lte77xtUTnQ0otcNIxnpcq9wchURqhU3iL2CmsRjXit2X9Au5sC2llgfEwHuEOxgaohn04v5o/I5tv/asa6IdL/tz9wJBKBGpFZZhb7514m9edMlbt//8zsvHtEbBKJoCEuNLrfBrSm2rpJdIrbBZWlLLXFmW6NIoEAY5CqYfnDUE9NZhdd3l06oogGUzkJAtNDnJyS1sUxxKag0XsQY6VJhTBt27hhGP9SALjcu1DcqDpILQGWtLLRdTrK/hKKWWaW/NoBv3h1N3zvzaBddWdl31Z/4JguCRO5KwDPvV705+6YUv/e2j77j7xYNpk9UC3Q0lsjwoZt02pEitcLhgvJ9FoXyhLt2W2iAsYPrqmDh7GOia9X1xkftDYoq5eD5S65NjhI45lNSWkdrMGjQrQGXbECrjfUhZRziQ1ANhsyyXWl1KbVxKrXbjj7m0i5HaLOzB/WrirpnTn3VNdPTLPuNeIAglIrXCMpzUPv+lv33UL+968WDWhGbxdVY/OEBqJf1AOBwcKLUMzDC9wEntQB0TZ1Fq9wNBDvAUvltjidQeNjYotdWtQ0gmRGqFw8XBpdZl26rAS63mbOQPilFqt5z2tGsrJ7z6T9wLBKFEpFZYRitSe9Tti1JLQnipZW4dodQSKeklbAYKLcWWcViOJRtqWKWd1Nr+OsbPHITtnnUtMkVqfwWI1Ar/TzlQahOX5rZMagN/j3CRWqYfoAv3BeN3TZ/2GyK1wgpEaoVlUGpvesHL33rUL355GdMPeFNhDIdSy5uNZnF8dxOSjmLC5jlQahFxIssQRhambwHjZw3A1uZEan9VbEBqswqQSKRWOKysJbVsla2hWeqPZzjYUcwYRDZEw0Vqh++aesQzRWqFFYjUCsvgQbGbXnTJW4/6xT2Xs06tk1pu+ZYdn3z6gXJS61/Am5KfEAVho6xHatE1304/cHcsV/IgkLF3OFin1BbGoFldlNoMOQyLiwrCJqDMtuBco1mz7wCpbUVqmUMfGqChenC/Hf3l1GlPvbZy0mskp1ZYhkitsAxK7d9e+oK37LpzzxWM1Oqyk8tSqfWR2/JUqkitsAkOlFqffpAjYOcwph+cPQjU5laRWibfthZTsqjqmA1KbXVmCNGkSK1weDiU1Frlz3TwHgHN6geU2i7cZ8Z+OX36M6+pnPCqP22/gSCI1AoHYr/8r+NfvuLSt+y84+4rB1LWBo1dtcDAeKnNy2WQSK1wOOBk5Q+KcXQZWpWL1LakdoJS24rUovAvEqk9fBxMah0itcKvjpbU8pJmRZP8IFJrC+3uFk2XfjB65+TDn3Ft5aHXSEkvYRkSqRWWYb/6vdG/fdFLrj/qjj0vG2guwIQBCkbTGKJ1K+ly8nMpCCEMbz6C0CGLUsvqB9ZJrWuuEOUo+ucxfdYI0FVGajnJsZtYuXvgOwwtCfUIG6eMxFIciMuYXyq1/D6XE7aQ9APhV4BFwPa3lsX5OL8w3Y3VacuOYsqPv8BGgCvpZZGyTm0wduf0ac+5Jjr+5Z8t30gQHCK1wjLst+8YvukFz3zz1tvuuGrGKCyoFJoF1lnSq5zgeHQsLLd+uZJ2f7o0BEHYGC2pZXcqEiqmIqTQUdN1FJs5cxwYaMBYiq1BwPHGsC6bL7D0l9zCDh+UW6qEmxUCl7/o/hIEyJGjHgPdO8cQDNVgY4XUMKLeerEgbBSW5vMNFUJdcWNOByzbZ9wCllLL67zILRJVQeRqU6dYMDXsiSbv3HraxddUjr9cpFZYhkitsAz7g58N/s2zL3zTttvueOWWwqCpcl/Gy7KjmJ/oGM1h/NY930mtT+IXhI3ipZYtV51BIVSRl9q4Dt23gJlHjQGDTdhgwZf6akstYFzPeLmFHRa4SHVpCP5XYALwHJgr3aeUOxjWqAA9O8ad1LJrtkitsBms22XhPBIgzmvuz4Kl/BRTD6yL2PpOYgqxqbi5JwgyzKOCe6KZnx79qBdcq4659H+231AQRGqFA7E//nH/F5528RuO+tHt14znucp4ApWBWojUCocflyunLLSL/JdSazPouOEjtY8cBYaasGEdUC4RxkcPRWoPL/z4ndCWqQiMnrWklr3cAo161aJ3+wTUYBU69lIbllkKgrBR1iO1fEaACGHO9AONOLaYM1XcFW75191nvfAatfOSm9pvKAgitcKB2D17er947gWv3fHD218zljVD3lwYuTE2hrXMoy3z7njjcQNIIrVC5yxKrZ/cWA/ZoOmk1vTWMX3aADBcwMYLYIjWjTfuCojUHl7KjRYbsBb1SqlNQ420Cie1GKg4qc1sjkBymoUOWSq1UVFzaQhFmMEG3Ioh7DFoEQYxgiyA1QaVinJSe3e47TtH//ol16ip53+tfLIgOGTvTliGtbbny2c/5Zqpb//wtRNpo6LgW5OytBel1ufV+qgac/BEaoXN4PyJRddLqY0RoUAGHTVg+uYxeXI/glEDVBqwyBalNuK2JHNqJVS4OVjvl3+WOfKBcYFwHto5UGqbNYW+HeOw/TEMpdZQamUKETrDS63fIoiKVk6tl1p+i7m1PKBYiWpQGZzUJpUQs7qGe6Jdtxx13pXXqKmnfbf9hoIgUisciLW2+9tPv+Sq2k3fesNMo9kNm/JRL7U8iepOkXCLkqfUNULFDjByUEzojNWkliW9Ckptbx1jJ/UgmjBAtQko1qotmy6I1B4m1pZaXukhw7bKoBlaZLUAvbsmgN4IRWiQ86CeSK3QISullukvRVtq+T3GaiNGanXkpDaMgDn04b7qMZ/f+aSXXqP6zv+hfzdB8MgyW1iGtbb6H5dde2Xzxr+6fstscyBhpNbdXEIYxda4TD7gFqWX2kglflUtB8WEDlgptayLnKMI6zB9dYyc2IVkUgG1FD5cQ+MyQKxgtERqNwsXqk4gWo0smH6wVGrLh5uMzNaA3h2TIrXCYcF5qw/JItI+OMKcWlY+aEmtCiyUUQhN5HYKLQo0oiGzt+ehf77tiZdfp7rOucO9UBBKRGqFZVhro5+8+m0X7/n4p98xNV+f6HNHczTyJe1yF6XWIlIs9SVSK3TG6lKrYQJWP6hj5IQa4ikANdapbXqpZXQnVihMgagsMyd0xmpS6+JnZX3Q0ImERSM2yLtC9O2YhOkJUVB+JVIrbBIXrW1LrXFSa5R1qS8k4OZgweucZzr8gdK0MpHODT38E1se/aI3q4FH7/XPFASPSK2wgl+8+0MX/Pv1N7z3WB3s7MqbCKFRuEjtAVLr5kBKrwwjoTNY85g65eWKB8VCJrvAhE00KvvQd3SIgeP6gWAWNsyguP9oCiAB8kIjlpzaTbFMav0F7dYNLsvIRWoDmJD1qjXsQIK+o6eRBikMrYOZCa2uDYLQARxy7rovc7cPlFrF3cAgRJEaJEkCrSzuynpnu44+/4ahx3zgXUop5scJQhu5IwkruPsjn3zcP7327e87PjMP6clTJEb79riW+uo7v7DUF/NqQz5W3oAEYaOsJrUuly5I0azsQ/cuhUFKbTwPGzZFag8j3ke9TCi9GKnlrMBLmmIbWHZ5AuqRAQar6Ns1iSzIfFtdkVphkyyVWl95Q7tSXmzLzuEZWFY/CFCkBeI4RgbgXj24p7LziW8bfey7fldJS0HhAERqhRUs/OXnT/37l7zmfcctpGf3p3XEhjcaBWvY+8lLbV5GdAJjRWqFTeBlqiW1kauHzLHlI7W17QZDxw0AtQagGkDEg00aiC0KYyT9YBOsKrUseF+eHWtJbR4AjcggGu1G99YxpGHmC+OL1AqbxOVuM+hftmteS2p1phFEMXKlcB9Gf17b/ew3jZxx3afbbyQIJSK1wgrsl27ZcdPl17x3+737L+hr1lVF5y7vkf2bGJkVqRUOH0ulllVqfW6dRRNpZR+iLRlGGant4wGSBvvo+tqWka9hyclQdgo6w6UZlEXRlCnTD1aR2jQwSBOgOt6PytSQSK1w2DhQavMwd487qXXXNivs+Bq1iCJkKsH9avLWsVNfeG31hEu/WL6NILQRqRVWYL//04GvXXbl9f3/8eMrRtNmLSkYmeGeJLeHS6nl5FfGeUQqhM5ZKbU+JSFz6QdmbB7Txw8CI9SsOhDQtDSsK/3DeVCktlPWlFpe6kvyapl6RKntnhlx0doGC+Qri8Cd4vHPEYSOKA96+t8ptb7xQmDittT6cWZhmFsbRnZvuO1rW8568W+pmYt+4J4sCEsQqRVWYK2t3Pr4i69ufOOb1403GsNdRQ5d1qOMbORuQYXyuZChYkOG9uv8F4KwbpZLbeIitXy0iWYyi2xwFtMn9iIaj4FgoS21mt2smKmgfU6esHHWI7VKKTTZ9qIKDGyfBAaSttQy/Tlw7ccEoUPKa5cHw3hGg1LLoElYSm1gy7JeFsiZChPVitlk6+e2PO4NV6vhs28v30UQ2ojUCqvysxddffEdf/a5t00X6VYvtdwiUqXUcgPYl/gK1fKcWhFbYWOsJbUZmsk+1HsptTVUt3QBilLri6cWOkPIp4rUdsx6pJaLiNSWUnvUFtjeEGmYQ1sNFSmRWmFzOKllWptv6LNUav3BZONas/OrDAGaYdJIu4/+k8lz33KtGjp1f/t9BKFEpFZYlbuvfuv5t/7hH71vR25P7MkzN98RFsEmnPA48R2YeiBSK2yEldUPYjeRcdmUxgtYqOzF9EkDqG5nWHDORQdpYV5qg1Jq228nbBD/ufOrpXkEXmzdV4FCw1qk3cDQUVuhexTywEttyPzmshSTIHSCy6WliFh2E9OupJfLszUVVxEhMNrtFrCVWGp4aLG2P+097sOTF1z320qd6hNwBWEJIrXCqtz/rg8/5Hu/89EPHb2veVZvIw0YqWWNUG0trNYuszYMQzDAsxSRWmG9uAihOxQGaBb7LyMz/tyzgQ41GmED/dsj9J9kgdo+IOaYY54dOwxxl+CAAShsjHJBQLdw17gPhC86bmjRjCzsaBdqW0aQJRpBJUTebCKpRMh9CqQgbBhGYNupQ0pDK998wd8LvNTWtHadxBqIoZNupCq5B+On/I+Jx33id/wLBWE5IrXCqtgbbxz90uvf9f5dd+79zZFGXmH1AxsFKKBce9ygYDsG1e481EKkVlgvLaklBSJfyofbjTyExKL/PKCkCnRtMRg81QI9e5nUDc3Ccu2qByK1m4JSSqENvdTyc2V+oyrKzzU0aLDfxXgXuqYHkcUWKlHQaYaYCwzrf06CsFEWpZapB9Zd/0XYatMcI9IBqloDNkQzrKEZdiFTPT/v33Xm63rOePeftt9IEJYgtyNhVXhY7KaHnv2mHT+54+Wj83k/c+sKZVFwuzKwTmqtoYD4dITyNe2vBeFQLIvULpVaJ60+xSUPDdRQAxOnR0D/LM9Hu2itSztwhxRFajcFPz61VGr9oR3FrsUkMmhWgHByAPFEr5NalhK2ae7SD0RqhU5ZGqllPi2vd3YMcxkt1i9ck5zpByEPiGEOVehk4oeTpz/9SrXjpbeUbyMIyxCpFdbk785+wmWT3/vxW6bq+ZRmq1x2FmPSfqQQuzQEzojLI7WCsBEosfydCS2c1LzUsv7sotRm3bPY9qgEGGvC2NRtf+vCuPQXGNn/3hRrSS0/VmUYJENWU0i2DEGN9KCIKR08ip67Ukum/DkJQidwKLXmEA5F136d46ncMYgKDsYQSKq4P0tQ9O365+lzL32eGn7qrf4dBGE5cjsS1uQ7z3nh2cHnvvJ72+r2ON52Cpsjt8ZNZqGrESozmrA5WksiSq3DRWt9UwW3HRlZNOL7seXhMeKtTPpcAKqBSO3hopTapTm1LoJWJsuzRq3pC1GZGYHtr7hILaNqAbeFiZL0A6FzvNRSYrlTE7ix5TEuvYhi6wZnHOO+ZmL0xGm3TD/14ucodd7d5RMFYRkitcKa3PeRj8z8+2tv+LNd88XpCf2DbQxbVQ940xGpFTYJVdZrrAvPtKWW3+EEVwRAGu/FwNEFBnZ3AZUGEGto4w8qSqR2k6wltUzrUECT0duBBMmOcdgakEe88jUia2EoviK1wqbgtc4BmLhB6OcWFowsfM58ELpLXEUx7km7GtFR535q4rEffIVSKm2/hSAsQaRWWBN7880DX33OVZ/Zfm/jcdUijWJGbUIe1LFQrT1Hiq0gdIyP0Lak1i2WykYfLanNK3NIRucw8bARoDcFVB0m8DsGMv42Scspyrq0rciZU1dKbQiEQzVUt08AiXZSq22BmAdHjZH0A2ETcLBxVeWrHbiVlftbAaVYrYuLpgS5tgjjCPcWw/u7HvrMdw+d+rp3lm8gCCsQqRXWxFqbfGX3WR+fuXPPhbWF+UqFN5mgdbSnlBFjoGQYCR1zMKnl9reGqTagevdh+pRxYLgA7F4Y1kgNfQqM1KndPC6PsU2ZehACDe78DlfQtWMSRVBAh15qkyCAZrklLiwEoSMsbJC51APWpeWfhFIbgIFYlvVLkGmFJEnsvWri530nX3R13wkv/6vyDQRhBSK1wkH5j6dc8vqFv//6dRNp3t9r3G0GBfNqoxi68BJCpPKB0AkstE78wshHbii1lCyWkeMZkTSYg6nsw9aTx4Apnr6fheHx/MD3hhep3QQu2m18zV9+zVPohuWVAJMACyEwuGsS6I1deTUkEYxxhf1cVNeUCxBB2DhcFDEiqxDqmk9B4N8sI7UNNxZ1UEXBaK1RutF9zM2T57zqBWr0cb8o30AQViB3JOGg3Dx4xNYAACAASURBVHbZ6556x2f/8iM7Gtl0X5FzQxgKEVSSoMgZpRWpFTpndam1sIhgA38oKUMdOpnDzPH9CHcEQGUWJihgQ+WqJYjUbhKW4qOcul9ealNXeQJAn0LftinYWog0KICIdaq5mBWpFTaH5S5MkLv266GuQJnE7xgozjFMMzJOaLXqQtP25PnwsZ+afPKVL1HqnFbBOUFYgUitcFDs7/7Bts+/44Of3H3//KOH0ixkndCQ3ZyCqtt+FKkVNoObxFwnMQqql1oWYqfUsvoBpVYjRRHUMbw9Rs+JNaC2HybKYSLlesaL1B5GysOgmfKpB9XxGromRpBXgAwFwjhoSy1TPyT9QOiUpVIbFRWosgICd2EClfrrHwly1Yt5NdqsbD/jupGz3vvh9hsIwiqI1AoHxVobffFh57xr5raf/dZklidKF7DMqzVx+2CJy7KVxgvCBnGHk8qsWhZh9zFb4/6D4vgqa1aqHDkydI3kGD6lCxiow8a5O7QYMKe71YChtRUuY3H9LPnMmB/vvoxZ5QCoh0DvliFEwz3IQo2MUfHIN8YI+DJtRGqFjvFdxDJ33ccFqx+ETmpZq5bXvNu1QYIm+rE3nr57y6lPeWqy+6rvtN9AEFZBpFY4JF9/2nMvCm/66h/syE0tomgYINchgihEoH1erUitsFGc1LIupQ0Qu2gtExC81JogdlFaF4UN2f/dwnbPY/KUBBjPgapGEWmEBXNqRWo7hT8Dl/rhyvP5RQQbMeQJ0IyBwZ3Mp01c6kGmrEsNodRGYYCiKBAEzFEQhI3Tao3L8RRrNluIkAbK7RRQdim1MSpYMEPYX9399Z1PvPipauDJe9tvIAirIFIrHJIfv+ZdW+/46O9+eUe9OLrqorQWhYkQRTECSoVIrdABballpMYslVrWTGXNSh5i0ghZG9Uq5PF9GD9BI9kZw3YBRZwj0mWk9sADSxKtXRfc4OXCwYktvzDWpR5kTDeoAkNHzwBdIRpgZJz5tH6BUQlDkVphU7hkIy6SwDUqy3oFyMIAuWvHzrQEIDEh5jGGdOwxb9zy5Bve0X6xIKyBSK2wLr4+dexnpu/Zd1GNp9LdqeeKGz6hNi6vUSK1wkZZr9RGUQStLRrBvejZ3sDoSRWY3hA6Noh4El+ktnOC0LW7Zo5sS2pdMaVuwPYl6No26Q6lp4F2UsvKB7zWq1HkpFbxZyQIHeCl1ncNqzI8CyBlCS8ntRqwGkmukEVbTM+Jzz09OU1SD4RDI1IrrItvPuSMy0Z+8ovfqxR5GLNcLULo3CBiFSDrcm/bz10PnArLTWPhiIU5mZy8eODL16gkXmr91xwn7ByWa6Bu70U0WcfWU3qBAZacyhEYHoReEqllAXeX0rA4Ht0We/uvMvKWESewWQ7Ftk1cQ1As+BH2R0jG+hAMdUMzx5apByHc4VB2EksqMXQuUitsDl6WvHJj18wnQBFErjZ1HmhYo6CyAGll156JM19/qtr16z9vv1AQ1kCkVlgXd13yyof88MbP/f2WMBzpLnJU0wzWMJk/dGWZeE9yeY9rjKiWVLTiOnyaW6mXfxeOQHjKmdvaHBW2AstuCg5GDVnWh6kFjCFyjIXI4jrqyb3YddowgqEGVB8ji1nZBoudGMqTZ26wsbcmX+trrgZltyK+nxfecuStMV6PKPi5aa5ULTILFDVgLgJGj5oEumMUYavCRKuGsAV3ix1yAQsdY5GEEZrNJlRYdTsyJi+g2eQjMljQXET1wnaffMuWC3//qUoNz7ZfKghrILd0YV3YT31q+POvfP9XphbqJ05Yja4iRWA0i/xsWGpbTykfknnxSEUVCG3q0gyMrcEidoLr2mQiRwCNABH11H1VxAUa8f0Y3pVg8NguIN4PhPmi1LaXTF7QiJPactTxITf2RGpXwo8rsGgq6/Jpi/4EA9tGoePQnUZvl07jb4Fy7YsdIrVChwTWIgoV0qyAiaoIgggqy2B5MDQxqNsEC3bE9kyf857hx77/jUqx+4cgHJw1FEQQlmOtrfztCY/54+Gf3PmsiSxDLdRQhYZxEbBFqW0//4CRtVaklsi8eITipDb3iyJQakM3FlxDhRVSG8LGBs1kL2xvHTvO3AIE9wNxEyY0CNRi+oKDKQguUlsOxHJAutxRN/D4L/E5rRF5pENZBZqBRSMBurcMIxntQRaUJ9RbTS5cDWGfC+nTOmQKETqDi0yWhtM8eBzE7sq3OkcYWlb0Qx1d2Kem9+48+aLn47jLv6BYekMQDoHckYR1Ya0Nvv+sy56n/u6bHxnbP9dTiQ1MwVy80G3tdiq1IrRHMpQlprBQmXz6gZdaDcX6la7IPzWUYhu6Lck8mUMj3I/dp08AAxmQLMCGmdsW9+kHviuWH2TevNxY9AZWjsNSaB0itS5yzc8oYMMFi0YFGDpmGuiJ0VSF/+j4s3JPE6kVDh+KdaZZm1ZF0G4cGte5mZfunO3DQvcJX9vxpJc8X9XO/Vn7RYJwEERqhXWz72Mf2/Vvr7nhL3fV9cMU6rA8mc56tWW+ot/qXU5Lbg9cY7dU4sDnC0cSlFrGYTkOWjm1HBGsh+qllv/FqobchshUDl1tIo/3YXgmRv9xQ0Btn4vWuhUSrcuvrsoPkaOsdYtrPcbo7JJRV47dIxcuBIzL3tDKuoYLRbfC4O5tKGKDPDTtWqLOe8vPlh+zR6YQoXPYlY4LUkqtG2fl5chqJ/PB+Kzddu5bJs9+z8eUUnX/HUE4OHJHEtaN/f73B776lMvfvWPf3OUqnUVMDSmYq7hxqRUECiZjtN5Dk8XbkdIuLcFjEakajI3QRA6b5DC1OnRlFttOmwEG5ly01g2wVtUD98vXvXQhn/J9VggtEan1UhsBqbJIEyAarqFr6xiyoEARt4PcTkDC9oKhJbYyhQidwzEVBAEKXpaBgooNtFHQeYKFeOf3J0997otx3Au/L6kHwnqRO5Kwbtgy9/Znv+Tc/V+45eMDeWNrtcjdzFaeyVlValu05HYpIrpCK1bPFIPVpNY/EkOhghwFTKxh4gZStQ9bHzqKcKsGKnNAUJTCWubMOlkNl0grhZYVEVr/nofteY9slNtx4UeVUmxrQN/MGNRAzbXGLUJ/+FNZXyQ/bF/gbMTgK0sIQqe4FCPVklqLINRINVOGRq3uPfGGoQte8U6lHnlf+wWCcAjkliRsCPvBT4x/+fr3XH+cVldWFupu/HQqtUTEViBemThIfNtln2vLBALWQmAgscttTxaqQKrqsHEDIztr6D6hAlTKKghhsZh6sEJqS6Flm2f/zzghC41IrTFcKPi2uEV3iIGjpoGE3Z2Mq3zAz8uW1Q9YKN9f7/6C1u3lgSBsjFaONiO1GXcLuLES5GjkCYpkx92V8dOu7fv1D9yolGI/EEFYF2uohiCsDqsgfOWUc58z8aOff3C0XvR7lfWtM933y0nOtd1chQPlVqT2yMYLZkto/SQHsH6tj7pSaqm4Pt82cFLLvvCqomF76pg6bRi2Zxaql69vIE9zRAmgwgQm1UuqIlBqGc0tx6CT2mBJ5PHBCa9Ld4juAFz5PUZfw9Bt+y7YAikPiFFouwNX9YBiy+g469IS/hFYf2W3FrISqRU6xeXMFzkqtSrqWYEwipAXdehwyOy3R39l6xnPfJXafem/tF8gCOtg5d1OEA6CtVb97OpXn37XH3zhQztycwpMCmW1a6+5HkRqhaX4CC3xpskobSvX1kOhpUhFrvwWBSu3KVSoYXoa6N8do3tbDQhngUoKzYYgAT0tgtEWoWKuLt8rLyO1/l1b/+6DfVF1MKltkbM+bQyovhi92yeBinIdnXTI5WoZ2S5hCa/FaK1HxFboBEotq5yTjBemUm4szauRhXDkrPeNnPGMD6rBc/aVTxeEdbHybicIh8DeePPE373sFa/buT+9PDGNamS0y7lbyqFkoTVRHup5woObRan1tKR2KZRa1qtlu1xqVuE62RnoagNqIsXEKTNAcB9QqQNJDq2Ni+wGQehKzilLmfWvWS61gf/eEUhbagOFeXYT6w2QjPaiMjUMzQVDYKC5A6N8StHi9epz6MMlucoitUInUGojBaRpijCpILUhTFjBfozdOXHKs1+bnHj1Z6XhgrBRRGqFDcMDY9877wXPKL75/XeOFfM7akXeniTbcbdDyKpIreDGwVKpVczbXCm0JFCBy70jWvuoq05ypN1z2HbyFDBcANF+oCtDXmRQ7E7ExgosOVd2KHPw7dzYjMoIMP9yhIotg2NRiH15jnCogupYH+LhHjRViihisTXjrms+ryW2B0ot85wFoRPcITHuFOQpkkoNTVtBqnrsQm3n97aecek1auYpX2k/WRDWiUit0BHZB/7o4X/3jg++Z+f8/GN7s7Q9jlze3RKpXaIsDpkChaVQahnpa6UbLEqtHzkUqdYWuivK7oobaCdWOtZYiOfQv6WKwYcMAmoP0J0iZ+mvMIIxFrFNFqW2LbSEtar4hqyTe2SOSn62eQDMW4PKRC9qY32wPQmatok4CaE1m2BzS5gpCO2fkD/gY5ntLFIrbI5WSS9myDTRjX1qYm/X1CP/cOiMSz+guo/9RfuJgrBORGqFjrDfuq/vi1c88+otP73zFcMLC0OUDYqHkw7mSonUCofARevLbnSrSa37fhs+zna4XqoCKBShRjMpUHTNY/tp40D3HFCbh44L36GIUsu0BZ7cd+kHS6TW+racR7LUmlChXmjoLqB7ZhTRQDeKWoDUNJHEIXSWIWS5X7YyFakVfgVoEyCJQpi8jhSDZrb7+K+OP/xZr4mPueiflHIrTkHYECK1Qsf86JVvecTsJz/znqnZ+pmsn0TRaEdoy4NjB0ZqD+TIjJEJZKXU+rJR/nut5gnGjxHX1aoltWx3q6ADiyzWaMZzmDquC9WtIVDbD1u1SHmyX4UINFMM2GSXhcGWSm3Fv39Q5toeafBQTgAsaI1kuAuVmVGYGpDF1lU8qEaLUksotdrNFn7KYCk0idQKm4G7NIUJEHEg5Quoh6MLdsv5nxh53OveqNTEQvuJgrABRGqFjrFfuqv75uece/32+YUrI6N7XZYio2KUE7Y/dFuUvGMtnmUn/Js/EFRuP5ePC0ceLqe2nZfZktoySltKraXItqSX3+VzWPgfFimlt5YiGUsx/rAxoLYXqGVYKHIkSYxAu3eDsqXUtjgCI7WtNA6HUshDoBFpdE0OIZocRmFTpEEOqwwqSQyTFwhUK6fW/0z4E5D0A6EFL0U3osp0FI4QU65M/TV8YHHH8nv+Sna/NM9jKIOFaOqn3cdd+JreU1/9F+WTBWHDLB9vgrBBfnju8x6ffes7N3SlzWMryBVLfIXQiKIEOuMZ9Iorgr94IIjTokaE3D3CrD1OmIKwJmyf6ebCxeUPq224vymNIs7QSBaw7eHjCKfYSGAfctVApcKkUSblBr4VLOW5NdQCP+4CdtN6MBME0GUNUEQRbJ7DGAMVBmgEGvUBhYGt44i6EqQmQ1iJXc+KoshdrmPrAKgTlPILpyP+Yal8cATDIeB2WSzrPUf+GlUZLMvBBYW/PpnTbsMyHc139ePjjPw7pWUrsbiGvUFSpP0nfnnbua+6VHWfKbm0QseI1Aqbwn7qfw3f/Mo3fXgqyy6opvOV7kQjrdcRBxHioAuG4SCnubyFudsZsyHdIxx8RqRWOARr11n1CyTWVM1rGWpTMUZP6geSe2HiBQSJ8SehnNTyjSi1Xmz5autKfjGK237bBx9KwWrtqkHwa218oxR+HPORRbS9D7WxXqhIIdcF4phllZSTWorvgTDtg4jUCgdKLS8tSq0JF6XWIoGyIWL6rJPe3KWx6HJoJRrQSbe9Nxm/t//Yc9/f+5C3vVcpKakhdM7K2UIQNsg3z7vwsvif/+WtYwuzE8jnVRUKoY5hLc9OJ2WUlrmRXkS4vdmCKQqCcCjWElsDdhgzSCs58q4FbH3oCCpjBkj2A1HTC603WL+o4thzXcXKXF53kr/9lg9o2tFUd12VX1D+WTaiTNewgUJufTWDZsWgf/c0VE+EwhbQ1jippXCI1AqHYlFqfYm31iFP1jbmGKK8chyyC11k+H1+18AE1q81mSdvLJrBYJENnPClicdc+ArV/5v/6d9dEDpj5UwhCBtk38c+uetf3nHDDRP79z8h3H9PPJR0ARkTDFgNtFY+i13imddo3M3OsENU2QT1wSIVwq+O1aSWWKtcZKgRpEiTOXRPBtjy0HGgsg+I60uqG5QRW+LGn0874OHGBwMu33XJ/5W2rPPAppNa3yTBxCFSq2GjAPFgNyozAygSZmewHS4QxqxPa2GMRsBT6UzbWIJEaoUW7bWgYrWb8j5uQ7dgctLqLjXtUg9CwxQiXn/MzTauckkRALm1WMDw/NCxv/Hy7ke8/dNKyWwgbI4Hxx1d+H+KtTb47pOe/uz617750R25HejONDITohJ2w2o3s5ZS60+aGxWgUDx9zpabPDKwfOIUhANZVWp5OCUI0TQZVIURnwVklXkcfcoUgnFmvewDwgVY7ou6GThyky6nTYvMTcY8gvZggJGxtmTw/3pLatsP0iwCV91gwRjE3Ql6JoeBvhhZyCYL2qUbKObTuoibRRhH0Hp5zrFIrdCiPbSc1LpGt7A2gUHsSupRXhVSJ7yM1AaGqWiRC2oUYYYsDDCvYmRdO/5tx2Ne80Q1fP7trbcUhE5ZZaYQhI1jb7xx9C8uffn/Oi2ondkz10Tq6g9WERSt+ga5K5rPTVBKrbUVGOWl1kuvIBycFWJbSm3dNNBV68J8vh9p0sDwthqGjusHqozW7nXbnf4kNqU2dhrLyZbRS7B02IOAltS2Uypc2S3+H2MCo88jNhHQCCj/QGWoBz3To9CRRq40z805qWXEllcpn7/0oFgLkVphKW50KJbMy/1ikfd1Si2bmyiW1WsgtAUizfQD1iGplFJboB4lWIgHTd+W068Z+LUPf1ha4gqHA5Fa4bDxD7/+xEt6vv2jj43ViyRj3mKh0WUD15AUyJjR1651GdikHH5Oc1tvIQhrsprUshVuYTWiMESKBvIoh+3JsOX4XkSTBrZyL4pIu6FmVYTIVP0iyzYX0xIeBFDaXVpPO8exFanlg8Y9UITAAuW3J0T36BDioV7oQIMaqwLbllqXxsDnLS0BVtKSWkEgzJ9lLq3v2teS2sRVhnZSi6YT3silsQQwLpgRuCjtXNSDbGDHT7adctG5avI5/yWfqHA4kDuUcNiwH/vY5Ffe9MGbJvfnJyqToVspJFkBbki5tAPGa92ICxCX+VV8VJRWWAsuhFqVLg8ULEotva2SVDCfzSGJK0h1A1lcx8D2CIPH9QBd90AnmRM65bqLVd126KLUkgew2PIDcMLuhbb862JOLdN/+EUcIIVBPQIqIz3oGh8GatwKNihM7qSXkVkeGAvD0H0kRVGs+MxFaoWlLEotc2p5PbJUHscVz0zw8cxJLRunuOcjQaZi5EEF8/GIDSbO+OTUOe+7QrVb/gnC5hCpFQ4b1trw1ie96HX7bvnWm4byRjKsLJIsg7U5It7oEKHOwyihQk1b5DZlUReRWuGQHChXDnYj44ZmXEGWU9kKhEmEuWIv0NfA5PG9qB6TIMvuQdKToJkXiFmbQxdQzAH08+4DXGpLMWdKz5KPyAktcVFaRsgM0giox8DwUdPAQA+a2QKCSPnXlRVJLG3Yf+V/P+BjF6kVluKltrWI8mPJN+rwSWc6b6CnlsAWTWRFjrirD01bwd40BvqPu2nm/Je9UvWe9+/tNxSETbLKTCEInWM/+teDN733f7xrZs/9l/YvzIa9IROoCkRIXHXa/ShcwkE3jwywNr4rNfQAjpQJ/1dYVWrpbAxChjGszt1zFKU224eiOo/eLSFGTmS0tg4TZUCoYJmywJP9LAXGVFOK7QO5rNwSqV0VzRJKgA7hFpTdU32IhnuA3hpSnbrGFg6RWqEDvNQyncyX7OLhsNaOAQl5YAwFApvChgHqNoKtDGPPXPVfd5xxwWXx8a/7R6lLKxxOVp8pBKFDWAnhX597zckLf/W5j26v10+LLTebuPFbcZHahQhIdYaKTVENI+TucPUaE7IglKwltSzp5f/TCAPlttDrto6mmofqTTF1fB/i7TXAzILV5YzOEHChxc5GhUGwlgw+YCildo1riBFalk7KQsDUgL6dW4Gqgg4NTMQcWi8hrVQM5tZ6Wn8eyOo/B+HIhKOEIyJgR7GyBjnb5LoIP+vTBjHyInXVRqJaD+7PgGYwlKJ79+/uuOBV71TqkfcdmZ+c8KtC7lDCYcfefHPP117wuheO77n3+t7m/HCXZSkXpx0okhg5S3tlC4gUV/i+Xq0gHIy1pFYxh8/ykAqjr3yOguHhpzBDM15A97jC6PEjQG8TCBuwQerTDtxTy8oAD2RajUxa0eaWi5Z5tjowSCm1ATC4ZRgY7gVqIerpPMJK4qLVHpFaYePwKJhPP+DVR6nloUyek2B+bevkokJucqhqD/bZLuzN+r9+3KOefm183Ku+I1Fa4XCz+kwhCJvAWqvuetXbjv/PT/7Ju2Ya2RMHEAS2qdFE5g4RKEbKTBMRtz5dv0SRWuHgrCW1gYqgTV6WjWOGrY++moRFu5rIonlM7x5EsqsK2D1ArXC96QsNRJUE1uXXmjXf/78zPt+1lFFKLYW2JbVMOeBhr8iizjqivQn6tk8AkXWfTcYqB+5zZbF8vsC/T9BOxj14pHaJOwtHKjwYpnwnMXdQzI0Kii1/D/1BTlbQYE53FGFeV7AvGF1Ixk54+/bHPe8jSp05d6R+dMKvDrknCb8S7D339PzDEy96ceXW2944mWO4apUr5M4amGwawxPoIdspuhlVpFY4OGtJZytSy/xsFyEyPLHPIqsxMpWjbubQP5Vg+ARGKO8H+gtApWjkCnFSRcADY2Ve6lr/xn9XWpFYwjqgB0otUw7SyKARAYPTo4gGqrCxQsOkqFRiNHOmYsTl9SdSK2wQV+3Apx0EKm1fRxxPvg65b2bXyAsk3f24N63kzWTbLUef9ZtvwJaLmEu71spJEDrmgXUXFx5Q3PeuG074zw9++vqRe/c/NTZ5pcIsBK7cC5bn9vczpiS0boWCsBZrCqebWFlIyEIFGtYWZZ5tAhOwdm0K9NTRP5OjZ8YCoxoIc6QmQRQlULrpUhdarPnv/DeEUpv7DguIXXH7tps6T2W1g0ZiEQ91uxJeRcw8Writ4DgJfbcwthBbIrUtz/BRt9Xwn0/ruw+cT0s47LhrL4HiEWC14K8jtslFUtarDRCEBeazDFH3oJ3Vg7f2bjvr7f1nvfP/KKUa7fcRhMOI3JOEXxnW2vjWxz/7qfH3bnsb7r3rONatdZUMjQUPjwVgn3k/QbrC8Zxey9yspbHbpdLbepwDd+kcLjy4WVM2S6k1YJtO1lplhQOLwFagArbqtGjgfmS1WWw/qQvBuAaqBXSl6nL9vNQuCpz/d9hp7ICRVdZVXuTwjDy/9b+kBNcGcJHa8vXtZgv8n8XHQ6AZGaTVEEM7p2C6YmSRQa4zJEmEPGsiiiLY/7+99wCX7KrufP97n1Dx5r63b3ffTupWzllCgCSiEMEgEMFjgm2SBxgPxvOweWP72Qw2g4d544SHoAGDBTxhkywEkkCSJQQISYACEgqt1Oocbq6qk/Z+31r7nKrq27eVUOjqu3793a50zqlTdVad899rr2Dykl45ImqFJ0yXp5aGjyRu+TmqeGCpVa7m31HT+Ej8kZlGee1n17/8HR9Tg6+abG9DEJ5mDnClEISnB3vllWPXv//PP7L8kV2/PWjS/lbS5PirivKhLU0ek7dWo6UsDGWvW4WAOyJRmgHFSNLrLk6LLtoeNK/j5DGoMNPTJC+EXsQJssIC3C0JU2V9eGwp5J1sYTbdhdq4xujJY8CgRZxOIaxR3F/CoyNjqDuZgvJzq7IZT522R06c0NjxalpNteJdwfmnCu27qzzQ1SyBKG4LFp6li9fpec+HyTL+3fAGqMaZNogDhYZnUZ4YghqsQNXL3A6XvLO0mOvyl7NAwB9wACEcciw0tYIDWUC7OAZZP5kc1cQzCiqhOTdLZce5Q11qMp4poRmTOTOAyF9z99pTL/qQOvZ3v9vegCA8AxzIdgXhaYGSxnZ/+M9Pvet///PfTjSzM0uw2ifBYDIoQyN8OhVStyMLq/NMWqW4rSIZp2ui27nokqil58nLS89KR7KlTSFqO2WpaNCjoIwPT5HXloY9MSI1D28ww/D6KsI1FaCeAn4TJp3nMmCGpk05qYXOihT5nZFedJt8hkUt6YS2p5VfyG8LFjtL0zL8Qwg4pIdqQbsfj0aqMsQlAANlVMaHkNZ9ZCXfDQANzYLQ74t2n5LmFr6ZiNqlxP5H37GYyRELzSWlJEt48G3AgyGrYxgql6foNoT1BrBjrjo3cvgrPj94ypv/TA2eIF5a4RnlQLYrCE8b1GnsxrMv+LD3ywf+YPVcOlyxrlkupY1x8XdDflciF6ra+WjpGk0JZe41J22LTjXFVDC3PBWWNCwO6Rsgj6PVLGaVoWEPWQlF+rVggxhxMA/bH2P5xkH4q/sAPQvoGYBypagoPMXCaFo+Y8FHorYtNCkYlU6XbLlUh5Mt9dcStYQT5Y72ez0Z8vpkNk348yvfQ5PmNmoa1fFhqGV9yALLbYJjKqukFDytoTMLm2X7iFrx0C49DmRyjycMCrNxib6A9kq8jkliQCXwvAiRChEHy7OGf9iNE+e8/V1q4qJ73VqC8MzxeLYrCE8L9ouXrf/OH3/sL4/bG7+23pwvkzfN+gaxJY+t5ZCDQtSm2kNCnWo49pYqJThDJa9tojQXky8IKfzxQGdmYQngjIFMwOTT6BSX7f45UUueWoQpWpjFvG5iYMLH2GGjwBC1kN0FlGg9L+/KRTZoYdOMH7ogl0VQLjTm1xW1T4RC+HI2nzlOXgAAIABJREFU+YLdIfHOkBgnDy0MshAIR+oIh2rsrc18Kn1vkOSly3xPwaP1qKyXXAGWNAew7scVBmSHbI/K51AD6/luoiDJoFUG7Sdo6YqdwprdEye98uPqhI/8z/bKgvAM8ni2KwhPG1s+8Bcnb/mnr/3DxhhntVq7VF9YxZxp8MkwyCiGltPIkGgg4alji5KhbmRFKAIQU9fdvAYnnVgDSmY/0JlZOMQh4UqitZixt23hV4hag4z7jdG0aKJbiPU8TCXF6Jph1I8YBPzNQMXF1ZKj1vNDFrdFUwLNMwG0dfIC51USus+az6Co7Raz/HjBW9PnVNaDSVPoUoBYZ5jLMpRHyqiuWAYbArakWdRSQhkX1LOWugXn3w7PouRbE5YiBzr6T1QYUExtnFHrc/Bgic7XFNedah+NcCRW46f93eCLfucvlDprpr2SIDyDPFHbFYSnhVtfeNGbkh/e9vnVWlXCNEbmxXy5pnKbPPrXVOJLIyOlS4I2TyZz/jMnPJyodaqD6nOKqF2qOFHrrIP9q20BSIlTdJf+514fNobxUmR+jNl0GpXBEiaOHgEmWkC1AdDrFMdN2WFUNYGrcHhQLPrS3PJyUdutLp8BUdsdkvBYnlQWtfCR0pRvqF1N2gAYXLUM/vIhGBPx74TDgWmQmMfU0k+Lk+J44NjenAjcJcivI2ppXaNcgwVrM4RaI7AKrVih6Q3ADBx+6+iFb321qr1+W3slQXiGeSK2KwhPG/aKK/qvfv9/u+TIuejV3s7tpTLNglK2bB5DQFKCpo/pak4ihYQFyQYnUAgXW5txj3G6sOf1OYUlyIFErclLw7nEQirzRV3HqJOY9TM04nnYIEVlTGP5SX3AUAQEMWBbbGRkTpn1oFSnggKotTO1AKUX6Y82/gwJ2m4hS8L1QBR2T+u0PIOkohCODqK8bACo+EhswkljVKaLRSx9Q7kAcaKWkuPcNroR763wRODfCVWl9T1YauRBoWCej6mojKT/uHv6jzn/Y/WTPvil9goHwNo9E0BjmFqnI5zYCdQiYG8NGN6tlGpZa8uY27QR9bHtSvXvbq8oCIvQdfoUhGeH+G8/d/I1H/mrTxyjyi8Jm3PwsoS9ryRuaaTvMsHpEkx/rjkDyQf6o0fkcSKfmauMQG4oYWlSiFqyHbrEFi06na040UkWRHZEheHIE0uzAVRyKEHDm8b48XVUxxW8fgOELUDncaa0OR1AW8oi42EUoFJXMot59gTtYw3assxA1XzMmRR6IET9sAmgFmA+moPxqG4viQbjflOUJJZvjD6R89Tu/zlE1ApPDOoIaVAOA9gogckUslId03bZXXr1iz8+9qIPfF2p8fn24otAScQ/+f5n3u1lU79hPW/nyrUnfktDh7vv/eULTjj5uEux8vjb57b/8rQt99zzwVVrjr66vv4Fn1ZK0fSeICyKiFrhWcda69/x2t9+2e6r//0v1yX2xDBpohxWoKjUV5pyu0WSIAHKaOX6goSJi7ily3FH1FLxb3pGWJoUsaHOBpyoLR6x3z8XhIV0c35+OvMZREELzdoM1hw7itK4AvxpoNSiIq7sweR2u1z1gNammFpnewwtQILwsVypT5LFvLS8/ySk6Zbqx1K1EIJ/IxRUrjCXWeg+jb7Vy4GhKpqmhZbN4Jfpg1BdWlciv6gbwqu3a9GSJ9ohYlZYiBv4OBunW3pcPO/6lMTOPhMLGw5iWg3MYOTEj469+j2feSJxtNZaHW2/9RW3//I7nzv15JO/q6vDX9rx0MOv3nLHz39342Er/7r/1LOvePQXP/7Qtge3vOGIo8/6zsBRb3ibUmquvQFBWEDXKVQQnj3sD3/Yd9Mf/dVbwp9v+rNV1q6MG3PwEGNAlQGbchSjpTanlqQrxc262Fou8M2i1nlsxVO7tOmIVYcrtdXBidpC+u5LohNElSbCZRYrNlaBcXJr7oTVBorqvBLkqS2CXFnILhCxCzuPPUUKQcvadaGg1dQkgt2y7v0pSNjTMNogUha2qhEO9cEfrsNUPTQ1/X5czV2e78ibLXR/B07U0jOdS4CIWuHJQYOlDFGUoFpdhsm4hmbfhitWnfX6/wtr3nKXKtrTPQ7WPjh+x/Vf+7fjTznq86iP/9v8Q1s+tOeB294XBNltIxPLv7l97+73JNPRiomNZ11bWvOa31BKNdorC8ICRNQKzxn2y99afs0ffeyDY3tm/lN9vlVZVakiaU6zVzZSBjM2gqfLXDapELV0IuXwg3adUAk/EBYRlt1ik0t8Fbh7dOJLlUESWsxjCqNrAwwdMQD0zQKYdrVryeC4GwOJ3a5T5T61kRd576fAAUVtSmXHchsnUUtLeFTNQSGizmEloDbWD29kkJPFWki42oGr9UzllVx1EBer7jZD0Pr8kZ6e3RcOcRZVp3lYCzVZaKIP8/6ae0eOf/V/rZz0e99WSkXt5R4HaycHb7r2kkvOPPuUT6F83E27773+D6KdWy6seGZ8y+y2vpXr1lQaO5thZWTd95Yd/YbXKaWo84kgLIqIWuE5Jf7Lvz/zux/9m0+cUhs+pzoz6+l4kvUEFZC3gY+USn2xqHXxk5wOpApRSxdsSRRb2jyGKltU2BaiVrt6Bp5Ci8p8lWawbG0F/UfWgUoLNpsCTRrwHCudJduxp/ygy2P7GO//JFgYeuAVm6VbDj8gMasBX8Moi8hmaCmgPFpBZWwQGKjzVHDDRlRbiZsqULwjNaJgfywJ23yXWTzzx3AVIgTh8Vgoal0YAg32fKRe1e5s9d8/eswrPtF3zvsuU2rkccMOurHW1n5+8z//wcmnn/Ft4Ij7tvzqe2+sRM01w+MD4YMPbTpq/dEbvrV907bfRDjywPixF3xAqadpekQ4JJFzmvCcQm10H3nvn71k079866NrY5xam5vxAxuBAxB8Dxk3V9hX1HLlA5oi5o5jImqXMkW4QdEEoZCejnYEbRfFciz1+HUbGMyaSXh9CcaPGEB5dQUozXEbXUoc47+2qM1vWdTuv/WnyqKilpWEAhLqvEedRnwuddewGYyvYKs++ieGoGvUbSFAStUO6BfCbl4XC0lhwW4SeN9TfSFS5AKwtOke6CxGEVNLixUxtcWf0SUktmR3xv2TfROn/OPyM9/1P9TQyVPtlZ8glGPRmL7/hOrAxl9RaIGdmVmGNK1iaIgqHVBSmG5tv+ec8vDoDlUauau9oiAswgFMWRCePeikdtMF/+GV0a23/dnq2dYJ1STyAm3QSlvQusSCgsRr4SVjOUEdnRRNf4moXao4IeiEpSvttjB2thC1RQIZUdiLKxVHr3F8dsmi6TVhai2Mb+xHdV0V8KYBb47aJLlViUWqBTxddPYxF6LtP3KzUhyBwjw1/dVAOFBFeaQPwUgFiSafs/uMFMbYvR3y6jr2PdUXEbZO1gtLlScjagucl5Zi0qvYE1db3uAx3179grd+RC2/cFO+iCA8ZxzAlAXh2cVe+2D5qv/yjt8buG/z769qpKuraaxDz0MzpVADndcd3TeuVi7HSxsWtflXUNSldVbi6LYSGgDxhbsQvpYq0JK0I1GbAkEZLT/BdDaFypjCqiP7UFpO3T0mAR0t1IQdfl2R26U5FxW1FHpAYQdUi5YELSV/9ZVRWzYEf6iGrEytpiOucKA1fTa3wSLpi7+jfLvumWJ/6barS1qXWBGWDt1x1sSBxO2Cxdi+Wl5/2qisvWXixNd8FEe873sSFiAcDBzAhAXh2cdefvlhV33oz39z+NE9716d2Qmv1VAkO9zF3nnYyL9GD+kkS38citC+VLuQBLe0w0ka94g9We3XizVEGvcqBxK1hLOR/UUtLeeeoCWpbBy10fUQQSHzNGI/xpyaxuBqjVUnrQD8PYA/C+ul+9gP6z/eVr49qmHbTfs1tz8dWbDA3oqni8W6oddI1AYeUpuCCn7amkZlbBilZQPIQmobHfNnYzFf1KE1rskCb+KAojZHRO2Spvg9UBnFwlbcUI8GUgbIUp4koAETkVqqd+AhzbSZ9kZuXH7Sa/9n9aQ/vkJqxwoHC4udSgXhOcNeeunQ5X/yyf+0Zk/zv4zMN2qlNELAZ1WFZhrBVyWU/AqihGSI5n731AqUPA7aulsuNJ9/AtYFuTCmW5YZFM6QLyE+396GjitRiM1CtNH/Cwcs3aLUYeDlTRk0KtweN7YpWqoBrz9FadRg7OQxQO0Byk0gTJFG1I2LChJwr+a8tQMFfi+SkG0DWBu6+8pAFe12u6snUNBrDscs8r28DAILUwuEHpomQysA6hNDCMYHkQYKsU1ct7AFn7Pb+3Ygz5sg8EDQ5KKWorEpuVB5yJSPlOvBZUDSQF8lQDw/B6gAQW05ts1kQN/y+4Y3nPOB2hkfu0aqEQgHE3LKEw46Gp/954nr/vQTl67YO/vClcYiSJpQ2qJlEgR+BdZ6aGZN1HQfYhtz0lghasmg6X5h2HR9z9gDQZm6ImqFbqg6QMraUSGEhs+JVk1EyLwI6IvQt8rHyJFUXSBBGu+FF1L9VwuTUrmsgNqT5VUWqI1uvlm65YIFVOM2ZNvTLGipsQhZZJdXl2vQOhW6j6jlJ6jLmY9mnCItAeWxKoLRfqCvjMg3iE3G9WeLtxWEJwWdD/MZC0XVZhSVufOQao1EuTJyVd8imptCzfOhgxp2tspolsZ2+suP+sTql3/6759M6S5BeDaQ86Fw0EEVER740J+88r5Lv/7xjVPRsYNRCxYJgkoJUZYhTjL0lWpIWmkeY8uFvtqfgyadCfq/e0qNvHTkl3CeXOehkNjcpQy1zTUsJrUlj6urSZsgRqpixEETaaWJsQ2DGFjfD1RjGDMFHVBlDossoYnYok4yeWtzj2nXFC43OShCI2jQxQKWlsuX1RTZ6xokMO241swNxnyNmcSgsqyE6qpRoOIhJVHtAzF1Deuye0F4spD1cDNyNiPKXyAngEZKs2PWR2A9mDhBNSghVhVMqv6dZuC4v1314rd/VvWds7PYjiAcLIioFQ5K7IMPlh/9xKfOvO9L//KR9Zl6STlNtEoieOUQWZYhTTLUgiqQcPQX46RCEVBAgmLhBHQe5ZiLW2Lh68JSwkD5efwp5UxxO1nftclVNIxqIfJaMOUYYxuGUDtsCAinkZKwLZFnlsSw83jlluVuuTJHllfocK8XlRkUPdHlrbWa6s7mJbzyuEWSGqnKEHuUHEaVDkLUx4eBegmZzbi5gvY9JFnGMxiC8FQgy+HqGFRFxhTnRBd7TsKWkimRhtwAJzEBUn9kczJ8+MfHzvvNy1T/+VRuSxAOOkTUCgct1lrvV+/6/ZM2f/OKTxzZxPn1KFNROodauYL5VgMlrwydkVhwZky6gDUGiYL8hO0yup107XjJOhT1TYWlB9e4pdl/urBTchWJRCp4QBalqDkDdeYCUi+GrcRYdlgd5Y11oDSNxO5GUNM8qHJGR311SQ2TqE0BFXG73TasPVkt59bqqg6QxqX38ekOi1rLYQVJACSBQlrRGFwxCn+gAqpCy2+V12imsEcS4hI3KzwVnKjN76mU5xY8kyfkGn4E5ZfQtFU7a5ftblU3fHT9y/7jF9XwadPFNgThYENErXBQQ8L27re+90XbvnHlx9elwXHVqBmGsCjVQszOzyNE2BVK4KAIsSLsgJ5lZxYl6rBDjjxoJCbcY219vhWWHk5QUmMDV7VV2Sy3CRomUV87MiDNiYgR5qAHEwxvrKK8vgzUmrAZlfvKS2KRqLWhs6Vc1LbDEQpsJwK28JAVjlYuZk/7YwxalLBTUrD1ANXRQSdolUuILAUhi+80jlAqlZAaZ8+C8GRpny/btmjg0ziPfgMsaktoqpJJKqs37y6v/fTGl735EtX3cgk5EA5q5HQoHPSQsL31ot89e+6aG//vIxP/PNXYU+Y4ME0dllxlA02ljwqsm9IlCtHg5RnnJGIy8r7lyWW+EVG7lKFwFQoToM6bVLaI2sqSM9/LaLDk4mwjCgLQFnEwh6xvFmNHDKG8pgKLSaAcIdMkhikprAgxoHmCrmoIZItshz7H2LpBlTNMsku6azzLdhmTp5YiIAYqXIe2PDyAlk6R2BR+oBFoD1kaQ6UGnufl++/eRhCeDM4C3bmSzoVki75N4CYYqAJC3cyWJzY3a+s/ufK1b/28UufPuTUF4eBFTodCT2Ct1b943W+/cOryaz96VDBwlm3N+WUfiEDJt3n1A8pyYIoSXu6+m1Zzr3RErXvsZ9StzN0Xlh4kDNOMah64VrS+0jAUX2h9UHsGErX0f0LSVs0jrTSAvgQjq+uoHTkC6L2uUgKRe7sok5ytbz+78lngkpmSffIz9GbKIPMUEl8h1hZpxUNl2QAqy/qReEDTxPBDD1oppFELntYoUfmxOObYWhG1wlOhELWE885Sh0YK3vKQ+DU7g2W75yprvrj+lW/976rvwl28oCAc5IioFXoGe4sNfv7ffucNe6/5yQdWR/rUQZOEsZ2FT6I2TVHRZZAiUV6ARhbDUiem3HtGopaMnT1blKZDLykSFZzvIyxB2KuaX9S5VW73QMi6WggkaTMkXPbIegaxaiItRagOlVFdEaKyoYIUe+H5KVRokGURPCqI4CnYuAg2yMt28ZSCdh3CrEGSJPC1gvIVImW4uYI3EKC+chl0XwUtE3NJL/Ik08CMoP0oZh8IEbTCU4XMyPMCxFETVQrQptku5SPy++xutWy7GTr8y2uf/5r/o0Zee1d7JUE4yBFRK/QU1trgzje+97xd19z0h8sb6YtKZtrvUxlKMQlXi4wncKkqqMcdoujETUZOiQ/kjSA/BL3OvjTSGF1dyISlBclZN+RxYpbSxLpForYWAYW32JTLHtG8LJX74qYHZQ2v36BvtYfauipQywAzCTLEzAJJCoQhNWjwoOgJGmyRoKUOXiQeqD5tQHG7MZrGcGJYOFRBMNIP1AJkoUchuDwII6jjU2dPHSJohV8XSjSkduSKkhNTBROOYNL074n6j/2b9S9/y2dV/fzt7YUFoQcQUSv0HBSKcM87P3L2PZd9/VNrs/iE5SQ+mhE1b8SgX0diUsyYCDYMkBiSrxo+iVr21pLJux5MTh6QaOgIBWHpQCLRVZmlQQ4FDbhBEFsDJ3nRMxROQHng3clcNHiySL0IpZEEgxM+wtUVoNpEihmYEjVf8pEZ8gN73KghoKldcrFSuAHrVM2dwqIsQcQxtAGqy4eAgSpilfJMgvYViw4adHWHyHQ8ysV+CsKThwZtHgfQaqR+gMkoRKRXbu1bdfqnh8961aekbJfQi4ioFXoSSh57+AN/fu6dX/6n965u2Vcvs17Zb0aos08tReb5aGYRF68nnKgt2uPyJG7eRlXaLyxVnKfWQXGEi4laRV5ZqtKVi0rP+tDahzVUoL4FE8zCVBsYWlNFeXUZqDZgKpY9rc1WC0EQsLVR7CxJZ83qlMsuIDIWjRAoLyuhMjIIlD1OEjPcqMydmqkOA+1j92xCIWrp1g3PBOHJQ6I2LAWYayaY1QOYC5bfXRo77X+tOftVXxdBK/QqImqFnoU8tls+9Fcbf/X1f/lwadvkW1eXqkF/M0aUTKOqK2jZGFnu4hJRKyyGi1Ut5K0b7DhcAwWWjx55Sy0Me1mpmS5VsqXyXCkSzEOXU5h6jNrKEPXDBoBqilY2BxVyeQ3AxFxVwaNGD5QURk+RZKaCCSNlVEYHoPtqsFmKZpbAo7AF30OWJZwcxvtZ1FPOb13oQVcXM0F4ClijMGPqmAzW3zWw8XkfW3HOyy5X6qyZ9gKC0GOIqBV6GmqpO/fJvzv6J5d89RPeAzsu2OCVvXocwWbU8SlFktcR7VQ5IJPneghtT23umxOWINyAgT2hFF1LflF3Siz60nFVBM+FHnA73YyWoH+u5QcHIugUURDB1GLUVpQwOFGBHvGBcgyks0iyJjdK8CsaLWswHwFhH1AjMTvWhyTQXE4so+YK3CCERGu+X/S+fM+J2aJZCEcyiLAVfg0yhJht+fCGDt/kr3v+/zN05ru+qdSYlO0SehoRtcIhgf3Ul468+ZKv/KG5895XrbbBWGBa2qQtaMouzzPGnSBw3riElQo9TxnqImqXIuw1zbt+uURClzbmisC54U7KzTooo1C5wgWUbJhR6SNai4StjxZirjPb0k20vFksW13G2OEDXPoLHmmEJid9JSE4fjYtAaXhKsrLBpH2BYgoeYy2yVuj2AKuxcD7RRU8SLxSciMPx7jlbuG5pZam4q0Vnjxaw0ZmILYDR/2sf/05n8BJp35PqfOpK7Mg9DQiaoVDBnvl9totf/KuN8/+4u4PrtD6yAEkvo4TBDZ1dWyLDHdoxNyS1M0OF9G13RQevAJpp3vowaKWzoDKtQcloer8tQ6yAKN8rnZAIpNq2mpSlJkbDFGENtVFCFDm7VCThsRvIgtn0TdqMLamCoxqDkeAH2GaGt32AfUVAwgHqoh8g2aogMBDaBRsmsGnbSvnCebyc9rVoXUS180z0L5yWa/cRguvrtB7FE04OEC6fZ7Z9/h2ZpL4yX2qXhTrF5uhUnQF+yzH9kQDJAqbCUymvck5Pf6D1Se8+n/h+P98s1LUBk8Qep8usxeE3sdaW7r7be9+3abvXPf7a5rZKeNaB3Z+WoUAyjrky0NiDSeQZZnljmIEXRMKcUBih+7T9aGYDiYh4aaoiUL2sK+sfV/oPQoNwN5PPrKd40lHnsu/dSdm5cuRV5ekZ1mVMGcbCFGGH/iYM/OI7CxUOUJlIMPohkFg3ENSmYMd96EnaojCBEEI9hKnSiNVNu/mpDo2ZqneAjUR8dr7yPVq2RypIoPDPd6fbkEjHJyQIM10riW5XbcHbUJ4huzAGaUCvZ7C8oEmK6RkRjq4JFANrE+x3ikPyHxF29AwCZ27NJSnEYQ+ZmbnYXwffn0IMy1t9rbCLcvXHffF0ZPP/zzG3v6AUoUkFoTeR059wiEH1bLd+uG/OO+mz3/pXSumWi+e0MHwIIXWpjEMUr5MJFyUSaGMctsrxlGU3O3J8EWExAQlB9Epn71juZgtkon4uiOitsfpDFDcke2IWh7k2Lw7HZ0pSXCymCVJQZLW2UDZK8NYi1kzwwlkXtlDM51HRC10B5PIrgo3rX/BYdvLa2trm6Xp1ZnfCG06y4ljqhTwwInsjMMaaPCkFHQuaqkFREeg5vtG9sm251hM2IqoPfghUWvYQUp2FrpjzuK2c6ahvIBifsmRd42xPizXTY7gea50HA3SSRBTfLZS9DhDK26i2j+EWFexq2FNMxy/f3D9Sf9n/OQz/knV3yg1aIVDDhG1wiHLjk9/esO9//iV36o+uOttY7PRYWNegDSL0DQN7vikPQ9ZQt4vJ1TYF5K3MHU+Eaq3T746B71O2pg9d/mT0pGsl+l4veiIG3ZYuRhVF37ipCN7ZzmW1Q1saA0nacleqIVuChVQndsMAXxuw9yIYzvT5zW2D3s/PPb1z/vH1a89+f7W7ofP2Pnwre8bqSUnhuGs34ymePBETRlIyFLXMW7LS+EHZIQUikCvtUWrE9hEW3pL6EHPQoMRlwZIg5Q8drprVqDrKDvboy53ZIf5yceZQsrLplRmjrz6NLNkUgTUfkZprqkc6RqmveFmVlp13dC607/Sf+bvfF2pcWpgJwiHHPkpUhAOTew3rh2863P/dNGWq2744IRRx42WQpjGHHeGCvJySU40FMKikLBO6tASJH3o8kJ/WRGaULyWJ+4Ivci+opZFbH583Z/7TCQ+6Dhz3C0fd+dJowFOQpKWks0CzY0+SESkfsnO1euzyeqV/3bqO9/8d8H73k0xi8baW6pzV136jm33//j9A3ryiHIYe1AR/MBtkTxr5LGlhDFniwZK5fGVZJ/FSGqfMBn3lNB7OLuyfMv2pt0tDZpJqLLczY8/iVoa6LQHV3xruLAcLUOxshk3B7GwNuFwFupaF6sKZpLqJIaO+O7E0ed/Eke/+06lVNx735YgPDHklCgc8tjttrbpr//ihXdddvk7l+/Y+6Jx7Q+GKSWQUc3QKI9Xc1O9nYQhB4keykVP+eJBz1DmO11MnLBwE9YdISz0Ds4r5o5dwMecjin9b5CwN94JDDrsZBfklc8jXXkdWjrxDLzAQ5pEiJVCq1zGQ8o+Wj/n9L9+3vs+/F286sz7u2MW7cy1y3bfdv3Zescd76+nO15q0j1KqyaUUUjTlIUt25hPwiafdOYpaT/31JEISrl+By2XahI0chrvRYrKKyROKQaWD3Xhsc0TwjqJYMUxzs81NMiiShyxQSkIuSFIklF4VcaJh5HyMGfC+dgfu6O++pR/WbbmnO9g3evvU4qLLwvCIYucDYUlAcXZRl/+8rrr//qzF/r3b33XYUH1mGRyj6pRGILKOAaNoHq2Try4n0bM1UNpes8VzqfOUD4lZeSiluQFdaISehM6pqQbCg9sIVmLMJNCS5DwoFf9QohwDDbZhwW5vWw1xLYkmp1fMfy9U972W58afP9/vVmNq0WneK29JcDPbti47b5b3qYaD/6ul+4ZpX5moWf4z9gYlj1tNKCiRDGKoyRhq+DbDB7bINVhNkjy6ghCb0LCtsP+B9IJ3A7klSVI/JLdBuShbVFzD42gFCK2GSYjg7g0uCUdWPOl8WPO/NfqkafcC7xiVhLChKXA/r8iQThEoUYNuO662s8/99ULdlxxw0dWp+rEetTQpYxELUkahYC0RO6RoyCDFiWW5bkZPN1nSNA6fwnJ2n1Ti4RewvnYnWeU7/HAhg42p3u1T44UfOI89Qaeythb6pPohEYLCvNBGVvKendw3PpPnfnB91yCiy9+lMINHuu7YFt85DuDk/ddf2G8++53JnNbz6l580Hdj6GzJif9sHzWAYtr+uP95aRF1yGP91u7kJgCOaH3EJSEyGcTd9w02RQPstygqaAIRaClyE55hoFWsBrlMERzvgFlMwTlOmJmPJgwAAAdXElEQVRVNlO2viVcdeJnx1ae+jkc/e4dj2eLgnAoIedAYclB7XXT//6Z5934ha/8fnnb9hcNR/FAYJRXNhallC8bHHRAYQeJouL7hagtqiAQ7n+5WvQuTtTm0/iUVEOJNpRHbqgRLjVCKLxiJGpJPGYwHOBIwoNryNoZXYl39Zce3vAbL/nkive+7f9Tp502/WS+EWutj7v+4cit9/zoQ9n85tf32elaEE95vk3hU9k5CpHRlkUtQTZIWfK0jwRlz7ukNoec0HsIFrVUbNDJ1WKITKKWDnQRtMKzBfmUQX6TJzUqJIlGWK2zLe5uplEUjNw9svHM/zF09gXfUurli84UCMKhjJwDhSWL/eGuvtv/5sPn777x1j/s2zVz+uqgWi43W7A2hucZtLIWAu0hMy4EgRIv4JE3j9pC0XXHUhEFpqhnK/QSlGjlxCMNUiimlQ6jrwLOMqf4RI+LdPnsz41ooEMdvkqenbNptkPhodLxx3zxzPe84wvqd96y+df55NZ+b3jn9de/av6Bn72zip2nDKrZimfnNdIGPF+x4I6TDJny4QVlQAXIsoSbQbCH7wDICf4ghisZuKRARQMXKjPIyYHuqFGSIC3DyYM8k2RhKRkxi+BT1Yyggjjrx7QJ4nmv9mhp1eH/OrHxBX+vNrznkYP4UwvCM4qc84Qlj/1//+HoG7/4jT+K79n0stHYjo54mop/waYRbBaj5Je4tFIzTRFTiS8V8J+l2Ebu/mRE1PYgPI2rLZIsgUWKkIIOaOCSZ6RzOAp8rmlM/twsqGLat3ZzEk/1HT5x68bzz/vCst/6q6+r56nm0/Hxndf2kuO333vDu+LJey4c8PZOhNmsZ+M5eDpAqVIDlIfZOEZmDMJyCTZN8uoIiyMn+IMZZ2dFNQueI7KuPnbbM2stgiDg+2mSsOAt+a62cSPyTeqvmFUD666vTBz2mdIZz7taqQsjXlgQlihyzhMEunhce8uy27966Ru3X3P9K+qP7jluLE5XjIR+KWk1XVIQt0WlWNuQBW1EsYwkalk4iKjtReiIRkhRDioIfA8mbXEdYy5WYOiYZyjrMmJjEKkQe8ulye0D1Xv7zzz2ipMuuvir5bdfdO8z8bnt7h+tmr7/+6+cefSWC/XMQ2f3q+ZYhfx4cZP3SYcerJchNhk098rrnMYXCtwDneCL5STJ7Lkkg9WRE7U2gDI+lKKyF+STdTVXlM6QGJoW0vD8KowtIcuCLDHlPZkavrtv1ak/qq0/5VJsfMvdEjsrCAc+5wnCksNa6+E731n7i09/+YV7fvjT147MR+cOaG9Qt1ocY1kLShxT28xaIN+eR9PUImp7FhK1pVof5hrzSG2EkvK4y5fNKAyBpnfJS6vRLFWi7cbeqTZOfOuUN73l+5U/fs9Pn+nSSGyLe742vvPWG37TTt/7Bm9mx+EVLx4qeTHSrAFjMnLaUvGv9jqEiNrewSoKZ4mcrZkAvqKuYnnimE1hdMx1kK2nYP0aUlTs5GypGWXVO0dGj/7W8g1nfxcnXnC3UutbvfOpBeGZRUStICzAWhvu+rv/fez9X/n2280v73/VaKzXhCYNsjhiD0o5CFChhDHj4uDydfK1hV4ho+SwvHSXpxV88oZRkqC1SCzQ8GF3VvzJ3UPVq1e+4oVfOOVP//QGNf7sdmKydnutdec3Tp/adNMFyfz9F1ft1PogixVV4Qg8IM5aeSvVfXk8cSue2uceqkGbecq14jYeAkXx2/Q4pRQwGCrvFhi0VIhGWjHT2fCWsL7xe2OrTvlG/1Fn/lgNnT/13H8KQTi4WHiuEwTBiVSN625aueMbV5y6/fofnbvnngdfsyz0DusLfJVMTSFMI/SjxAlGXB1BRG3PwWGLWiOxNNVL9z3uyhQpbZthsGu6r3xV9fQTrjz9Ha//KV73ugeVUhRa+6zDtjh/3dj0nd8/Z/7RO18eJHvP9ZrN9Wk8HVRKMRRXyqXEos7pXETtwQ+NOwzVGaZEsDyGmwZUlABoNXlnAzRoZkjVH04q4zcOrDj+26PHn/NjDF287bmyRUE42BFRKwiPASfv3HDD0H2XXn7SfVdd+dbS5h0XTgTByKj2gSiCYUetS/AQeouipFdCsYtBFa1yBZujqLGrXPnBupee880TX/fqq/AfLqI6n8+JmF0INRDB7qtH5++75oTJrfe8zWtsfWXZ7Or30eTyTyJqew+PwkcMHbyMDiB3lIsNid0+oDw211IjN5SXH/GZwfVn/gyHXbxdWtwKwmMjolYQngAc4/iVby/bfvm/vfy+63/8J3bX9LpBz/P7qStlRlPWmRMWebvVosbk/rjapwVF3cli+X1fJf8hPeNuFyvcVKzfzWLv3dluZ3vutvj/QHSWW4x997fDYmss3NfF9vPxeOy9WYx913D7kH9uampAVWjDMvYqg9lq5Z7Bk0/83HFvetNX8ZJTdqv1B2esIg+09nxtefP+n521874b31nB3EtgYt+zCXyVwrM0fU2NGsgOiyOUfw+caV988XS/eH3BwWmvl9NVC7d92LiWKq1Hzyx2+2zwWEb0+PvQ3dGr3W6YErUWXdV9B+4l1xxj318ANU3o0PGWd5bhLShq6+K2Qy0+aEBslceNNmIbIMoqc1lp7B5VWnnF+Gnnfhnr3vGAiFlBeGIs+tMVBGFxWFBcd93gLy698rhNP/jBK4f37r5oeWbW6DjxTByrqu8jJEGRGvh5nGZKiUfKg9Ye0owuZxqaspy5HWtRWcEg4EqU3LuKL3b0l/FPlC6C9FpxWSXyzkLtxx3oElqImYWShQqQ0QWZpjppq/Re9NdZ0t12tuuWL1gorakVBa1RPFssWdx2P+8y7Tvr03peXmO1vVzXGWkxoV/sTbF88VrKgsKD9jz2ntMn8z2fPV+8SW3heR6stohTqnpkbFrpM9t1ZWq2Wrtm5IRj//XEV7/2Brz/NbsOFs/s48EDralv9k396raTdm6+47fU/Lbzq7qxuubN+0ESKfpuKbGRFuMvlpyCKgZUAsPOZwtfh7BGQZOQa3t7NT/HCUy50KNuaoUYc4X/6WCQcKZ2rXQ0Civovu0mP7ALxDI3jngqoxv6PLwevdf+7+c22f1cl2HlkKBVrgI1L+t+ha4tMfnw3XPuc9L2bN6og56lChm8jCrzeqC2xVSZgtopU/c3HuAqmNQi9EIOJ0gzCnOx1PGYv8+MllcJ/KBiY1M1s3H/XBqO/nhw5KhLBk494waMvYViZmNpbysIT5z9f+mCIDwh7LXX+r/67GUnbvnxDRfNb9t70aq+2vq+xIRqvqGqWQaqLmk56UNxrUnl+UgTKrBOsXMUy2mgtc/igQQsFdKnFqgkbKmMmBNurmGmu0/X8vxCXYgD9qAVF/XOxb1bJxQ90Bb7sdN7ddYuBGq+bYbWKjZW7EXxLt3bdGvSbSGSqfls5/luwdp5nmIJ3TP7esfausk1i+3ajsfbLZalYvVlr8yDg5jrzSoWrxSbSHWESdxSCbZUWcQaSEIPDWRprMy2mWr9JyvPOP+So97wpn9Xv31+T2eQW3uZF//kwSN277jl4tb0QxeH2eyGAT8r2yhRJSrcr7UrVaZSUCsRQ4lIJFJT+qI1PEXlpKgRgM49jO4IF2E1fATbopafYrvQbXF5YNzLxQErLCc/nvt4jp8MtD3ycDrbWkjHQ91lVAtworazPotaRRZXiNri91aIWidalc4f84DVtVZ23y1LYn5HRclfVsHnmFnwHwlbHYSwno84S9GiZh+hnyao7DXB2PcHRg6/rO+oF9+gVr9xb75LgiA8SQ78ixcE4Qlhr32w/ODll55x15VX/p56ZOvZE6k/MmxM1YsiKikKkybINNWydRdDutCFykOSGcTsGXIXfrp8kgdVk+OHEkYsiTfFr7M3iHE/WbpokyeOel15LFLcxZeWKyRCcbkuhPB+l3/2tNEdN21K6xYX6zYkDtrCobMFt5wTOO79nO+Xlnfe3I4Hjx7ve6Khx24/M/i5DChwj2gP6Na9UnwukrPUztbA0G5ZDd+Qf5vqzba4RYLvK/iehk1iFhZUdi1WGrEX2KkwbO32vfnmUN+dR5977mcOe+UFV6g3vvRJtbU92LH2ssrUzXecMbfrV2/NZh89r5JMjlVts+bbRCNNYDISrh5UEEJ51C2P6vK675unwfMwmgK2hFwg8vQ8T8137Inuk7DsrONspFssdietdcSmgz313W+4gAO/Qqjc/vbdZjePsWmGPM3d9l14oZ1YdvZLsL3z4NOVUCsslqyefgjue8i/E2qhTHU1aCWaNiDXLf0KbIDMkOz1s0xXYuPVp6fD0TsGVhxx+ejECV9VG9+2M9+sIAhPke6riSAIvwb22p9MZDf+7Oy7r77m+btuu/O4chRvGAzCEb/VrAbKai6TnyTQ3LTBXTAzClagXrvGwpDnli70VIC0CE1oi0b3UyVRUFyoyWdJolbnU6h8QXUv8S171PL4wMK71n49F9J8uS2eZHKB0C0+9vOGuceFoC22RRQnFDf9mt/n5906nRNOIWoDt6+0VFtk5/vlZLZ7gpeh6dtc1PJaGiEVo2ffYwaP63kaREnTdV6qVzHTSqJ5X01P+qUtauXELYe94Nx71r7kxT/AxefddqhO61qaCsC3x7K77njhnodvPzOb23qCmd99pJ+ly+vloFQOQkRRgmZrFoFPIpdCNPLjwwMRGgxobt2qKImpyyb2jTt1z3dbhxvQFHTu81ptm3K3PNgpRG1hRAtu3RCH9mH/W2ffFMbTZav7vD9R+Fzd/W7cKy4MyL1G+0KZn4UHmf7yfWW7dG1r3WehmRUyYBqskl16LF5pt8kjS/ZneAGycY/tPNXVLLHV3Zmq313tX3ZvaWjdrdUjXvgDjL1is8TMCsLTg/vVCYLwtGGtreEb31hz9xX/fvr2W35xrN6+5/TKfHTscGZHynHmBWmKKvkXPR8Nk/B1mQUgz1Py1bMd7aq7wg3ox0r/023xw3VCb+GFfH/28b520Vlz39d5Wnk/3L4RJCicgHFbKATsgdj/3Qv5417hiWASMV1vS4KnCE+gpWj6190rPjHJ+RQ1XWe91Exj3q8k9OyMMvN7tLrHrhi9eeSYo+468qXn3l5+82tvVWNjc26LSwNrry1j58Or9tx79zkzO+4/I2ts2+jb1jGVIBn3bRwEWQqfpspZrJLIzL21/A3v28aVv3c+Pvm3T15547cHImwTFEfqHjLueOahJSxqC0vIjyPV2KXtFx7T/NZ5X2lLi9+aPEzCM4uJ2nwPcmHqAniI/Pn81tKQUFEZt3ygmH9OCjFg9kmEK6D4465KEzwYzfix1iST6fNTzK0H45WQWj+bTUu7ZkztXlVZ/nBpdP2tQ2s3XlcbPuUBLDtn7lAdWAnCc0X+yxQE4emGPWY33ljffd1Pj9x0zY+e39j00EtLU3PH1prZSDkzdT9LUOKLLnlbFQLP45ha8tiSqCWchO1A0/bFM/kkZ1sILiYs95cEJCY7z9C6+aXc/b9gG/T++/nL2iKneE+6mLvtFlG5tL3O+3TTCY8gEdGJqXWfo7jll/OQjOI9KO64LSboGfJw+wFmoyZS7VlbrcZ7rNm9K0sfGjjmiB+uO+PU76956Rk/x+tet1fEA2D3Xj0wt/0Xq6cfvfv5zemtL9LR3hPqWbwqTNOqVVZTrKhWZIuUaecSnzwOLSi8ncXxdMefQ2D47sJj3DUz4Awmv58v1zULUCSgdYtaZ1/F+3RuaVkS0rwOPcPvT68XYTMuDMK2Y17zsAhnQO39LiDhnOTe1WIRDkfoXmUReHmKP7ZAoANORuQmLNpFw0cZeWfLSaor21tp/Z7q4Nor+9ee+O/VY455BLVVe5U67aAoEScIhyKdK4QgCM8Y7L294seHPfr9qzfe++NbJpIte86uzkyfvlbbMX96tp+6CIXwEOYpYiR0C7HAPttFQgj4ddNpk9qRCh1YU+xz60Qq3WPpzN2oOhf7hSeEQkSQ2HWeOLp1e0BSV1k/FwVFbOX+YmRffZBPG/O2LQKu70CBFk4suESdgk6oRSFmC2FEscapBqayRpz01bZMldQvmsuGbho744xNx73kVY8E55/7AFb0kZjdV8kI3KUMD149MbNn84Z4+71HmcbuU5K4cZxJ59Z5XtTvq1gFmsqDJUAas+eSxCvZArVzpWOsrYdMW2SaKnvkFQS6lKALKzjwV+8GT24639GxUGdf+1sudeAizynd8hp8495jX6tzXtzCc+zI36f9fmTXKax2CXPsfeXPRa/TOvsu3y3Sizh3EtQ6BSd/Rr5GUqnFaam8Kyn1bza1sRvhj960/pjT78fosQ8oddohFbstCAcrxS9eEIRnAS7DBIT4+jVjW6+9bmLypluOwfatFzSm5p4fmnS4YrTvpyl8KgVEGevsJSvEQTH96+ALMIta92Rxue4s0i0KFj7irfH/LEbz54hub22xvLvteoEv9HSFd6K28LQtJmoLihSw4tOQRzBA0p4epv9JMBR+QRKw5PmiNrYkYCOqXuCB10h97Gn5uKW2btX3lh15/C1rzjt1G4543Q6cN9pUFCQqPC7cqQxXVfDA9Eiy497xvZOPbJyf33G8Smafp+3cSb6d7w9UDN9kLimRWvNmVFmC7JKOu0HsJ/sMjDrBB64agLOl4rlu28ztl+3FeT3b+nMRuu3eUdjiAvHM28vvFoOtfL7DJUK6SG2G1uPSZrlHt9in9v64/aNQB1qHAxnoOQot4HhyD1kUpJENdqdh6Q41MHpNacWq26rja7bV1h23BXjFpFKL9DAWBOEZY79ThSAIzw4cnvDQQyXcfPPYozffftym228/a27Toyd6e6fX1SOzrJKYsSqUX6GKCcZwghldXj2e+qQEFQWlfW6zSYLTxdsqfp0z2btiUAnyh3YeOYrwhu64w06AA124aWkX9FAsQcvQ1vkdtefeixUJ+8jyd6A9JS+sl8cFa6QcVkG4DHwXuxmh5PksNmIT8x6Tv5qEQ2QtGhpolcJ0yreTjbLeGtXLD2XD9YfWn3bS9Seed/rPcPjxO3HqqSRkO7snPGlcchkCTH2zOrft/onJzQ+/MJ7ZfGYWTW6sqmiNr+KxUhYFXmIUeW655gQNMLKYdSRV7CBvus0StkeyAUrc69q+s79CPHKJMS6cy48pIY2FYldtXEe3te6Pi19169C6hTrlOrL5zAK9L28fGr7OxSnbLMWshxw+QBYaeC45jh/TZqiKBqd0UoUOKs3lI6WEL+M1AL15XlUfyEbG7ygNrLpl1REb7sSKEx8FzmnIoEoQnju6zx6CIDxHsAf3oYcCbNkSNH6+uW/r7T8d2nvH3aftfXjzqyqROSpMk9VBYut1rVVFkUy0SiUZVJZykSH6IdvMcDwuyc/CP9VONFsgDkjCsAjg7PHO6JbiVt2yTrYWJYzcI7rSO2HK8lkptGzs3of+KZ2v77ZN/yjW0O1J6ISHUz9O1NKiWmO+Ncf1G8qlqkWphEaS2jlj5hqBfTir9T3QNzF6ZX3dhhuPPOXIHTj3tAbOOYcWT8QL9szQFri4KsDOR+rJg49MzO199Iy5+Z3npfMzJ4UqWhVqVS4rq7RtKJvFSFPy21PCGQlM1oNcL7jZnIdHZdZ83wlZEpfGuIEYNx1x9tUtZJ+MqHW76kQsP94ncZLqQJOnlZYrnPckpnNRazR8rw5kTuDSWmmaIk4TwPesp8s2UiWbmsCYsDLph/UHK7Xldw4PrrgcK8fvxIajdgKDCXA2uXszGVgJwnNP99lDEISDEPvpW6oP3P7liUfuuPvk+S27nh/MJ2dUUrO+mqbV2nzTC7LE9yw8rbTy8i5m9MOm63yWRvmP3F3o255ZLpdEXiufCy7oXEiQh8pd3kmKOs8uQUvTsyxmaRt5uSLyxhUihQS184t1lvNLZddJybop28xYJIY8ZJ61QWCSUiWZ0zZpKa8VBXbzfIB7/LGRO1cedeR3T7zoRb9Sb3xjM98F4SDA2svqk7c+MLx3z0Mbzd6d5w9gzwl+Mnt4ksXLPc+GgUWgdeZbk2qTJqpcCjjpjGLGbZZytQCyPU6K9DzEKfta20KWB1psP05oFnSCVrrgMAjqluY8rPwUhyK4+0VCWWGrBIlgtmN+Pw+mRQ0SAqPCKrmWTTND0kq8NCnV9iLsv6HSv/xHpjp+R335+EPVIzfsUepCakcnCMJBSufXLgjCQQ97dL/wtdHNd95zVmPTQ8dh9/aJdGpq/dTuvSujRqMPJq2UdRCGiQlUZvxaqeIF5JLKUmWNZYcWhSeQWGWPVea8VtwpiZ7ni72F5tJizptGzxd/hYc3y6dvjaEQCM0CBVQnlisYcOMImyprI+oUamyWKp2ZkpdEqZdkMK2gFMyjPrC1tGLlPf7I0H0j68bvnjj2pNtx1OgOdf75EofYA3BM7iP/OIA9m1fMTU4dOx/NHm4aM0fEcXOdSprLNNJBD3HJNyZQKimVPBX4JlFQmTKZURk1x/BdWEshYPk2r1rghCcJXCdOi9AFN0DLh1uWqj878kgGN6gie/U8pIlxnby0tiZT1mQe3VCGWGR0EEOXY6uCPdorb9fl2s5S2H+fGhreXOvfcBtOGLtXqTcuqRJwgtDriKgVhB6GhcUNN4xg+/bRRzdvXjezdeuame27R6a37hhOJqeGzHzUF8SmrFtJxY/TUJm07GUoe0ApyGypBhMiTpQx1gu0kwLKZhRdyLOpLGpzNUFPWOuZjFqjwZrEwvjhQGag49gkaWbTJFZopj6aplSK4rLXasA0bDWcq42OT/evXDbdP75icmBo2dbBleMPVEfXbcbF5+2WMIJDB2t31rHt5pHGzObRdHby8KA1P9ZMZoejmd0rsvnZEZU1y8qkJW1sCbpV8VQyaHTLt1Z5xqTU60wDmcfNjpXSSlmPLJDMT1MINkOlGLQ1CpbmCKzxLelVZDaD1il0KYb2m54OozgJWtaoyFgvyawf+bo0V670T9brQzuC/v5dcam6J6wPbQqWDz2KkdFppc4XESsIPYyIWkE4BGnHRV61I0Dj7gBTu8p4dLK2a+eO/r3btw5Nzcz0odXqr6ZZ1aaRlzQT39qUfK0lZFFFsXr1le8nKk09qzxrKAHGp3wuP0gCq9NUl9IsqMReGDbK1bAZ9Pe1Bvvre2orR/eW1m6cR7U0jxefFmP5cvK8xhJzuDTJbTHE7htDRDtDpLtCNGy9Mbll0DT3rDUqqZgk9SOkvjLWz+K0rJUpW6NLqTEVZU3gWeNrpbUhM+Scr8xYT6dQXpIpndDACko34QXNkhfMal2bQlCZ8Wt9U4PloRkMDrUwMNRCfykG+iKpFSsIhyYiagVBaMMC5Dp4OM9FKLRfoFndW2+1OPVUSohZJMBREH59XJmxWz1gxAP2aOxuefATD4OlIrzbMRUZDFYM0DRAKQPOJpukbDBJ2BKEJYyIWkEQBEEQBKHnEVErCIIgCIIg9DwiagVBEARBEISeR0StIAiCIAiC0POIqBUEQRAEQRB6HhG1giAIgiAIQs8jolYQBEEQBEHoeUTUCoIgCIIgCD2PiFpBEARBEASh5xFRKwiCIAiCIPQ8ImoFQRAEQRCEnkdErSAIgiAIgtDziKgVBEEQBEEQeh4RtYIgCIIgCELPI6JWEARBEARB6HlE1AqCIAiCIAg9j4haQRAEQRAEoecRUSsIgiAIgiD0PCJqBUEQBEEQhJ5HRK0gCIIgCILQ84ioFQRBEARBEHoeEbWCIAiCIAhCzyOiVhAEQRAEQeh5RNQKgiAIgiAIPY+IWkEQBEEQBKHnEVErCIIgCIIg9DwiagVBEARBEISeR0StIAiCIAiC0POIqBUEQRAEQRB6HhG1giAIgiAIQs8jolYQBEEQBEHoeUTUCoIgCIIgCD2PiFpBEARBEASh5xFRKwiCIAiCIPQ8ImoFQRAEQRCEnkdErSAIgiAIgtDziKgVBEEQBEEQeh4RtYIgCIIgCELPI6JWEARBEARB6HlE1AqCIAiCIAg9j4haQRAEQRAEoef5/wHjqgVjkx4PHQAAABBkZUJHOTlBMEU5REE1NUZGQTcyRcEfKIgAAAAASUVORK5CYII=",
    alt: "",
    style: {
      height: 18,
      width: 'auto',
      objectFit: 'contain'
    }
  }), React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: W,
      letterSpacing: .5
    }
  }, "\u2022\u2022 4465")), React.createElement("div", {
    onClick: () => {
      setNameInput(cardName);
      setRenameOpen(true);
    },
    style: {
      position: 'absolute',
      top: 24,
      right: 20,
      fontSize: 20,
      fontWeight: 500,
      color: W,
      letterSpacing: .2,
      cursor: 'pointer',
      borderBottom: '1.5px solid rgba(255,255,255,.35)',
      paddingBottom: 2
    }
  }, cardName)), React.createElement("div", {
    style: {
      background: BG,
      borderRadius: '28px 28px 0 0',
      marginTop: -90,
      position: 'relative',
      padding: '26px 6px 0',
      marginLeft: -20,
      marginRight: -20
    }
  }, React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Cash balance"), React.createElement("span", {
    style: {
      fontSize: 14,
      color: '#999',
      fontWeight: 600
    }
  }, "\u2022\u2022 4465"), React.createElement(ChevR, {
    c: "#888"
  })), React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: W,
    strokeWidth: 1.8,
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24"
  }), React.createElement("path", {
    d: "M1 1l22 22"
  }))), editBal ? React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: 60
    }
  }, React.createElement("span", {
    style: {
      fontSize: 58,
      fontWeight: 700,
      letterSpacing: -2.5,
      lineHeight: 1
    }
  }, "$"), React.createElement("input", {
    autoFocus: true,
    inputMode: "decimal",
    value: balInput,
    onChange: e => setBalInput(e.target.value.replace(/[^0-9.]/g, '')),
    onBlur: commitBal,
    onKeyDown: e => {
      if (e.key === 'Enter') commitBal();
      if (e.key === 'Escape') setEditBal(false);
    },
    style: {
      fontSize: 58,
      fontWeight: 700,
      letterSpacing: -2.5,
      lineHeight: 1,
      background: 'none',
      border: 'none',
      outline: 'none',
      color: W,
      fontFamily: F,
      width: '100%',
      minWidth: 0,
      padding: 0,
      caretColor: G
    }
  })) : React.createElement("div", {
    onClick: () => {
      setBalInput(String(balance));
      setEditBal(true);
    },
    style: {
      fontSize: 58,
      fontWeight: 700,
      letterSpacing: -2.5,
      lineHeight: 1,
      marginBottom: 60,
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent'
    }
  }, "$", fmt(balance)), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginBottom: 26
    }
  }, ['Add money', 'Withdraw'].map(l => React.createElement("button", {
    key: l,
    onClick: () => {
      if (l === 'Add money') setAgOpen(true);
    },
    style: {
      flex: 1,
      background: '#1c1c1c',
      color: W,
      border: 'none',
      borderRadius: 100,
      padding: '19px 0',
      fontSize: 17,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: F
    }
  }, l))), React.createElement("div", {
    style: {
      background: '#161616',
      borderRadius: 24,
      padding: '30px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, React.createElement("svg", {
    width: "18",
    height: "24",
    viewBox: "0 0 18 24",
    fill: "none",
    stroke: G,
    strokeWidth: 2.6
  }, React.createElement("rect", {
    x: "2",
    y: "2",
    width: "14",
    height: "20",
    rx: "4"
  })), React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700
    }
  }, "Green status")), React.createElement("span", {
    style: {
      fontSize: 17,
      color: '#eee',
      fontWeight: 500
    }
  }, "In progress")), React.createElement("div", {
    style: {
      height: 1,
      background: '#2a2a2a',
      margin: '34px 0 0'
    }
  }), React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: -.5,
      margin: '40px 0 22px'
    }
  }, "More for you"), React.createElement("div", {
    style: {
      background: '#141414',
      borderRadius: 26,
      padding: '26px 24px 30px',
      cursor: 'pointer',
      marginBottom: 10
    }
  }, React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: '#ccc',
      marginBottom: 14
    }
  }, "Stocks"), React.createElement("div", {
    style: {
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: -1,
      lineHeight: 1.15,
      marginBottom: 6
    }
  }, "Buy stocks with no fees"), React.createElement("div", {
    style: {
      fontSize: 15,
      color: G1,
      marginTop: 10
    }
  }, "Start investing with as little as $1")), React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, [{
    icon: React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: '#1a4a3a',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement("svg", {
      width: "28",
      height: "28",
      viewBox: "0 0 256 256",
      fill: "none",
      stroke: "#fff",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "16"
    }, React.createElement("circle", {
      cx: "84",
      cy: "108",
      r: "52"
    }), React.createElement("path", {
      d: "M10.23,200a88,88,0,0,1,147.54,0"
    }), React.createElement("path", {
      d: "M172,160a87.93,87.93,0,0,1,73.77,40"
    }), React.createElement("path", {
      d: "M152.69,59.7A52,52,0,1,1,172,160"
    }))),
    t: 'Pools',
    s: 'Collect money with anyone'
  }, {
    icon: React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: '#3a1a5a',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement("svg", {
      width: "28",
      height: "28",
      viewBox: "0 0 256 256",
      fill: "#fff"
    }, React.createElement("path", {
      d: "M247.63,47.89a8,8,0,0,0-7.52-7.52c-51.76-3-93.32,12.74-111.18,42.22-11.8,19.49-11.78,43.16-.16,65.74a71.34,71.34,0,0,0-14.17,27L98.33,159c7.82-16.33,7.52-33.35-1-47.49-13.2-21.79-43.67-33.47-81.5-31.25a8,8,0,0,0-7.52,7.52c-2.23,37.83,9.46,68.3,31.25,81.5A45.82,45.82,0,0,0,63.44,176,54.58,54.58,0,0,0,87,170.33l25,25V224a8,8,0,0,0,16,0V194.51a55.61,55.61,0,0,1,12.27-35,73.91,73.91,0,0,0,33.31,8.4,60.9,60.9,0,0,0,31.83-8.86C234.89,141.21,250.67,99.65,247.63,47.89ZM47.81,155.6C32.47,146.31,23.79,124.32,24,96c28.32-.24,50.31,8.47,59.6,23.81,4.85,8,5.64,17.33,2.46,26.94L61.65,122.34a8,8,0,0,0-11.31,11.31l24.41,24.41C65.14,161.24,55.82,160.45,47.81,155.6Zm149.31-10.22c-13.4,8.11-29.15,8.73-45.15,2l53.69-53.7a8,8,0,0,0-11.31-11.31L140.65,136c-6.76-16-6.15-31.76,2-45.15,13.94-23,47-35.82,89.33-34.83C232.94,98.34,220.14,131.44,197.12,145.38Z"
    }))),
    t: 'Savings',
    s: 'Up to 3.25% interest'
  }, {
    icon: React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: '#000',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }
    }, React.createElement("img", {
      src: "data:image/webp;base64,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",
      alt: "",
      style: {
        width: 56,
        height: 56,
        objectFit: 'cover'
      }
    })),
    t: 'Bitcoin',
    s: 'Learn and invest'
  }, {
    icon: React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: '#1a3a5a',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement("svg", {
      width: "28",
      height: "28",
      viewBox: "0 0 256 256",
      fill: "none",
      stroke: "#fff",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "16"
    }, React.createElement("polyline", {
      points: "224 208 32 208 32 48"
    }), React.createElement("polyline", {
      points: "200 72 128 144 96 112 32 176"
    }), React.createElement("polyline", {
      points: "200 112 200 72 160 72"
    }))),
    t: 'Earnings',
    s: '$0.00 this month'
  }].map((r, i) => React.createElement("div", {
    key: r.t,
    className: "row-in",
    style: {
      animationDelay: `${i * 0.05}s`,
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '22px 0'
    }
  }, r.icon, React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: -.3
    }
  }, r.t), React.createElement("div", {
    style: {
      fontSize: 16,
      color: '#ddd',
      marginTop: 4,
      fontWeight: 400
    }
  }, r.s)), React.createElement("button", {
    style: {
      background: '#232323',
      color: W,
      border: 'none',
      borderRadius: 100,
      padding: '14px 30px',
      fontSize: 16,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: F,
      flexShrink: 0
    }
  }, "Start")))), React.createElement("div", {
    style: {
      height: 1,
      background: '#2a2a2a',
      margin: '20px 0 0'
    }
  }), React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: -.5,
      margin: '44px 0 14px'
    }
  }, "Add money"), [{
    t: 'Direct deposit',
    d: 'M12 3v10m0 0l-4-4m4 4l4-4M4 17a8 8 0 0016 0'
  }, {
    t: 'Get bank or wire transfer',
    d: 'M3 12c3-6 6 6 9 0s6 6 9 0M17 8l4 4-4 4'
  }, {
    t: 'Deposit paper money',
    d: 'M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm10 3v4'
  }, {
    t: 'Deposit check',
    d: 'M4 4h4M16 4h4M4 4v4M20 4v4M4 20h4M16 20h4M4 20v-4M20 20v-4M8 12h8'
  }, {
    t: 'Auto reload',
    d: 'M4 9a8 8 0 0114-3l2 2m0 0V4m0 4h-4M20 15a8 8 0 01-14 3l-2-2m0 0v4m0-4h4'
  }].map((r, i) => React.createElement("div", {
    key: r.t,
    className: "row-in",
    style: {
      animationDelay: `${i * 0.04}s`,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '20px 0',
      cursor: 'pointer'
    }
  }, React.createElement("svg", {
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: W,
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, React.createElement("path", {
    d: r.d
  })), React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: -.2
    }
  }, r.t), React.createElement(ChevR, {
    c: W
  }))), React.createElement("div", {
    style: {
      marginTop: 36,
      fontFamily: 'ui-monospace,Menlo,monospace',
      fontSize: 14,
      lineHeight: 1.7,
      color: '#4a4a4a',
      letterSpacing: .5
    }
  }, "Your balance is eligible for FDIC pass-through insurance through Wells Fargo Bank, N.A., Sutton Bank, and The Bancorp Bank, N.A., Members FDIC.")))), agOpen && React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      maxWidth: 430,
      margin: '0 auto',
      background: 'rgba(0,0,0,.75)',
      zIndex: 950,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
    },
    onClick: e => {
      if (e.target === e.currentTarget) setAgOpen(false);
    }
  }, React.createElement("div", {
    style: {
      background: '#0f0f0f',
      borderRadius: '20px 20px 0 0',
      width: '100%',
      paddingBottom: 40
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 6
    }
  }, React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: '#2a2a2a'
    }
  })), React.createElement("div", {
    style: {
      padding: '10px 22px 18px',
      borderBottom: '1px solid #1a1a1a'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: W,
      letterSpacing: -.3
    }
  }, "Auto Gift"), React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#555',
      marginTop: 2
    }
  }, "Automatically cycle through sends")), React.createElement("div", {
    style: {
      padding: '22px 22px 0'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#444',
      letterSpacing: .8,
      textTransform: 'uppercase',
      marginBottom: 10
    }
  }, "Amount"), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: '#161616',
      borderRadius: 16,
      border: '1px solid #222',
      padding: '0 18px',
      gap: 4
    }
  }, React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: '#555'
    }
  }, "$"), React.createElement("input", {
    defaultValue: agAmtRef.current,
    onChange: e => {
      agAmtRef.current = e.target.value;
    },
    placeholder: "0.00",
    inputMode: "decimal",
    type: "text",
    style: {
      flex: 1,
      background: 'none',
      border: 'none',
      padding: '18px 0',
      fontSize: 28,
      fontWeight: 700,
      color: W,
      outline: 'none',
      fontFamily: F,
      caretColor: G
    }
  }))), React.createElement("div", {
    style: {
      padding: '18px 22px 0'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#444',
      letterSpacing: .8,
      textTransform: 'uppercase',
      marginBottom: 10
    }
  }, "Hotkey"), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, React.createElement("button", {
    onClick: () => setAgCapturing(c => !c),
    style: {
      flex: 1,
      background: agCapturing ? 'rgba(0,214,50,.08)' : '#161616',
      border: '1px solid ' + (agCapturing ? 'rgba(0,214,50,.5)' : '#222'),
      borderRadius: 14,
      padding: '15px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      fontFamily: F
    }
  }, React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: agCapturing ? G : W
    }
  }, agCapturing ? 'Press any key…' : agHotkey), !agCapturing && React.createElement("span", {
    style: {
      fontSize: 11,
      color: '#444',
      fontWeight: 500
    }
  }, "tap to change")))), agActive && React.createElement("div", {
    style: {
      margin: '16px 22px 0',
      background: 'rgba(0,214,50,.06)',
      border: '1px solid rgba(0,214,50,.2)',
      borderRadius: 14,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, React.createElement("div", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: G,
      boxShadow: '0 0 8px ' + G,
      animation: 'pulse 1.4s ease-in-out infinite'
    }
  }), React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: G
    }
  }, "Running")), React.createElement("div", {
    style: {
      padding: '22px 22px 0',
      display: 'flex',
      gap: 10
    }
  }, React.createElement("button", {
    onClick: () => setAgOpen(false),
    style: {
      flex: 1,
      background: '#1c1c1c',
      border: '1px solid #2a2a2a',
      borderRadius: 100,
      padding: '16px 0',
      fontSize: 16,
      fontWeight: 600,
      color: '#aaa',
      cursor: 'pointer',
      fontFamily: F
    }
  }, "Cancel"), React.createElement("button", {
    onClick: () => {
      toggleAutoGift();
    },
    style: {
      flex: 2,
      background: agActive ? RED : G,
      border: 'none',
      borderRadius: 100,
      padding: '16px 0',
      fontSize: 17,
      fontWeight: 700,
      color: W,
      cursor: 'pointer',
      fontFamily: F,
      transition: 'background .2s'
    }
  }, agActive ? 'Stop' : 'Start Auto Gift')))));
  if (screen === 'card' && !flow) return React.createElement(Shell, null, React.createElement("div", {
    style: {
      padding: '52px 20px 0',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, "Cash Card")), React.createElement("div", {
    style: {
      margin: 20,
      background: 'linear-gradient(135deg,#1a1a1a,#333)',
      borderRadius: 18,
      padding: '28px 24px',
      minHeight: 160,
      border: `1px solid ${G3}`
    }
  }, React.createElement("div", {
    style: {
      fontSize: 11,
      color: G1,
      marginBottom: 40
    }
  }, "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022"), React.createElement("div", {
    style: {
      fontSize: 12,
      color: G1
    }
  }, "Preparing Cash Card \xB7 Arrives Soon")), ['Add to Apple Pay', 'Lock Card', 'Find an ATM', 'Change PIN', 'Support'].map((item, i, a) => React.createElement("div", {
    key: item,
    className: "row-in",
    style: {
      animationDelay: `${i * 0.05}s`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      borderBottom: i < a.length - 1 ? `1px solid ${G3}` : 'none',
      cursor: 'pointer'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, item), React.createElement(ChevR, null))));
  if (screen === 'stocks' && !flow) return React.createElement(Shell, null, React.createElement("div", {
    style: {
      padding: '52px 20px 0'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, "Stocks & Crypto")), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '16px 20px 0',
      overflowX: 'auto'
    }
  }, ['All', 'Crypto', 'Tech'].map(f => React.createElement("button", {
    key: f,
    onClick: () => setSfilt(f),
    style: {
      background: sfilt === f ? W : 'transparent',
      color: sfilt === f ? BG : G1,
      border: `1px solid ${sfilt === f ? W : G3}`,
      borderRadius: 20,
      padding: '6px 16px',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: F,
      whiteSpace: 'nowrap',
      transition: 'all .2s ease'
    }
  }, f))), React.createElement("div", {
    style: {
      padding: '16px 20px 0'
    }
  }, STOCKS.map((s, i) => React.createElement("div", {
    key: s.sym,
    className: "row-in",
    style: {
      animationDelay: `${i * 0.05}s`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: `1px solid ${G3}`
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: s.col,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      transition: 'transform .15s ease'
    }
  }, s.sym[0]), React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, s.name), React.createElement("div", {
    style: {
      fontSize: 12,
      color: G1
    }
  }, s.sym))), React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "$", s.price), React.createElement("div", {
    style: {
      fontSize: 12,
      color: s.up ? G : RED
    }
  }, s.ch))))));
  if (screen === 'activity' && !flow) {
    const now = new Date();
    const monthKey = d => `${d.getFullYear()}-${d.getMonth()}`;
    const monthLabel = d => monthKey(d) === monthKey(now) ? 'This month' : d.toLocaleDateString([], {
      month: 'long',
      year: 'numeric'
    });
    const dayLabel = d => {
      const diff = (now - d) / 86400000;
      if (d.toDateString() === now.toDateString()) return 'Today';
      if (diff < 6) return d.toLocaleDateString([], {
        weekday: 'long'
      });
      return d.toLocaleDateString([], {
        month: 'short',
        day: 'numeric'
      });
    };
    const groups = [];
    txns.forEach(t => {
      const k = monthKey(t.ts);
      let g = groups.find(g => g.k === k);
      if (!g) {
        g = {
          k,
          label: monthLabel(t.ts),
          items: []
        };
        groups.push(g);
      }
      g.items.push(t);
    });
    const seen = new Set();
    const shortcuts = txns.filter(t => {
      if (seen.has(t.tag)) return false;
      seen.add(t.tag);
      return true;
    }).slice(0, 6);
    return React.createElement(Shell, null, React.createElement("div", {
      style: {
        padding: '56px 20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, React.createElement("span", {
      style: {
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: -.5
      }
    }, "Activity"), React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: '#1e1e1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement(SearchIc, {
      c: W,
      sz: 19
    })), React.createElement("div", {
      onClick: () => setFlow('account'),
      style: {
        position: 'relative',
        cursor: 'pointer'
      }
    }, React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: '#1a1a3e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: W,
        fontSize: 16,
        fontWeight: 700,
        border: '2px solid #2a2a2a',
        overflow: 'hidden'
      }
    }, React.createElement("div", {
      style: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg,#5d9a6a,#3a6a4a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700
      }
    }, (cardName || 'L').trim().charAt(0).toUpperCase())), React.createElement("div", {
      style: {
        position: 'absolute',
        top: -3,
        right: -3,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: RED,
        color: W,
        fontSize: 11,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, "1")))), React.createElement("div", {
      style: {
        display: 'flex',
        gap: 22,
        padding: '26px 20px 0',
        overflowX: 'auto'
      }
    }, React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
        cursor: 'pointer'
      }
    }, React.createElement("div", {
      style: {
        width: 74,
        height: 74,
        borderRadius: '50%',
        border: '1.5px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement("span", {
      style: {
        fontSize: 34,
        fontWeight: 300,
        color: W,
        lineHeight: 1
      }
    }, "+")), React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        color: W
      }
    }, "Get $15")), shortcuts.map(t => React.createElement("div", {
      key: t.tag,
      onClick: () => {
        openAmount();
      },
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
        cursor: 'pointer'
      }
    }, React.createElement(Av, {
      init: t.init,
      bg: t.bg,
      sz: 74,
      img: t.img
    }), React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        color: W,
        maxWidth: 80,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, t.name.split(' ')[0])))), React.createElement("div", {
      style: {
        padding: '10px 20px 0'
      }
    }, txns.length === 0 ? React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: '70px 0',
        color: G1
      }
    }, React.createElement("div", {
      style: {
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'center'
      }
    }, React.createElement("svg", {
      width: "52",
      height: "52",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#555",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    }))), React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        color: W
      }
    }, "No recent activity"), React.createElement("div", {
      style: {
        fontSize: 14,
        marginTop: 8
      }
    }, "Transactions will appear here")) : groups.map(g => React.createElement("div", {
      key: g.k
    }, React.createElement("div", {
      style: {
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: -.5,
        margin: '34px 0 6px'
      }
    }, g.label), g.items.map((t, i) => React.createElement("div", {
      key: t.id,
      className: "row-in",
      style: {
        animationDelay: `${i * 0.04}s`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 18,
        padding: '20px 0'
      }
    }, React.createElement(Av, {
      init: t.init,
      bg: t.bg,
      sz: 56,
      img: t.img
    }), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        fontSize: 21,
        fontWeight: 700,
        letterSpacing: -.3,
        color: W
      }
    }, t.name), React.createElement("div", {
      style: {
        fontSize: 17,
        color: '#ccc',
        marginTop: 5,
        fontWeight: 400
      }
    }, "Cash App Payment"), React.createElement("div", {
      style: {
        fontSize: 17,
        color: '#ccc',
        marginTop: 4,
        fontWeight: 400
      }
    }, dayLabel(t.ts))), React.createElement("div", {
      style: {
        fontSize: 21,
        fontWeight: 600,
        color: W,
        flexShrink: 0,
        marginTop: 2
      }
    }, "$", t.amt.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }))))))));
  }
  if (flow === 'account') return React.createElement("div", {
    className: "fin",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: W,
      fontFamily: F,
      color: BG,
      overflowY: 'auto',
      maxWidth: 430,
      margin: '0 auto'
    }
  }, React.createElement(DI, null), React.createElement(SBar, {
    dark: true
  }), React.createElement("div", {
    style: {
      padding: '52px 20px 0',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, "Your Account"), React.createElement("button", {
    onClick: () => setFlow(null),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 22,
      color: BG
    }
  }, "\u2715")), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '28px 20px 20px'
    }
  }, React.createElement("div", {
    style: {
      width: 80,
      height: 80,
      borderRadius: '50%',
      background: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
      marginBottom: 12,
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg,#5d9a6a,#3a6a4a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 700
    }
  }, (cardName || 'L').trim().charAt(0).toUpperCase())), React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700
    }
  }, "Your Name"), React.createElement("div", {
    style: {
      fontSize: 14,
      color: G1
    }
  }, "$YourTag")), ['Personal', 'Linked Banks', 'Security & Privacy', 'Notifications', 'Support'].map((item, i, a) => React.createElement("div", {
    key: item,
    className: "row-in",
    style: {
      animationDelay: `${i * 0.04}s`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      borderBottom: i < a.length - 1 ? '1px solid #eee' : 'none',
      cursor: 'pointer'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, item), React.createElement(ChevR, {
    c: "#ccc"
  }))), React.createElement("div", {
    style: {
      padding: '24px 20px'
    }
  }, React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      color: RED,
      fontSize: 16,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: F
    }
  }, "Sign Out")));
  if (flow === 'amount') return React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: G,
      fontFamily: F,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 430,
      margin: '0 auto'
    }
  }, React.createElement(DI, null), React.createElement(SBar, {
    dark: true
  }), React.createElement(NotifBanner, null), React.createElement("div", {
    style: {
      padding: '52px 20px 0',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, React.createElement("button", {
    onClick: () => setFlow(null),
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'rgba(0,0,0,.12)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: BG,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7",
    rx: "1"
  }), React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7",
    rx: "1"
  }), React.createElement("path", {
    d: "M14 3h3M21 3v3M3 14v3M3 21h3M14 8h7M8 14v7"
  }))), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement("button", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'rgba(0,0,0,.12)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement(SearchIc, {
    c: BG,
    sz: 20
  })), React.createElement("div", {
    onClick: () => setFlow('account'),
    style: {
      position: 'relative',
      cursor: 'pointer'
    }
  }, React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: '#1a1a3e',
      border: '2px solid rgba(0,0,0,.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: W,
      fontSize: 16,
      fontWeight: 700,
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg,#5d9a6a,#3a6a4a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 700
    }
  }, (cardName || 'L').trim().charAt(0).toUpperCase())), React.createElement("div", {
    style: {
      position: 'absolute',
      top: -3,
      right: -3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: RED,
      color: W,
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "1")))), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1 1 120px',
      minHeight: 100
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      fontWeight: 700,
      letterSpacing: -4,
      color: BG,
      lineHeight: 1
    }
  }, React.createElement("span", {
    style: {
      fontSize: amount.length > 6 ? 64 : amount.length > 4 ? 80 : 112,
      transition: 'font-size .15s ease'
    }
  }, "$"), (amount || '0').split('').map((ch, i, arr) => {
    const isNew = lastDigitKey && i === lastDigitKey.idx;
    return React.createElement("span", {
      key: `${i}-${ch}-${arr.length}`,
      style: {
        fontSize: amount.length > 6 ? 64 : amount.length > 4 ? 80 : 112,
        transition: 'font-size .15s ease',
        display: 'inline-block',
        animation: isNew ? `newDigit .25s cubic-bezier(.2,.8,.2,1) both` : 'none'
      }
    }, ch);
  }))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      flexShrink: 0,
      alignContent: 'center',
      rowGap: 'clamp(8px,2.5vh,24px)',
      padding: '0 8px'
    }
  }, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map(k => React.createElement("button", {
    key: k,
    onClick: () => pressKey(k),
    style: {
      background: 'none',
      border: 'none',
      color: BG,
      fontSize: k === '⌫' ? 24 : 34,
      fontWeight: 600,
      padding: '10px 0',
      cursor: 'pointer',
      fontFamily: F,
      lineHeight: 1,
      WebkitTapHighlightColor: 'rgba(0,0,0,.08)'
    }
  }, k === '⌫' ? '❮' : k))), React.createElement("div", {
    style: {
      padding: '14px 20px 0',
      flexShrink: 0
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 12
    }
  }, React.createElement("button", {
    style: {
      flex: 1,
      background: 'rgba(0,0,0,.12)',
      color: BG,
      border: 'none',
      borderRadius: 100,
      padding: '16px 0',
      fontSize: 17,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: F
    }
  }, "Pool"), React.createElement("button", {
    style: {
      flex: 1,
      background: 'rgba(0,0,0,.12)',
      color: BG,
      border: 'none',
      borderRadius: 100,
      padding: '16px 0',
      fontSize: 17,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: F
    }
  }, "Request")), React.createElement("button", {
    onClick: goSearch,
    style: {
      width: '100%',
      background: BG,
      color: W,
      border: 'none',
      borderRadius: 100,
      padding: '18px 0',
      fontSize: 18,
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: F,
      opacity: !amount || amount === '0' ? .4 : 1,
      transition: 'opacity .2s'
    }
  }, "Pay")), React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '16px 40px 24px',
      flexShrink: 0
    }
  }, React.createElement("button", {
    onClick: () => {
      setFlow(null);
      setScreen('home');
    },
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: .35
    }
  }, React.createElement(SvgIc, {
    c: BG,
    sz: 26,
    d: "M3 21h18M4 10h16M6 10V21M10 10v11M14 10v11M18 10v11M2 10l10-6 10 6"
  })), React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'default'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: BG,
      opacity: .85
    }
  }, "$")), React.createElement("button", {
    onClick: () => {
      setFlow(null);
      setScreen('activity');
    },
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: .35
    }
  }, React.createElement(ClockIc, {
    c: BG
  }))));
  if (flow === 'search') {
    const typeChar = ch => {
      keyClick();
      setSearchQ(q => q + ch);
      if (kbShift && !kbNum) setKbShift(false);
    };
    const press = (id, fn, del) => {
      keyClick(del);
      setKbPressed(id);
      fn && fn();
      setTimeout(() => setKbPressed(p => p === id ? null : p), 140);
    };
    const KROWS = kbNum ? [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'], ['.', ',', '?', '!', "'"]] : [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm']];
    const cap = c => kbShift && !kbNum ? c.toUpperCase() : c;
    const KEY_BG = '#6b6b6e',
      SPECIAL_BG = '#464649';
    const Key = ({
      id,
      label,
      flex = 1,
      bg = KEY_BG,
      fs = 22,
      onTap,
      popup = true,
      del = false
    }) => React.createElement("button", {
      onPointerDown: e => {
        e.preventDefault();
        press(id, onTap, del);
      },
      style: {
        flex,
        height: 44,
        margin: '0 3px',
        borderRadius: 6,
        border: 'none',
        background: kbPressed === id && !popup ? '#8a8a8d' : bg,
        color: W,
        fontSize: fs,
        fontFamily: F,
        fontWeight: 400,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 1px 0 rgba(0,0,0,.35)',
        padding: 0,
        animation: kbPressed === id ? 'keypop .14s ease' : 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }
    }, label, popup && kbPressed === id && React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 'calc(100% + 6px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: KEY_BG,
        borderRadius: 9,
        minWidth: 46,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        color: W,
        boxShadow: '0 4px 14px rgba(0,0,0,.6)',
        zIndex: 5,
        pointerEvents: 'none'
      }
    }, label));
    return React.createElement("div", {
      style: {
        position: 'fixed',
        inset: 0,
        maxWidth: 430,
        margin: '0 auto'
      }
    }, React.createElement(DI, null), React.createElement(SBar, {
      dark: true
    }), React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: G,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70
      }
    }, React.createElement("div", {
      style: {
        fontSize: 72,
        fontWeight: 800,
        letterSpacing: -3,
        color: BG,
        lineHeight: 1
      }
    }, "$", amount || '0')), React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '78%',
        background: BG,
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        animation: 'sheetUp .38s cubic-bezier(.2,.8,.2,1) both',
        display: 'flex',
        flexDirection: 'column'
      }
    }, React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0 0',
        flexShrink: 0
      }
    }, React.createElement("div", {
      style: {
        width: 36,
        height: 4,
        borderRadius: 2,
        background: G3
      }
    })), React.createElement("div", {
      style: {
        padding: '10px 20px 12px',
        flexShrink: 0
      }
    }, React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12
      }
    }, React.createElement("button", {
      onClick: () => setFlow('amount'),
      style: {
        width: 34,
        height: 34,
        borderRadius: '50%',
        background: G2,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, React.createElement(BackArrow, null)), React.createElement("span", {
      style: {
        fontSize: 20,
        fontWeight: 700,
        color: W
      }
    }, "Pay ", React.createElement("span", {
      style: {
        color: G
      }
    }, "$", parseFloat(amount || 0).toLocaleString()), " to")), React.createElement("div", {
      style: {
        background: G2,
        borderRadius: 13,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 14px',
        gap: 9,
        minHeight: 44
      }
    }, React.createElement(SearchIc, null), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        fontFamily: F,
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }
    }, searchQ ? React.createElement("span", {
      style: {
        color: W
      }
    }, searchQ) : React.createElement("span", {
      style: {
        color: '#555'
      }
    }, "Name, $tag, email, phone"), React.createElement("span", {
      style: {
        width: 2,
        height: 19,
        background: '#0a84ff',
        marginLeft: 1,
        animation: 'caret 1.1s step-end infinite',
        flexShrink: 0
      }
    })), searchQ && React.createElement("button", {
      onClick: () => setSearchQ(''),
      style: {
        background: 'none',
        border: 'none',
        color: G1,
        cursor: 'pointer',
        fontSize: 17,
        padding: 0,
        flexShrink: 0
      }
    }, "\u2715"))), React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '0 20px',
        position: 'relative'
      }
    }, confirming && React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }
    }, React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: `3px solid ${G3}`,
        borderTopColor: G,
        animation: 'spin .7s linear infinite'
      }
    })), searching ? React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        padding: '44px 0'
      }
    }, React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: `3px solid ${G3}`,
        borderTopColor: G,
        animation: 'spin .7s linear infinite'
      }
    })) : results.map((u, i) => React.createElement("div", {
      key: u.tag + i,
      onClick: () => pickUser(u),
      className: "row-in",
      style: {
        animationDelay: `${i * 0.04}s`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 0',
        borderBottom: `1px solid ${G3}`,
        cursor: 'pointer',
        transition: 'background .15s'
      }
    }, React.createElement(Av, {
      init: u.init,
      bg: u.bg,
      sz: 44,
      img: u.img
    }), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: W
      }
    }, u.name), React.createElement("div", {
      style: {
        fontSize: 13,
        color: G1
      }
    }, u.tag))))), React.createElement("div", {
      style: {
        flexShrink: 0,
        background: '#2b2b2d',
        padding: '8px 3px 6px',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }
    }, React.createElement("div", {
      style: {
        display: 'flex',
        marginBottom: 9
      }
    }, KROWS[0].map(k => React.createElement(Key, {
      key: k,
      id: k,
      label: cap(k),
      onTap: () => typeChar(cap(k))
    }))), React.createElement("div", {
      style: {
        display: 'flex',
        marginBottom: 9,
        padding: kbNum ? '0' : '0 18px'
      }
    }, KROWS[1].map(k => React.createElement(Key, {
      key: k,
      id: k,
      label: cap(k),
      onTap: () => typeChar(cap(k))
    }))), React.createElement("div", {
      style: {
        display: 'flex',
        marginBottom: 9
      }
    }, !kbNum ? React.createElement(Key, {
      id: "shift",
      popup: false,
      flex: 1.4,
      bg: kbShift ? '#fff' : SPECIAL_BG,
      label: React.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: kbShift ? '#000' : W
      }, React.createElement("path", {
        d: "M12 3l8 8h-5v7h-6v-7H4l8-8z"
      })),
      onTap: () => setKbShift(s => !s)
    }) : React.createElement(Key, {
      id: "sym",
      popup: false,
      flex: 1.4,
      bg: SPECIAL_BG,
      fs: 16,
      label: "#+=",
      onTap: () => {}
    }), React.createElement("div", {
      style: {
        flex: .35
      }
    }), KROWS[2].map(k => React.createElement(Key, {
      key: k,
      id: k,
      label: cap(k),
      onTap: () => typeChar(cap(k))
    })), React.createElement("div", {
      style: {
        flex: .35
      }
    }), React.createElement(Key, {
      id: "bksp",
      popup: false,
      flex: 1.4,
      bg: SPECIAL_BG,
      del: true,
      label: React.createElement("svg", {
        width: "23",
        height: "23",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: W,
        strokeWidth: 1.7,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, React.createElement("path", {
        d: "M21 6H8l-5 6 5 6h13a1 1 0 001-1V7a1 1 0 00-1-1zM17 9l-5 5M12 9l5 5"
      })),
      onTap: () => setSearchQ(q => q.slice(0, -1))
    })), React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, React.createElement(Key, {
      id: "mode",
      popup: false,
      flex: 1.4,
      bg: SPECIAL_BG,
      fs: 16,
      label: kbNum ? 'ABC' : '123',
      onTap: () => {
        setKbNum(n => !n);
        setKbShift(false);
      }
    }), React.createElement(Key, {
      id: "space",
      popup: false,
      flex: 5.4,
      fs: 16,
      label: "space",
      onTap: () => setSearchQ(q => q + ' ')
    }), React.createElement(Key, {
      id: "return",
      popup: false,
      flex: 1.9,
      bg: SPECIAL_BG,
      fs: 16,
      label: "return",
      onTap: () => {}
    })), React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10
      }
    }, React.createElement("div", {
      style: {
        width: 130,
        height: 5,
        borderRadius: 3,
        background: '#555'
      }
    })))));
  }
  if (flow === 'confirm') return React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      maxWidth: 430,
      margin: '0 auto'
    }
  }, React.createElement(DI, null), React.createElement(SBar, {
    dark: true
  }), React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: G,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 110
    }
  }, React.createElement("div", {
    style: {
      fontSize: 72,
      fontWeight: 800,
      letterSpacing: -3,
      color: BG,
      lineHeight: 1
    }
  }, "$", amount || '0')), React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70%',
      background: BG,
      borderRadius: '22px 22px 0 0',
      overflow: 'hidden',
      animation: 'sheetUp .38s cubic-bezier(.2,.8,.2,1) both',
      display: 'flex',
      flexDirection: 'column'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 0 0',
      flexShrink: 0
    }
  }, React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: G3
    }
  })), React.createElement("div", {
    style: {
      padding: '10px 20px 0',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement("button", {
    onClick: () => setFlow('search'),
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: G2,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(BackArrow, null))), React.createElement("div", {
    style: {
      padding: '16px 24px 0',
      flex: 1
    },
    className: "fin"
  }, React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: W,
      marginBottom: 16,
      lineHeight: 1.3
    }
  }, "Pay ", React.createElement("span", {
    style: {
      color: G
    }
  }, "$", parseFloat(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })), " to"), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, React.createElement(Av, {
    init: selUser?.init || 'C',
    bg: selUser?.bg || '#333',
    sz: 52,
    img: selUser?.img
  }), React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: W
    }
  }, selUser?.name), React.createElement("div", {
    style: {
      fontSize: 13,
      color: G1,
      marginTop: 2
    }
  }, selUser?.tag)))), React.createElement("div", {
    style: {
      padding: '16px 24px 32px',
      flexShrink: 0
    }
  }, React.createElement("button", {
    onClick: doSend,
    style: {
      width: '100%',
      background: W,
      color: BG,
      border: 'none',
      borderRadius: 100,
      padding: '17px 0',
      fontSize: 17,
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: F,
      transition: 'transform .12s, opacity .12s'
    }
  }, "Pay"))));
  if (flow === 'paying') return React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: G,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 430,
      margin: '0 auto'
    }
  }, React.createElement(DI, null), React.createElement(SBar, {
    dark: true
  }), React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      border: '4px solid rgba(0,0,0,.2)',
      borderTopColor: 'rgba(0,0,0,.7)',
      animation: 'spin .65s linear infinite'
    }
  }));
  if (flow === 'success') return React.createElement("div", {
    className: "fin",
    style: {
      position: 'fixed',
      inset: 0,
      background: BG,
      fontFamily: F,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 430,
      margin: '0 auto',
      padding: '0 28px'
    }
  }, React.createElement(DI, null), React.createElement(SBar, null), React.createElement(NotifBanner, null), React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 22
    }
  }, React.createElement("div", {
    className: "cb",
    style: {
      width: 74,
      height: 74,
      borderRadius: '50%',
      background: G,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement("svg", {
    width: "36",
    height: "36",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: BG,
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "M5 13l4 4L19 7"
  }))), React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1.25,
      color: W,
      letterSpacing: -.5
    }
  }, "You sent $", parseFloat(amount || 0).toFixed(2), " to ", selUser?.name)), React.createElement("div", {
    style: {
      paddingBottom: 52
    }
  }, React.createElement("button", {
    onClick: donePay,
    style: {
      width: '100%',
      background: G2,
      color: W,
      border: 'none',
      borderRadius: 100,
      padding: '16px 0',
      fontSize: 17,
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: F
    }
  }, "Done")));
  return null;
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
