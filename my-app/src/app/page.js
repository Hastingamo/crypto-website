"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const COIN_EMOJIS = {
  bitcoin: "₿", ethereum: "Ξ", tether: "₮", binancecoin: "B",
  solana: "◎", ripple: "✕", "usd-coin": "$", cardano: "₳",
  avalanche: "△", dogecoin: "Ð",
};

function SparklineSVG({ positive }) {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const noise = (Math.random() - 0.5) * 12;
    const trend = positive ? i * 2.5 : -i * 2.5;
    return Math.max(4, Math.min(26, 15 + noise + trend * 0.4));
  });
  const xs = pts.map((_, i) => 4 + i * 7.5);
  const pathD = pts
    .map((y, i) => `${i === 0 ? "M" : "L"}${xs[i]},${30 - y}`)
    .join(" ");
  const color = positive ? "#14b8a6" : "#f87171";
  return (
    <svg
      width="60"
      height="30"
      viewBox="0 0 64 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, margin: "0 16px" }}
    >
      <path
        d={pathD}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      height: 70,
      background: "rgba(255,255,255,0.03)",
      border: "0.5px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
        animation: "shimmer 1.5s infinite",
      }} />
    </div>
  );
}

function TickerCard({ coin, delay }) {
  const change = coin.price_change_percentage_24h || 0;
  const pos = change >= 0;
  const price =
    coin.current_price >= 1
      ? "$" + coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "$" + coin.current_price.toFixed(4);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        opacity: 0,
        animation: `slideIn 0.5s ease ${delay}s forwards`,
        transition: "background 0.2s, border-color 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.055)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "rgba(99,102,241,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", flexShrink: 0,
        }}>
          <Image src={coin.image} alt={coin.name} width={38} height={38} style={{ objectFit: "cover" }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{coin.name}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(240,240,240,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {coin.symbol}
          </div>
        </div>
      </div>

      <SparklineSVG positive={pos} />

      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
          {price}
        </div>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11,
          padding: "2px 7px", borderRadius: 4,
          background: pos ? "rgba(20,184,166,0.12)" : "rgba(239,68,68,0.12)",
          color: pos ? "#14b8a6" : "#f87171",
        }}>
          {pos ? "+" : ""}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

export default function Page() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadCoins = () => {
    setLoading(true);
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1"
    )
      .then(r => r.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setCoins(shuffled);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadCoins(); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #050810;
          color: #f0f0f0;
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        .nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(240,240,240,0.5);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #f0f0f0; }

        .btn-primary {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          padding: 14px 28px;
          background: #6366f1;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s;
        }
        .btn-primary:hover { background: #4f46e5; transform: translateY(-1px); }

        .btn-ghost {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(240,240,240,0.5);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .btn-ghost:hover { color: #f0f0f0; }

        .nav-cta {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          padding: 8px 20px;
          border: 0.5px solid rgba(99,102,241,0.5);
          border-radius: 4px;
          color: #a5b4fc;
          background: rgba(99,102,241,0.08);
          cursor: pointer;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .nav-cta:hover {
          background: rgba(99,102,241,0.18);
          border-color: #6366f1;
          color: #fff;
        }

        .refresh-btn {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(240,240,240,0.3);
          background: none;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.2s;
          padding: 4px 0;
          margin-top: 8px;
        }
        .refresh-btn:hover { color: rgba(240,240,240,0.7); }
      `}</style>

      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Glows */}
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          top: -120, right: -120, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
          bottom: 0, left: -80, pointerEvents: "none",
        }} />

        {/* Nav */}


        {/* Hero */}
        <section style={{
          position: "relative", padding: "4rem 2.5rem 2rem",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "3rem", alignItems: "center",
          minHeight: "calc(100vh - 73px)",
        }}>
          {/* Left */}
          <div style={{ zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              color: "#14b8a6", letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: "1.5rem", border: "0.5px solid rgba(20,184,166,0.3)",
              padding: "5px 12px", borderRadius: 100, background: "rgba(20,184,166,0.06)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#14b8a6", animation: "pulse 1.5s infinite" }} />
              Live market data
            </div>

            <h1 style={{
              fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 800,
              lineHeight: 0.95, letterSpacing: "-2px", color: "#fff", marginBottom: "1.5rem",
            }}>
              Trade crypto<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(99,102,241,0.7)" }}>without</span><br />
              limits
            </h1>

            <p style={{
              fontFamily: "'Space Mono', monospace", fontSize: 13,
              lineHeight: 1.8, color: "rgba(240,240,240,0.45)",
              maxWidth: 400, marginBottom: "2.5rem",
            }}>
              The ultimate platform to track live charts and trade cryptocurrencies
              with real-time data, precision tools, and zero compromise.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <button className="btn-primary" onClick={() => router.push("/Product")}>
                Start Trading
              </button>
              <button className="btn-ghost" onClick={() => router.push("/Product")}>
                How it works
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 4l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div style={{
              display: "flex", gap: "2.5rem", marginTop: "3rem",
              paddingTop: "2rem", borderTop: "0.5px solid rgba(255,255,255,0.06)",
            }}>
              {[["$4.2B", "Volume 24h"], ["240+", "Coins listed"], ["99.9%", "Uptime"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 2 }}>{val}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(240,240,240,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "rgba(99,102,241,0.1)", border: "0.5px solid rgba(99,102,241,0.25)",
              color: "#a5b4fc", fontFamily: "'Space Mono', monospace",
              fontSize: 10, padding: "4px 10px", borderRadius: 100,
              letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase",
            }}>
              <svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="3.5" fill="#14b8a6" /></svg>
              Live prices
            </div>

            {loading
              ? [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
              : coins.map((coin, i) => (
                <TickerCard key={coin.id} coin={coin} delay={0.1 + i * 0.15} />
              ))}

            <button className="refresh-btn" onClick={loadCoins}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M9.5 5.5A4 4 0 1 1 5.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M9.5 1.5v4h-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Refresh
            </button>
          </div>
        </section>
      </div>
    </>
  );
}