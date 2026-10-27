"use client";
import { useId } from "react";
export default function Burger({
  spread = 0,
  cheese = true,
  toppings = ["Salat", "Tomate", "Zwiebel"],
  veggie = false,
  bunStyle = "Sesam-Bun",
  sauce = "BBQ-Stil",
}: {
  spread?: number;
  cheese?: boolean;
  toppings?: string[];
  veggie?: boolean;
  bunStyle?: string;
  sauce?: string;
}) {
  const id = useId().replace(/:/g, "");
  const bun = `bun-${id}`,
    meat = `meat-${id}`,
    shadow = `shadow-${id}`;
  return (
    <svg
      className="burger-art"
      viewBox="0 0 640 540"
      role="img"
      aria-label={`Illustrierter Burger${veggie ? " mit Veggie-Patty" : ""}${cheese ? " und Käse" : ""}`}
    >
      <defs>
        <linearGradient id={bun} x2="0" y2="1">
          <stop stopColor="#ffcc76" />
          <stop offset=".6" stopColor="#df8c35" />
          <stop offset="1" stopColor="#a74b20" />
        </linearGradient>
        <linearGradient id={meat} x2="0" y2="1">
          <stop stopColor={veggie ? "#7e6632" : "#63351f"} />
          <stop offset="1" stopColor="#271b13" />
        </linearGradient>
        <filter id={shadow}>
          <feDropShadow dx="0" dy="15" stdDeviation="12" floodOpacity=".3" />
        </filter>
      </defs>
      <ellipse cx="320" cy="477" rx="206" ry="23" fill="#17150e" opacity=".2" />
      <g
        filter={`url(#${shadow})`}
        style={{ transform: `translateY(${spread * 70}px)` }}
      >
        <path
          d="M105 385 Q320 350 535 385 L519 430 Q320 486 122 429Z"
          fill={`url(#${bun})`}
        />
        <path
          d="M115 388Q320 426 526 388"
          stroke="#f4bd69"
          strokeWidth="12"
          fill="none"
        />
      </g>
      <g style={{ transform: `translateY(${spread * 30}px)` }}>
        <path
          d="M98 345Q130 325 165 341Q200 322 236 338Q280 324 320 340Q370 322 400 340Q460 320 541 346L525 383Q321 424 111 381Z"
          fill={`url(#${meat})`}
        />
        <path
          d="M135 356L189 363M218 353L259 367M299 355L352 368M392 352L443 362M470 349L507 361"
          stroke="#a56b36"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
      <path
        style={{ transform: `translateY(${-spread * 5}px)` }}
        d="M120 329 Q210 310 298 329 T520 326"
        fill="none"
        stroke={sauce === "BBQ-Stil" ? "#8e3c1b" : "#e7a46a"}
        strokeWidth="12"
        strokeLinecap="round"
      />
      {cheese && (
        <path
          style={{ transform: `translateY(${-spread * 10}px)` }}
          d="M102 324L291 304L540 327L483 362L418 341L362 382L287 346L195 365Z"
          fill="#ffce3c"
          stroke="#e6a02a"
          strokeWidth="3"
        />
      )}
      {toppings.includes("Tomate") && (
        <g
          style={{ transform: `translateY(${-spread * 45}px)` }}
          fill="#e4482c"
          stroke="#a62b1a"
          strokeWidth="4"
        >
          <ellipse cx="229" cy="302" rx="120" ry="25" />
          <ellipse cx="420" cy="299" rx="112" ry="25" />
        </g>
      )}
      {toppings.includes("Zwiebel") && (
        <g
          style={{ transform: `translateY(${-spread * 70}px)` }}
          fill="none"
          stroke="#f2c0d4"
          strokeWidth="10"
        >
          <ellipse cx="250" cy="282" rx="89" ry="15" />
          <ellipse cx="405" cy="278" rx="77" ry="14" />
        </g>
      )}
      {toppings.includes("Salat") && (
        <path
          style={{ transform: `translateY(${-spread * 95}px)` }}
          d="M93 267Q113 233 145 254Q166 224 191 251Q216 221 250 244Q282 221 313 243Q344 221 378 244Q413 221 442 245Q475 223 494 247Q528 230 550 267L529 287Q498 274 475 291Q444 276 414 291Q379 276 348 291Q314 275 279 292Q245 276 214 291Q181 276 155 292Z"
          fill="#78a63a"
          stroke="#476e26"
          strokeWidth="4"
        />
      )}
      <g
        filter={`url(#${shadow})`}
        style={{ transform: `translateY(${-spread * 140}px)` }}
      >
        <path
          d="M102 239C102 63 532 52 539 237Q324 277 102 239Z"
          fill={`url(#${bun})`}
        />
        <path
          d="M119 229Q320 256 523 229"
          fill="none"
          stroke="#ffd98b"
          strokeWidth="10"
        />
        {Array.from({ length: bunStyle === "Sesam-Bun" ? 24 : 0 }, (_, i) => (
          <ellipse
            key={i}
            cx={161 + ((i * 61) % 310)}
            cy={137 + ((i * 29) % 77)}
            rx="8"
            ry="3.5"
            fill="#ffe4ad"
            transform={`rotate(${i * 23} ${161 + ((i * 61) % 310)} ${137 + ((i * 29) % 77)})`}
          />
        ))}
      </g>
    </svg>
  );
}
