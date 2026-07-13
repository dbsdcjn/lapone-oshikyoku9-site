import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 👇 リポジトリ名に合わせて書き換えてね。
// 例: リポジトリ名が "lapone-oshikyoku9" なら '/lapone-oshikyoku9/'
// ユーザーページ（<username>.github.io というリポジトリ名）を使う場合だけ '/' のままでOK
export default defineConfig({
  plugins: [react()],
  base: "/lapone-oshikyoku9/",
});
