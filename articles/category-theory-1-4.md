---
title: "圏論 原著第2版の練習問題を解いてみる(1章-4)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-4

## 前順序であることの証明

位相空間 $X$ において、 以下のように定義される特殊化が前順序であることを示す。

$$
x \leq y \iff x \in U \implies y \in U \ \text{for every open set } U.
$$

が成り立つことを示す。

### 1. 反射律の証明

任意の点 $x \in X$ に対して、全ての開集合 $x \in U$ について $x \in U \implies x \in U$ は明らかに成り立つ。

よって、 $x \leq x$ が成り立つ。

### 2. 推移律の証明

$x \leq y$ かつ $y \leq z$ を仮定する。

$x \leq y$ は $x \in U \implies y \in U$ であり、 $y \leq z$ は $y \in U \implies z \in U$ である。

よって、 $x \in U \implies z \in U$ が成り立つ。

よって、 $x \leq z$ が成り立つ。

## 位相空間 $X$ が $T_0$ の場合、半順序であることの証明

半順序であるためには、前順序に加えて反対称律

$x \leq y$ かつ $y \leq x$ ならば $x = y$

が成り立つことを示す必要がある。

$X$ が $T_0$ の場合、 $x \neq y$ ならば

$x \in U$ かつ $y \notin U$ または $y \in U$ かつ $x \notin U$ となる開集合 $U$ が存在する。

$x \leq y$ かつ $y \leq x$ ならば、どの開集合 $U$ に対しても、 $x \in U \iff y \in U$ が成り立つため、 $x \neq y$ と仮定すると矛盾が生じる。

よって $x = y$ が成り立つ。

## 位相空間 $X$ が $T_1$ の場合、この順序が自明であることの証明

順序が自明であることを示すためには、 $x \leq y$ が成り立つのが $x = y$ の場合に限ることを示す必要がある。

$X$ が $T_1$ の場合、 $x \neq y$ ならば

$x \in U$ かつ $y \notin U$ を満たす開集合 $U$ と $y \in V$ かつ $x \notin V$ を満たす開集合 $V$ が存在する。

$x \leq y$ は $x \in U \implies y \in U$ が成り立つ必要があるが、 $x \neq y$ の場合、 $x \in U$ かつ $y \notin U$ となる開集合 $U$ が存在するため、条件を満たさない。

よって $x \leq y$ が成り立つのは $x = y$ の場合に限る。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)
