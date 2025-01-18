---
title: "圏論 原著第2版の練習問題を解いてみる(1章-7)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-7

## 関手 $F$ が同型かどうかの確認

$F(f: X \to 2) = (f^{-1}(a), f^{-1}(b))$ となる関手 $F: \text{Sets}/2 \to \text{Sets} \times \text{Sets}$ が同型かどうかを確認する。

### 関手 $F$ の確認

射への作用:

$$
F(h: (X \to 2) \to (Y \to 2)) = (h|_{f^{-1}(a)}, h|_{f^{-1}(b)})
$$

### 関手 $F^{-1}$ の定義

関手 $F^{-1}: \text{Sets} \times \text{Sets} \to \text{Sets}/2$ を以下のように定義する。

対象への作用:

$(A, B) \in \text{Sets} \times \text{Sets}$ に対して、集合 $X = A \cup B$ と射 $f: X \to 2$ を用いて、以下のように定義する:

$$
f(x) =
\begin{cases}
a & \text{if } x \in A \\
b & \text{if } x \in B
\end{cases} \\

F^{-1}(A, B) = f
$$

射への作用:

$(h_A, h_B): (A_1, B_1) \to (A_2, B_2)$ に対して、集合 $X_1 = A_1 \cup B_1$ と集合 $X_2 = A_2 \cup B_2$ と関数 $h: X_1 \to X_2$ を用いて、以下のように定義する:

$$
h(x) =
\begin{cases}
h_A(x) & \text{if } x \in A_1 \\
h_B(x) & \text{if } x \in B_1
\end{cases} \\

F^{-1}(h_A, h_B) = h
$$

### $F^{-1}$ が $F$ の逆射であることの確認

#### $F \circ F^{-1} = \text{id}$ の確認

対象 $A, B \in \text{Sets}$ に対して、以下のように確認する:

$$
F(F^{-1}(A, B)) = F(f) = (f^{-1}(a), f^{-1}(b)) = (A, B)
$$

射 $(h_A, h_B): (A_1, B_1) \to (A_2, B_2)$  に対して、以下のように確認する:

$$
\begin{aligned}
F(F^{-1}(h_A, h_B)) &= F(h) \\
&= (h|_{f^{-1}(a)}, h|_{f^{-1}(b)}) \\
&= (h|_{A_1}, h|_{B_1}) \\
&= (h_A, h_B)
\end{aligned}
$$

よって、 $F \circ F^{-1} = \text{id}$ が成り立つ。

#### $F^{-1} \circ F = \text{id}$ の確認

対象 $f: X \to 2$ に対して、以下のように確認する:

$$
F^{-1}(F(f)) = F^{-1}(f^{-1}(a), f^{-1}(b)) = F^{-1}(A, B) = f
$$

射 $h: (X \to 2) \to (Y \to 2)$ に対して、以下のように確認する:

$$
\begin{aligned}
F^{-1}(F(h)) &= F^{-1}((h|_{f^{-1}(a)}, h|_{f^{-1}(b)})) \\
&= F^{-1}(h_A, h_B) \\
&= h
\end{aligned}
$$

よって、 $F^{-1} \circ F = \text{id}$ が成り立つ。

## 関手 $G: \text{Sets}/1 \to \text{Sets}$ の場合

関手 $G: \text{Sets}/1 \to \text{Sets}$ を以下のように定義する。

対象への作用:

$$
G(f: X \to 1) = X
$$

射への作用:

$$
G(h: (X \to 1) \to (Y \to 1)) = X \to Y
$$

この場合、 $G$ は同型である。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)