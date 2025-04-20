---
title: "圏論 原著第2版の練習問題を解いてみる(1章-2)"
emoji: "🔄"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["圏論", "math"]
published: true
---
[圏論 原著第2版](https://amzn.to/40w88Oq)の練習問題を解いてみます。

:::message
学習中の身のため、解答は必ずしも正しいとは限りません…！
:::

# 1章-2(a)

$\text{Rel} \cong \text{Rel}^{\text{op}}$ は成り立つ。

各対象はそのままに、射 $R \subseteq X \times Y$ を $R^T \subseteq Y \times X$ に移す関手 $F$ を考えると、$F$ は可逆であるため、同型である。

# 1章-2(b)

$\text{Sets} \cong \text{Sets}^{\text{op}}$ は成り立たない。

圏同型は Hom-集合の大きさも保存する必要がある。

しかし $\mathrm{Hom}_{\text{Sets}}(1,X)$ と $\mathrm{Hom}_{\text{Sets}}(X,1)$ で大きさが一般に異なるため（前者は $|X|$、後者は常に 1）、同型関手の構成は不可能。

# 1章-2(c)

$P(X) \cong P(X)^{\text{op}}$ は成り立つ。

補集合写像 $C(A) = X \setminus A$ を $P(X) \to P(X)^{\text{op}}$ に対応させる関手と考えると、これは可逆であるため、同型である。

# 参考文献
[Category Theory (Oxford Logic Guides)](https://amzn.to/4awkkSJ)
[圏論 原著第2版](https://amzn.to/40w88Oq)