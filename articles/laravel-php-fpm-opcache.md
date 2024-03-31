---
title: "OPcacheを使ってLaravelのリクエスト処理速度を改善する"
emoji: "✨"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["laravel", "phpfpm", "opcache"]
published: true
---

Nginx + PHP-FPM + (MySQL)のDockerコンテナによるLaravel環境を作成した際に、OPCacheを導入することでリクエスト処理速度を改善できるか確認したので、OPCache導入前後の比較を記録します。

## 環境

Laravel 11.1.1
PHP 8.3.4
[こちらのリポジトリ](https://github.com/nomi3/laravel-sandbox/tree/main)をベースにDockerコンテナをローカル環境（MacBook Pro 2021 14inch）に構築して、検証しました。


OPCacheありの場合はphp.iniに以下の設定を追加

```ini
zend_extension=opcache.so

[opcache]
opcache.enable=1
opcache.enable_cli=1
```

## 検証
`/up`のパスに対して1秒間に128個のリクエストを作成・送信し、OPCache有無の影響を確認

## 結果

| 環境 | rps |
| ---- | ---- |
| OPCacheなし | 17.3 |
| OPCacheあり | 124.4 |

OPCacheを導入することでリクエスト処理速度が改善されることが確認できました。

## 参考記事
https://www.php.net/manual/ja/book.opcache.php
https://qiita.com/kouki_o9/items/2770116d2df3aedbec46
https://qiita.com/ucan-lab/items/56c9dc3cf2e6762672f4