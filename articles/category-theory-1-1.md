---
title: "圏論 原著第2版の練習問題を解いてみる(1章-1)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: false
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-1(b)

以下の内容で関手 $G: \text{Sets} \to \text{Rel}$ が存在することを示す。

## 恒等射の保存
$G(1_A) = 1_{G(A)}$ を示す。

$$
\begin{aligned}
G(1_A) &= \{ \langle a, 1_A(a) \rangle \mid a \in A \} \\
&= \{ \langle a, a \rangle \mid a \in A \} \\
&= 1_{G(A)}
\end{aligned}
$$

## 射の合成の保存
$G(g \circ f) = G(g) \circ G(f)$ を示す。

$$
\begin{aligned}
G(g \circ f) &= \{ \langle a, (g \circ f)(a) \rangle \mid a \in A \} \\
&= \{ \langle a, g(f(a)) \rangle \mid a \in A \} \\
&= \{ \langle a, c \rangle \mid \exists b \in B(b=f(a) \And c=g(b)) \} \\
&= \{ \langle a, c \rangle \mid \exists b \in B(\langle a, b \rangle \in G(f) \And \langle b, c \rangle \in G(g)) \} \\
&= G(g) \circ G(f)
\end{aligned}
$$

## 結論
以上より、関手 $G: \text{Sets} \to \text{Rel}$ が存在することが示された。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)