---
title: "圏論 原著第2版の練習問題を解いてみる(2章-4)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 2章-4(a)

## $f$ および $g$ が同型のとき、 $h = g \circ f$ も同型である

$f$ および $g$ が同型射であるとき、それぞれの逆射 $f^{-1}$ および $g^{-1}$ が存在する。

ここで、$h^{-1} = f^{-1} \circ g^{-1}$ とすると、

$$
h \circ h^{-1} = (g \circ f) \circ (f^{-1} \circ g^{-1}) = g \circ (f \circ f^{-1}) \circ g^{-1} = g \circ id \circ g^{-1} = g \circ g^{-1} = id
$$

同様に、

$$
h^{-1} \circ h = (f^{-1} \circ g^{-1}) \circ (g \circ f) = f^{-1} \circ (g^{-1} \circ g) \circ f = f^{-1} \circ id \circ f = f^{-1} \circ f = id
$$

よって、$h$ は同型射である。

## $f$ および $g$ がモノ射のとき、 $h = g \circ f$ もモノ射である

2つの射 $a, b$ について、$h \circ a = h \circ b$ が成り立つとする。

$$
h \circ a = h \circ b \implies g \circ f \circ a = g \circ f \circ b
$$

であり、$g$ がモノ射であることから、$f \circ a = f \circ b$ が成り立つ。

また、$f$ がモノ射であることから、$a = b$ が成り立つ。

よって、$h$ はモノ射である。

## $f$ および $g$ がエピ射のとき、 $h = g \circ f$ もエピ射である

2つの射 $a, b$ について、$a \circ h = b \circ h$ が成り立つとする。

$$
a \circ h = b \circ h \implies a \circ (g \circ f) = b \circ (g \circ f) \implies (a \circ g) \circ f = (b \circ g) \circ f
$$

であり、$f$ がエピ射であることから、$a \circ g = b \circ g$ が成り立つ。

また、$g$ がエピ射であることから、$a = b$ が成り立つ。

よって、$h$ はエピ射である。

# 2章-4(b)

## $h = g \circ f$ がモノ射のとき、$f$ はモノ射である

2つの射 $a, b$ について、$f \circ a = f \circ b$ が成り立つとする。

$$
f \circ a = f \circ b \implies g \circ f \circ a = g \circ f \circ b \implies h \circ a = h \circ b
$$

であり、$h$ がモノ射であることから、$a = b$ が成り立つ。

よって、$f$ はモノ射である。

# 2章-4(c)

## $h = g \circ f$ がエピ射のとき、$g$ はエピ射である

2つの射 $a, b$ について、$a \circ g = b \circ g$ が成り立つとする。

$$
a \circ g = b \circ g \implies a \circ g \circ f = b \circ g \circ f \implies a \circ h = b \circ h
$$

であり、$h$ がエピ射であることから、$a = b$ が成り立つ。

よって、$g$ はエピ射である。

# 2章-4(d)

## $h$ はモノ射でも、$g$ がモノ射ではない例

集合の圏 $\text{Sets}$ において：

- $A = \{1\}$
- $B = \{1,2\}$
- $C = \{1\}$

- $f: A \to B$ を $f(1) = 1$ と定義（この $f$ は単射）。
- $g: B \to C$ を $g(1) = 1, \; g(2) = 1$ と定義（この $g$ は明らかに単射ではない）。

このとき、合成

$$
h = g \circ f: A \to C
$$

は $h(1) = g(f(1)) = g(1) = 1$ となり、定義域 $A$ の要素が $1$ つであるため $h$ は単射（すなわちモノ射）である。しかし $g$ は $g(1) = g(2)$ となっており、単射ではない。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
