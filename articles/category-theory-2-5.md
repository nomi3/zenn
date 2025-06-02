---
title: "圏論 原著第2版の練習問題を解いてみる(2章-5)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 2章-5

$$
(a) \implies (b), (c), (d) \\
(b) \implies (a) \\
(c) \implies (a) \\
(d) \implies (a)
$$

をそれぞれ示す。


## (a) $\implies$ (b), (c), (d)

同型射 $f$ には逆射が存在する。それを $g$ とする。

$f \circ g = id_B$ より、$f$ は分裂エピ射である。

$g \circ f = id_A$ より、$f$ は分裂モノ射である。

また、同型射はモノ射かつエピ射である。

よって、$(a) \implies (b), (c), (d)$ が成り立つ。


## (b) $\implies$ (a)

(b) より、$f$ はモノ射で、$f \circ s = id_B$ を満たす $s$ が存在する。

ここで

$$
f = id_B \circ f \\
= (f \circ s) \circ f \\
= f \circ (s \circ f)
$$

となるが、$f$ はモノ射であるから左消去が可能で $s \circ f = id_A$ が成り立つ。

よって、$s$ は $f$ の逆射である。

よって、$(b) \implies (a)$ が成り立つ。


## (c) $\implies$ (a)

(c) より、$f$ はエピ射で、$t \circ f = id_A$ を満たす $t$ が存在する。

ここで

$$
f = f \circ id_A \\
= f \circ (t \circ f) \\
= (t \circ f) \circ f
$$

となるが、$f$ はエピ射であるから右消去が可能で $t \circ f = id_B$ が成り立つ。

よって、$t$ は $f$ の逆射である。

よって、$(c) \implies (a)$ が成り立つ。


## (d) $\implies$ (a)

(d) より、$f$ は分裂エピ射かつ分裂モノ射である。

つまり、$f \circ s = id_B$ かつ $t \circ f = id_A$ を満たす $s, t$ が存在する。

ここで

$$
s = id_A \circ s \\
= (t \circ f) \circ s \\
= t \circ (f \circ s) \\
= t \circ id_B \\
= t
$$

であり、$s = t$ は $f$ の逆射である。

よって、$(d) \implies (a)$ が成り立つ。


以上より、

$$
(a) \iff (b) \iff (c) \iff (d)
$$

が成り立つ。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
