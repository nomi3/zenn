---
title: "圏論の練習問題を作って解いてみる(関手と自然変換)"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "typescript", "関数型プログラミング"]
published: true
---

圏論の関手と自然変換を、TypeScriptを使った練習問題で確認します。題材は学校の成績照会です。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 前提となる型

値が有るかもしれないし無いかもしれない、という状況を表す `Optional` 型と、その `fmap` を使います。

```typescript
type Optional<A> =
  | { hasValue: true; value: A }
  | { hasValue: false };

function fmapOptional<A, B>(fa: Optional<A>, f: (a: A) => B): Optional<B> {
  return fa.hasValue ? { hasValue: true, value: f(fa.value) } : { hasValue: false };
}
```

`Optional` は型 `A` を型 `Optional<A>` に対応させる「対象の対応」で、`fmapOptional` は関数 `A -> B` を関数 `Optional<A> -> Optional<B>` に対応させる「射の対応」です。この2つが揃って関手になります。

この記事では、`Optional<number>` を「ある生徒の試験の点数」とします。欠席で未受験なら `{ hasValue: false }` です。

# 練習1: 関手

点数の `Optional<number>` から、「合格ライン(60点)に達しているか」を表す `Optional<boolean>` を作る関数を実装します。

**制約: 中身の `Optional` を自分で分解しないこと。** つまり `if (score.hasValue)` を書かず、`fmapOptional` だけで書きます。

```typescript
const score: Optional<number> = { hasValue: true, value: 82 };

// TODO: fmapOptional だけを使って書く
function isPassing(score: Optional<number>): Optional<boolean> {
  // ここを実装
}
```

## 解答

```typescript
const PASS_MARK = 60;

function isPassing(score: Optional<number>): Optional<boolean> {
  return fmapOptional(score, (point) => point >= PASS_MARK);
}
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

# 練習2: 自然変換

判定結果を成績照会 API で返すために、`Optional<A>` を次の `ApiResult<A>` に変換する `toApiResult` を書きます。

```typescript
type ApiResult<A> =
  | { status: "ok"; data: A }
  | { status: "empty" };

function toApiResult<A>(fa: Optional<A>): ApiResult<A> {
  // ここを実装
}
```

この `ApiResult` も、`Optional` と同じく関手です。型 `A` を `ApiResult<A>` に対応させ、関数 `A -> B` を `ApiResult<A> -> ApiResult<B>` に対応させる `fmap` を持ちます(実装は後で書きます)。

関手が2つ揃ったので、その間の変換を考えられます。自然変換とは**関手から関手への変換**のことなので、`ApiResult` が関手であることを確認して初めて、`toApiResult` を自然変換と呼べるようになります。

## 解答

```typescript
function toApiResult<A>(fa: Optional<A>): ApiResult<A> {
  return fa.hasValue ? { status: "ok", data: fa.value } : { status: "empty" };
}
```

ポイントは、**`A` について何も知らないまま書ける**ことです。`toApiResult` の実装の中に `A` 固有の処理は一切出てきません。点数(`number`)を運んでいようが合否(`boolean`)を運んでいようが、コードは同じです。

`toApiResult` を $\tau$ と書くと、型変数 `A` ごとに射 $\tau_A : \mathrm{Optional}\langle A \rangle \to \mathrm{ApiResult}\langle A \rangle$ が定まってはいるものの、その定義は `A` に依存せず、箱の形だけを見て決まっています。

# 可換図式を確認する

ここからが本題です。「`fmap` を先にやるか、変換を先にやるかで結果が変わらない」を確かめます。

以下、`f` は練習1で使った合否判定 `(point: number) => point >= PASS_MARK` とします。

ここで一つ引っかかりポイントがあります。素朴に書くと以下の2つを比べたくなりますが、

```typescript
toApiResult(fmapOptional(score, f));
fmapOptional(toApiResult(score), f); // 型が合わない
```

後者はコンパイルが通りません。`toApiResult(score)` はもう `Optional` ではなく `ApiResult` なので、`fmapOptional` には渡せないからです。

ここで、練習2で「`ApiResult` も関手である」と確認したことが効いてきます。関手なら自分の `fmap` を持っているはずなので、それを書き下します。

```typescript
function fmapApiResult<A, B>(fa: ApiResult<A>, f: (a: A) => B): ApiResult<B> {
  return fa.status === "ok" ? { status: "ok", data: f(fa.data) } : { status: "empty" };
}
```

自然変換の可換性は「同じ `fmap` を使う」という話ではなく、**2つの関手がそれぞれ持つ `fmap` が $\tau$ を通して整合する**という話です。なので比較の相手には、`fmapOptional` ではなくこちらを使います。

これで比べるべき2つの経路が揃いました。

```typescript
toApiResult(fmapOptional(score, f)); // fmap してから変換
fmapApiResult(toApiResult(score), f); // 変換してから fmap
```

図式にするとこうなります。

$$
\begin{CD}
\mathrm{Optional}\langle A \rangle @>{\mathrm{fmapOptional}(-,\,f)}>> \mathrm{Optional}\langle B \rangle \\
@V{\mathrm{toApiResult}_A}VV @VV{\mathrm{toApiResult}_B}V \\
\mathrm{ApiResult}\langle A \rangle @>>{\mathrm{fmapApiResult}(-,\,f)}> \mathrm{ApiResult}\langle B \rangle
\end{CD}
$$

自然性とは、この四角形が可換であること、すなわち

$$
\mathrm{toApiResult}_B \circ \mathrm{fmapOptional}(-,\,f) \;=\; \mathrm{fmapApiResult}(-,\,f) \circ \mathrm{toApiResult}_A
$$

です。

## 場合分けで確かめる

`Optional<A>` の値は2通りしかないので、素直に両方試せば図式が閉じるか確認できます。$f : A \to B$ とします。

**(1) `{ hasValue: true, value: a }` のとき**

| 経路 | 途中 | 結果 |
| --- | --- | --- |
| fmap してから変換 | `{ hasValue: true, value: f(a) }` | `{ status: "ok", data: f(a) }` |
| 変換してから fmap | `{ status: "ok", data: a }` | `{ status: "ok", data: f(a) }` |

**(2) `{ hasValue: false }` のとき**

| 経路 | 途中 | 結果 |
| --- | --- | --- |
| fmap してから変換 | `{ hasValue: false }` | `{ status: "empty" }` |
| 変換してから fmap | `{ status: "empty" }` | `{ status: "empty" }` |

どちらの場合も一致するので、図式は可換です。

## 実際に動かす

```typescript
const f = (point: number) => point >= PASS_MARK;

const scores: Optional<number>[] = [
  { hasValue: true, value: 82 },
  { hasValue: true, value: 45 },
  { hasValue: false }, // 未受験
];

for (const score of scores) {
  const a = toApiResult(fmapOptional(score, f)); // fmap してから変換
  const b = fmapApiResult(toApiResult(score), f); // 変換してから fmap
  console.log(JSON.stringify(a) === JSON.stringify(b), a);
}
```

```
true { status: 'ok', data: true }
true { status: 'ok', data: false }
true { status: 'empty' }
```

# まとめ

- `fmap` は「素の関数」を「文脈付きの関数」に持ち上げる。中身を自分で分解しないと、値の変換と文脈の管理が自然に分離する
- - 自然変換の条件は図式の可換性。型変数 `A` を覗かずに書けることが、その手がかりになる
- 可換図式の確認は、それぞれの関手が持つ自分の `fmap` を使って行う
- `Optional` のように形が有限個なら、可換性はケース分けで手で確かめられる
