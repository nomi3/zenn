// 記事に載せた TypeScript を、記事のテキストそのものから検証する。
//
//   1. ```typescript ブロックを上から順に連結して1ファイルにし、型チェックする
//   2. それを実行し、標準出力を記事中の出力ブロック(言語指定なしの ```)と突き合わせる
//
// 1記事ぶんを連結するので、前の節で定義した型や関数を後の節で使う書き方が
// そのまま検証できる。出力例を手で書き写す事故も 2 で防げる。
//
// 意図的に検証できないブロック(TODO のスタブ、「型が合わない」例、
// 外部パッケージに依存するコード、コードを載せていない出力例など)は、
// 直前に次の行を置くと除外される。HTML コメントなので記事の表示には出ない。
//
//   <!-- check:skip -->
//
// 使い方: npm run check:articles

import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const ARTICLES_DIR = "articles";
const WORK_DIR = ".article-check";
const SKIP_MARKER = "<!-- check:skip -->";

/**
 * 記事を走査して、除外指定されていないコードブロックと出力ブロックを集める。
 * 言語指定が typescript のものをコード、指定なしのものを期待する出力とみなす。
 */
function extractBlocks(markdown) {
  const lines = markdown.split("\n");
  const code = [];
  const output = [];

  for (let i = 0; i < lines.length; i++) {
    const fence = /^```(\w*)\s*$/.exec(lines[i]);
    if (!fence) continue;

    const lang = fence[1];
    const start = i + 1;
    let end = start;
    while (end < lines.length && !/^```\s*$/.test(lines[end])) end++;

    if (lang === "typescript" || lang === "") {
      // 直前の非空行が除外マーカーかどうか
      let prev = i - 1;
      while (prev >= 0 && lines[prev].trim() === "") prev--;
      const skipped = prev >= 0 && lines[prev].trim() === SKIP_MARKER;

      if (!skipped) {
        const body = lines.slice(start, end).join("\n");
        (lang === "typescript" ? code : output).push({ line: start + 1, body });
      }
    }

    i = end;
  }

  return { code, output };
}

/** 末尾の空白と空行を落として比較しやすくする */
function normalize(text) {
  return text
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

rmSync(WORK_DIR, { recursive: true, force: true });
mkdirSync(WORK_DIR, { recursive: true });

const targets = [];
for (const file of readdirSync(ARTICLES_DIR).sort()) {
  if (!file.endsWith(".md")) continue;

  const markdown = readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { code, output } = extractBlocks(markdown);
  if (code.length === 0) continue;

  // どの行から来たブロックかを追えるように印を付けておく。
  // 末尾の export {} は、記事どうしで同名の型や関数がぶつからないよう
  // 生成ファイルをモジュール扱いにするためのもの。
  const source =
    code
      .map((b) => `// ${ARTICLES_DIR}/${file}:${b.line}\n${b.body}`)
      .join("\n\n") + "\n\nexport {};\n";

  const stem = file.replace(/\.md$/, "");
  const generated = path.join(WORK_DIR, `${stem}.ts`);
  writeFileSync(generated, source);

  targets.push({
    article: file,
    generated,
    compiled: path.join(WORK_DIR, "js", `${stem}.js`),
    codeBlocks: code.length,
    expected: output.map((b) => b.body),
  });
}

if (targets.length === 0) {
  console.log("検証対象の TypeScript ブロックはありませんでした。");
  process.exit(0);
}

for (const t of targets) {
  const n = t.expected.length;
  console.log(
    `${t.article} (コード ${t.codeBlocks} ブロック / 出力 ${n} ブロック)`,
  );
}
console.log("");

function fail(message) {
  console.error("");
  console.error(message);
  console.error(`生成物は ${WORK_DIR}/ に残してあります。`);
  console.error(
    `各ブロックの先頭にある // articles/xxx.md:N が、元の記事の行番号です。`,
  );
  console.error(
    `意図的に検証できないブロックなら、記事側で直前に ${SKIP_MARKER} を置いてください。`,
  );
  process.exit(1);
}

// 1. 型チェック
try {
  execFileSync(
    "npx",
    [
      "tsc",
      "--strict",
      "--skipLibCheck",
      "--target",
      "es2020",
      "--module",
      "commonjs",
      "--outDir",
      path.join(WORK_DIR, "js"),
      ...targets.map((t) => t.generated),
    ],
    { stdio: "inherit" },
  );
} catch {
  fail("型チェックに失敗しました。");
}

// 2. 実行して出力を突き合わせ
let mismatched = false;
for (const t of targets) {
  if (t.expected.length === 0) continue;

  const actual = normalize(
    execFileSync("node", [t.compiled], { encoding: "utf8" }),
  );
  const expected = normalize(t.expected.join("\n"));

  if (actual !== expected) {
    mismatched = true;
    console.error(`出力が記事と一致しません: ${t.article}`);
    console.error("--- 記事に書かれている内容 ---");
    console.error(expected);
    console.error("--- 実際の出力 ---");
    console.error(actual);
    console.error("");
  }
}
if (mismatched) fail("出力の突き合わせに失敗しました。");

rmSync(WORK_DIR, { recursive: true, force: true });
console.log("型チェックと出力の突き合わせが通りました。");
