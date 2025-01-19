---
title: "圏論 原著第2版の練習問題を解いてみる(1章-11)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-11(b)

自由モノイドの普遍写像性を仮定すると、$\text{Sets}$ の任意の射 $f: A \to B$ に対して、以下のような可換図式を満たす射 $M(f): M(A) \to M(B)$ が唯一存在する。

$$
\begin{CD}
A @>f>> B \\
@Vi_AVV @VVi_BV \\
|M(A)| @>|M(f)|>> |M(B)|
\end{CD}
$$

## Mが関手であることの確認

### 恒等射について

$M(1_A) = 1_{M(A)}$ であることを示す。

$M(1_A)$ は 普遍写像性から、以下のような可換図式を満たす射 $M(1_A): M(A) \to M(A)$ である。

$$
\begin{CD}
A @>1_A>> A \\
@Vi_AVV @VVi_AV \\
|M(A)| @>|M(1_A)|>> |M(A)|
\end{CD}
$$

また、 $1_{M(A)}$ は $M(A)$ の恒等射として存在する。

普遍写像性から、 $M(A) \to M(A)$ の射は唯一存在するので、 $M(1_A) = 1_{M(A)}$ である。

### 合成について

$f: A \to B, g: B \to C$ に対して、 $M(g \circ f) = M(g) \circ M(f)$ であることを示す。

$M(g \circ f)$ は 普遍写像性から、以下のような可換図式を満たす射 $M(g \circ f): M(A) \to M(C)$ である。

$$
\begin{CD}
A @>g \circ f>> C \\
@Vi_AVV @VVi_CV \\
|M(A)| @>|M(g \circ f)|>> |M(C)|
\end{CD}
$$

また、 $M(g) \circ M(f)$ は 普遍写像性から、以下のような可換図式を満たす射 $M(g) \circ M(f): M(A) \to M(C)$ である。

$$
\begin{CD}
A @>f>> B @>g>> C \\
@Vi_AVV @VVi_BV @VVi_CV \\
|M(A)| @>|M(f)|>> |M(B)| @>|M(g)|>> |M(C)|
\end{CD}
$$

普遍写像性から、 $M(A) \to M(C)$ の射は唯一存在するので、 $M(g \circ f) = M(g) \circ M(f)$ である。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)