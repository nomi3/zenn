---
title: "AWS CodeBuildで DockerHubへログインできない"
emoji: "🐳" # https://emojipedia.org/
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["AWS", "Docker", "CodeBuild"]
published: true
---

CodeBuild で DockerHub へログインするときに、以下のようなエラーに出くわしました。

```
Error response from daemon: Get "https://registry-1.docker.io/v2/": unauthorized: incorrect username or password
```

## 原因

DockerID は小文字と数字のみで構成されている必要があるのですが、大文字を含んだ ID を入力していたためエラーになっていました。

参考: [Docker Hub のユーザー名について](https://docs.docker.com/docker-id/#register-for-a-docker-id)

つまり、本来は `dockerid` という ID であるべきところを `DockerID` と入力していたのが原因でした。

## ハマったポイント

このエラーに出くわしたとき、ID とパスワードが本当に合っているのか確認するために、[Docker Hub のログインページ](https://hub.docker.com/login)からログインを試みました。
この際、ID を`DockerID`のように大文字を含んだものを入力しても、エラーにはならず、ログインできてしまいました。
そのため、なかなか原因に気づくことができませんでした。

## まとめ

だいぶしょうもないミスでしたが、同じようにハマった方がいたら参考になれば幸いです。
