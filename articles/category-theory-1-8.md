---
title: "圏論 原著第2版の練習問題を解いてみる(1章-8)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-8

## 関手 $P$ によって作られる前順序 $P(\text{C})$ の定義

圏 $\text{C}$ から 関手 $P$ によって作られる前順序 $P(\text{C})$ を定義する。

$P(\text{C})$ の対象は、圏 $\text{C}$ の対象である。

$P(\text{C})$ の射は、関係 $A \leq B \iff A \to B$ である。

## 関手 $P$ の確認

### 恒等射の保存

$1_A: A \to A$ は $A \leq A$ を満たすため、恒等射の保存が成り立つ。

### 射の合成の保存

$f: A \to B$ と $g: B \to C$ に対して、

$$
\begin{aligned}
P(g) \circ P(f) &= (A \leq B \land B \leq C) \\
&= (A \leq C) \\
&= P(g \circ f)
\end{aligned}
$$

であるため、射の合成の保存が成り立つ。

## 前順序から圏への包含関手の定義

前順序 $\text{Pre}$ から圏 $J(\text{Pre})$ への包含関手 $J$ を定義する。

$J(\text{Pre})$ の対象は、前順序 $\text{Pre}$ の対象である。

$J(\text{Pre})$ の射は、 $A \to B \iff A \leq B$ である。

## $P \circ J = 1_{\text{Pre}}$ の確認

$P \circ J$ は、前順序 $\text{Pre}$ の対象を全く同じ対象に写し、関係を全く同じ関係に写す。
よって、$P \circ J = 1_{\text{Pre}}$ が成り立つ。

そのため、$P$ は $J$ の逆関手である。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
