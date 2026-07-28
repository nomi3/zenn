---
title: "圏論の練習問題を作って解いてみる(自然変換)"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "typescript", "関数型プログラミング"]
published: true
---

圏論の自然変換を、TypeScriptを使った練習問題で確認します。題材は学校の成績照会です。

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

`Optional` は型 `A` を型 `Optional<A>` に対応させる「対象の対応」で、`fmapOptional` は関数 `A -> B` を関数 `Optional<A> -> Optional<B>` に対応させる「射の対応」です。この2つが揃って関手になります。

`fmapOptional` は関数を受け取って関数を返す形にしてあります。`fmapOptional(f)` そのものが `Optional<A> -> Optional<B>` という射なので、後で図式の矢印としてそのまま使えます。

この記事では、`Optional<number>` を「ある生徒の試験の点数」とします。欠席で未受験なら `{ hasValue: false }` です。合否判定にはこの関数を使います。

```typescript
const PASS_MARK = 60;
const f = (point: number) => point >= PASS_MARK;

const score: Optional<number> = { hasValue: true, value: 82 };
```

# 練習問題

判定結果を成績照会 API で返すために、`Optional<A>` を次の `ApiResult<A>` に変換する `toApiResult` を書きます。

```typescript
type ApiResult<A> =
  | { status: "ok"; data: A }
  | { status: "empty" };
```

<!-- check:skip -->

```typescript
function toApiResult<A>(fa: Optional<A>): ApiResult<A> {
  // ここを実装
}
```

この `ApiResult` も、`Optional` と同じく関手です。型 `A` を `ApiResult<A>` に対応させ、関数 `A -> B` を `ApiResult<A> -> ApiResult<B>` に対応させる `fmap` を持ちます(実装は後で書きます)。

関手が2つ揃ったので、その間の変換を考えられます。自然変換とは関手から関手への変換のことなので、`ApiResult` が関手であることを確認して初めて、`toApiResult` を自然変換と呼べます。

## 解答

```typescript
function toApiResult<A>(fa: Optional<A>): ApiResult<A> {
  return fa.hasValue ? { status: "ok", data: fa.value } : { status: "empty" };
}
```

`A` について何も知らないまま書けています。`toApiResult` の実装の中に `A` 固有の処理は一切出てきません。点数(`number`)を運んでいようが合否(`boolean`)を運んでいようが、コードは同じです。

`toApiResult` を $\tau$ と書くと、型変数 `A` ごとに射 $\tau_A : \mathrm{Optional}\langle A \rangle \to \mathrm{ApiResult}\langle A \rangle$ が定まってはいるものの、その定義は `A` に依存せず、箱の形だけを見て決まっています。

# 可換図式を確認する

「`fmap` を先にやるか、変換を先にやるかで結果が変わらない」を確かめます。

素朴に書くと次の2つを比べたくなりますが、

<!-- check:skip -->

```typescript
toApiResult(fmapOptional(f)(score));
fmapOptional(f)(toApiResult(score)); // 型が合わない
```

後者はコンパイルが通りません。`fmapOptional(f)` は `Optional<number>` を受け取る関数なのに、`toApiResult(score)` はもう `ApiResult` だからです。

`ApiResult` も関手なので、自分の `fmap` を持っています。それを書き下します。

```typescript
function fmapApiResult<A, B>(f: (a: A) => B): (fa: ApiResult<A>) => ApiResult<B> {
  return (fa) =>
    fa.status === "ok" ? { status: "ok", data: f(fa.data) } : { status: "empty" };
}
```

自然変換の可換性は「同じ `fmap` を使う」という話ではなく、2つの関手がそれぞれ持つ `fmap` が $\tau$ を通して整合するという話です。比較の相手には `fmapOptional` ではなくこちらを使います。

これで比べるべき2つの経路が揃いました。

```typescript
toApiResult(fmapOptional(f)(score)); // fmap してから変換
fmapApiResult(f)(toApiResult(score)); // 変換してから fmap
```

図式にするとこうなります。4つの辺がすべて、`fmapOptional(f)` のようなそのまま呼べる関数になっています。

$$
\begin{CD}
\mathrm{Optional}\langle A \rangle @>{\mathrm{fmapOptional}(f)}>> \mathrm{Optional}\langle B \rangle \\
@V{\mathrm{toApiResult}_A}VV @VV{\mathrm{toApiResult}_B}V \\
\mathrm{ApiResult}\langle A \rangle @>>{\mathrm{fmapApiResult}(f)}> \mathrm{ApiResult}\langle B \rangle
\end{CD}
$$

自然性とは、この四角形が可換であること、すなわち

$$
\mathrm{toApiResult}_B \circ \mathrm{fmapOptional}(f) \;=\; \mathrm{fmapApiResult}(f) \circ \mathrm{toApiResult}_A
$$

です。両辺とも `Optional<A> -> ApiResult<B>` という同じ型の関数で、その等式を主張しています。

## 場合分けで確かめる

`Optional<A>` の値は2通りしかないので、両方試せば図式が閉じるか確認できます。$f : A \to B$ とします。

**(1) `{ hasValue: true, value: a }` のとき**

| 経路              | 途中                              | 結果                           |
| ----------------- | --------------------------------- | ------------------------------ |
| fmap してから変換 | `{ hasValue: true, value: f(a) }` | `{ status: "ok", data: f(a) }` |
| 変換してから fmap | `{ status: "ok", data: a }`       | `{ status: "ok", data: f(a) }` |

**(2) `{ hasValue: false }` のとき**

| 経路              | 途中                  | 結果                  |
| ----------------- | --------------------- | --------------------- |
| fmap してから変換 | `{ hasValue: false }` | `{ status: "empty" }` |
| 変換してから fmap | `{ status: "empty" }` | `{ status: "empty" }` |

どちらの場合も一致するので、図式は可換です。

## 実際に動かす

```typescript
const scores: Optional<number>[] = [
  { hasValue: true, value: 82 },
  { hasValue: true, value: 45 },
  { hasValue: false }, // 未受験
];

for (const score of scores) {
  const a = toApiResult(fmapOptional(f)(score)); // fmap してから変換
  const b = fmapApiResult(f)(toApiResult(score)); // 変換してから fmap
  console.log(JSON.stringify(a) === JSON.stringify(b), a);
}
```

```
true { status: 'ok', data: true }
true { status: 'ok', data: false }
true { status: 'empty' }
```

# まとめ

- 自然変換は関手から関手への変換。変換先が関手であることを確認して初めて、そう呼べる
- 自然変換の条件は図式の可換性。型変数 `A` を覗かずに書けることが、その手がかりになる
- 可換図式の確認は、それぞれの関手が持つ自分の `fmap` を使って行う
- `fmap` を「関数を受け取って関数を返す」形にしておくと、図式の矢印をそのままコードで書ける
- `Optional` のように形が有限個なら、可換性はケース分けで確かめられる
