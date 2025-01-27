---
title: "ストリング図で学ぶ圏論の基礎の演習問題を解いてみる(1.1.1)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[ストリング図で学ぶ圏論の基礎](https://amzn.to/3PQD19V)の演習問題を解いてみます。

:::message
公式の解答は[こちら](https://www.morikita.co.jp/books/mid/006371)でダウンロード可能です！
学習中の身のため、以下の私の解答は必ずしも正しいとは限りません…！
:::

# 1.1.1(a)

対象 $a$ に2つの恒等射 $1_a$ と $1_a'$ があるとする。

$1_a$ の性質より $1_a \circ 1_a' = 1_a'$ が成り立つ。

また $1_a'$ の性質より $1_a \circ 1_a' = 1_a$ も成り立つ。

よって $1_a = 1_a'$ が成り立つので恒等射は一意に定まる。

# 1.1.1(b)

$f: a \to b$ の逆射が2つあるとして、それぞれ $g$ と $g'$ とする。

$$
\begin{aligned}
g &= g \circ 1_b \\
&= g \circ (f \circ g') \\
&= (g \circ f) \circ g' \\
&= 1_a \circ g' \\
&= g'
\end{aligned}
$$

よって $g = g'$ が成り立つので逆射は一意に定まる。

# 参考文献
[ストリング図で学ぶ圏論の基礎](https://amzn.to/3PQD19V)
