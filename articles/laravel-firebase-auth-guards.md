---
title: "Laravel で クロージャリクエストガードを使ってFirebase認証をする"
emoji: "🔥" # https://emojipedia.org/
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["Laravel", "Firebase"]
published: true
---

Laravel のクロージャリクエストガードを使って、Firebase 認証を実装してみました。
参考: [Laravel 10.x - Closure Request Guards](https://laravel.com/docs/10.x/authentication#closure-request-guards)

## バージョン

Laravel: 10.3.2
php: 8.2.4

## インストール

必要なパッケージをインストールします。

```bash
composer require kreait/firebase-php
composer require kreait/laravel-firebase
```

## カスタム認証ドライバの定義

`app/Providers/AuthServiceProvider.php` にカスタム認証ドライバを定義します。

```php
<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Kreait\Firebase\Contract\Auth as FirebaseAuth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::viaRequest('firebase', function (Request $request) {
            $idTokenString = $request->header('Authorization');
            $idTokenString = str_replace('Bearer ', '', $idTokenString);
            $firebaseAuth = app(FirebaseAuth::class);
            try {
                $verifiedIdToken = $firebaseAuth->verifyIdToken($idTokenString);
            } catch (\Exception $e) {
                return null;
            }

            $firebaseId = $verifiedIdToken->claims()->get('sub');
            $user = User::where('firebase_id', $firebaseId)->first();

            return $user;
        });
    }
}

```

## 設定ファイルで指定

`config/auth.php` にカスタム認証ドライバを定義します。

```php
'guards' => [
    'api' => [
        'driver' => 'firebase',
    ],
],
```

## ルートの定義

ルートの割り当て時に middleware に`auth:api`を指定します。

```php
Route::middleware('auth:api')->group(function () {
    // ...
}
```

以上で、Firebase 認証が実装できました。

## まとめ

過不足あるかもしれませんが、参考になれば幸いです。
