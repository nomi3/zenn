---
title: "圏論 原著第2版の練習問題を解いてみる(1章-12)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-12

## $i$ の定義

$i: G \to U(C(G))$ は、 $G$ の頂点 $v$ に対して、 $i(v) = v$ とし、 $G$ のエッジ $e$ に対して、 $i(e) = e$ と対応づける。

## $\=h$ の構築

グラフ準同型写像 $h: G \to U(D)$ が与えられたとき、 $C(G)$ 上の関手 $\=h: C(G) \to D$ を以下のように構築する。

$C(G)$ の対象 $v$ に対して、 $\=h(v) = h(v)$ とする。

$G$ のエッジ $e$ に対応する $C(G)$ の射 $e$ に対して、 $\=h(e) = h(e)$ とする。

$G$ のエッジ列 $e_1 \cdots e_n$ に対応する $C(G)$ の射 $e_1 \cdots e_n$ に対して、 $\=h(e_1 \cdots e_n) = h(e_1) \circ \cdots \circ h(e_n)$ とする。

$C(G)$ の恒等射 $1_v$ に対して、 $\=h(1_v) = 1_{h(v)}$ とする。

## $U(\=h) \circ i = h$ を満たすことの確認

$U(\=h) \circ i$ は、 $G$ の頂点 $v$ に対して、 $U(\=h)(i(v)) = h(v)$ と、 $G$ のエッジ $e$ に対して、 $U(\=h)(i(e)) = h(e)$ を満たす。

よって、 $U(\=h) \circ i = h$ が成り立つ。

## $\=h$ の一意性の確認

$U(g) \circ i = h$ を満たす 関手 $g: C(G) \to D$ が存在すると仮定する。

仮定より、

$C(G)$ の対象 $v$ に対して、 $g(v) = h(v)$ となる。

$G$ のエッジ $e$ に対応する $C(G)$ の射 $e$ に対して、 $g(e) = h(e)$ となる。

$G$ のエッジ列 $e_1 \cdots e_n$ に対応する $C(G)$ の射 $e_1 \cdots e_n$ に対して、 $g(e_1 \cdots e_n) = g(e_1) \circ \cdots \circ g(e_n) = h(e_1) \circ \cdots \circ h(e_n)$ となる。

$C(G)$ の恒等射 $1_v$ に対して、 $g(1_v) = 1_{g(v)} = 1_{h(v)}$ となる。

以上より、 $g$ は $\=h$ と一致する。

よって、 $\=h$ は一意に定まる。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
