---
title: "AWS CDKでCodePipelineとそのSlack通知を作成する"
emoji: "🚀"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: [AWS, CDK, CodePipeline, Slack, Chatbot]
published: true
---

AWS CDK(Typescript)で CodePipeline とその Slack 通知連携を作成する方法と、その際に遭遇したエラーをまとめます。

## バージョン

aws-cdk: 2.69.0

## コード

[API Reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_codestarnotifications-readme.html)のサンプルを参考に、以下のようにコードを書きます。

```typescript:lib/pipeline-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as notifications from "aws-cdk-lib/aws-codestarnotifications";
import * as chatbot from "aws-cdk-lib/aws-chatbot";

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new codepipeline.Pipeline(this, "MyPipeline");
    const slack = new chatbot.SlackChannelConfiguration(this, "MySlack", {
      slackChannelConfigurationName: "my-slack-configration",
      slackWorkspaceId: "XXXXXXXX",
      slackChannelId: "XXXXXXXXX",
    });
    new notifications.NotificationRule(
      this,
      "MyRule",
      {
        source: pipeline,
        events: [
          "codepipeline-pipeline-pipeline-execution-failed",
          "codepipeline-pipeline-pipeline-execution-canceled",
          "codepipeline-pipeline-pipeline-execution-started",
          "codepipeline-pipeline-pipeline-execution-succeeded",
          "codepipeline-pipeline-stage-execution-started",
          "codepipeline-pipeline-stage-execution-succeeded",
          "codepipeline-pipeline-stage-execution-failed",
          "codepipeline-pipeline-stage-execution-canceled",
        ],
        targets: [slack],
      }
    );
  }
}
```

`slackWorkspaceId`と`slackChannelId`は、ブラウザ版 Slack の URL から取得できます。
ブラウザ版 Slack で連携したいチャンネルを開き、以下を確認します。

```
https://app.slack.com/client/<slackWorkspaceId>/<slackChannelId>
```

`slackChannelId`はアプリ版 Slack でも確認できます。
連携したいチャンネルでチャンネルの URL をコピーし、以下を確認します。

```
https://<workspaceName>.slack.com/archives/<slackChannelId>
```

`slackWorkspaceId`は後述する方法でも確認できます。

## エラーその 1

`cdk deploy`を実行すると、以下のエラーが発生しました。

```
Invalid request provided: AWS Chatbot can't create the configuration because Slack workspace <slackWorkspaceId> is not authorized with AWS account <AWS ACCOUNT>. See  https://docs.aws.amazon.com/chatbot/latest/adminguide/slack-setup.html#slack-client-setup
```

[案内されたリンク](https://docs.aws.amazon.com/chatbot/latest/adminguide/slack-setup.html#slack-client-setup)によると、Slack と AWS の連携はあらかじめマネジメントコンソールから設定する必要があるようでした。
設定すると、マネジメントコンソール画面でも`slackWorkspaceId`が確認できます。
![](https://storage.googleapis.com/zenn-user-upload/2712a701b1e0-20230506.png)

## エラーその 2

あらためて`cdk deploy`を実行すると、以下のエラーが発生しました。

```
Invalid request provided: AWS::CodeStarNotifications::NotificationRule
```

これについては[同じような事象](https://stackoverflow.com/questions/71028437/cdk-unable-to-add-codestarnotification-to-codepipeline)に遭遇した方がいらっしゃいました。

特に何も変更はせず、`cdk deploy`を再実行したところ、今度は成功しました。

## まとめ

以上、AWS CDK(Typescript)で CodePipeline とその Slack 通知連携を作成する方法と、その際に遭遇したエラーをまとめました。
