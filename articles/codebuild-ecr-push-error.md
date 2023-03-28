---
title: "AWS CodeBuildからECRにイメージがPUSHできない"
emoji: "🐳" # https://emojipedia.org/
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["AWS", "Docker", "CodeBuild", "ECR", "CDK"]
published: true
---

CodeBuild から ECR にイメージを PUSH するときに、以下のような現象に出くわしました。

```
The push refers to repository [xxxxxxxxxxx.dkr.ecr.xxxxxxxxx.amazonaws.com/xxxxxxxxx]
xxxxxxxxx: Preparing
xxxxxxxxx: Preparing
xxxxxxxxx: Preparing
xxxxxxxxx: Preparing
xxxxxxxxx: Preparing
xxxxxxxxx: Preparing
xxxxxxxxx: Preparing
xxxxxxxxx: Preparing
xxxxxxxxx: Waiting
xxxxxxxxx: Waiting
xxxxxxxxx: Waiting
xxxxxxxxx: Retrying in 5 seconds
........

EOF
```

## 原因

CodeBuild から ECR にイメージを PUSH するときには、ECR への PUSH 権限を付与する必要があったのですが、その権限を付与していませんでした。
今回は CDK を使っていたので、以下のように権限を付与するコードを追加する必要がありました。

```typescript
const ecrRepo = ecr.Repository.fromRepositoryName(/* ECRの情報 */);

const codeBuildProject = new codebuild.Project(/* CodeBuildの情報 */);

// ↓これで権限を追加
ecrRepo.grantPullPush(codeBuildProject);
```

## まとめ

CDK は権限まわりをよしなにやってくれるところがあるので、便利ではありますが注意していく必要があるなと思いました。
