---
title: "LaravelでFirebase Cloud MessagingのHTTP v1 APIを使ってプッシュ通知を送信する"
emoji: "✨"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["Laravel", "Firebase", "FCM", "PushNotification"]
published: true
---

[Firebase Admin SDK for PHP](https://firebase-php.readthedocs.io/en/stable/) を使って、LaravelでFirebase Cloud MessagingのHTTP v1 APIを使ってプッシュ通知を送信する方法です。

※クライアント側の実装は省略しています。

## バージョン

Laravel: 10.3.2
php: 8.2.4
kreait/firebase-php: 7.1.0

## インストール

必要なパッケージをインストールします。

```bash
composer require kreait/firebase-php
```

## firebaseのjsonファイルの配置

以下のURLの手順に従って、firebaseのjsonファイルを取得します。
https://firebase.google.com/docs/admin/setup?hl=ja#add_firebase_to_your_app

jsonファイルの中身は以下のようになっています。

```json
{
  "type": "xxxxx",
  "project_id": "xxxxx",
  "private_key_id": "xxxxx",
  "private_key": "xxxxx",
  "client_email": "xxxxx",
  "client_id": "xxxxx",
  "auth_uri": "xxxxx",
  "token_uri": "xxxxx",
  "auth_provider_x509_cert_url": "xxxxx",
  "client_x509_cert_url": "xxxxx"
}

```

取得したjsonファイルを、Laravelのプロジェクトのルートディレクトリに配置します。
今回は、`firebase.json` という名前で配置したとします。

## プッシュ通知を送信するコマンドを作成

今回は通知のサンプルとして`app/Console/Commands/SendPushCommand.php` にサンプルコマンドを定義します。

```bash
php artisan make:command SendPushCommand
```

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class SendNotificationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send_notification {registration_token}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send sample notification';

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        $registrationToken = $this->argument('registration_token');
        $factory = (new Factory)->withServiceAccount('firebase.json');
        $messaging = $factory->createMessaging();

        $notification = Notification::fromArray([
            'title' => 'Hello World Title!',
            'body' => 'Hello World Body!',
        ]);

        $message = CloudMessage::withTarget('token', $registrationToken)
            ->withNotification($notification);

        $messaging->send($message);
    }
}
```

## 実行

以下のコマンドを実行します。
引数には、firebaseの登録トークンを指定します。

```bash
php artisan send_notification xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 参考
https://firebase-php.readthedocs.io/en/latest/cloud-messaging.html
https://firebase.google.com/docs/cloud-messaging/migrate-v1?hl=ja