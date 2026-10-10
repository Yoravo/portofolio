"use client";

import { useId } from "react";
import styles from "./KanekiMascot.module.css";

// Vector fan art of Kaneki Ken (Tokyo Ghoul) at a programmer desk.
// Authentic anime design:
// - Human Mode (Anteiku student): Neat black hair, iconic medical eyepatch over left eye, gentle right eye, soft smile.
// - Ghoul Mode (Awakened): Wild white spiky hair, one recognizable red kakugan eye with dark sclera,
//   and Kaneki's iconic black gimp mask with exposed teeth, zipper, and neck bolts.
// - Seamless, continuously looping automatic CSS transformation between Human and Ghoul forms.
// - No manual replay button; hair and character have pointer-events: none !important.

const FACE_PATH =
  "M82 78 C82 46 98 32 120 32 C142 32 158 46 158 78 L158 98 C158 116 152 128 143 137 L127 148 Q120 153 113 148 L97 137 C88 128 82 116 82 98 Z";
const EYE_L_PATH = "M90 102 Q101 95 114 100 L113 106 Q103 111 93 107 Z";
const EYE_R_PATH = "M150 102 Q139 95 126 100 L127 106 Q137 111 147 107 Z";

// A hair lock: [top x, top y, top width, tip x, tip y], drawn as a tapered curve.
type Lock = [x: number, y: number, w: number, tx: number, ty: number];
const lockPath = ([x, y, w, tx, ty]: Lock) => {
  const bend = (tx - x) * 0.4;
  const my = (y + ty) / 2;
  return `M${x - w / 2} ${y} Q${x - w / 2 + bend} ${my} ${tx} ${ty} Q${x + w / 2 + bend} ${my} ${x + w / 2} ${y} Z`;
};
const lockLine = ([x, y, , tx, ty]: Lock) =>
  `M${x} ${y + 3} Q${x + (tx - x) * 0.4} ${(y + ty) / 2} ${x + (tx - x) * 0.75} ${y + (ty - y) * 0.75}`;

// Ghoul bangs frame the eyes while keeping the kakugan readable.
const GHOUL_BANGS: Lock[] = [
  [86, 56, 12, 84, 95],
  [96, 48, 12, 93, 97],
  [106, 45, 11, 105, 93],
  [116, 44, 10, 120, 116],
  [126, 44, 11, 125, 94],
  [136, 46, 12, 139, 93],
  [146, 52, 12, 149, 97],
  [155, 58, 11, 157, 94],
];
const GHOUL_SIDE: Lock[] = [
  [72, 74, 12, 74, 146],
  [80, 80, 10, 85, 128],
  [168, 74, 12, 166, 146],
  [160, 80, 10, 155, 128],
];

type Props = { human: string; ghoul: string; label: string };

export default function KanekiMascot({ human, ghoul, label }: Props) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  return (
    <div className={styles.root}>
      {/* Speech bubble: both lines share one grid cell and cross-fade with the loop */}
      <p className={styles.bubble}>
        <span className={styles.bubbleHuman}>{human}</span>
        <span className={styles.bubbleGhoul}>{ghoul}</span>
      </p>

      {/* Portrait Stage */}
      <div className={styles.stage}>
        <svg
          viewBox="0 0 240 250"
          role="img"
          aria-label={label}
          className={styles.svg}
        >
          <defs>
            <linearGradient id={id("skin")} x1="0" y1="32" x2="0" y2="153" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff8f4" />
              <stop offset="60%" stopColor="#fdf0ea" />
              <stop offset="100%" stopColor="#f5dad0" />
            </linearGradient>
            <linearGradient id={id("neckShade")} x1="0" y1="125" x2="0" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e5beb4" />
              <stop offset="100%" stopColor="#f7dad1" />
            </linearGradient>
            <linearGradient id={id("maskLeather")} x1="70" y1="70" x2="170" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#252433" />
              <stop offset="50%" stopColor="#181724" />
              <stop offset="100%" stopColor="#0e0d16" />
            </linearGradient>
            <linearGradient id={id("laptopMetal")} x1="50" y1="204" x2="190" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#454856" />
              <stop offset="55%" stopColor="#2c2e3a" />
              <stop offset="100%" stopColor="#181a22" />
            </linearGradient>
            <radialGradient id={id("aura")} cx="120" cy="96" r="112" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff1744" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#ff1744" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#ff1744" stopOpacity="0" />
            </radialGradient>
            <clipPath id={id("faceClip")}>
              <path d={FACE_PATH} />
            </clipPath>
            <clipPath id={id("eyeLClip")}>
              <path d={EYE_L_PATH} />
            </clipPath>
            <clipPath id={id("eyeRClip")}>
              <path d={EYE_R_PATH} />
            </clipPath>
            <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Red Ghoul Aura (Pulses automatically during Ghoul phase) */}
          <circle cx="120" cy="96" r="112" fill={`url(#${id("aura")})`} className={styles.aura} />

          {/* Idle breathing motion container */}
          <g className={styles.breathe}>
            {/* Back hair sits behind the head so it never paints over the face */}
            <g className={`${styles.humanState} ${styles.faceLayer}`}>
              <path
                d="M74 112 C68 62 86 24 120 24 C154 24 172 62 166 112 L164 128 C160 134 154 130 152 122 L150 108 L90 108 L88 122 C86 130 80 134 76 128 Z"
                fill="#15141e"
              />
            </g>
            <g className={`${styles.ghoulState} ${styles.faceLayer}`}>
              <path
                className={styles.ghoulHairShade}
                d="M58 116 C50 68 76 16 120 16 C164 16 190 68 182 116
                   L186 150 L174 135 L170 160 L156 142 L150 158 L138 145
                   L96 145 L88 158 L82 142 L68 160 L64 135 L56 150 Z"
              />
            </g>

            {/* ── BASE SHOULDERS & HIGH BLACK TURTLENECK COLLAR ── */}
            <g className={styles.character}>
              {/* Shoulders & Cloak */}
              <path
                d="M0 250 L0 224 C12 200 40 186 78 180 L102 168 L138 168 L162 180 C200 186 228 200 240 224 L240 250 Z"
                fill="#111018"
              />
              <path d="M24 212 C44 200 64 196 86 196" stroke="#242232" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M216 212 C196 200 176 196 154 196" stroke="#242232" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Neck & Neck Shadow */}
              <path d="M105 125 L105 174 Q120 182 135 174 L135 125 Z" fill={`url(#${id("neckShade")})`} />
              <ellipse cx="120" cy="146" rx="16" ry="9" fill="#d8a69c" />

              {/* High Ragged Tattered Turtleneck Collar */}
              <path
                d="M90 164 C100 178 140 178 150 164 L162 186 L152 182 L154 202 L142 190 L136 206 L128 190 L120 208 L112 190 L104 204 L100 186 L88 196 L90 182 Z"
                fill="#191824"
              />
              <g fill="none" stroke="#2a283a" strokeWidth="1.6" strokeLinecap="round">
                <path d="M98 174 L106 194" />
                <path d="M142 174 L134 196" />
                <path d="M120 178 L121 200" />
              </g>

              {/* Ears */}
              <path d="M82 92 C75 90 73 100 76 108 C78 114 82 116 84 114 Z" fill="#f5dbd2" />
              <path d="M158 92 C165 90 167 100 164 108 C162 114 158 116 156 114 Z" fill="#f5dbd2" />
              <path d="M82 98 Q79 104 82 110" stroke="#cf9c92" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M158 98 Q161 104 158 110" stroke="#cf9c92" strokeWidth="1.2" fill="none" strokeLinecap="round" />

              {/* Anime Face Canvas */}
              <path d={FACE_PATH} fill={`url(#${id("skin")})`} />

              {/* Forehead & Cheek Cel-Shading */}
              <g clipPath={`url(#${id("faceClip")})`}>
                <path
                  d="M78 78 Q98 106 120 104 Q142 106 162 78 L162 115 Q140 128 120 126 Q100 128 78 115 Z"
                  fill="#d4a89e"
                  opacity="0.55"
                />
                <path d="M144 100 C152 112 152 126 142 136 L158 136 L158 96 Z" fill="#e8bfb5" opacity="0.45" />
              </g>
            </g>

            {/* ══════════════════════════════════════════════════════════
               1. HUMAN MODE (Anteiku Student Look)
               Neat black hair, medical eyepatch over left eye, gentle smile.
               ══════════════════════════════════════════════════════════ */}
            <g className={`${styles.humanState} ${styles.faceLayer}`}>
              {/* Gentle Eyebrows */}
              <path d="M94 92 Q103 87 113 90" stroke="#161420" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M127 90 Q137 87 146 92" stroke="#161420" strokeWidth="2.2" strokeLinecap="round" fill="none" />

              {/* Right Eye (Viewer's left: Warm, gentle anime eye with soft reflections) */}
              <g className={styles.blink}>
                <path d={EYE_L_PATH} fill="#f4f5f9" />
                <g clipPath={`url(#${id("eyeLClip")})`}>
                  <circle cx="103.5" cy="102" r="5.2" fill="#525464" />
                  <circle cx="103.5" cy="102" r="3.6" fill="#323340" />
                  <circle cx="103.5" cy="102" r="2" fill="#15161c" />
                  <circle cx="102" cy="100.5" r="1.3" fill="#ffffff" />
                  <circle cx="105.5" cy="103.5" r="0.8" fill="#ffffff" />
                </g>
                <path d="M91 101 Q103 94 116 100" stroke="#181622" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              </g>

              {/* Left Eye: Iconic Medical Gauze Eyepatch */}
              <g>
                {/* Straps */}
                <path d="M148 95 L160 88 L170 84" stroke="#d5d8e6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M125 106 L118 112 L84 105" stroke="#d5d8e6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                {/* Gauze Patch */}
                <rect x="125" y="93" width="25" height="21" rx="3.5" fill="#fcfdfe" stroke="#b8bccd" strokeWidth="1.1" />
                {/* Stitch pattern */}
                <g fill="#9ea3ba" opacity="0.65">
                  <circle cx="131" cy="99" r="0.7" /><circle cx="137.5" cy="99" r="0.7" /><circle cx="144" cy="99" r="0.7" />
                  <circle cx="131" cy="103.5" r="0.7" /><circle cx="137.5" cy="103.5" r="0.7" /><circle cx="144" cy="103.5" r="0.7" />
                  <circle cx="131" cy="108" r="0.7" /><circle cx="137.5" cy="108" r="0.7" /><circle cx="144" cy="108" r="0.7" />
                </g>
              </g>

              {/* Anticipation: veins creep out from under the eyepatch */}
              <g className={styles.veinCreep} fill="none" stroke="#e01235" strokeLinecap="round">
                <path pathLength={1} d="M150 104 Q157 108 162 114 L167 120" strokeWidth="1.2" />
                <path pathLength={1} d="M150 108 L158 109 L165 112" strokeWidth="0.9" />
                <path pathLength={1} d="M142 114 Q145 119 147 124" strokeWidth="1" />
              </g>

              {/* Nose: small anime dot */}
              <path d="M120 116 L121.5 120 L118.5 121" stroke="#c9958c" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* Gentle, innocent smile */}
              <path d="M113 134 Q120 138 127 134" stroke="#945f65" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M118 140 Q120 141 122 140" stroke="#d8a8a2" strokeWidth="1" strokeLinecap="round" fill="none" />

              {/* Human Black Hair (Solid, rounded neat bowl-cut) */}
              <g className={styles.hairGroup}>
                <path
                  d="M76 80
                     C74 48 92 26 120 26
                     C148 26 166 48 164 80
                     L163 102 Q160 110 156 97
                     L151 87 L147 92
                     L142 85 L137 91
                     L132 86 L127 93
                     L122 85 L117 91
                     L112 86 L107 91
                     L102 85 L97 92
                     L93 86 L89 98
                     Q85 110 81 102
                     Z"
                  fill="#181622"
                />
                {/* Sheen highlight across crown */}
                <path
                  d="M88 52 Q120 38 152 52 L150 56 Q120 42 90 56 Z"
                  fill="#323044"
                  opacity="0.85"
                />
              </g>
            </g>

            {/* ══════════════════════════════════════════════════════════
               2. GHOUL MODE (Awakened Tokyo Ghoul Mask & White Hair)
               Iconic black leather mask with zipper and teeth, glowing Kakugan, white spikes.
               ══════════════════════════════════════════════════════════ */}
            <g className={`${styles.ghoulState} ${styles.faceLayer}`}>
              {/* Aggressive angled left brow (above Kakugan) */}
              <path d="M126 91 Q138 85 150 91" stroke="#14111c" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* ── KANEKI'S ICONIC BLACK LEATHER GHOUL MASK ── */}
              <g className={styles.mask}>
                {/* Neck Guard (Leather collar with stitching) */}
                <path d="M96 138 L90 178 L150 178 L144 138 Q120 150 96 138 Z" fill={`url(#${id("maskLeather")})`} />

                {/* Mask Ear/Head Straps */}
                <path d="M82 112 L66 100" stroke="#161520" strokeWidth="6" strokeLinecap="round" />
                <path d="M158 112 L174 100" stroke="#161520" strokeWidth="6" strokeLinecap="round" />

                {/* Main Lower Mask (Covers nose, cheeks, jaw, and chin) */}
                <path
                  d="M80 102
                     Q100 114 120 106
                     Q140 114 160 102
                     L158 122 C154 134 148 141 143 138 L127 150 Q120 154 113 150 L97 138 C88 128 82 116 82 102 Z"
                  fill={`url(#${id("maskLeather")})`}
                  stroke="#0b0a12"
                  strokeWidth="1.5"
                />

                {/* Right Eye Leather Patch & Buckle Straps (Viewer's left: covers the human eye) */}
                <path
                  d="M82 104 L82 82 C82 74 95 70 115 76 C120 83 120 98 115 106 C99 114 82 104 82 104 Z"
                  fill={`url(#${id("maskLeather")})`}
                  stroke="#0b0a12"
                  strokeWidth="1.4"
                />
                <path d="M108 75 L132 58" stroke="#161520" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M84 94 L68 90" stroke="#161520" strokeWidth="4" strokeLinecap="round" />
                {/* Strap Rivet */}
                <circle cx="108" cy="76" r="2" fill="#757888" />
                <circle cx="108" cy="76" r="1" fill="#424555" />

                {/* Defined Nose Contour Bridge on Leather */}
                <path d="M120 106 L121.5 118 L118.5 119" stroke="#363445" strokeWidth="1.2" fill="none" strokeLinecap="round" />

                {/* ── THE ICONIC ZIPPER MOUTH WITH TEETH ── */}
                <g className={styles.zipperMouth}>
                  {/* Dark Red Throat Opening inside zipper */}
                  <path
                    d="M102 127 C112 121 128 121 138 127 C128 140 112 140 102 127 Z"
                    fill="#4a040e"
                    stroke="#1c1926"
                    strokeWidth="1.4"
                  />

                  {/* Sharp Grinning Teeth */}
                  <path
                    d="M105 127 L107 132 L110 126 L113 133 L116 126 L120 134 L124 126 L127 133 L130 126 L133 132 L135 127"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M106 137 L109 133 L112 138 L115 133 L119 138 L123 133 L126 138 L129 133 L132 138"
                    fill="none"
                    stroke="#f0f1f5"
                    strokeWidth="1.2"
                    strokeLinejoin="miter"
                  />

                  {/* Metallic Zipper Teeth Tracks on top and bottom lip */}
                  <path
                    d="M98 127 C112 119 128 119 142 127"
                    stroke="#989cae"
                    strokeWidth="2.2"
                    strokeDasharray="1.5 2.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M100 127 C112 142 128 142 140 127"
                    stroke="#989cae"
                    strokeWidth="2.2"
                    strokeDasharray="1.5 2.2"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Silver Zipper Pull Slider at left corner */}
                  <rect x="94" y="123" width="5" height="8" rx="1.5" fill="#a4a7b8" />
                  <circle cx="96.5" cy="132" r="2.5" fill="none" stroke="#a4a7b8" strokeWidth="1.4" />
                </g>

                {/* Metallic Frankenstein Bolts on Neck Collar */}
                {/* Left Bolt */}
                <rect x="94" y="156" width="8" height="6" rx="1" fill="#757888" transform="rotate(-15 98 159)" />
                <rect x="92" y="157" width="3" height="4" fill="#a6aab8" transform="rotate(-15 93 159)" />
                {/* Right Bolt */}
                <rect x="138" y="156" width="8" height="6" rx="1" fill="#757888" transform="rotate(15 142 159)" />
                <rect x="145" y="157" width="3" height="4" fill="#a6aab8" transform="rotate(15 146 159)" />
              </g>

              {/* Left Eye: KAKUGAN! (Jet-black sclera + glowing crimson iris + spider veins) */}
              <g className={styles.kakuganEye}>
                {/* Black Sclera */}
                <path d={EYE_R_PATH} fill="#0d050c" />
                <g clipPath={`url(#${id("eyeRClip")})`}>
                  {/* Glowing crimson iris & rings */}
                  <circle cx="137" cy="102" r="6.2" fill="#ff1744" filter={`url(#${id("glow")})`} />
                  <circle cx="137" cy="102" r="4.6" fill="#d90429" />
                  <circle cx="137" cy="102" r="2.8" fill="#800010" />
                  <circle cx="135.5" cy="100.8" r="1.3" fill="#ffffff" />
                </g>
                {/* Lash line */}
                <path d="M124 100 Q137 94 150 102" stroke="#15050f" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              </g>

              {/* Red Spider-Veins crawling out from Kakugan onto cheek and temple */}
              <g className={styles.veinPulse} fill="none" stroke="#e01235" strokeLinecap="round">
                <path d="M148 102 Q156 107 162 114 L168 120" strokeWidth="1.3" />
                <path d="M154 107 L163 106 L170 108" strokeWidth="1" />
                <path d="M142 108 Q146 116 148 124" strokeWidth="1.1" />
                <path d="M144 116 L141 122" strokeWidth="0.8" />
              </g>

              {/* ── GHOUL WHITE HAIR (Voluminous, layered anime spikes) ── */}
              <g className={styles.hairGroup}>
                {/* Layer 1: Cel-Shaded Lavender-Grey Underlayer */}
                <path
                  className={styles.ghoulHairShade}
                  d="M62 98 C54 50 78 12 120 12 C162 12 186 50 178 98
                     L172 78 L160 58 L142 42 L120 38 L98 42 L80 58 L68 78 Z
                     M88 44 Q80 22 92 16 Q94 30 100 42 Z
                     M100 36 Q108 10 120 12 Q116 24 118 34 Z
                     M122 34 Q132 8 142 12 Q138 24 138 36 Z
                     M140 42 Q152 20 160 24 Q154 34 150 44 Z"
                />

                {/* Layer 2: Main Snow-White Hair Body & Tufts */}
                <path
                  className={styles.ghoulHairMain}
                  d="M66 100 C58 52 82 14 120 14 C158 14 182 52 174 100
                     L166 80 L158 64 L142 48 L120 45 L98 48 L82 64 L74 80 Z
                     M92 48 Q84 24 96 20 Q98 34 104 46 Z
                     M104 40 Q112 14 122 16 Q118 28 120 38 Z
                     M122 38 Q132 12 140 16 Q136 28 136 40 Z
                     M138 46 Q150 22 156 26 Q152 36 148 48 Z"
                />

                {/* Layer 3: Layered Bangs Falling Over Mask & Forehead */}
                {[...GHOUL_SIDE, ...GHOUL_BANGS].map((s) => (
                  <path key={s.join()} className={styles.ghoulHairMain} d={lockPath(s)} />
                ))}

                {/* Manga strand texture lines */}
                <g className={styles.ghoulHairLines} fill="none" strokeWidth="0.8" strokeLinecap="round">
                  {[...GHOUL_SIDE, ...GHOUL_BANGS].map((s) => (
                    <path key={s.join()} d={lockLine(s)} />
                  ))}
                  <path d="M88 44 Q104 30 120 28" />
                  <path d="M152 44 Q136 30 120 28" />
                </g>

                {/* Crown highlight sheen */}
                <path
                  d="M84 46 Q120 24 156 46 L154 51 Q120 31 86 51 Z"
                  fill="#ffffff"
                  opacity="0.95"
                />
              </g>
            </g>
          </g>

          {/* ── SLEEVES & HANDS TYPING AT LAPTOP ── */}
          <g className={styles.handL}>
            <path fill="#111018" d="M14 250 C16 232 30 220 48 220 L64 228 L62 250 Z" />
            <ellipse cx="60" cy="226" rx="11" ry="6.5" fill="#f1d5cd" transform="rotate(-12 60 226)" />
            <path d="M64 222 L70 220 M65 226 L71 225 M64 230 L69 230" stroke="#d9b1a8" strokeWidth="1.2" strokeLinecap="round" />
          </g>
          <g className={styles.handR}>
            <path fill="#111018" d="M226 250 C224 232 210 220 192 220 L176 228 L178 250 Z" />
            <ellipse cx="180" cy="226" rx="11" ry="6.5" fill="#f1d5cd" transform="rotate(12 180 226)" />
            <path d="M176 222 L170 220 M175 226 L169 225 M176 230 L171 230" stroke="#d9b1a8" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* ── SPACE-GREY LAPTOP LID WITH NEON CODE TAG < / > ── */}
          <path fill={`url(#${id("laptopMetal")})`} d="M54 250 L62 208 Q120 203 178 208 L186 250 Z" />
          <path fill="none" stroke="#7a7f93" strokeWidth="1.2" d="M62 208 Q120 203 178 208" />
          <path fill="#ffffff" opacity="0.07" d="M70 210 L96 207 L74 250 L58 250 Z" />
          <text
            x="120"
            y="235"
            textAnchor="middle"
            className={styles.logo}
            filter={`url(#${id("glow")})`}
          >
            {"</>"}
          </text>
        </svg>

        {/* Soft red pulse at the moment of awakening */}
        <span className={styles.flash} aria-hidden="true" />
      </div>
    </div>
  );
}
