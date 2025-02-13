---
title: "圏論 原著第2版の練習問題を解いてみる(2章-3)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 2章-3

$f: A \to B$ が2つの逆射 $g, g'$ を持つとする。

$$
\begin{aligned}
g &= g \circ 1_B \\
&= g \circ (f \circ g') \\
&= (g \circ f) \circ g' \\
&= 1_A \circ g' \\
&= g'
\end{aligned}
$$

よって $g = g'$ が成り立つ。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
