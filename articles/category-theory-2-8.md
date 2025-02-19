---
title: "圏論 原著第2版の練習問題を解いてみる(2章-8)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 2章-8

集合の圏 $\text{Sets}$ において、対象$P$が射影的であるとは、任意の全射 $e: E \to X$ と射 $f: P \to X$ に対して、 $e \circ \bar{f} = f$ となる射 $\bar{f}: P \to E$ が存在することである。

任意の全射 $e: E \to X$ と写像 $f: P \to X$ を考える。任意の $p \in P$ に対して、$f(p) \in X$ となる。$e$ が全射であるから、各 $f(p)$ に対してその前像

$$
e^{-1}(f(p)) = \{ y \in E \mid e(y) = f(p) \}
$$

は空でない。

選択公理により、各 $p \in P$ から $e^{-1}(f(p))$ の元をひとつ選ぶ選択関数 $\bar{f}: P \to E$ を定めることができる。

すなわち、任意の $p \in P$ について、$\bar{f}(p) \in e^{-1}(f(p))$ として、$\bar{f}: P \to E$ を定める。

このとき、任意の $p \in P$ に対して、

$$
e(\bar{f}(p)) = f(p)
$$

となるので、

$$
e \circ \bar{f} = f
$$

である。

以上より、任意の全射 $e: E \to X$ と写像 $f: P \to X$ に対して、$\bar{f}: P \to E$ が存在するので、$P$ は射影的であることが示される。

また、$P$ は任意の集合であったため、すべての集合は射影的であることが示される。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
