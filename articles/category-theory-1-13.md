---
title: "圏論 原著第2版の練習問題を解いてみる(1章-13)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-13

## $\text{\=C}$ の構成

スモール圏 $\text{C}$ に対して、ケイリー表現を用いて $\text{\=C}$ を構成する。

対象:

全ての$C \in \text{C}$ に対して、

$$
\=C = \{ f \in \text{C} \mid \text{cod}(f) = C \}
$$

射:

$\text{C}$ の射 $g: C \to D$ に対して、

$$
\=g: \=C \to \=D
$$

であり、$\=C$ の任意の射 $f: X \to C$ に対して、 $\=g(f) = g \circ f$ である。

## $\text{\=C}$ が 圏であることの確認

###	結合性の確認:

任意の $f : X \to C, g : C \to D, h : D \to E$ に対して、次の計算を行う

$$
\=h \circ \=g(f) = \=h(\=g(f)) = \=h(g \circ f) = h \circ (g \circ f)
$$

$$
\overline{h \circ g}(f) = (h \circ g) \circ f
$$

$\text{C}$ の射の結合は結合律を満たすため、

$$
\=h \circ \=g = \overline{h \circ g}
$$

とできる。

ここで $\text{\=C}$ の射 $\=g: \=C \to \=D, \=h: \=D \to \=E, \=i: \=E \to \=F$ に対して、

$$
\begin{aligned}
(\=i \circ \=h) \circ \=g &= \overline{i \circ h} \circ \=g \\
&= \overline{(i \circ h) \circ g} \\
&= \overline{i \circ (h \circ g)} \\
&= \=i \circ \overline{h \circ g} \\
&= \=i \circ (\=h \circ \=g)
\end{aligned}
$$

とできるため、 $\text{\=C}$ における射の結合性が成り立つ。

### 恒等射の確認

$\text{\=C}$ の射 $\=g: \=C \to \=D$ に対して、

$$
\=g \circ \overline{1_C} = \overline{g \circ 1_C} = \=g
$$

$$
\overline{1_D} \circ \=g = \overline{1_D \circ g} = \=g
$$

とできるため、 $\overline{1_C} = 1_{\=C}, \overline{1_D} = 1_{\=D}$ であり、 $\text{\=C}$ における射の恒等射が成り立つ。

## $\text{\=C}$ が $\text{C}$ と同型であることの確認

このようにして得られた $\text{\=C}$ が $\text{C}$ と同型であることを示す。

$F: \text{C} \to \text{\=C}$ を

$$
F(C) = \=C, \quad F(g) = \=g
$$

と定義する。

$$
F(1_C) = \overline{1_C} = 1_{\=C}
$$

$$
F(g \circ h) = \overline{g \circ h} = \=g \circ \=h
$$

とできるため、 $F$ は関手である。

また $G: \text{\=C} \to \text{C}$ を

$$
G(\=C) = C, \quad G(\=g) = g
$$

と定義する。

$$
G(1_{\=C}) = G(\overline{1_C}) = 1_C
$$

$$
G(\=g \circ \=h) = G(\overline{g \circ h}) = g \circ h
$$

とできるため、 $G$ は関手である。

$F, G$の定義より、　$F \circ G = 1_{\text{\=C}}, G \circ F = 1_C$ であるため、 $\text{\=C}$ は $\text{C}$ と同型である。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)