---
title: "圏論の練習問題を作って解いてみる(アプリカティブ関手)"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "typescript", "関数型プログラミング"]
published: false
---

アプリカティブ関手の `ap` を、TypeScriptを使った練習問題で確認します。題材は学校の進級判定です。

「2つの独立した値を組み合わせて1つの判定を作る」という場面を扱います。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 前提となる型

値が有るかもしれないし無いかもしれない、という状況を表す `Optional` 型を使います。

```typescript
type Optional<A> =
  | { hasValue: true; value: A }
  | { hasValue: false };

function fmapOptional<A, B>(f: (a: A) => B, fa: Optional<A>): Optional<B> {
  return fa.hasValue ? { hasValue: true, value: f(fa.value) } : { hasValue: false };
}
```

`Optional` は型 `A` を `Optional<A>` に対応させ、関数 `A -> B` を `Optional<A> -> Optional<B>` に対応させる関手です。

ここに `pure` と `ap` の2つを足します。この2つが満たすべき法則は、練習問題を解いたあとで確認します。

```typescript
function pureOptional<A>(a: A): Optional<A> {
  return { hasValue: true, value: a };
}

function apOptional<A, B>(fab: Optional<(a: A) => B>, fa: Optional<A>): Optional<B> {
  if (!fab.hasValue || !fa.hasValue) return { hasValue: false };
  return { hasValue: true, value: fab.value(fa.value) };
}
```

`pureOptional` は素の値を箱に入れるだけです。`apOptional` が本題で、**箱に入った関数**を**箱に入った値**に適用します。

引数の並びは `fmapOptional` と揃えてあります。どちらも関数が先、箱が後です。違いは第1引数だけで、`fmapOptional` は素の関数を取るのに対し、`apOptional` はそれが箱に入っています。

```typescript
fmapOptional: (f: (a: A) => B, fa: Optional<A>) => Optional<B>;
apOptional: (fab: Optional<(a: A) => B>, fa: Optional<A>) => Optional<B>;
```

この記事では次の2つを扱います。どちらも欠けている可能性があります。

```typescript
const score: Optional<number> = { hasValue: true, value: 82 }; // 試験の点数
const attendance: Optional<number> = { hasValue: true, value: 24 }; // 出席日数
```

# なぜ fmap では届かないのか

先に、`fmap` だけで戦うとどこで詰まるかを見ておきます。

判定に使いたいのは「点数が60点以上、かつ出席日数が20日以上」という**2引数**の条件です。これをカリー化して `fmapOptional` に渡すと、こうなります。

```typescript
const canAdvance = (s: number) => (a: number) => s >= 60 && a >= 20;

const boxedFn = fmapOptional(canAdvance, score);
// boxedFn の型: Optional<(a: number) => boolean>
```

**関数が箱に入った状態**になりました。あとは出席日数を食わせるだけなのですが、`fmapOptional` にはもう渡せません。第1引数は**素の関数**でなければならないのに、こちらが持っているのは**箱に入った関数**だからです。

つまり `fmap` は「箱の外にある関数」を「箱の中の値」に適用する道具なので、関数自体が箱に入った瞬間に手が届かなくなります。ここを埋めるのが `ap` です。

```typescript
fmapOptional(boxedFn, attendance); // 型が合わない
apOptional(boxedFn, attendance); // 通る
```

渡しているものは同じで、違うのは関数名だけです。

# 練習問題

「点数が60点以上、かつ出席日数が20日以上」なら `true` を返す `Optional<boolean>` を、`score` と `attendance` から作ってください。

**制約: 中身を `if` で直接分解しないこと。** `pureOptional` と `apOptional` だけを使います。

```typescript
const PASS_MARK = 60;
const MIN_ATTENDANCE = 20;

// TODO: pureOptional と apOptional だけを使って書く
function judge(
  score: Optional<number>,
  attendance: Optional<number>,
): Optional<boolean> {
  // ここを実装
}
```

ヒント: カリー化した関数を先に `pureOptional` で箱に入れてから、`apOptional` で1引数ずつ適用していきます。

## 解答

```typescript
const canAdvance = (s: number) => (a: number) =>
  s >= PASS_MARK && a >= MIN_ATTENDANCE;

function judge(
  score: Optional<number>,
  attendance: Optional<number>,
): Optional<boolean> {
  return apOptional(apOptional(pureOptional(canAdvance), score), attendance);
}
```

## 型を1段ずつ追う

入れ子になっていて読みにくいので、内側から型を追ってみます。

| 式                            | 型                                                |
| ----------------------------- | ------------------------------------------------- |
| `canAdvance`                  | `(s: number) => (a: number) => boolean`           |
| `pureOptional(canAdvance)`    | `Optional<(s: number) => (a: number) => boolean>` |
| `apOptional(..., score)`      | `Optional<(a: number) => boolean>`                |
| `apOptional(..., attendance)` | `Optional<boolean>`                               |

`apOptional` を1回通すごとに、箱の中の関数の引数が1つずつ減っていきます。カリー化しておいたのはこのためで、**2引数の関数を「1引数の関数を返す1引数の関数」に変えておくと、`ap` を並べるだけで引数を順に食わせられる**という仕掛けです。

適用の順番はカリー化の順番と一致している必要があります。`canAdvance` は点数を先に取るので、`apOptional` も `score` が先です。ここを入れ替えると、点数と出席日数が逆に解釈されます(どちらも `number` なので型検査は通ってしまいます)。

# 全ケースで確かめる

`Optional` が2つあるので、有無の組み合わせは4通りです。値が揃っている場合の判定内容も含めて、全部並べます。

| 点数 | 出席日数 | 結果                               |
| ---- | -------- | ---------------------------------- |
| `82` | `24`     | `{ hasValue: true, value: true }`  |
| `45` | `24`     | `{ hasValue: true, value: false }` |
| `82` | `12`     | `{ hasValue: true, value: false }` |
| なし | `24`     | `{ hasValue: false }`              |
| `82` | なし     | `{ hasValue: false }`              |
| なし | なし     | `{ hasValue: false }`              |

どちらか一方でも欠けていれば結果も欠ける、というのが `apOptional` の `if (!fab.hasValue || !fa.hasValue)` が担っている部分です。

ここで大事なのは、**「点数が無いときどうするか」を `canAdvance` の中に一切書いていない**ことです。`canAdvance` は `(s: number) => (a: number) => boolean` という、`Optional` を知らない素の関数のままです。欠損の伝播は全部 `apOptional` 側が引き受けています。

## 実際に動かす

```typescript
const cases: [string, Optional<number>, Optional<number>][] = [
  ["両方あり(合格)", { hasValue: true, value: 82 }, { hasValue: true, value: 24 }],
  ["両方あり(点数不足)", { hasValue: true, value: 45 }, { hasValue: true, value: 24 }],
  ["両方あり(出席不足)", { hasValue: true, value: 82 }, { hasValue: true, value: 12 }],
  ["点数なし", { hasValue: false }, { hasValue: true, value: 24 }],
  ["出席なし", { hasValue: true, value: 82 }, { hasValue: false }],
  ["両方なし", { hasValue: false }, { hasValue: false }],
];

for (const [label, s, a] of cases) {
  console.log(label.padEnd(10), JSON.stringify(judge(s, a)));
}
```

```
両方あり(合格)   {"hasValue":true,"value":true}
両方あり(点数不足) {"hasValue":true,"value":false}
両方あり(出席不足) {"hasValue":true,"value":false}
点数なし       {"hasValue":false}
出席なし       {"hasValue":false}
両方なし       {"hasValue":false}
```

# アプリカティブ関手の定義

ここまで `pureOptional` と `apOptional` を道具として使ってきましたが、この2つがあれば何でもアプリカティブ関手になるわけではありません。満たすべき法則があります。

関手 $F$ が次の2つの操作を持ち、

$$
\mathrm{pure} : A \to F\langle A \rangle
\qquad
\mathrm{ap} : F\langle A \to B \rangle \times F\langle A \rangle \to F\langle B \rangle
$$

以下の4つの法則を満たすとき、$F$ を**アプリカティブ関手**と呼びます。

| 法則                  | 内容                                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 恒等射 (Identity)     | $\mathrm{ap}(\mathrm{pure}(\mathrm{id}),\, v) = v$                                                                   |
| 準同型 (Homomorphism) | $\mathrm{ap}(\mathrm{pure}(f),\, \mathrm{pure}(x)) = \mathrm{pure}(f(x))$                                            |
| 交換 (Interchange)    | $\mathrm{ap}(u,\, \mathrm{pure}(y)) = \mathrm{ap}(\mathrm{pure}(g \mapsto g(y)),\, u)$                               |
| 合成 (Composition)    | $\mathrm{ap}(\mathrm{ap}(\mathrm{ap}(\mathrm{pure}(\circ),\, u),\, v),\, w) = \mathrm{ap}(u,\, \mathrm{ap}(v,\, w))$ |

言葉にすると、恒等射は「`pure` は余計なことをしない」、準同型は「箱の中で計算しても、計算してから箱に入れても同じ」、交換は「箱に入った関数と `pure` した値の適用順は入れ替えられる」、合成は「`ap` の重ね方を変えても結果は変わらない」です。

## 恒等射の法則を確かめる

$\mathrm{ap}(\mathrm{pure}(\mathrm{id}),\, v) = v$ を、`v` の2通りで確かめます。$\mathrm{pure}(\mathrm{id})$ は必ず `{ hasValue: true, value: id }` なので、分岐するのは `v` のほうだけです。

| `v`                            | `apOptional` の挙動         | 結果                           |
| ------------------------------ | --------------------------- | ------------------------------ |
| `{ hasValue: true, value: a }` | 両方あるので `id(a)` を適用 | `{ hasValue: true, value: a }` |
| `{ hasValue: false }`          | `!fa.hasValue` で打ち切り   | `{ hasValue: false }`          |

どちらも `v` そのものに戻るので成立します。

## 準同型の法則を確かめる

$\mathrm{ap}(\mathrm{pure}(f),\, \mathrm{pure}(x)) = \mathrm{pure}(f(x))$ は、両辺とも `pure` しか使っていないので場合分けが要りません。`pure` が返すのは常に `hasValue: true` だからです。

左辺は `apOptional` が両方の中身を取り出して `f(x)` を適用し、`{ hasValue: true, value: f(x) }` になります。右辺の $\mathrm{pure}(f(x))$ も同じものです。

言い換えると、**「箱に入れてから計算」と「計算してから箱に入れる」のどちらを選んでも結果が変わらない**、ということです。`pure` が値に何も付け足していないからこそ成り立ちます。

## 動かして確認

```typescript
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const id = <A,>(a: A) => a;
const f = (n: number) => n + 1;

// 恒等射
const vs: Optional<number>[] = [{ hasValue: true, value: 5 }, { hasValue: false }];
for (const v of vs) {
  console.log("Identity     ", JSON.stringify(v), "->", same(apOptional(pureOptional(id), v), v));
}

// 準同型
console.log("Homomorphism ", same(apOptional(pureOptional(f), pureOptional(3)), pureOptional(f(3))));
```

```
Identity      {"hasValue":true,"value":5} -> true
Identity      {"hasValue":false} -> true
Homomorphism  true
```

残る交換と合成も同じ要領で確かめられます。`Optional` は取りうる形が2通りしかないので、どの法則も有無の組み合わせを総当たりするだけで済みます(合成は `ap` が3つ重なるので8通りです)。

# fmap は ap の特別な場合

`ap` を手に入れると、`fmap` はその特殊ケースとして書けてしまいます。素の関数を `pure` で箱に入れてから `ap` すればいいからです。

$$
\mathrm{fmap}(f,\,x) \;=\; \mathrm{ap}(\mathrm{pure}(f),\,x)
$$

引数の並びを揃えておいたので、左辺と右辺の差は `pure` が付くかどうかだけになっています。

実際に確かめます。

```typescript
const half = (n: number) => n / 2;
const x: Optional<number> = { hasValue: true, value: 82 };

fmapOptional(half, x); // { hasValue: true, value: 41 }
apOptional(pureOptional(half), x); // { hasValue: true, value: 41 }
```

この式は `fmap` の定義として読むこともできます。4つの法則を満たす `pure` と `ap` があれば、`fmap` をこの式で定義でき、関手の法則も自動的に満たされます。実際、$\mathrm{fmap}(\mathrm{id},\, x) = \mathrm{ap}(\mathrm{pure}(\mathrm{id}),\, x) = x$ は恒等射の法則そのものです。

逆は成り立ちません。冒頭で見たとおり、`fmap` だけでは箱に入った関数に手が届かないからです。

`fmap` より `ap` のほうが強い道具である、という関係になっています。

# どこまでが ap の守備範囲か

実装を選ぶときに効いてくる話をひとつ。

今回うまくいったのは、**点数と出席日数が互いに独立している**からです。出席日数を取ってくるのに点数の値は要りませんし、逆も同じです。だから「両方を箱から出して関数に渡す」という形に収まりました。

これが崩れるのは、後の値が前の値に依存する場合です。例えば「本試験が不合格だった生徒にだけ追試の点数がある」という状況を考えると、追試の点数を取りに行くかどうかが本試験の**値**によって決まります。

```typescript
// 本試験の点数によって、次に何を取りに行くかが変わる
// → ap では書けない
const retake: (s: number) => Optional<number> = ...;
```

`apOptional` は `Optional<(a: A) => B>` と `Optional<A>` を受け取る形なので、「`A` の値を見てから次の `Optional` を決める」という余地がありません。この場合に必要になるのが `flatMap`(モナド)です。

- **値同士が独立** → `ap` で足りる(アプリカティブ関手)
- **後の計算が前の値に依存** → `flatMap` が要る(モナド)

`ap` で書ける範囲に収まっているということは、その計算に順序依存が無いことが型のレベルで示されている、とも読めます。

# 補足: なぜ失敗の理由が残らないのか

上の表で、点数だけ欠けている場合も両方欠けている場合も、結果は同じ `{ hasValue: false }` でした。どちらが欠けていたのかは残りません。

`Optional` の `ap` が最初に見つかった欠損で打ち切る形になっているためで、これは `Optional` という型が「値が無い」以上の情報を持てないことの帰結です。

入力フォームの検証のように「何がどう駄目だったか」を全部集めたい場合は、`Optional` ではなく失敗側に情報を溜められる型(`Validation` などと呼ばれます)を使い、その型のアプリカティブとして `ap` を定義することになります。`ap` という形はそのままに、`ap` の実装が失敗を結合する側に変わる、という作りです。

同じ `ap` でも、どの型のアプリカティブかによって挙動が変わる、というのが面白いところだと思いました。

# まとめ

- `fmap` は箱の外にある関数を箱の中の値に適用する。関数自体が箱に入ると手が届かなくなる
- `ap` は箱に入った関数を箱に入った値に適用する。カリー化した関数を `pure` で包み、`ap` を並べれば多引数を順に食わせられる
- 欠損の伝播は `ap` 側の責務。判定に使う関数は `Optional` を知らない素の関数のままでいられる
- アプリカティブ関手は `pure` と `ap` を持ち、恒等射・準同型・交換・合成の4法則を満たすもの。`Optional` は形が2通りしかないので、どれも総当たりで確かめられる
- `fmap(f, x) = ap(pure(f), x)` が成り立つので、`fmap` は `ap` の特別な場合
- 値同士が独立なら `ap` で足りる。後の計算が前の値に依存するなら `flatMap` が要る

# 参考文献

- [Control.Applicative](https://hackage.haskell.org/package/base/docs/Control-Applicative.html) (Haskell base) — 本記事で挙げた4つの法則の名前と定式化。$\mathrm{fmap}(f,\,x) = \mathrm{ap}(\mathrm{pure}(f),\,x)$ が4法則の帰結であることもここに書かれています
