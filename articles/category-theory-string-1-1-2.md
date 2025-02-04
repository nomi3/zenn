---
title: "ストリング図で学ぶ圏論の基礎の演習問題を解いてみる(1.1.2)"
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

## $(1) \implies (2), (1) \implies (3)$ について

$h = 1_a$ ならば、恒等射の性質より $f \circ h = f$ と $h \circ g = g$ が成り立つ。

## $(2) \implies (1)$ について

$f \circ h = f$ より $f = 1_a$ とすると、

$$
1_a \circ h = 1_a
$$

となるが、 $1_a$ は恒等射であるため $h = 1_a$ が成り立つ。

## $(3) \implies (1)$ について

$h \circ g = g$ より $g = 1_a$ とすると、

$$
h \circ 1_a = 1_a
$$

となるが、 $1_a$ は恒等射であるため $h = 1_a$ が成り立つ。

## 結論

以上より、(1), (2), (3) はすべて同値である。

# 参考文献
[ストリング図で学ぶ圏論の基礎](https://amzn.to/3PQD19V)
