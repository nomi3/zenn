---
title: "ストリング図で学ぶ圏論の基礎の演習問題を解いてみる(1.1.3)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[ストリング図で学ぶ圏論の基礎](https://amzn.to/3PQD19V)の演習問題を解いてみます。

:::message
公式の解答は[こちら](https://www.morikita.co.jp/books/mid/006371)でダウンロード可能です！
学習中の身のため、以下の私の解答は必ずしも正しいとは限りません…！
:::

## $(1) \implies (2)$ について

$F_x: C(x, a) \owns g \longmapsto fg \in C(x, b)$ とする。

$f$ は同型なので、 $f$ の逆射 $f^{-1}$ が存在する。

$\tilde{F}_x: C(x, b) \owns h \longmapsto f^{-1}h \in C(x, a)$ とする。

$$
\begin{aligned}
\tilde{F}_x \circ F_x(g) &= \tilde{F}_x(F_x(g)) \\
&= \tilde{F}_x(fg) \\
&= f^{-1}fg \\
&= g
\end{aligned}
$$

が成り立つ。同様に

$$
\begin{aligned}
F_x \circ \tilde{F}_x(h) &= F_x(\tilde{F}_x(h)) \\
&= F_x(f^{-1}h) \\
&= f(f^{-1}h) \\
&= h
\end{aligned}
$$

が成り立つ。よって、 $F_x$ と $\tilde{F}_x$ は互いに逆射である。
よって、 $F_x$ は可逆である。

## $(2) \implies (1)$ について

$F_x: C(x, a) \owns g \longmapsto fg \in C(x, b)$ とすると、仮定より $F_x$ は可逆である。

$F_x$ の逆射を $F_x^{-1}$ とする。

$f$ が同型射であることを示すために、 $f$ の逆射 $f^{-1}$ が存在することを示す。

$g = F_b^{-1}(1_b) \in C(b, a)$ とすると、

$$
\begin{aligned}
fg &= F_b(F_b^{-1}(1_b)) \\
&= 1_b
\end{aligned}
$$

が成り立つ。また、 $gf \in C(a, a)$ となるので、 $F_a: C(a, a) \owns gf \longmapsto fgf \in C(a, b)$ を考えることができる。

$$
\begin{aligned}
F_a(gf) &= fgf \\
&= (fg)f \\
&= 1_b f \\
&= f
&= F_a(1_a)
\end{aligned}
$$

が成り立つ。よって、 $gf = 1_a$ が成り立つ。

以上より、 $f$ は同型である。

## $(1) \implies (3)$ について

$G_x: C(b, x) \owns h \longmapsto hf \in C(a, x)$ とする。

$f$ は同型なので、 $f$ の逆射 $f^{-1}$ が存在する。

$\tilde{G}_x: C(a, x) \owns g \longmapsto gf^{-1} \in C(b, x)$ とする。

$$
\begin{aligned}
\tilde{G}_x \circ G_x(h) &= \tilde{G}_x(G_x(h)) \\
&= \tilde{G}_x(hf) \\
&= hff^{-1} \\
&= h
\end{aligned}
$$

が成り立つ。よって、 $G_x$ と $\tilde{G}_x$ は互いに逆射である。
よって、 $G_x$ は可逆である。

## $(3) \implies (1)$ について

$G_x: C(b, x) \owns h \longmapsto hf \in C(a, x)$ とすると、仮定より $G_x$ は可逆である。

$G_x$ の逆射を $G_x^{-1}$ とする。

$f$ が同型射であることを示すために、 $f$ の逆射 $f^{-1}$ が存在することを示す。

$h = G_a^{-1}(1_a) \in C(b, a)$ とすると、

$$
\begin{aligned}
hf &= G_a(h) \\
&= G_a(G_a^{-1}(1_a)) \\
&= 1_a
\end{aligned}
$$

が成り立つ。また、 $fh \in C(b, b)$ となるので、 $G_b: C(b, b) \owns fh \longmapsto fhf \in C(a, b)$ を考えることができる。

$$
\begin{aligned}
G_b(fh) &= fhf \\
&= f(hf) \\
&= f 1_a \\
&= f
&= G_b(1_b)
\end{aligned}
$$

が成り立つ。よって、 $fh = 1_b$ が成り立つ。

以上より、 $f$ は同型である。

## 結論

以上より、(1), (2), (3) はすべて同値である。

# 参考文献
[ストリング図で学ぶ圏論の基礎](https://amzn.to/3PQD19V)
