# 推し曲9選 | LAPONE FAN MAKER

好きなMVを9つ選んで、いちばん好きな1曲をセンターに立たせる推し活サイト。

## ローカルで動かす

```bash
npm install
npm run dev
```

`http://localhost:5173` が開く。

## 本番用にビルド

```bash
npm run build
```

`dist/` フォルダに静的ファイル一式が出力される。

## GitHub Pagesで公開する手順

1. このフォルダの中身をGitHubリポジトリにpush（リポジトリ名は何でもOK、例: `lapone-oshikyoku9`）
2. `vite.config.js` の `base` を、実際のリポジトリ名に合わせて書き換える
   - 例: リポジトリ名が `lapone-oshikyoku9` なら `base: "/lapone-oshikyoku9/"`
   - `<username>.github.io` という名前のユーザーページ用リポジトリなら `base: "/"` のまま
3. GitHubリポジトリの Settings → Pages → Source を **GitHub Actions** に設定
4. `main` ブランチにpushすると `.github/workflows/deploy.yml` が自動でビルド＆デプロイしてくれる
5. 数分待つと `https://<username>.github.io/<repository>/` で公開される

## 曲を増やしたいとき

`src/App.jsx` の先頭にある `SONGS` 配列に、同じ形式で追加するだけでOK。

```js
{ id: "s54", title: "曲名", group: "KO1KEYZ", videoId: "動画ID11文字" }
```

`group` はタブ分けに使うので、`JO1` / `INI` / `DXTEEN` / `KO1KEYZ` / `ME:I` / `IS:SUE` の表記で統一してね。
