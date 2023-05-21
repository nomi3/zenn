---
title: "LaravelでリクエストパラメータをEnumでバリデーションして、Enumのcase化して扱う"
emoji: "✨"
type: "tech"
topics: ["Laravel", "Enum", "Validation"]
published: true
---

PHP8.1 で追加された Enum を Laravel で使いたかったのですが、リクエストパラメータに対して Enum を絡めていくとき

- どうやってバリデーションするか

- バリデーションを通過した後、リクエストパラメータを Enum の case に変換するにはどうすればいいか

を調べたので、そのメモです。

## バージョン

Laravel: 10.3.2
php: 8.2.4

## Enum の準備

サンプルで使う Enum を作成します。

```php:app/Enums/Status.php
<?php
namespace App\Enums;

enum ServerStatus: string {
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
```

## バリデーション

Laravel は[Enum を使用したバリデーション](https://laravel.com/docs/10.x/validation#rule-enum)をサポートしているので、これを使います。
今回は FormRequest クラスを拡張して rules メソッドにバリデーションルールを定義します。

```php:app/Http/Requests/ServerRequest.php
<?php

namespace App\Http\Requests;

use App\Enums\ServerStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ServerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'status' => [new Enum(ServerStatus::class)],
        ];
    }
}
```

## リクエストパラメータの Enum case 化

バリデーションを通過しても、リクエストパラメータは文字列のままです。
文字列から Enum の case に変換するために、[Enum::from()](https://www.php.net/manual/ja/language.enumerations.backed.php) を使います。

```php:app/Http/Controllers/ServerController.php

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Enums\ServerStatus;
use App\Http\Requests\ServerRequest;

class ServerController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ServerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ServerRequest $request)
    {
        $validated = $request->validated();
        $status = ServerStatus::from($validated['status']);
        // ...
    }
}
```

## まとめ

バリデーションしたものを case に変換しているところが冗長な感じがするので、もっといい方法があれば教えてください 🙇‍♀️
