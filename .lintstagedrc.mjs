export default {
  "*.{md,json,yml,yaml}": "prettier --write",
  // 記事を触ったときだけ検証する。ファイル名を渡さないよう関数で書いている
  // (このスクリプトは articles/ 全体を走査するため)
  "articles/*.md": () => "npm run check:articles",
};
