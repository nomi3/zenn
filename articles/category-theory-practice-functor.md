---
title: "圏論の練習問題を作って解いてみる(関手)"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "typescript", "関数型プログラミング"]
published: true
---

圏論の関手を、TypeScriptを使った練習問題で確認します。題材は学校の成績照会です。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 前提となる型

値が有るかもしれないし無いかもしれない、という状況を表す `Optional` 型と、その `fmap` を使います。

```typescript
type Optional<A> =
  | { hasValue: true; value: A }
  | { hasValue: false };

function fmapOptional<A, B>(f: (a: A) => B): (fa: Optional<A>) => Optional<B> {
  return (fa) =>
    fa.hasValue ? { hasValue: true, value: f(fa.value) } : { hasValue: false };
}
```

関手は**2つの対応**でできています。

- **対象の対応**: 型 `A` を型 `Optional<A>` に対応させる
- **射の対応**: 関数 `A -> B` を関数 `Optional<A> -> Optional<B>` に対応させる

`Optional` が前者、`fmapOptional` が後者です。この2つが揃って(そして後述の法則を満たして)関手になります。

`fmapOptional` の形に注目してください。**関数を受け取って、関数を返します。** 箱を引数に取っていません。

```typescript
const f = (point: number) => point >= 60; // number -> boolean
const lifted = fmapOptional(f); // Optional<number> -> Optional<boolean>
```

`f` は `fmapOptional` に渡したあとも `number -> boolean` のままです。`Optional` を相手にする関数に化けるわけではありません。`Optional<number> -> Optional<boolean>` になっているのは、`f` を**持ち上げた結果**である `lifted` のほうです。射の対応とは、この「持ち上げ」そのものを指します。

この記事では、`Optional<number>` を「ある生徒の試験の点数」とします。欠席で未受験なら `{ hasValue: false }` です。

# 練習問題

点数の `Optional<number>` から、「合格ライン(60点)に達しているか」を表す `Optional<boolean>` を作る関数を実装します。

**制約: 中身の `Optional` を自分で分解しないこと。** つまり `if (score.hasValue)` を書かず、`fmapOptional` だけで書きます。

```typescript
const PASS_MARK = 60;

// TODO: fmapOptional だけを使って書く
const isPassing: (score: Optional<number>) => Optional<boolean> = /* ここを実装 */;
```

## 解答

```typescript
const isPassing: (score: Optional<number>) => Optional<boolean> = fmapOptional(
  (point) => point >= PASS_MARK,
);
```

書くべきは `(point: number) => boolean` という**ただの関数**だけで、`hasValue` の有無をどう引き回すかは `fmapOptional` が引き受けます。

制約の意図はここにあります。`fmapOptional` を使うということは、

- `number -> boolean` という「素の圏の射」を書く
- それを関手で `Optional<number> -> Optional<boolean>` に持ち上げる

という2段構えを守るということです。自分で `if` を書いて分解すると、この2段構えが崩れて「値の変換」と「文脈(値が有るか無いか)の管理」が混ざってしまいます。関手が保証してくれるのは、**文脈は触らず中身だけが変わる**という一点です。

実際、未受験は未受験のまま素通りします。

```typescript
isPassing({ hasValue: true, value: 82 }); // { hasValue: true, value: true }
isPassing({ hasValue: false }); // { hasValue: false }
```

「未受験なら合格でも不合格でもない」という扱いを、こちらは一行も書いていません。

# 関手の法則

「対象の対応」と「射の対応」があれば何でも関手になるわけではありません。射の対応が満たすべき法則が2つあります。

| 法則         | 圏論の書き方                            | コードでの書き方                                        |
| ------------ | --------------------------------------- | ------------------------------------------------------- |
| 恒等射の保存 | $F(\mathrm{id}_A) = \mathrm{id}_{F(A)}$ | `fmapOptional(id) = id`                                 |
| 合成の保存   | $F(g \circ f) = F(g) \circ F(f)$        | `fmapOptional(g∘f) = fmapOptional(g) ∘ fmapOptional(f)` |

どちらも**関数どうしの等式**です。`fmapOptional` が関数を返すので、両辺をそのまま並べられます。

言葉にすると、恒等射の保存は「何もしない関数を持ち上げても、やはり何もしない」、合成の保存は「関数を合成してから持ち上げても、持ち上げてから合成しても同じ」です。

この2つがあって初めて、「箱の中身だけが変わり、箱の形は変わらない」と言い切れます。もし合成の保存が壊れていたら、`fmap` を2回に分けるか1回にまとめるかで結果が変わってしまい、安心して分解できません。

## 恒等射の保存を確かめる

$F(\mathrm{id}_A) = \mathrm{id}_{F(A)}$ には**恒等射が2つ、別の階層で**出てきます。

- $\mathrm{id}_A$ は `A -> A`。`fmapOptional` に渡すほう
- $\mathrm{id}_{F(A)}$ は `Optional<A> -> Optional<A>`。等式の右辺

つまりこの法則は、**「中身のレベルで何もしない関数」を持ち上げると「箱のレベルで何もしない関数」になる**、と言っています。持ち上げによって階層が1つ上がる、というのがポイントです。

両辺は同じ型の関数なので、`Optional<A>` の2通りの形に適用して比べます。

| 適用する値                     | 左辺 `fmapOptional(id)`                             | 右辺 `id`                      |
| ------------------------------ | --------------------------------------------------- | ------------------------------ |
| `{ hasValue: true, value: a }` | 中身に `id` が効いて `{ hasValue: true, value: a }` | `{ hasValue: true, value: a }` |
| `{ hasValue: false }`          | 関数が呼ばれず `{ hasValue: false }`                | `{ hasValue: false }`          |

中身がある場合は `id` が何もしないから、無い場合はそもそも関数が呼ばれないから、どちらも一致します。

## 合成の保存を確かめる

点数から合否を求める `toPass` と、合否を文字列にする `toLabel` を繋いでみます。

```typescript
const toPass = (n: number) => n >= PASS_MARK; // number -> boolean
const toLabel = (b: boolean) => (b ? "合格" : "不合格"); // boolean -> string
```

`{ hasValue: true, value: a }` に適用すると、左辺 `fmapOptional(toLabel ∘ toPass)` は中身を一度で変換して `{ hasValue: true, value: toLabel(toPass(a)) }` を返します。右辺 `fmapOptional(toLabel) ∘ fmapOptional(toPass)` は、`{ hasValue: true, value: toPass(a) }` を経由してから同じものに行き着きます。

`{ hasValue: false }` のときは、どちらの経路でも関数が一度も呼ばれずに `{ hasValue: false }` が素通りするだけです。

## 動かして確認

```typescript
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const id = <A,>(a: A) => a;
const compose =
  <A, B, C>(g: (b: B) => C, f: (a: A) => B) =>
  (a: A): C =>
    g(f(a));

const xs: Optional<number>[] = [
  { hasValue: true, value: 82 },
  { hasValue: true, value: 45 },
  { hasValue: false },
];

for (const x of xs) {
  const idLaw = same(fmapOptional(id)(x), id(x));
  const compLaw = same(
    fmapOptional(compose(toLabel, toPass))(x),
    compose(fmapOptional(toLabel), fmapOptional(toPass))(x),
  );
  console.log(JSON.stringify(x).padEnd(30), "恒等射:", idLaw, " 合成:", compLaw);
}
```

```
{"hasValue":true,"value":82}   恒等射: true  合成: true
{"hasValue":true,"value":45}   恒等射: true  合成: true
{"hasValue":false}             恒等射: true  合成: true
```

`Optional` は取りうる形が2通りしかないので、法則の確認も総当たりで済んでしまいます。

# まとめ

- 関手は「対象の対応」と「射の対応」の2つでできている。`Optional` と `fmapOptional` がその組
- 射の対応は「関数を受け取って関数を返す」持ち上げ。渡した関数自体は素のままで、持ち上げた結果が箱を相手にする
- 中身を自分で分解しないと、値の変換と文脈の管理が自然に分離する
- 射の対応は恒等射と合成を保存しなければならない。これがあるから「箱の形は変わらない」と言い切れる
- `Optional` のように形が有限個なら、法則はケース分けで手で確かめられる
