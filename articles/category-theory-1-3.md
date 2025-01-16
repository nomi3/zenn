---
title: "圏論 原著第2版の練習問題を解いてみる(1章-3)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-3(a)

以下の内容で $\text{Sets}$ において同型は全単射に一致することを示す。

## 1. 同型ならば全単射である

$\text{Sets}$ において、 $f: A \to B$ が同型射であるとする。

### 1.1. 全射であること

任意の $b \in B$ に対して、 $f(f^{-1}(b)) = b$ となる $f^{-1}(b) \in A$ が存在するため、 $f$ は全射である。

### 1.2. 単射であること

$f(a_1) = f(a_2)$ のとき、 $f^{-1}(f(a_1)) = f^{-1}(f(a_2))$ となる。

また $f^{-1}(f(a_1)) = a_1$ と $f^{-1}(f(a_2)) = a_2$ より、 $a_1 = a_2$ となるため、 $f$ は単射である。

1.1. と 1.2. より、 $f$ は全単射である。

## 2. 全単射ならば同型である

$f: A \to B$ が全単射であるとする。

全単射の性質から、任意の $b \in B$ に対して、唯一の $a \in A$ が存在して $f(a) = b$ を満たす。

この性質を用いて $g: B \to A$ を $g(b) = a \iff f(a) = b$ と定義する。

### 2.1. $g \circ f = \text{id}_A$

$g(f(a)) = a$ となるため、 $g \circ f = \text{id}_A$ が成り立つ。

### 2.2. $f \circ g = \text{id}_B$

$f(g(b)) = b$ となるため、 $f \circ g = \text{id}_B$ が成り立つ。

2.1. と 2.2. より、 $g \circ f = \text{id}_A$ と $f \circ g = \text{id}_B$ が成り立つため、 $g$ は $f$ の逆射である。よって $f$ は同型射である。

## 3. 結論

1. と 2. より、 $\text{Sets}$ において、 同型射は全単射に一致する。

# 1章-3(b)

以下の内容で $\text{Monoids}$ において同型は全単射な準同型写像に一致することを示す。

## 1. 同型ならば全単射な準同型写像である

$\text{Monoids}$ において、 $f: M \to N$ が同型射であるとする。

$f$ は集合間の写像であり、全単射であることは3(a)で示した。

## 2. 全単射な準同型写像ならば同型である

$f: M \to N$ が全単射な準同型写像であるとする。

3(a) と同様に、 $g: N \to M$ を $g(n) = m \iff f(m) = n$ と定義する。

また、 $M$ の単位元を $e_M$ 、$N$ の単位元を $e_N$ とする。

### 2.1. $g \circ f = \text{id}_M$

$g(f(m)) = m$ となるため、 $g \circ f = \text{id}_M$ が成り立つ。

### 2.2. $f \circ g = \text{id}_N$

$f(g(n)) = n$ となるため、 $f \circ g = \text{id}_N$ が成り立つ。

### 2.3. $g$ は準同型写像である

任意の $n_1, n_2 \in N$ に対して、 $n_1 = f(m_1) ,  n_2 = f(m_2)$ とすると、

$g(n_1 \cdot_N n_2) = g(f(m_1) \cdot_N f(m_2)) = g(f(m_1 \cdot_M m_2)) = m_1 \cdot_M m_2 = g(n_1) \cdot_M g(n_2)$

となる。

また、$g(e_N) = g(f(e_M)) = e_M$ であるため、 $g$ は準同型写像である。

2.1. と 2.2. と 2.3. より、 $g$ は $f$ の逆射である。よって $f$ は同型射である。

## 3. 結論

1. と 2. より、 $\text{Monoids}$ において、 同型射は全単射な準同型写像に一致する。

# 1章-3(c)

以下の内容で $\text{Posets}$ において全単射な準同型写像が同型射ではない例を示す。

## Poset の定義

Poset $P$ と $Q$ を以下のように定義する。

$$
\begin{aligned}
P &= \{a, b, c\}, a \leq b, a \leq c \\
Q &= \{x, y, z\}, x \leq y, x \leq z, y \leq z
\end{aligned}
$$

## 写像 $f: P \to Q$ の定義

写像 $f: P \to Q$ を以下のように定義する。

$$
\begin{aligned}
f(a) &= x \\
f(b) &= y \\
f(c) &= z
\end{aligned}
$$

## 写像 $f$ の全単射性

$f$ は $P$ の各要素を $Q$ の各要素に一意に対応付けているため、全単射である。

## 写像 $f$ の準同型性

$a \leq b$ のとき、 $f(a) = x \leq y = f(b)$ となる。

また、 $a \leq c$ のとき、 $f(a) = x \leq z = f(c)$ となる。

よって、 $f$ は準同型写像である。

## 逆写像 $g: Q \to P$ の定義

逆写像 $g: Q \to P$ を以下のように定義する。

$$
\begin{aligned}
g(x) &= a \\
g(y) &= b \\
g(z) &= c
\end{aligned}
$$

## 写像 $g$ の準同型性が破綻することの確認

$y \leq z$ のとき、 $g(y) = b \not\leq c = g(z)$ となる。

よって、 $g$ は準同型写像ではない。

## 結論

$f$ は $\text{Posets}$ において全単射な準同型写像であるが、 $g$ は$\text{Posets}$ において準同型写像ではないため、 $f$ は$\text{Posets}$ において同型射ではない。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
