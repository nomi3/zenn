---
title: "TerraformでGoogle CloudのCertificate Manager関連のリソースの再作成に失敗した場合の対処法"
emoji: "⛏️"
type: "tech"
topics: ["Terraform", "GoogleCloud", "CertificateManager"]
published: true
---

Google CloudのCertificate Manager関連のリソースをTerraformで管理していて、証明書を再作成しようとした際に、エラーになったので、対処法をメモします。

:::message
今回実施したのは開発環境だったので、対処中にサービスが停止してしまうことは考慮していません。
:::

## バージョン

Terraform: 1.9.8
hashicorp/google: 6.16.0

## やりたかったこと

以下のように、 `before.com` から `after.com` に証明書のドメインを変更したかったです。

```diff hcl
locals {
-  domain_name = "before.com"
+  domain_name = "after.com"
}

resource "google_certificate_manager_dns_authorization" "example" {
  name   = "example-dns-authorization"
  domain = local.domain_name
}

resource "google_certificate_manager_certificate_map" "example" {
  name = "example-certificate-map"
}

resource "google_certificate_manager_certificate" "example" {
  name = var.prefix
  managed {
    domains = [
      local.domain_name,
      "*.${local.domain_name}"
    ]
    dns_authorizations = [google_certificate_manager_dns_authorization.example.id]
  }
}

resource "google_certificate_manager_certificate_map_entry" "example" {
  name         = "example-certificate-map-entry"
  map          = google_certificate_manager_certificate_map.example.name
  matcher      = "PRIMARY"
  certificates = [google_certificate_manager_certificate.example.id]
}
```

## エラー内容

以下のようなエラーが出ました。

```
Error: Error when reading or editing Certificate: googleapi: Error 400: can't delete certificate that is referenced by a CertificateMapEntry or other resources
```

ドメイン名を変更するためには、証明書は削除してから再作成という処理になりますが、証明書マップエントリで削除する証明書を参照しているため、証明書を削除できないようです。

## 対処法

以下の手順で対処しました。

1. ドメインを変更しつつ、 `google_certificate_manager_certificate` と `google_certificate_manager_certificate_map_entry` をコメントアウトする

```diff hcl
locals {
-  domain_name = "before.com"
+  domain_name = "after.com"
}

resource "google_certificate_manager_dns_authorization" "example" {
  name   = "example-dns-authorization"
  domain = local.domain_name
}

resource "google_certificate_manager_certificate_map" "example" {
  name = "example-certificate-map"
}

-　resource "google_certificate_manager_certificate" "example" {
-   name = var.prefix
-   managed {
-     domains = [
-       local.domain_name,
-       "*.${local.domain_name}"
-     ]
-     dns_authorizations = [google_certificate_manager_dns_authorization.example.id]
-   }
- }

- resource "google_certificate_manager_certificate_map_entry" "example" {
-   name         = "example-certificate-map-entry"
-   map          = google_certificate_manager_certificate_map.example.name
-   matcher      = "PRIMARY"
-   certificates = [google_certificate_manager_certificate.example.id]
- }
+ # resource "google_certificate_manager_certificate" "example" {
+ #   name = var.prefix
+ #   managed {
+ #     domains = [
+ #       local.domain_name,
+ #       "*.${local.domain_name}"
+ #     ]
+ #     dns_authorizations = [google_certificate_manager_dns_authorization.example.id]
+ #   }
+ # }
+
+ # resource "google_certificate_manager_certificate_map_entry" "example" {
+ #   name         = "example-certificate-map-entry"
+ #   map          = google_certificate_manager_certificate_map.example.name
+ #   matcher      = "PRIMARY"
+ #   certificates = [google_certificate_manager_certificate.example.id]
+ # }
```

上記の状態で `terraform apply` を実行します。

2. コメントアウトを解除する

```diff hcl
locals {
  domain_name = "after.com"
}

resource "google_certificate_manager_dns_authorization" "example" {
  name   = "example-dns-authorization"
  domain = local.domain_name
}

resource "google_certificate_manager_certificate_map" "example" {
  name = "example-certificate-map"
}

- # resource "google_certificate_manager_certificate" "example" {
- #   name = var.prefix
- #   managed {
- #     domains = [
- #       local.domain_name,
- #       "*.${local.domain_name}"
- #     ]
- #     dns_authorizations = [google_certificate_manager_dns_authorization.example.id]
- #   }
- # }
-
- # resource "google_certificate_manager_certificate_map_entry" "example" {
- #   name         = "example-certificate-map-entry"
- #   map          = google_certificate_manager_certificate_map.example.name
- #   matcher      = "PRIMARY"
- #   certificates = [google_certificate_manager_certificate.example.id]
- # }
+ resource "google_certificate_manager_certificate" "example" {
+   name = var.prefix
+   managed {
+     domains = [
+       local.domain_name,
+       "*.${local.domain_name}"
+     ]
+     dns_authorizations = [google_certificate_manager_dns_authorization.example.id]
+   }
+ }

+ resource "google_certificate_manager_certificate_map_entry" "example" {
+   name         = "example-certificate-map-entry"
+   map          = google_certificate_manager_certificate_map.example.name
+   matcher      = "PRIMARY"
+   certificates = [google_certificate_manager_certificate.example.id]
+ }
```

上記の状態で `terraform apply` を実行します。

これで、証明書のドメイン名が変更されます。
