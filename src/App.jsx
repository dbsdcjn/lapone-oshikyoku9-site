import { useState, useMemo } from "react";
import { Star, Download, RefreshCw, Check, Share2 } from "lucide-react";

// ---------------------------------------------------------------------------
// 曲データはここに書く（公開前に手元の準備ツールで取得した結果を貼ってね）
// title / group / videoId（YouTubeの動画ID）の3つだけでOK。
// サムネイルは videoId から自動で組み立てるので、画像は別途用意しなくていい。
// group はタブ分けに使うので、LAPONEの表記
// JO1 / INI / DXTEEN / KO1KEYZ / ME:I / IS:SUE で統一してね。
// ---------------------------------------------------------------------------
const SONGS = [
  { id: "s1", title: "All 4 U", group: "INI", videoId: "nBBYmYvsbP0" },
  { id: "s2", title: "WMDA (Where My Drums At)", group: "INI", videoId: "Xptp59SzcL0" },
  { id: "s3", title: "LOUD", group: "INI", videoId: "ShmbjdP4eoI" },
  { id: "s4", title: "LEGIT", group: "INI", videoId: "j0M2ZH_5wCk" },
  { id: "s5", title: "FANFARE", group: "INI", videoId: "K3JGhIkExzo" },
  { id: "s6", title: "SPECTRA", group: "INI", videoId: "aMOa320erOQ" },
  { id: "s7", title: "Rocketeer", group: "INI", videoId: "xgWFK4REfgk" },
  { id: "s8", title: "無限大(INFINITY)", group: "JO1", videoId: "U-n1BR5JCDI" },
  { id: "s9", title: "OH-EH-OH", group: "JO1", videoId: "jp2aivJn9gg" },
  { id: "s10", title: "Shine A Light", group: "JO1", videoId: "3tna5dDdDKc" },
  { id: "s11", title: "Born To Be Wild", group: "JO1", videoId: "-_P_cD0yimw" },
  { id: "s12", title: "REAL", group: "JO1", videoId: "BMG_ZlqwOZM" },
  { id: "s13", title: "STAY [SUMMER VER.]", group: "JO1", videoId: "OfH19dWtuK8" },
  { id: "s14", title: "僕らの季節", group: "JO1", videoId: "Zxnc3aMHt0E" },
  { id: "s15", title: "飛べるから", group: "JO1", videoId: "R8thF-ZdSFI" },
  { id: "s16", title: "With Us", group: "JO1", videoId: "Zf59GBy4564" },
  { id: "s17", title: "SuperCali", group: "JO1", videoId: "5nE7budaeO4" },
  { id: "s18", title: "Tiger", group: "JO1", videoId: "ZBFopHu5RsE" },
  { id: "s19", title: "NEWSmile", group: "JO1", videoId: "ID6TB4slrCQ" },
  { id: "s20", title: "RadioVision", group: "JO1", videoId: "A8Z_0W_l2Io" },
  { id: "s21", title: "Venus", group: "JO1", videoId: "3iSsqYWKJYs" },
  { id: "s22", title: "Eyes On Me (feat.R3HAB)", group: "JO1", videoId: "NvdrZ_Bgk38" },
  { id: "s23", title: "Your Key", group: "JO1", videoId: "70zBVAFqvHQ" },
  { id: "s24", title: "Love seeker", group: "JO1", videoId: "jjr6yrzUAqI" },
  { id: "s25", title: "WHERE DO WE GO", group: "JO1", videoId: "q-RrB2OBf6s" },
  { id: "s26", title: "BE CLASSIC", group: "JO1", videoId: "PjhdKY0hyCA" },
  { id: "s27", title: "Handz In My Pocket", group: "JO1", videoId: "wniN-2kFKRc" },
  { id: "s28", title: "景色 (JI BLUE)", group: "JO1", videoId: "KLEaBDx3JHc" },
  { id: "s28b", title: "景色 (JI BLUE)", group: "INI", videoId: "KLEaBDx3JHc" },
  { id: "s29", title: "Brighter", group: "INI", videoId: "99j1FLRE2HQ" },
  { id: "s30", title: "CALL 119", group: "INI", videoId: "RJJAJwJttiY" },
  { id: "s31", title: "We Are", group: "INI", videoId: "_7UIC72D8II" },
  { id: "s32", title: "Password", group: "INI", videoId: "ZU58-PZnXOM" },
  { id: "s33", title: "HANA_花", group: "INI", videoId: "gX-kRZi2PXc" },
  { id: "s34", title: "DOMINANCE", group: "INI", videoId: "1NY-tAGiW5M" },
  { id: "s35", title: "君がいたから", group: "INI", videoId: "Rmt06HTHHWQ" },
  { id: "s36", title: "Brand New Day", group: "DXTEEN", videoId: "7k0Qktw8n2E" },
  { id: "s37", title: "First Flight", group: "DXTEEN", videoId: "TwN7GRE-IjM" },
  { id: "s38", title: "Snowin'", group: "DXTEEN", videoId: "7osGrOq45oQ" },
  { id: "s39", title: "Dance On Open World", group: "DXTEEN", videoId: "27jGFxEdbXQ" },
  { id: "s40", title: "Level Up", group: "DXTEEN", videoId: "-gWHk314lHs" },
  { id: "s41", title: "Tick-Tack", group: "DXTEEN", videoId: "ad19Ss2buRc" },
  { id: "s42", title: "両片想い", group: "DXTEEN", videoId: "esiaDnFotXQ" },
  { id: "s43", title: "ハルコイ", group: "DXTEEN", videoId: "xLiC0ivBhlA" },
  { id: "s44", title: "Click", group: "ME:I", videoId: "G-LdNMa99oQ" },
  { id: "s45", title: "Hi-Five", group: "ME:I", videoId: "2uU7cWfnuKw" },
  { id: "s46", title: "MUSE", group: "ME:I", videoId: "zPmSwXMQtRk" },
  { id: "s47", title: "THIS IS ME:I", group: "ME:I", videoId: "UwpfFRuu2lI" },
  { id: "s48", title: "花咲く道", group: "ME:I", videoId: "ouF70vuL6pg" },
  { id: "s49", title: "CONNECT", group: "IS:SUE", videoId: "OTKY-xljazo" },
  { id: "s50", title: "THE FLASH GIRL", group: "IS:SUE", videoId: "aEPF_mB44tc" },
  { id: "s51", title: "SHINING", group: "IS:SUE", videoId: "bKERxsZgFe0" },
  { id: "s52", title: "Phase", group: "IS:SUE", videoId: "kacuL0bgsdI" },
  { id: "s53", title: "Quartet", group: "IS:SUE", videoId: "RkC-XfuwCsM" },
  { id: "s54", title: "ICY (Performance Ver.)", group: "JO1", videoId: "zUzk8Z-ZUWM" },
  { id: "s55", title: "Trigger (Performance Ver.)", group: "JO1", videoId: "E0T3t-qc7-0" },
  { id: "s56", title: "Walk It Like I Talk It (Performance Ver.)", group: "JO1", videoId: "RgWr9jCN8jo" },
  { id: "s57", title: "RUSH (JO1DER SHOW 2026 Live)", group: "JO1", videoId: "Zha4ADdx8gs" },
  { id: "s58", title: "BE CLASSIC (JO1DER SHOW 2025 Live)", group: "JO1", videoId: "Mx9QP_W261Q" },
  { id: "s59", title: "Aqua (4th Anniversary Live)", group: "JO1", videoId: "OW7ArDFfiTE" },
  { id: "s60", title: "ONE NIGHT (Performance Ver.)", group: "INI", videoId: "iP1LJrV_mm8" },
  { id: "s61", title: "DOMINANCE (Performance Ver.)", group: "INI", videoId: "EEIR8iaMCA8" },
  { id: "s62", title: "WMDA(Where My Drums At) (Performance Ver.)", group: "INI", videoId: "YodQDDLRMBk" },
  { id: "s63", title: "DOMINANCE+WMDA (ROCK IN JAPAN 2025 Live)", group: "INI", videoId: "rPTJEEGpLN8" },
  { id: "s64", title: "Non-Stop (XQUARE Live)", group: "INI", videoId: "B_LUdObnc-0" },
  { id: "s65", title: "Good Luck (Performance Ver.)", group: "DXTEEN", videoId: "oAHXydQ7Tes" },
  { id: "s66", title: "Dance On Open World (Performance Ver.)", group: "DXTEEN", videoId: "iLqoGqgd03o" },
  { id: "s67", title: "Level Up (Performance Ver.)", group: "DXTEEN", videoId: "W02HsuZ2jrs" },
  { id: "s68", title: "両片想い (ARENA LIVE 2026)", group: "DXTEEN", videoId: "LyGqQWJo7FM" },
  { id: "s69", title: "Handle (LAPOSTA 2025 Live)", group: "DXTEEN", videoId: "z05drVT-RRM" },
  { id: "s70", title: "What's DXTEEN? (ARENA LIVE 2026)", group: "DXTEEN", videoId: "rf7hQYW6i7s" },
  { id: "s71", title: "MUSE (Performance Ver.)", group: "ME:I", videoId: "hJADkExLWe4" },
  { id: "s72", title: "THIS IS ME:I (Performance Ver.)", group: "ME:I", videoId: "qlTnORS2Jhk" },
  { id: "s73", title: "Hi-Five (Performance Ver.)", group: "ME:I", videoId: "2ByRD29wKBE" },
  { id: "s74", title: "MUSE (ROCK IN JAPAN 2025 Live)", group: "ME:I", videoId: "3hpjZ-nKVDg" },
  { id: "s75", title: "MUSE (KCON JAPAN 2026 Live)", group: "ME:I", videoId: "dNsP1o783Z8" },
  { id: "s76", title: "Super Luna (Performance Ver.)", group: "IS:SUE", videoId: "4Xt_hR0KNvY" },
  { id: "s77", title: "Telepathy (Performance Ver.)", group: "IS:SUE", videoId: "InlIOxeHDYQ" },
  { id: "s78", title: "Breaking Thru the Line (Performance Ver.)", group: "IS:SUE", videoId: "gH2pPQnrFrA" },
  { id: "s79", title: "Quartet (1ST TOUR FINAL Live)", group: "IS:SUE", videoId: "1u-Qz9z4R84" },
  { id: "s80", title: "Super Luna (1ST TOUR Live)", group: "IS:SUE", videoId: "rYIwTVwNwwc" },
  { id: "s81", title: "NO Game Over (ROCK IN JAPAN 2025 Live)", group: "IS:SUE", videoId: "pYz5Zyjl-Ak" },
  // ここに続きを追加していく（KO1KEYZ も同じ形式でOK）
];

function loadImage(src, crossOrigin) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function truncateToWidth(ctx, text, maxWidth) {
  let t = text;
  if (ctx.measureText(t).width <= maxWidth) return t;
  while (t.length > 1 && ctx.measureText(t + "\u2026").width > maxWidth) t = t.slice(0, -1);
  return t + "\u2026";
}

export default function LaponeOshikyoku9Public() {
  const groups = useMemo(() => {
    const set = new Set(SONGS.map((s) => s.group));
    return ["すべて", ...Array.from(set)];
  }, []);

  const [activeGroup, setActiveGroup] = useState("すべて");
  const [selectedIds, setSelectedIds] = useState([]);
  const [centerId, setCenterId] = useState(null);
  const [toast, setToast] = useState("");
  const [exporting, setExporting] = useState(false);

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2200);
  }

  const visibleSongs = activeGroup === "すべて" ? SONGS : SONGS.filter((s) => s.group === activeGroup);

  function toggleSelect(id) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (centerId === id) setCenterId(null);
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 9) {
        showToast("選べるのは9曲まで");
        return prev;
      }
      return [...prev, id];
    });
  }

  function toggleCenter(id, e) {
    e.stopPropagation();
    if (!selectedIds.includes(id)) return;
    setCenterId((prev) => (prev === id ? null : id));
  }

  function resetSelection() {
    setSelectedIds([]);
    setCenterId(null);
  }

  const slotOrder = [0, 1, 2, 3, 5, 6, 7, 8];
  const outer = selectedIds.filter((id) => id !== centerId);
  const slots = Array(9).fill(null);
  if (centerId) slots[4] = SONGS.find((s) => s.id === centerId) || null;
  outer.forEach((id, i) => {
    if (i < slotOrder.length) slots[slotOrder[i]] = SONGS.find((s) => s.id === id) || null;
  });

  const selectedCount = selectedIds.length;
  const canExport = selectedCount === 9 && !!centerId;

  async function buildCanvas() {
    const cellW = 380,
      cellH = Math.round((cellW * 9) / 16),
      gap = 20,
      pad = 40,
      headerH = 176,
      footerH = 64;
    const canvas = document.createElement("canvas");
    canvas.width = pad * 2 + cellW * 3 + gap * 2;
    canvas.height = headerH + cellH * 3 + gap * 2 + footerH;
    const ctx = canvas.getContext("2d");

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, "#ffffff");
    bg.addColorStop(1, "#fff3ea");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = headerH + (cellH * 3 + gap * 2) / 2;
    const glow = ctx.createRadialGradient(cx, cy, 40, cx, cy, 560);
    glow.addColorStop(0, "rgba(255,122,41,0.16)");
    glow.addColorStop(1, "rgba(255,122,41,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.fillStyle = "#2b2420";
    ctx.font = "900 46px 'Zen Kaku Gothic New', sans-serif";
    ctx.fillText("LAPONE \u63a8\u3057\u66f29\u9078", cx, 78);
    ctx.font = "500 20px 'Noto Sans JP', sans-serif";
    ctx.fillStyle = "#d97a3a";
    ctx.fillText("MY BEST 9 SETLIST", cx, 112);

    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = pad + col * (cellW + gap);
      const y = headerH + row * (cellH + gap);
      const song = slots[i];
      const isCenter = i === 4;

      ctx.save();
      roundRectPath(ctx, x, y, cellW, cellH, 18);
      ctx.clip();
      if (song) {
        try {
          const img = await loadImage(`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`, "anonymous");
          const scale = Math.max(cellW / img.width, cellH / img.height);
          const iw = img.width * scale;
          const ih = img.height * scale;
          ctx.drawImage(img, x + (cellW - iw) / 2, y + (cellH - ih) / 2, iw, ih);
        } catch (e) {
          ctx.fillStyle = "#ffddb0";
          ctx.fillRect(x, y, cellW, cellH);
        }
        const grad = ctx.createLinearGradient(0, y + cellH - 84, 0, y + cellH);
        grad.addColorStop(0, "rgba(20,14,8,0)");
        grad.addColorStop(1, "rgba(20,14,8,0.82)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, y + cellH - 84, cellW, 84);

        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 21px 'Noto Sans JP', sans-serif";
        ctx.fillText(truncateToWidth(ctx, song.title, cellW - 32), x + 16, y + cellH - 42);
        ctx.font = "500 15px 'Noto Sans JP', sans-serif";
        ctx.fillStyle = "#ffd7ae";
        ctx.fillText(truncateToWidth(ctx, song.group, cellW - 32), x + 16, y + cellH - 16);
      } else {
        ctx.fillStyle = "#fdece0";
        ctx.fillRect(x, y, cellW, cellH);
        ctx.fillStyle = "#e3b088";
        ctx.font = "500 20px 'Noto Sans JP', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(isCenter ? "\u30bb\u30f3\u30bf\u30fc" : "\u7a7a\u5e2d", x + cellW / 2, y + cellH / 2);
      }
      ctx.restore();

      if (isCenter) {
        for (let g2 = 3; g2 >= 1; g2--) {
          ctx.save();
          roundRectPath(ctx, x - g2 * 5, y - g2 * 5, cellW + g2 * 10, cellH + g2 * 10, 18 + g2 * 4);
          ctx.strokeStyle = `rgba(255,122,41,${0.16 * g2})`;
          ctx.lineWidth = 6;
          ctx.stroke();
          ctx.restore();
        }
        ctx.save();
        roundRectPath(ctx, x, y, cellW, cellH, 18);
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#FF7A29";
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(x + 34, y + 34, 25, 0, Math.PI * 2);
        ctx.fillStyle = "#FF7A29";
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("\u2605", x + 34, y + 36);
        ctx.textBaseline = "alphabetic";
        ctx.restore();
      }
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#c99a76";
    ctx.font = "500 15px 'Noto Sans JP', sans-serif";
    ctx.fillText("\u63a8\u3057\u66f29\u9078\u30e1\u30fc\u30ab\u30fc", cx, canvas.height - 26);

    return canvas;
  }

  async function handleSaveOrShare() {
    if (!canExport || exporting) return;
    setExporting(true);
    try {
      const canvas = await buildCanvas();
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) {
        showToast("画像の書き出しに失敗したよ。スクリーンショットで保存してね");
        return;
      }
      const file = new File([blob], "lapone_oshikyoku9.png", { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "推し曲9選", text: "私の推し曲9選できた！" });
          return;
        } catch (e) {
          // シェアがキャンセルされた場合はダウンロードにフォールバック
        }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lapone_oshikyoku9.png";
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) {
      showToast("画像の書き出しに失敗したよ。スクリーンショットで保存してね");
    } finally {
      setExporting(false);
    }
  }

  const canShareFiles = typeof navigator !== "undefined" && !!navigator.share;

  const progressLabel =
    selectedCount < 9
      ? `あと${9 - selectedCount}曲えらんでね`
      : !centerId
      ? "★でセンターを指名してね"
      : canShareFiles
      ? "準備OK。シェアできるよ"
      : "準備OK。画像を保存できるよ";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #fffaf6 0%, #fff1e6 100%)",
        color: "#2b2420",
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
      className="p-4 sm:p-8"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap');
        .lo9-scroll::-webkit-scrollbar { width: 6px; }
        .lo9-scroll::-webkit-scrollbar-thumb { background: #ffd7ae; border-radius: 999px; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-6">
          <p style={{ color: "#d97a3a", letterSpacing: "0.25em", fontSize: 12, fontWeight: 500 }}>
            LAPONE FAN MAKER
          </p>
          <h1
            style={{
              fontFamily: "'Zen Kaku Gothic New', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 5vw, 42px)",
              margin: "6px 0 8px",
              color: "#231d18",
            }}
          >
            推し曲9選
          </h1>
          <p style={{ color: "#8a7a6d", fontSize: 14 }}>
            好きなMVを9つ選んで、いちばん好きな1曲をセンターに立たせよう
          </p>
        </header>

        {/* group tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className="rounded-full px-4 py-1.5 text-sm font-medium"
              style={{
                background: activeGroup === g ? "#FF7A29" : "#ffffff",
                color: activeGroup === g ? "#ffffff" : "#8a7a6d",
                border: activeGroup === g ? "1px solid #FF7A29" : "1px solid #ffe4d1",
              }}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* song gallery */}
          <div className="lg:col-span-2">
            <div
              style={{ background: "#ffffff", border: "1px solid #ffe4d1", boxShadow: "0 4px 20px rgba(255,138,61,0.08)" }}
              className="rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold">曲を選ぶ</h2>
                <span style={{ color: "#8a7a6d", fontSize: 12 }}>{selectedCount}/9</span>
              </div>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[32rem] overflow-y-auto pr-1 lo9-scroll"
              >
                {visibleSongs.map((song) => {
                  const isSelected = selectedIds.includes(song.id);
                  const isCenter = centerId === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => toggleSelect(song.id)}
                      className="relative rounded-xl overflow-hidden cursor-pointer aspect-video"
                      style={{
                        border: isSelected ? "2px solid #FF7A29" : "1px solid #ffe4d1",
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 p-1.5"
                        style={{ background: "linear-gradient(to top, rgba(20,14,8,0.85), transparent)" }}
                      >
                        <p className="font-semibold truncate leading-tight" style={{ color: "#ffffff", fontSize: 11 }}>
                          {song.title}
                        </p>
                        <p className="truncate leading-tight" style={{ color: "#ffd7ae", fontSize: 10 }}>
                          {song.group}
                        </p>
                      </div>
                      {isSelected && (
                        <div
                          className="absolute top-1.5 right-1.5 rounded-full w-6 h-6 flex items-center justify-center"
                          style={{ background: "#FF7A29", color: "#ffffff" }}
                        >
                          <Check size={13} />
                        </div>
                      )}
                      <button
                        onClick={(e) => toggleCenter(song.id, e)}
                        disabled={!isSelected}
                        className="absolute top-1.5 left-1.5 rounded-full w-6 h-6 flex items-center justify-center disabled:opacity-0"
                        style={{ background: isCenter ? "#FF7A29" : "rgba(20,14,8,0.45)", color: "#ffffff" }}
                        title="センターにする"
                      >
                        <Star size={13} fill={isCenter ? "currentColor" : "none"} />
                      </button>
                    </div>
                  );
                })}
                {visibleSongs.length === 0 && (
                  <p style={{ color: "#c9b6a6", fontSize: 13 }} className="col-span-full text-center py-8">
                    このグループの曲がまだないよ
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* stage preview */}
          <div className="lg:col-span-3">
            <div
              style={{
                background: "radial-gradient(ellipse at 50% 38%, rgba(255,138,61,0.10), transparent 60%), #ffffff",
                border: "1px solid #ffe4d1",
                boxShadow: "0 4px 20px rgba(255,138,61,0.08)",
              }}
              className="rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">プレビュー</h2>
                <button onClick={resetSelection} className="text-xs flex items-center gap-1" style={{ color: "#a3907f" }}>
                  <RefreshCw size={13} /> 選び直す
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {slots.map((song, i) => {
                  const isCenter = i === 4;
                  return (
                    <div
                      key={i}
                      className="relative aspect-video rounded-xl overflow-hidden"
                      style={{
                        border: isCenter ? "3px solid #FF7A29" : "1px solid #ffe4d1",
                        boxShadow: isCenter
                          ? "0 0 0 6px rgba(255,122,41,0.14), 0 0 30px rgba(255,122,41,0.28)"
                          : "none",
                        transform: isCenter ? "scale(1.04)" : "none",
                        zIndex: isCenter ? 1 : 0,
                      }}
                    >
                      {song ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2"
                            style={{ background: "linear-gradient(to top, rgba(20,14,8,0.85), transparent)" }}
                          >
                            <p className="font-semibold truncate leading-tight" style={{ color: "#ffffff", fontSize: 11 }}>
                              {song.title}
                            </p>
                            <p className="truncate leading-tight" style={{ color: "#ffd7ae", fontSize: 10 }}>
                              {song.group}
                            </p>
                          </div>
                          {isCenter && (
                            <div
                              className="absolute top-1.5 left-1.5 rounded-full w-6 h-6 flex items-center justify-center"
                              style={{ background: "#FF7A29", color: "#ffffff" }}
                            >
                              <Star size={12} fill="currentColor" />
                            </div>
                          )}
                        </>
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-center"
                          style={{ border: "1px dashed #ffd7ae", color: "#e3b088", fontSize: 11, background: "#fff8f2" }}
                        >
                          {isCenter ? "\u2605 センター" : "空席"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-2">
                <p style={{ color: "#a3907f", fontSize: 12 }} className="text-center">
                  {progressLabel}
                </p>
                <button
                  onClick={handleSaveOrShare}
                  disabled={!canExport || exporting}
                  className="w-full font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2"
                  style={{
                    background: canExport ? "#FF7A29" : "#f5e9de",
                    color: canExport ? "#ffffff" : "#c9b6a6",
                    cursor: canExport ? "pointer" : "not-allowed",
                  }}
                >
                  {canShareFiles ? <Share2 size={16} /> : <Download size={16} />}
                  {exporting ? "書き出し中..." : canShareFiles ? "シェアする" : "画像を保存"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-sm px-4 py-2 rounded-full"
          style={{ background: "#2b2420", color: "#ffffff" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
