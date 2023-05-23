---
title: "Laravelで中間テーブルの値をEnumでcastする"
emoji: "✨"
type: "tech"
topics: ["Laravel", "Model", "Enum", "Pivot"]
published: true
---

Laravel で 中間テーブルの値を Enum で cast する方法です。

## バージョン

Laravel: 10.3.2
php: 8.2.4

## 構成

usersテーブルとchatsテーブルを多対多で紐付けるchat_userテーブルがあるとします。
chat_userテーブルには、user_idとchat_idの他に、roleというカラムがあり、それをEnumで扱いたいとします。

## Enum の準備

Enum を作成します。

```php:app/Enums/Role.php
<?php
namespace App\Enums;

enum Role: int {
    case ADMIN = 1;
    case MEMBER = 2;
}
```

## 中間テーブルのモデル

中間テーブルのモデルを定義します。

```php:app/Models/ChatUser.php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\Pivot; // classはPivotを継承します。
use App\Enums\Role;

class ChatUser extends Pivot
{
    protected $table = 'chat_user';

    protected $primaryKey = 'id';

    protected $casts = [
        'role' => Role::class, // castsにEnumのクラスを指定します。
    ];
    // ...
}
```

## 親テーブルのモデル
親テーブルのモデルを定義します。

```php:app/Models/User.php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $primaryKey = 'id';

    public function chats()
    {
        return $this->belongsToMany(Chat::class, 'chat_user', 'user_id', 'chat_id')
            ->using(ChatUser::class); // usingメソッドを使って、中間テーブルのモデルを指定します。
            ->withPivot('role'); // withPivotメソッドで、使用する中間テーブルのカラムを指定します。
    }
    // ...
}
```

## 結果
これで、中間テーブルの値をEnumのcaseで扱うことができます。

例えば、以下のような感じです。
```php
$user->chats->first()->pivot->role; // Role::ADMIN
```

## まとめ

中間テーブルの値をEnumでcastする方法でした。
