---
title: "圏論 原著第2版の練習問題を解いてみる(2章-10)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 2章-10

## 離散半順序集合は射影的である
離散半順序集合を $D$ とする。

エピ射 $e: E \to B$ と $f: D \to B$ が与えられたとする。

半順序集合間の単調写像がエピ射であれば全射であるので、
各 $d \in D$ に対して、$g(d) \in E$ を選び、$e(g(d)) = f(d)$ となるようにすることができる。

$D$ は離散半順序集合であるので、$d_1 \leq d_2 \implies d_1 = d_2$ が成り立つ。
よって、$g(d_1) = g(d_2)$ となり $g(d_1) \leq g(d_2)$ が成り立つ。

よって、$g$ は単調写像である。

以上より、$e \circ g = f$ となるような $g: D \to E$ が存在するので、離散半順序集合は射影的である。

## 射影的ではない離散半順序集合の例
$D$ を離散半順序集合 $\{0, 1\}$ とする。
$C$ を $D$ に $0 \leq 1$ を追加した半順序集合とする。

$B = C$ とし、$e: E \to B$ を $e(0) = 0, e(1) = 1$、$f: C \to B$ を $f(0) = 0, f(1) = 1$ とする。

$e$ は全射(エピ射)かつ、単調写像である。
$f$ は単調写像である。

$C$ が射影的であるとすれば、$e \circ g = f$ となるような $g: C \to E$ が存在する。

$g$ は単調写像でなければならないので、$g(0) \leq g(1)$ となる必要があるが、それは $g(0) = g(1)$ となることを意味する。

$g(0) = g(1)$ とすると、$e(g(0)) = e(g(1)) = f(0) = f(1)$ が成り立つ必要があるが、 $f(0) = 0, f(1) = 1$ なので矛盾する。

よって、$C$ は射影的ではない。

## 射影的な半順序集合は離散である
$P$ を離散的でない半順序集合とし、 $\exists x, y \in P x \leq y$ が成り立つとする。

$E$ を $P$ を台集合とする離散半順序集合とする。

$B = P$ とし、$e: E \to B$ と $f: P \to B$ を 恒等写像とすると、$e, f$ は単調写像である。

$P$ が射影的であるとすれば、$e \circ g = f$ となるような $g: P \to E$ が存在する。

$x \leq_P y \implies g(x) \leq_E g(y)$ である必要であるが、 $g(x) \leq_E g(y) \implies g(x) = g(y)$ である必要がある。

これは $x \neq y$ と $f$ が恒等写像であることに矛盾する。

よって、$P$ は射影的ではない。

離散的でない半順序集合は射影的ではないため、射影的な半順序集合は離散的である。

## $\mathbf{Set} \cong \operatorname{Proj}(\mathbf{Pos})$

前述で、射影的な半順序集合は離散的であることを示した。そのため $\operatorname{Proj}(\mathbf{Pos})$ の対象は離散的半順序集合に限られる。

この時、対象間の関数は全て単調写像である。

ここで2つの関手を考える。

$$
\begin{aligned}
F : \mathbf{Set} &\;\longrightarrow\; \operatorname{Proj}(\mathbf{Pos})\\
F(X) &= X_{\text{disc}}\\
F(f) &= f
\end{aligned}
\qquad
\begin{aligned}
G : \operatorname{Proj}(\mathbf{Pos}) &\;\longrightarrow\; \mathbf{Set}\\
G(P) &= |P|\\
G(g) &= g
\end{aligned}
$$

この2つの関手は互いに逆であることを確かめる。

対象について

$$
G(F(X)) = |X_{\text{disc}}| = X \\
F(G(P)) = |P|_{\text{disc}} = P
$$

射については、写像をそのまま送るだけなので

$$
G \circ F = \operatorname{id}_{\mathbf{Set}} \\
F \circ G = \operatorname{id}_{\operatorname{Proj}(\mathbf{Pos})}
$$

よって、$F, G$ は互いに逆であるため、$\mathbf{Set} \cong \operatorname{Proj}(\mathbf{Pos})$ が成り立つ。



# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
