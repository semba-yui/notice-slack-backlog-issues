<!--
Copyright (c) 2023 Ryuichiro Semba Co., Ltd. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
# Contribution Guide

TODO

## Branch Rule

- [GitHub Flow](https://docs.github.com/ja/get-started/quickstart/github-flow)

開発時のブランチは `feature/チケット番号` とする。

例: `feature/XX_TICKET-1`

## Commit Rule

Read [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)

| Prefix    | 説明                                                                                             |
| :-------- | :----------------------------------------------------------------------------------------------- |
| feat:     | 新機能                                                                                           |
| fix:      | バグの修正                                                                                       |
| docs:     | ドキュメントのみの変更                                                                           |
| style:    | コードの動作に影響しない、見た目だけの変更（スペース、フォーマット、欠落の修正、セミコロンなど） |
| refactor: | バグの修正や機能の追加ではないコードの変更                                                       |
| perf:     | パフォーマンスを向上させるコードの変更                                                           |
| test:     | 不足しているテストの追加や既存のテストの修正                                                     |
| chore:    | ビルドプロセスやドキュメント生成などの補助ツールやライブラリの変更                               |
