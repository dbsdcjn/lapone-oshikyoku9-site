import { useState, useMemo, useEffect } from "react";
import { Star, Download, RefreshCw, Check, Share2, Play, X, Link2 } from "lucide-react";

// ---------------------------------------------------------------------------
// 曲データはここに書く（公開前に手元の準備ツールで取得した結果を貼ってね）
// title / group / videoId（YouTubeの動画ID）の3つだけでOK。
// サムネイルは videoId から自動で組み立てるので、画像は別途用意しなくていい。
// group はタブ分けに使うので、LAPONEの表記
// JO1 / INI / DXTEEN / KO1KEYZ / ME:I / IS:SUE で統一してね。
// ---------------------------------------------------------------------------
const SONGS = [
  { id: "s1", type: "MV", title: "All 4 U", group: "INI", videoId: "nBBYmYvsbP0" },
  { id: "s2", type: "MV", title: "WMDA (Where My Drums At)", group: "INI", videoId: "Xptp59SzcL0" },
  { id: "s3", type: "MV", title: "LOUD", group: "INI", videoId: "ShmbjdP4eoI" },
  { id: "s4", type: "MV", title: "LEGIT", group: "INI", videoId: "j0M2ZH_5wCk" },
  { id: "s5", type: "MV", title: "FANFARE", group: "INI", videoId: "K3JGhIkExzo" },
  { id: "s6", type: "MV", title: "SPECTRA", group: "INI", videoId: "aMOa320erOQ" },
  { id: "s7", type: "MV", title: "Rocketeer", group: "INI", videoId: "xgWFK4REfgk" },
  { id: "s8", type: "MV", title: "無限大(INFINITY)", group: "JO1", videoId: "U-n1BR5JCDI" },
  { id: "s9", type: "MV", title: "OH-EH-OH", group: "JO1", videoId: "jp2aivJn9gg" },
  { id: "s10", type: "MV", title: "Shine A Light", group: "JO1", videoId: "3tna5dDdDKc" },
  { id: "s11", type: "MV", title: "Born To Be Wild", group: "JO1", videoId: "-_P_cD0yimw" },
  { id: "s12", type: "MV", title: "REAL", group: "JO1", videoId: "BMG_ZlqwOZM" },
  { id: "s13", type: "MV", title: "STAY [SUMMER VER.]", group: "JO1", videoId: "OfH19dWtuK8" },
  { id: "s14", type: "MV", title: "僕らの季節", group: "JO1", videoId: "Zxnc3aMHt0E" },
  { id: "s15", type: "MV", title: "飛べるから", group: "JO1", videoId: "R8thF-ZdSFI" },
  { id: "s16", type: "MV", title: "With Us", group: "JO1", videoId: "Zf59GBy4564" },
  { id: "s17", type: "MV", title: "SuperCali", group: "JO1", videoId: "5nE7budaeO4" },
  { id: "s18", type: "MV", title: "Tiger", group: "JO1", videoId: "ZBFopHu5RsE" },
  { id: "s19", type: "MV", title: "NEWSmile", group: "JO1", videoId: "ID6TB4slrCQ" },
  { id: "s20", type: "MV", title: "RadioVision", group: "JO1", videoId: "A8Z_0W_l2Io" },
  { id: "s21", type: "MV", title: "Venus", group: "JO1", videoId: "3iSsqYWKJYs" },
  { id: "s22", type: "MV", title: "Eyes On Me (feat.R3HAB)", group: "JO1", videoId: "NvdrZ_Bgk38" },
  { id: "s23", type: "MV", title: "Your Key", group: "JO1", videoId: "70zBVAFqvHQ" },
  { id: "s24", type: "MV", title: "Love seeker", group: "JO1", videoId: "jjr6yrzUAqI" },
  { id: "s25", type: "MV", title: "WHERE DO WE GO", group: "JO1", videoId: "q-RrB2OBf6s" },
  { id: "s26", type: "MV", title: "BE CLASSIC", group: "JO1", videoId: "PjhdKY0hyCA" },
  { id: "s27", type: "MV", title: "Handz In My Pocket", group: "JO1", videoId: "wniN-2kFKRc" },
  { id: "s28", type: "MV", title: "景色 (JI BLUE)", group: "JO1", videoId: "KLEaBDx3JHc" },
  { id: "s28b", type: "MV", title: "景色 (JI BLUE)", group: "INI", videoId: "KLEaBDx3JHc" },
  { id: "s29", type: "MV", title: "Brighter", group: "INI", videoId: "99j1FLRE2HQ" },
  { id: "s30", type: "MV", title: "CALL 119", group: "INI", videoId: "RJJAJwJttiY" },
  { id: "s31", type: "MV", title: "We Are", group: "INI", videoId: "_7UIC72D8II" },
  { id: "s32", type: "MV", title: "Password", group: "INI", videoId: "ZU58-PZnXOM" },
  { id: "s33", type: "MV", title: "HANA_花", group: "INI", videoId: "gX-kRZi2PXc" },
  { id: "s34", type: "MV", title: "DOMINANCE", group: "INI", videoId: "1NY-tAGiW5M" },
  { id: "s35", type: "MV", title: "君がいたから", group: "INI", videoId: "Rmt06HTHHWQ" },
  { id: "s36", type: "MV", title: "Brand New Day", group: "DXTEEN", videoId: "7k0Qktw8n2E" },
  { id: "s37", type: "MV", title: "First Flight", group: "DXTEEN", videoId: "TwN7GRE-IjM" },
  { id: "s38", type: "MV", title: "Snowin'", group: "DXTEEN", videoId: "7osGrOq45oQ" },
  { id: "s39", type: "MV", title: "Dance On Open World", group: "DXTEEN", videoId: "27jGFxEdbXQ" },
  { id: "s40", type: "MV", title: "Level Up", group: "DXTEEN", videoId: "-gWHk314lHs" },
  { id: "s41", type: "MV", title: "Tick-Tack", group: "DXTEEN", videoId: "ad19Ss2buRc" },
  { id: "s42", type: "MV", title: "両片想い", group: "DXTEEN", videoId: "esiaDnFotXQ" },
  { id: "s43", type: "MV", title: "ハルコイ", group: "DXTEEN", videoId: "xLiC0ivBhlA" },
  { id: "s44", type: "MV", title: "Click", group: "ME:I", videoId: "G-LdNMa99oQ" },
  { id: "s45", type: "MV", title: "Hi-Five", group: "ME:I", videoId: "2uU7cWfnuKw" },
  { id: "s46", type: "MV", title: "MUSE", group: "ME:I", videoId: "zPmSwXMQtRk" },
  { id: "s47", type: "MV", title: "THIS IS ME:I", group: "ME:I", videoId: "UwpfFRuu2lI" },
  { id: "s48", type: "MV", title: "花咲く道", group: "ME:I", videoId: "ouF70vuL6pg" },
  { id: "s49", type: "MV", title: "CONNECT", group: "IS:SUE", videoId: "OTKY-xljazo" },
  { id: "s50", type: "MV", title: "THE FLASH GIRL", group: "IS:SUE", videoId: "aEPF_mB44tc" },
  { id: "s51", type: "MV", title: "SHINING", group: "IS:SUE", videoId: "bKERxsZgFe0" },
  { id: "s52", type: "MV", title: "Phase", group: "IS:SUE", videoId: "kacuL0bgsdI" },
  { id: "s53", type: "MV", title: "Quartet", group: "IS:SUE", videoId: "RkC-XfuwCsM" },
  { id: "s54", type: "PV", title: "ICY (Performance Video)", group: "JO1", videoId: "zUzk8Z-ZUWM" },
  { id: "s55", type: "PV", title: "Trigger (Performance Video)", group: "JO1", videoId: "E0T3t-qc7-0" },
  { id: "s56", type: "PV", title: "Walk It Like I Talk It (Performance Video)", group: "JO1", videoId: "RgWr9jCN8jo" },
  { id: "s57", type: "LIVE", title: "RUSH (JO1DER SHOW 2026 Live)", group: "JO1", videoId: "Zha4ADdx8gs" },
  { id: "s58", type: "LIVE", title: "BE CLASSIC (JO1DER SHOW 2025 Live)", group: "JO1", videoId: "Mx9QP_W261Q" },
  { id: "s59", type: "LIVE", title: "Aqua (4th Anniversary Live)", group: "JO1", videoId: "OW7ArDFfiTE" },
  { id: "s60", type: "PV", title: "ONE NIGHT (Performance Video)", group: "INI", videoId: "iP1LJrV_mm8" },
  { id: "s61", type: "PV", title: "DOMINANCE (Performance Video)", group: "INI", videoId: "EEIR8iaMCA8" },
  { id: "s62", type: "PV", title: "WMDA(Where My Drums At) (Performance Video)", group: "INI", videoId: "YodQDDLRMBk" },
  { id: "s63", type: "LIVE", title: "DOMINANCE+WMDA (ROCK IN JAPAN 2025 Live)", group: "INI", videoId: "rPTJEEGpLN8" },
  { id: "s64", type: "LIVE", title: "Non-Stop (XQUARE Live)", group: "INI", videoId: "B_LUdObnc-0" },
  { id: "s65", type: "PV", title: "Good Luck (Performance Video)", group: "DXTEEN", videoId: "oAHXydQ7Tes" },
  { id: "s66", type: "PV", title: "Dance On Open World (Performance Video)", group: "DXTEEN", videoId: "iLqoGqgd03o" },
  { id: "s67", type: "PV", title: "Level Up (Performance Video)", group: "DXTEEN", videoId: "W02HsuZ2jrs" },
  { id: "s68", type: "LIVE", title: "両片想い (ARENA LIVE 2026)", group: "DXTEEN", videoId: "LyGqQWJo7FM" },
  { id: "s69", type: "LIVE", title: "Handle (LAPOSTA 2025 Live)", group: "DXTEEN", videoId: "z05drVT-RRM" },
  { id: "s70", type: "LIVE", title: "What's DXTEEN? (ARENA LIVE 2026)", group: "DXTEEN", videoId: "rf7hQYW6i7s" },
  { id: "s71", type: "PV", title: "MUSE (Performance Video)", group: "ME:I", videoId: "hJADkExLWe4" },
  { id: "s72", type: "PV", title: "THIS IS ME:I (Performance Video)", group: "ME:I", videoId: "qlTnORS2Jhk" },
  { id: "s73", type: "PV", title: "Hi-Five (Performance Video)", group: "ME:I", videoId: "2ByRD29wKBE" },
  { id: "s74", type: "LIVE", title: "MUSE (ROCK IN JAPAN 2025 Live)", group: "ME:I", videoId: "3hpjZ-nKVDg" },
  { id: "s75", type: "LIVE", title: "MUSE (KCON JAPAN 2026 Live)", group: "ME:I", videoId: "dNsP1o783Z8" },
  { id: "s76", type: "PV", title: "Super Luna (Performance Video)", group: "IS:SUE", videoId: "4Xt_hR0KNvY" },
  { id: "s77", type: "PV", title: "Telepathy (Performance Video)", group: "IS:SUE", videoId: "InlIOxeHDYQ" },
  { id: "s78", type: "PV", title: "Breaking Thru the Line (Performance Video)", group: "IS:SUE", videoId: "gH2pPQnrFrA" },
  { id: "s79", type: "LIVE", title: "Quartet (1ST TOUR FINAL Live)", group: "IS:SUE", videoId: "1u-Qz9z4R84" },
  { id: "s80", type: "LIVE", title: "Super Luna (1ST TOUR Live)", group: "IS:SUE", videoId: "rYIwTVwNwwc" },
  { id: "s81", type: "LIVE", title: "NO Game Over (ROCK IN JAPAN 2025 Live)", group: "IS:SUE", videoId: "pYz5Zyjl-Ak" },
  { id: "s82", type: "PV", title: "無限大(INFINITY) (Performance Video)", group: "JO1", videoId: "4J6YxGAAido" },
  { id: "s83", type: "PV", title: "La Pa Pa Pam (Performance Video)", group: "JO1", videoId: "xexjuif_nWk" },
  { id: "s84", type: "PV", title: "OH-EH-OH (Performance Video)", group: "JO1", videoId: "Mqi1_EqY6hE" },
  { id: "s85", type: "PV", title: "Shine A Light (Performance Video)", group: "JO1", videoId: "ibjLhgmHjM4" },
  { id: "s86", type: "PV", title: "Born To Be Wild (Performance Video)", group: "JO1", videoId: "VNQcT9sZL8k" },
  { id: "s87", type: "PV", title: "Design (Performance Video)", group: "JO1", videoId: "d_S9B55H5u4" },
  { id: "s88", type: "PV", title: "REAL (Performance Video)", group: "JO1", videoId: "u-HL6kaobaM" },
  { id: "s89", type: "PV", title: "Run&Go (Dance Performance Video)", group: "JO1", videoId: "vyWqlXAu5RY" },
  { id: "s90", type: "PV", title: "僕らの季節 (Performance Video)", group: "JO1", videoId: "nIMqvGQtJHU" },
  { id: "s91", type: "PV", title: "With Us (Performance Video)", group: "JO1", videoId: "HmopcEXjYUc" },
  { id: "s92", type: "PV", title: "SuperCali (Performance Video)", group: "JO1", videoId: "m28FSsyWXBw" },
  { id: "s93", type: "PV", title: "Tiger (Performance Video)", group: "JO1", videoId: "sEvOgbdsCmo" },
  { id: "s94", type: "PV", title: "Test Drive (Performance Video)", group: "JO1", videoId: "erYO3TOX5jU" },
  { id: "s95", type: "PV", title: "HAPPY UNBIRTHDAY (Performance Video)", group: "JO1", videoId: "z-8I2Nw9eN4" },
  { id: "s96", type: "PV", title: "Handz In My Pocket (Performance Video)", group: "JO1", videoId: "tS-3R9aab2I" },
  { id: "s97", type: "LIVE", title: "With Us (KIZUNA 2022 Live)", group: "JO1", videoId: "akkKeR0CYUk" },
  { id: "s98", type: "LIVE", title: "Born To Be Wild (BEYOND THE DARK 2023 Osaka Live)", group: "JO1", videoId: "uwtO-d4Vn_A" },
  { id: "s99", type: "LIVE", title: "Trigger (BEYOND THE DARK:RISE Live)", group: "JO1", videoId: "Jxt2mbXmnKY" },
  { id: "s100", type: "LIVE", title: "NEWSmile (BEYOND THE DARK:RISE Live)", group: "JO1", videoId: "XTMxwWkza4o" },
  { id: "s101", type: "LIVE", title: "Fairytale (BEYOND THE DARK:RISE Live)", group: "JO1", videoId: "WNcJg5nX-s4" },
  { id: "s102", type: "LIVE", title: "EIEN (JO1DER SHOW 2026 Tokyo Dome Live)", group: "JO1", videoId: "yZbBQF6CEs0" },
  { id: "s103", type: "PV", title: "Rocketeer (Performance Video)", group: "INI", videoId: "gPPN33XFuXI" },
  { id: "s104", type: "PV", title: "Brighter (Performance Video)", group: "INI", videoId: "Z33NO8UFtx8" },
  { id: "s105", type: "PV", title: "CALL 119 (Performance Video)", group: "INI", videoId: "-NdXsvCSBlI" },
  { id: "s106", type: "PV", title: "We Are (Performance Video)", group: "INI", videoId: "8I87RI7Uv7E" },
  { id: "s107", type: "PV", title: "Password (Performance Video)", group: "INI", videoId: "HBMyXVZ5cO8" },
  { id: "s108", type: "PV", title: "SPECTRA (Performance Video)", group: "INI", videoId: "U8TRJyhUgyg" },
  { id: "s109", type: "PV", title: "New Day (Performance Video)", group: "INI", videoId: "HUT81VaUeyY" },
  { id: "s110", type: "PV", title: "FANFARE (Performance Video)", group: "INI", videoId: "AUoh8C__VsA" },
  { id: "s111", type: "PV", title: "LEGIT (Performance Video)", group: "INI", videoId: "k4syFgku51o" },
  { id: "s112", type: "PV", title: "LOUD (Performance Video)", group: "INI", videoId: "qFYNz588Eoc" },
  { id: "s113", type: "PV", title: "All 4 U (Performance Video)", group: "INI", videoId: "VZxF_PX01Sk" },
  { id: "s114", type: "LIVE", title: "Rocketeer (BREAK THE CODE 2022 Live)", group: "INI", videoId: "WX6ml-ncKSs" },
  { id: "s115", type: "LIVE", title: "BOMBARDA (BREAK THE CODE 2022 Live)", group: "INI", videoId: "degadFGDbFw" },
  { id: "s116", type: "LIVE", title: "Dramatic (BREAK THE CODE 2022 Live)", group: "INI", videoId: "DHUvG3iWzxg" },
  { id: "s117", type: "LIVE", title: "CALL 119 (BREAK THE CODE 2022 Live)", group: "INI", videoId: "HGTvpiZy7c8" },
  { id: "s118", type: "LIVE", title: "LEGIT (READY TO POP! 2023 Live)", group: "INI", videoId: "qMEQ5wi09h8" },
  { id: "s119", type: "LIVE", title: "10 THINGS (Christmas Costume ver. Live)", group: "INI", videoId: "LE6TpU3aJh8" },
  { id: "s120", type: "LIVE", title: "Rocketeer (FLIP THE CIRCLE 2024 Live)", group: "INI", videoId: "i1ZnwsFKLP0" },
  { id: "s121", type: "LIVE", title: "Brighter (XQUARE ver. 2025 Live)", group: "INI", videoId: "n2cM6H94NL8" },
  { id: "s122", type: "PV", title: "Brand New Day (Performance Video)", group: "DXTEEN", videoId: "GNen6VglFZo" },
  { id: "s123", type: "PV", title: "Come Over (Performance Video)", group: "DXTEEN", videoId: "8RcM4Kyj29M" },
  { id: "s124", type: "PV", title: "First Flight (Performance Video)", group: "DXTEEN", videoId: "PuI_6tQQffQ" },
  { id: "s125", type: "PV", title: "Dive (Performance Video)", group: "DXTEEN", videoId: "4qVD_8nnVvY" },
  { id: "s126", type: "PV", title: "Snowin' (Performance Video)", group: "DXTEEN", videoId: "UE7KjEww7q0" },
  { id: "s127", type: "PV", title: "Our Sky (Performance Video)", group: "DXTEEN", videoId: "6rSK3T1WNIw" },
  { id: "s128", type: "LIVE", title: "JOY (Heart & Soul 2026 Live)", group: "DXTEEN", videoId: "nC_yW6pL8OI" },
  { id: "s129", type: "LIVE", title: "両片想い (Survive FES Stage CAM)", group: "DXTEEN", videoId: "psI02EKIjDU" },
  { id: "s130", type: "PV", title: "Update ME (Performance Video)", group: "ME:I", videoId: "4Q3OSgceGvQ" },
  { id: "s131", type: "LIVE", title: "Royal Energy (Extended Ver., Arena Live Tour Encore Tokyo)", group: "ME:I", videoId: "lCX9yMlAHdQ" },
  { id: "s132", type: "LIVE", title: "TOXIC (ME:I Ver., Rock In Japan 2024)", group: "ME:I", videoId: "JZEGUVfqoOY" },
  { id: "s133", type: "LIVE", title: "想像以上 (ME:I Ver., Countdown Japan 24/25)", group: "ME:I", videoId: "F5ftxL33Q8c" },
  { id: "s134", type: "LIVE", title: "THIS IS ME:I (Arena Live Tour Hiroshima Live)", group: "ME:I", videoId: "qFYVBoN5t70" },
  { id: "s135", type: "LIVE", title: "Fan Letter (Track Video)", group: "ME:I", videoId: "DUpjiiZTEek" },
  { id: "s136", type: "LIVE", title: "CONNECT (Survive FES Live)", group: "IS:SUE", videoId: "WPj74vUGC8I" },
  { id: "s137", type: "LIVE", title: "come again (Original by m-flo, REBORN Collection 2026 Live)", group: "IS:SUE", videoId: "IdqLY4vu7xM" },
  { id: "s138", type: "LIVE", title: "THE FLASH GIRL (LAPOSTA 2025 Tokyo Dome Live)", group: "IS:SUE", videoId: "uwIG7AveXNI" },
  { id: "s139", type: "MV", title: "Present", group: "INI", videoId: "idlKynwc5zc" },
  { id: "s140", type: "MV", title: "You Know What To Do", group: "INI", videoId: "HWZwkF2gYQs" },
  { id: "s141", type: "PV", title: "Rocketeer (Special Performance Video)", group: "INI", videoId: "gwXfvem3DBk" },
  { id: "s142", type: "PV", title: "DILEMMA", group: "INI", videoId: "vu3kwh9imPQ" },
  { id: "s143", type: "PV", title: "BOMBARDA (Performance Video)", group: "INI", videoId: "uWTItyONqJg" },
  { id: "s144", type: "PV", title: "STRIDE", group: "INI", videoId: "FuSxtctk4p0" },
  { id: "s145", type: "PV", title: "Shooting Star", group: "INI", videoId: "Rx6t4opYFKs" },
  { id: "s146", type: "PV", title: "Polaroid (Special Performance Video)", group: "INI", videoId: "UzDs11jjncg" },
  { id: "s147", type: "PV", title: "Dramatic (Performance Video)", group: "INI", videoId: "o_6R5ORdfYE" },
  { id: "s148", type: "PV", title: "BAD BOYZ", group: "INI", videoId: "8tNka5jvyU8" },
  { id: "s149", type: "PV", title: "HANA_花 (Performance Video)", group: "INI", videoId: "2UT0Ov84PNE" },
  { id: "s150", type: "PV", title: "MORE", group: "INI", videoId: "60KdmniRR9c" },
  { id: "s151", type: "PV", title: "Walkie Talkie", group: "INI", videoId: "dT4qG6x6Qfo" },
  { id: "s152", type: "PV", title: "Potion", group: "INI", videoId: "n6qb3slyyqc" },
  { id: "s153", type: "PV", title: "U MINE", group: "INI", videoId: "XILnJKGc0yo" },
  { id: "s154", type: "PV", title: "True Love", group: "INI", videoId: "RRQ6wB_obBE" },
  { id: "s155", type: "PV", title: "DUM", group: "INI", videoId: "DWXrjjqVS-M" },
  { id: "s156", type: "PV", title: "BEYOND THE SKY", group: "INI", videoId: "Ky3mIUfBb5c" },
  { id: "s157", type: "MV", title: "無限大(INFINITY) (MV Performance Ver.)", group: "JO1", videoId: "GN1W7jHEgoc" },
  { id: "s158", type: "MV", title: "Dreamer", group: "JO1", videoId: "gHIO7htWwE8" },
  { id: "s159", type: "MV", title: "WHATCHA DOIN", group: "JO1", videoId: "eN2NlzPdcrs" },
  { id: "s160", type: "PV", title: "GO", group: "JO1", videoId: "ADSM26ND-U8" },
  { id: "s161", type: "PV", title: "So What", group: "JO1", videoId: "8Cnqdu1jgLE" },
  { id: "s162", type: "PV", title: "Safety Zone", group: "JO1", videoId: "714AOK2UBfo" },
  { id: "s163", type: "PV", title: "MONSTAR", group: "JO1", videoId: "0JI488RLqJw" },
  { id: "s164", type: "PV", title: "GrandMaster (JO1 ver.)", group: "JO1", videoId: "1UFhzvSGZw4" },
  { id: "s165", type: "PV", title: "YOUNG (JO1 ver.)", group: "JO1", videoId: "--4tfbSyYDE" },
  { id: "s166", type: "PV", title: "Born To Be Wild (COSTUME Ver.)", group: "JO1", videoId: "RSsLswFF4sM" },
  { id: "s167", type: "PV", title: "Speed of Light", group: "JO1", videoId: "53hFujMHr34" },
  { id: "s168", type: "PV", title: "Freedom", group: "JO1", videoId: "YagJloMG2Zo" },
  { id: "s169", type: "PV", title: "ICARUS", group: "JO1", videoId: "1pSs0M2q2Dg" },
  { id: "s170", type: "PV", title: "We Alright", group: "JO1", videoId: "xYvuSi4QNcQ" },
  { id: "s171", type: "PV", title: "Move The Soul", group: "JO1", videoId: "o6JWTWg-xLA" },
  { id: "s172", type: "PV", title: "Algorithm", group: "JO1", videoId: "VnLscLX1BQ8" },
  { id: "s173", type: "PV", title: "Rose", group: "JO1", videoId: "ApLnpIQXsIA" },
  { id: "s174", type: "PV", title: "Phobia", group: "JO1", videoId: "lQvyKRBCDi8" },
  { id: "s175", type: "PV", title: "16(Sixteen)", group: "JO1", videoId: "VQgPP1u_DME" },
  { id: "s176", type: "PV", title: "Shine A Light (TV size)", group: "JO1", videoId: "JdmgJBFEVQM" },
  { id: "s177", type: "PV", title: "Love seeker (Live Performance Video)", group: "JO1", videoId: "1zXZX9Hy6Vk" },
  // ここに続きを追加していく（KO1KEYZ も同じ形式でOK）
];

const FONT_STACK =
  "'Zen Maru Gothic', -apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif";

const STORAGE_KEY = "lapone-oshikyoku9:selection";

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
  // rは数値(全角均一)か、{tl,tr,br,bl}で角ごとの半径を指定できる
  const c = typeof r === "number" ? { tl: r, tr: r, br: r, bl: r } : r || {};
  const tl = c.tl || 0,
    tr = c.tr || 0,
    br = c.br || 0,
    bl = c.bl || 0;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.arcTo(x + w, y, x + w, y + tr, tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.arcTo(x + w, y + h, x + w - br, y + h, br);
  ctx.lineTo(x + bl, y + h);
  ctx.arcTo(x, y + h, x, y + h - bl, bl);
  ctx.lineTo(x, y + tl);
  ctx.arcTo(x, y, x + tl, y, tl);
  ctx.closePath();
}

function truncateToWidth(ctx, text, maxWidth) {
  let t = text;
  if (ctx.measureText(t).width <= maxWidth) return t;
  while (t.length > 1 && ctx.measureText(t + "…").width > maxWidth) t = t.slice(0, -1);
  return t + "…";
}

const GROUP_ORDER = ["JO1", "INI", "DXTEEN", "KO1KEYZ", "ME:I", "IS:SUE"];

// 選べるのは公式MV/PVのみ。Performance Ver.やLive映像はデータとして残しつつピッカーからは除外。
const SELECTABLE_SONGS = SONGS.filter((s) => s.type !== "LIVE");

function encodeShareQuery(selectedIds, centerId) {
  const params = new URLSearchParams();
  params.set("set", selectedIds.join(","));
  if (centerId) params.set("center", centerId);
  return params.toString();
}

function readShareFromLocation() {
  try {
    const params = new URLSearchParams(window.location.search);
    const set = params.get("set");
    if (!set) return null;
    const center = params.get("center");
    const ids = set.split(",").filter(Boolean);
    const validIds = ids.filter((id) => SELECTABLE_SONGS.some((s) => s.id === id)).slice(0, 9);
    if (validIds.length === 0) return null;
    return {
      selectedIds: validIds,
      centerId: center && validIds.includes(center) ? center : null,
    };
  } catch (e) {
    return null;
  }
}

function readSavedSelection() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.selectedIds)) return null;
    const validIds = parsed.selectedIds.filter((id) => SELECTABLE_SONGS.some((s) => s.id === id)).slice(0, 9);
    return {
      selectedIds: validIds,
      centerId: parsed.centerId && validIds.includes(parsed.centerId) ? parsed.centerId : null,
    };
  } catch (e) {
    return null;
  }
}

export default function LaponeOshikyoku9Public() {
  const groups = useMemo(() => {
    const present = new Set(SELECTABLE_SONGS.map((s) => s.group));
    return ["すべて", ...GROUP_ORDER.filter((g) => present.has(g))];
  }, []);

  const initialSelection = useMemo(() => {
    return (
      readShareFromLocation() || readSavedSelection() || { selectedIds: [], centerId: null }
    );
  }, []);

  const [activeGroup, setActiveGroup] = useState("すべて");
  const [selectedIds, setSelectedIds] = useState(initialSelection.selectedIds);
  const [centerId, setCenterId] = useState(initialSelection.centerId);
  const [toast, setToast] = useState("");
  const [exporting, setExporting] = useState(false);
  const [previewSong, setPreviewSong] = useState(null);

  // 選んだ組み合わせを端末に自動保存。次に開いたときも続きから選べる。
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedIds, centerId }));
    } catch (e) {
      // localStorageが使えない環境（プライベートブラウズ等）ではスキップ
    }
  }, [selectedIds, centerId]);

  // プレビューモーダルはEscキーでも閉じられるように
  useEffect(() => {
    if (!previewSong) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setPreviewSong(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewSong]);

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2200);
  }

  const visibleSongs =
    activeGroup === "すべて"
      ? [...SELECTABLE_SONGS].sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group))
      : SELECTABLE_SONGS.filter((s) => s.group === activeGroup);

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

  function openPreview(song, e) {
    e.stopPropagation();
    setPreviewSong(song);
  }

  function resetSelection() {
    setSelectedIds([]);
    setCenterId(null);
  }

  const slotOrder = [0, 1, 2, 3, 5, 6, 7, 8];
  const outer = selectedIds.filter((id) => id !== centerId);
  const slots = Array(9).fill(null);
  if (centerId) slots[4] = SELECTABLE_SONGS.find((s) => s.id === centerId) || null;
  outer.forEach((id, i) => {
    if (i < slotOrder.length) slots[slotOrder[i]] = SELECTABLE_SONGS.find((s) => s.id === id) || null;
  });

  const selectedCount = selectedIds.length;
  const canExport = selectedCount === 9 && !!centerId;

  async function buildCanvas() {
    try {
      await Promise.all([
        document.fonts.load("900 46px 'Zen Maru Gothic'"),
        document.fonts.load("500 20px 'Zen Maru Gothic'"),
        document.fonts.load("bold 21px 'Zen Maru Gothic'"),
        document.fonts.load("500 15px 'Zen Maru Gothic'"),
      ]);
    } catch (e) {
      // フォント読み込みに失敗してもフォールバックフォントで書き出しを続ける
    }

    const cellW = 380,
      cellH = Math.round((cellW * 9) / 16),
      gap = 0,
      pad = 40,
      headerH = 176,
      footerH = 64,
      outerRadius = 20;
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
    ctx.font = "900 46px 'Zen Maru Gothic', sans-serif";
    ctx.fillText("LAPONE 推し曲9選", cx, 78);
    ctx.font = "500 20px 'Zen Maru Gothic', sans-serif";
    ctx.fillStyle = "#d97a3a";
    ctx.fillText("MY BEST 9 SETLIST", cx, 112);

    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = pad + col * (cellW + gap);
      const y = headerH + row * (cellH + gap);
      const song = slots[i];
      const isCenter = i === 4;

      const cornerRadius = {
        tl: row === 0 && col === 0 ? outerRadius : 0,
        tr: row === 0 && col === 2 ? outerRadius : 0,
        bl: row === 2 && col === 0 ? outerRadius : 0,
        br: row === 2 && col === 2 ? outerRadius : 0,
      };

      ctx.save();
      roundRectPath(ctx, x, y, cellW, cellH, cornerRadius);
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
        ctx.font = "bold 21px 'Zen Maru Gothic', sans-serif";
        ctx.fillText(truncateToWidth(ctx, song.title, cellW - 32), x + 16, y + cellH - 42);
        ctx.font = "500 15px 'Zen Maru Gothic', sans-serif";
        ctx.fillStyle = "#ffd7ae";
        ctx.fillText(truncateToWidth(ctx, song.group, cellW - 32), x + 16, y + cellH - 16);
      } else {
        ctx.fillStyle = "#fdece0";
        ctx.fillRect(x, y, cellW, cellH);
        ctx.fillStyle = "#e3b088";
        ctx.font = "500 20px 'Zen Maru Gothic', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(isCenter ? "センター" : "空席", x + cellW / 2, y + cellH / 2);
      }
      ctx.restore();

    }

    // センターのハイライトは全セルを描き終えた後に最前面へ描く
    // (gapが0なので、ループ内で描くと後から描かれる隣のセルに隠れてしまう)
    if (centerId) {
      const ccx = pad + 1 * (cellW + gap);
      const ccy = headerH + 1 * (cellH + gap);

      ctx.save();
      ctx.shadowColor = "rgba(255,122,41,0.85)";
      ctx.shadowBlur = 26;
      roundRectPath(ctx, ccx, ccy, cellW, cellH, 0);
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#FF7A29";
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(ccx + 34, ccy + 34, 25, 0, Math.PI * 2);
      ctx.fillStyle = "#FF7A29";
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("★", ccx + 34, ccy + 36);
      ctx.textBaseline = "alphabetic";
      ctx.restore();
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#c99a76";
    ctx.font = "500 15px 'Zen Maru Gothic', sans-serif";
    ctx.fillText("推し曲9選メーカー", cx, canvas.height - 26);

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

  async function copyShareLink() {
    if (!canExport) return;
    const query = encodeShareQuery(selectedIds, centerId);
    const url = `${window.location.origin}${window.location.pathname}?${query}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast("シェアリンクをコピーしたよ！");
    } catch (e) {
      window.prompt("このリンクをコピーしてね", url);
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
        fontFamily: FONT_STACK,
      }}
      className="p-4 sm:p-8"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap');
        .lo9-scroll::-webkit-scrollbar { width: 6px; }
        .lo9-scroll::-webkit-scrollbar-thumb { background: #ffd7ae; border-radius: 999px; }
        .lo9-thumb { transition: transform .15s ease, box-shadow .15s ease; }
        .lo9-thumb:hover, .lo9-thumb:focus-visible { transform: scale(1.03); box-shadow: 0 6px 18px rgba(255,122,41,0.22); z-index: 1; }
        .lo9-thumb:focus-visible { outline: 2px solid #FF7A29; outline-offset: 2px; }
        button:focus-visible { outline: 2px solid #FF7A29; outline-offset: 2px; }
        @keyframes lo9-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .lo9-modal-backdrop { animation: lo9-fade-in .15s ease; }
        .lo9-toast { animation: lo9-fade-in .18s ease; }
      `}</style>

      <div className="max-w-5xl mx-auto pb-24 sm:pb-0">
        <header className="text-center mb-6">
          <p style={{ color: "#d97a3a", letterSpacing: "0.25em", fontSize: 12, fontWeight: 500 }}>
            LAPONE FAN MAKER
          </p>
          <h1
            style={{
              fontFamily: FONT_STACK,
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
              aria-pressed={activeGroup === g}
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
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-label={`${song.title}（${song.group}）を${isSelected ? "選択解除する" : "選択する"}`}
                      onClick={() => toggleSelect(song.id)}
                      onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleSelect(song.id);
                        }
                      }}
                      className="lo9-thumb relative rounded-xl overflow-hidden cursor-pointer aspect-video"
                      style={{
                        border: isSelected ? "2px solid #FF7A29" : "1px solid #ffe4d1",
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`}
                        alt={song.title}
                        loading="lazy"
                        decoding="async"
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
                        aria-label={isCenter ? "センター指名を解除" : "センターに指名する"}
                        aria-pressed={isCenter}
                        className="absolute top-1.5 left-1.5 rounded-full w-6 h-6 flex items-center justify-center disabled:opacity-0"
                        style={{ background: isCenter ? "#FF7A29" : "rgba(20,14,8,0.45)", color: "#ffffff" }}
                        title="センターにする"
                      >
                        <Star size={13} fill={isCenter ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={(e) => openPreview(song, e)}
                        aria-label={`${song.title}のMVをプレビュー再生`}
                        className="absolute bottom-1.5 right-1.5 rounded-full w-6 h-6 flex items-center justify-center"
                        style={{ background: "rgba(20,14,8,0.55)", color: "#ffffff" }}
                        title="プレビュー再生"
                      >
                        <Play size={11} fill="currentColor" />
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
                            loading="lazy"
                            decoding="async"
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
                          {isCenter ? "★ センター" : "空席"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-2">
                <p style={{ color: "#a3907f", fontSize: 12 }} className="text-center" aria-live="polite">
                  {progressLabel}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveOrShare}
                    disabled={!canExport || exporting}
                    className="flex-1 font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2"
                    style={{
                      background: canExport ? "#FF7A29" : "#f5e9de",
                      color: canExport ? "#ffffff" : "#c9b6a6",
                      cursor: canExport ? "pointer" : "not-allowed",
                    }}
                  >
                    {canShareFiles ? <Share2 size={16} /> : <Download size={16} />}
                    {exporting ? "書き出し中..." : canShareFiles ? "シェアする" : "画像を保存"}
                  </button>
                  <button
                    onClick={copyShareLink}
                    disabled={!canExport}
                    aria-label="この組み合わせの共有リンクをコピー"
                    title="共有リンクをコピー"
                    className="rounded-lg px-3.5 flex items-center justify-center"
                    style={{
                      background: canExport ? "#fff3ea" : "#f5e9de",
                      color: canExport ? "#FF7A29" : "#c9b6a6",
                      border: `1px solid ${canExport ? "#FF7A29" : "#f5e9de"}`,
                      cursor: canExport ? "pointer" : "not-allowed",
                    }}
                  >
                    <Link2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile固定アクションバー：ギャラリーをスクロール中でも進捗と保存ボタンが見える */}
      {selectedCount > 0 && (
        <div
          className="sm:hidden fixed bottom-0 inset-x-0 px-4 py-3 flex items-center gap-3"
          style={{ background: "#fffaf6", borderTop: "1px solid #ffe4d1", boxShadow: "0 -4px 16px rgba(0,0,0,0.06)", zIndex: 20 }}
        >
          <p className="flex-1 truncate" style={{ color: "#8a7a6d", fontSize: 12 }} aria-live="polite">
            {progressLabel}
          </p>
          <button
            onClick={handleSaveOrShare}
            disabled={!canExport || exporting}
            aria-label={canShareFiles ? "シェアする" : "画像を保存"}
            className="font-bold rounded-lg py-2 px-4 text-sm flex items-center justify-center gap-2 shrink-0"
            style={{
              background: canExport ? "#FF7A29" : "#f5e9de",
              color: canExport ? "#ffffff" : "#c9b6a6",
            }}
          >
            {canShareFiles ? <Share2 size={16} /> : <Download size={16} />}
          </button>
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="lo9-toast fixed bottom-6 left-1/2 -translate-x-1/2 text-sm px-4 py-2 rounded-full"
          style={{ background: "#2b2420", color: "#ffffff", zIndex: 30 }}
        >
          {toast}
        </div>
      )}

      {previewSong && (
        <div
          className="lo9-modal-backdrop fixed inset-0 flex items-center justify-center p-4"
          style={{ background: "rgba(20,14,8,0.72)", zIndex: 40 }}
          onClick={() => setPreviewSong(null)}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2 gap-2">
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 14 }} className="truncate">
                {previewSong.title} ・ {previewSong.group}
              </p>
              <button
                onClick={() => setPreviewSong(null)}
                aria-label="プレビューを閉じる"
                style={{ color: "#ffffff" }}
                className="shrink-0"
              >
                <X size={22} />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video" style={{ background: "#000" }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${previewSong.videoId}?autoplay=1`}
                title={previewSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
