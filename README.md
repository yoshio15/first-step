# First-Step-Front
![First-Step_LP](https://user-images.githubusercontent.com/51875964/84594311-41c05680-ae8c-11ea-89b6-72bb68246ce8.png)
プログラミング初学者向けポートフォリオ公開プラットフォーム「FirstStep」のフロントエンドのソースコードです。

## 概要
本アプリケーションでは、ユーザ（プログラミング初心者を想定）が、HTMLファイルを本アプリケーションに投稿することで、自分が書いたHTMLを公開することができます。

## 機能一覧
本アプリケーションで実装している機能は下記の通りです。
- サインアップ
- ログイン/ログアウト機能
- HTMLファイル投稿機能
- 作品投稿機能
- 作品一覧表示機能
- ユーザ情報編集機能
- 画像（ユーザアイコン）アップロード機能

## アプリケーション内で使用している技術一覧

### ■ フロントエンド
- React v16.12.0
  - Redux v.7.2.0
  - React Router Dom v5.1.2
  - AWS Amplify v2.2.4
- TypeScript v3.7.5

### ■ バックエンド
※バックエンドのソースコードは[こちら](https://github.com/yoshio15/first-step-backend)のリポジトリにて管理しています。
- Node.js
- AWS各種サービス
  - SAM(Serverless Application Model)
  - Cognito
  - CloudFront
  - S3
  - API GateWay
  - AWS Lambda
  - DynamoDB