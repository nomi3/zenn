---
title: "圏論 原著第2版の練習問題を解いてみる(2章-7)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 2章-7

ある対象 $P$ が射影的であるとする。

射影的対象の定義より、任意のエピ射 $e: E \to X$ と射 $f: P \to X$ に対して、$e \circ \bar{f} = f$ となる射 $\bar{f}: P \to E$ が存在する。

ある対象 $A$ が $P$ の引き込みであるとする。

つまり、$r \circ i = 1_A$ となる射 $i: A \to P$ と射 $r: P \to A$ が存在する。

ここで、任意のエピ射 $e: E \to X$ と射 $g: A \to X$ を考える。

さらに

$$
g \circ r: P \to X
$$

を考える。

$P$ は射影的対象であるから、$e \circ \bar{h} = g \circ r$ となる射 $\bar{h}: P \to E$ が存在する。

ここで、引き込み $i: A \to P$ を使い、 $h: A \to E$ を

$$
h = \bar{h} \circ i
$$

とする。

このとき、

$$
e \circ h = e \circ (\bar{h} \circ i) = (e \circ \bar{h}) \circ i = (g \circ r) \circ i = g \circ (r \circ i) = g \circ 1_A = g
$$

よって、$A$ は射影的である。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
