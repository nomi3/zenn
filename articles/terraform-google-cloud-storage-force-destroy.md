---
title: "TerraformでGoogle Cloud Storageを含んだリソース群の削除に失敗した場合の対処法"
emoji: "⛏️"
type: "tech"
topics: ["Terraform", "GoogleCloud", "CloudStorage"]
published: true
---

Google CloudのリソースをTerraformで管理していて、開発環境のリソースをdestroyしようとした際、Cloud Storageの `force_destroy` が `false` となっていて、Cloud Storageの削除に失敗し、中途半端にリソースが残ってしまったときの対処法です。

## バージョン

Terraform: 1.10.4
hashicorp/google: 6.16.0

## やり方

まず、対象のCloud Storageの `force_destroy` を `true` にします。

```diff hcl
resource "google_storage_bucket" "example" {
  name     = "example-bucket"
  location = "US"
-  force_destroy = false
+  force_destroy = true
}

resource "another_resource" "example" {
  name   = "example-object"
}
```

その後、targetを使ってCloud Storageのみを更新します。(targetを指定しないでapplyすると、 `another_resourse` など、一度削除していたリソースが再作成されてしまいます。)

```bash
terraform apply -target=google_storage_bucket.example
```

その後、あらためてdestroyを実行します。

```bash
terraform destroy
```

これで、Cloud Storageを含む、残りのリソースが削除されます。