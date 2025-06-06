---
title: "圏論 原著第2版の練習問題を解いてみる(2章-9)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 2章-9

## 全射 $\implies$ エピ射

$f: P \to Q$ を全射とする。

任意の $q \in Q$ に対して、 $f(p) = q$ となる $p \in P$ が存在する。

ここで $g \circ f = h \circ f$ とする。

任意の $p \in P$ に対して、

$$
g(f(p)) = h(f(p))
$$

となるが、$f(p) = q$ であるから、

$$
g(q) = h(q)
$$

となる。

よって、任意の $q \in Q$ に対して、$g(q) = h(q)$ となるので、$g = h$ である。

よって、$f$ はエピ射である。

## エピ射 $\implies$ 全射

$f: P \to Q$ をエピ射だが、全射でないとする。

すると $q_0 \notin Im(f)$ となる $q_0 \in Q$ が存在する。

ここで、$q_0$ の複製 $q_1$ を追加して得られる台集合 $R:= (Q \cup \{ q_1 \})$ を考える。

$R$ 上の順序関係は $q_1$ は $q_0$ と同様の順序関係を持ち、 $q_0 \leq q_1$ とする。その他の元については $Q$ 上の順序関係と同じとする。

2つの単調写像 $g, h: Q \to R$ を

$$
\begin{align*}
g(q) &= \begin{cases}
q & \text{if } q \neq q_0 \\
q_1 & \text{if } q = q_0
\end{cases} \\
h(q) &= q
\end{align*}
$$

と定める。

このとき、$g \neq h$ であるが、$g \circ f = h \circ f$ となる。

これは $f$ がエピ射であることに矛盾する。

よって、$f$ は全射である。

以上より、半順序集合間の写像 $f: P \to Q$ がエピ射であることと、$f$ が全射であることは同値であることが示された。

## 一点半順序集合が射影的であること

一点半順序集合 $1 = \{ * \}$ と任意のエピ射 $e: E \to B$ と射 $f: 1 \to B$ を考える。

一点半順序集合が射影的であるとは、 $e \circ \bar{f} = f$ となる射 $\bar{f}: 1 \to E$ が存在することである。

ここで、$f(*) = b$ とする。

任意の $b \in B$ に対して、$e(p) = b$ となる $p \in E$ が存在するので、$\bar{f}(*) = p$を対応させることができる。

よって、一点半順序集合は射影的である。



# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
