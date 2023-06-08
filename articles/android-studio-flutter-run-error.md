---
title: "Android StudioでFlutterアプリを実行するとTarget file \"\" not found.というエラーが出る"
emoji: "🔨" # https://emojipedia.org/
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["Flutter", "AndroidStudio"]
published: true
---

Android Studio で 以下のようなConfigurationsでFlutter アプリを実行すると、エラーが出て実行できないことがありました。

![](https://storage.googleapis.com/zenn-user-upload/5e94f8ae1a55-20230608.png)


```
Target file \"\" not found.
```


## バージョン
Android Studio: Arctic Fox | 2020.3.1
Flutter: 3.7.12
Dart: 2.19.6

## 原因

Aditional run argsに余計な空白が入っていたことが原因でした。

```diff bash
- --release  --dart-define=FLAVOR=myflavor
+ --release --dart-define=FLAVOR=myflavor
```


## まとめ

ちょっとした原因でしたが、エラーから原因を特定するのが難しかったので、同じようなエラーに出くわしたときの助けになればと思います。
