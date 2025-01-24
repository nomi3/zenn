---
title: "圏論 原著第2版の練習問題を解いてみる(1章-6)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-6

余スライス圏 $C/\text{C}$ が $(\text{C}^\text{op}/C)^\text{op}$ で表せることを示す。

## 余スライス圏 $C/\text{C}$ の定義

余スライス圏 $C/\text{C}$ の対象は、圏 $\text{C}$ においてドメインが固定された射 $f: C \to X$ である。

射は $f: C \to X$ と $g: C \to Y$ に対して、 $h \circ f = g$ を満たす $h: X \to Y$ である。

## 圏 $(\text{C}^\text{op}/C)^\text{op}$ の定義

まず、圏 $\text{C}^\text{op}/C$ を考える。

この圏の対象は、圏 $\text{C}^\text{op}$ においてコドメインが固定された射 $f^\text{op}: X \to C$ である。

射は $f^\text{op}: X \to C$ と $g^\text{op}: Y \to C$ に対して、 $f^\text{op} \circ h^\text{op} = g^\text{op}$ を満たす $h^\text{op}: Y \to X$ である。

## 圏 $(\text{C}^\text{op}/C)^\text{op}$ の対象と射

圏 $(\text{C}^\text{op}/C)^\text{op}$ の対象は、圏 $\text{C}^\text{op}$ においてコドメインが固定された射 $f^\text{op}: X \to C$ であるが、余スライス圏 $C/\text{C}$ の対象の、圏 $\text{C}$ においてドメインが固定された射 $f: C \to X$ と対応する。

圏 $(\text{C}^\text{op}/C)^\text{op}$ の射は $f^\text{op}: X \to C$ と $g^\text{op}: Y \to C$ に対して、 $f^\text{op} \circ h^\text{op} = g^\text{op}$ を満たす $h^\text{op}: Y \to X$ を逆にした $h: X \to Y$ である。これは余スライス圏 $C/\text{C}$ の射と対応する。


# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)