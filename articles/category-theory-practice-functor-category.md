---
title: "圏論の練習問題を作って解いてみる(関手圏)"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "typescript", "関数型プログラミング"]
published: false
---

関手を対象、自然変換を射とする「関手圏」を、TypeScriptを使った練習問題で確認します。題材は学校の成績照会です。

圏になるには射の合成と恒等射が要るので、自然変換を合成できること、恒等自然変換があることを確かめます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 前提となる型

3つの関手を使います。

```typescript
type Optional<A> =
  | { hasValue: true; value: A }
  | { hasValue: false };

type ApiResult<A> =
  | { status: "ok"; data: A }
  | { status: "empty" };
```

3つ目は組み込みの配列 `A[]` です。それぞれの `fmap` を、関数を受け取って関数を返す形で書きます。

```typescript
function fmapOptional<A, B>(f: (a: A) => B): (fa: Optional<A>) => Optional<B> {
  return (fa) =>
    fa.hasValue ? { hasValue: true, value: f(fa.value) } : { hasValue: false };
}

function fmapApiResult<A, B>(f: (a: A) => B): (fa: ApiResult<A>) => ApiResult<B> {
  return (fa) =>
    fa.status === "ok" ? { status: "ok", data: f(fa.data) } : { status: "empty" };
}

function fmapArray<A, B>(f: (a: A) => B): (xs: A[]) => B[] {
  return (xs) => xs.map(f);
}
```

`fmapArray` は `Array.prototype.map` そのものです。

`Optional` から `ApiResult` への自然変換 $\tau$ は既にあるものとします。

```typescript
function toApiResult<A>(fa: Optional<A>): ApiResult<A> {
  return fa.hasValue ? { status: "ok", data: fa.value } : { status: "empty" };
}
```

この記事では、`Optional<number>` を「ある生徒の試験の点数」とします。合否判定にはこの関数を使います。

```typescript
const PASS_MARK = 60;
const f = (point: number) => point >= PASS_MARK;
```

# 練習1: 2本目の自然変換

一覧表示のために、`ApiResult<A>` を配列 `A[]` に変換する $\sigma$ を書きます。値があれば要素1つの配列、なければ空配列とします。

```typescript
// TODO: A について何も知らないまま書く
function toArray<A>(fa: ApiResult<A>): A[] {
  // ここを実装
}
```

## 解答

```typescript
function toArray<A>(fa: ApiResult<A>): A[] {
  return fa.status === "ok" ? [fa.data] : [];
}
```

自然性は、$\mathrm{ApiResult}$ と $\mathrm{Array}$ の `fmap` が $\sigma$ を通して整合することです。四角形にするとこうなります。

$$
\begin{CD}
\mathrm{ApiResult}\langle A \rangle @>{\mathrm{fmapApiResult}(f)}>> \mathrm{ApiResult}\langle B \rangle \\
@V{\sigma_A}VV @VV{\sigma_B}V \\
\mathrm{Array}\langle A \rangle @>>{\mathrm{fmapArray}(f)}> \mathrm{Array}\langle B \rangle
\end{CD}
$$

`ApiResult<A>` は2通りしかないので、両方試しました。

| 経路              | `{ status: "ok", data: a }` | `{ status: "empty" }` |
| ----------------- | --------------------------- | --------------------- |
| fmap してから変換 | `[f(a)]`                    | `[]`                  |
| 変換してから fmap | `[a]` を経由して `[f(a)]`   | `[]` を経由して `[]`  |

空配列に `map` をかけても空配列のままなので、値が無い側も一致します。

# 練習2: 自然変換をつなぐ

$\tau : \mathrm{Optional} \Rightarrow \mathrm{ApiResult}$ と $\sigma : \mathrm{ApiResult} \Rightarrow \mathrm{Array}$ が揃ったので、つないで $\mathrm{Optional} \Rightarrow \mathrm{Array}$ を作ります。これが自然変換になっているかを確かめます。

```typescript
// TODO: toApiResult と toArray をつなぐ
function toArrayFromOptional<A>(fa: Optional<A>): A[] {
  // ここを実装
}
```

## 解答

```typescript
function toArrayFromOptional<A>(fa: Optional<A>): A[] {
  return toArray(toApiResult(fa));
}
```

各成分でただ関数を合成しただけです。$(\sigma \circ \tau)_A = \sigma_A \circ \tau_A$ と書けます。

## 図式を縦に積む

$\tau$ の四角形と $\sigma$ の四角形を縦に積むとこうなります。

$$
\begin{CD}
\mathrm{Optional}\langle A \rangle @>{\mathrm{fmapOptional}(f)}>> \mathrm{Optional}\langle B \rangle \\
@V{\tau_A}VV @VV{\tau_B}V \\
\mathrm{ApiResult}\langle A \rangle @>{\mathrm{fmapApiResult}(f)}>> \mathrm{ApiResult}\langle B \rangle \\
@V{\sigma_A}VV @VV{\sigma_B}V \\
\mathrm{Array}\langle A \rangle @>>{\mathrm{fmapArray}(f)}> \mathrm{Array}\langle B \rangle
\end{CD}
$$

上の四角形が $\tau$ の自然性、下の四角形が $\sigma$ の自然性で、どちらも可換です。$\sigma \circ \tau$ の自然性は、外側の長方形 ($\mathrm{Optional}$ から $\mathrm{Array}$ まで) が可換であることになります。

式にするとこうなります。

$$
\begin{aligned}
(\sigma \circ \tau)_B \circ \mathrm{fmapOptional}(f)
&= \sigma_B \circ \tau_B \circ \mathrm{fmapOptional}(f) \\
&= \sigma_B \circ \mathrm{fmapApiResult}(f) \circ \tau_A \\
&= \mathrm{fmapArray}(f) \circ \sigma_A \circ \tau_A \\
&= \mathrm{fmapArray}(f) \circ (\sigma \circ \tau)_A
\end{aligned}
$$

使ったのは $\tau$ と $\sigma$ の自然性だけで、`Optional` や `ApiResult` の中身には触れていません。同じ議論が任意の関手と自然変換で通ります。

## 動かして確認

```typescript
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const scores: Optional<number>[] = [
  { hasValue: true, value: 82 },
  { hasValue: true, value: 45 },
  { hasValue: false }, // 未受験
];

for (const score of scores) {
  const lhs = toArrayFromOptional(fmapOptional(f)(score)); // fmap してから変換
  const rhs = fmapArray(f)(toArrayFromOptional(score)); // 変換してから fmap
  console.log(JSON.stringify(score).padEnd(28), same(lhs, rhs), JSON.stringify(lhs));
}
```

```
{"hasValue":true,"value":82} true [true]
{"hasValue":true,"value":45} true [false]
{"hasValue":false}           true []
```

# 恒等自然変換

圏になるには恒等射も要ります。関手 $F$ に対する恒等自然変換 $\mathrm{id}_F$ は、各成分が $\mathrm{id}_{F(A)}$ です。

```typescript
function idOptional<A>(fa: Optional<A>): Optional<A> {
  return fa;
}
```

自然性は $\mathrm{id}_{F} \circ F(f) = F(f) \circ \mathrm{id}_{F}$ で、どちらも $F(f)$ そのものなので成り立ちます。

```
{"hasValue":true,"value":82} true
{"hasValue":true,"value":45} true
{"hasValue":false}           true
```

# 関手圏になっている

揃ったものを並べると、圏の条件を満たしています。

| 圏の要素 | 関手圏での中身     | この記事で確かめたもの                 |
| -------- | ------------------ | -------------------------------------- |
| 対象     | 関手               | `Optional`、`ApiResult`、`Array`       |
| 射       | 自然変換           | `toApiResult`、`toArray`               |
| 射の合成 | 各成分で関数を合成 | `toArrayFromOptional` が自然変換になる |
| 恒等射   | 恒等自然変換       | `idOptional`                           |

結合律は、自然変換の合成が各成分での関数合成なので、関数合成の結合律から従います。単位律も同じです。

圏 $\mathcal{C}$ から圏 $\mathcal{D}$ への関手全体は、こうして圏になります。$\mathcal{D}^{\mathcal{C}}$ や $\mathrm{Fun}(\mathcal{C}, \mathcal{D})$ と書かれます。

関手と自然変換を別々に見ていたときは、関手が「型を作るもの」、自然変換が「型を変換するもの」という別種の道具に見えていました。関手圏として並べると、関手が点で自然変換が矢印という、いつもの圏の絵に戻るのが意外でした。

# まとめ

- 関手圏は、関手を対象・自然変換を射とする圏
- 自然変換の合成は各成分で関数を合成するだけ。合成した結果もまた自然変換になる
- 証明は $\tau$ と $\sigma$ の自然性を1回ずつ使うだけで、関手の中身には触れない
- 恒等自然変換は各成分が恒等射。結合律と単位律は関数合成のものがそのまま使える
- 関手圏として見ると、関手が対象・自然変換が射という普通の圏の見方に戻る
