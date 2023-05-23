---
title: "Laravelでprimary keyの値をnameなどの別カラムに使う"
emoji: "✨"
type: "tech"
topics: ["Laravel", "Model"]
published: true
---

Laravel で primary key の値を name などの別カラムに使いたいときがあります。
（ないかもしれませんが、あるとします）
primary key を autoincrement にしておくと、レコードの初期作成後に自動作成されるので、save する前に primary key の値を取得することができません。
そこで、レコードを作成した後に primary key の値を取得して、name などの別カラムにセットするようにします。

## バージョン

Laravel: 10.3.2
php: 8.2.4

## 実施

[Eloquent モデルの booted メソッド](https://laravel.com/docs/10.x/eloquent#events-using-closures)を使って、レコード作成後に処理を実行するようにします。

```php:app/Models/User.php
<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $primaryKey = 'id';

    protected static function booted()
    {
        static::created(function ($user) {
            $user->name = 'user'.$user->id;
            $user->save();
        });
    }
    // ...
}
```

## まとめ

Eloquent モデルの booted メソッドを使うことで、レコード作成後に処理を実行し、primary key の値を name などの別カラムにセットすることができました。（必要としないかもですが）
insert してから「update する」という処理が増えるので、パフォーマンスに影響があるかもしれませんが、今回はその辺りは考慮していません。
