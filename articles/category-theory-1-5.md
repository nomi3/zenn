---
title: "圏論 原著第2版の練習問題を解いてみる(1章-5)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-5

## 関手 $U: \text{C}/C \to \text{C}$ の定義

関手 $U: \text{C}/C \to \text{C}$ を以下のように定義する。

対象への作用:

$$
U(f: X \to C) = X
$$

射への作用:

$$
U(h: (X \to C) \to (Y \to C)) = h
$$

ただし、 $f$ と $h$ はそれぞれスライス圏 $\text{C}/C$ の対象と射である。

## 関手 $F: \text{C}/C \to \text{C}^\to$ の定義

関手 $F: \text{C}/C \to \text{C}^\to$ を以下のように定義する。

対象への作用:

$$
F(f: X \to C) = f
$$

射への作用:

$$
F(h: (X \to C) \to (Y \to C)) = (h, \text{id}_C)
$$

ただし、 $f$ と $h$ はそれぞれスライス圏 $\text{C}/C$ の対象と射であり、 $g: Y \to C$ は $f = g \circ h$ を満たす。

## $\text{dom} \circ F = U$ の確認

対象について:

$$
\text{dom} \circ F(f: X \to C) = \text{dom}(f) = X = U(f: X \to C)
$$

射について:

$$
\text{dom} \circ F(h: (X \to C) \to (Y \to C)) = \text{dom}((h, \text{id}_C)) = h = U(h: (X \to C) \to (Y \to C))
$$

よって、 $\text{dom} \circ F = U$ が成り立つ。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)