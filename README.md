# Getting Started with Create React App

# 環境構築

学習と開発に必要な環境を構築します。
まずは、開発環境に必要なパッケージ・ツールが入っているか確認していきます。

必要なツール・パッケージ)  
1.vscode  
1.node.js  
1.npm  

上記がPCに入っているか確認するために、コマンドでも確認ができます。

```
npm -v
node -v
```

リンクからインストールする場合は、推奨版が変更されていたり、最新のバージョンが上がっている可能性もあるので、インストール時には確認をお願いします。

nodeがインストールされていない場合は、こちらのURL`https://nodejs.org/ja/download/　`からインストールすることができます。

npmのインストールは下記のコマンドを入力することでインストールが可能になります。

```
sudo npm install -g npm
```


VSCodeがインストールされていない場合は、こちらのURL`https://azure.microsoft.com/ja-jp/products/visual-studio-code/`からインストールすることができます。

ツールやパッケージ、プログラミング言語をインストールする場合は、最新版もしくは、推奨版をインストールします。
最新版は予期せぬエラーやバグが発生する可能性があります。
バージョンが古いものをお持ちの場合は、セキュリティの観点からバージョンを上げるようにしてください。

# Reactアプリケーションの作成

プロジェクトを配置するディレクトリに下記のコマンドを入力。

```terminal:
$ npm install react-app アプリケーション名
```

firebaseを使用するために、プロジェクトで下記のコマンドを入力しfirebaseをプロジェクトに落とし込みます。
今回は、firebese hooksをインストールします。

```
$ npm install firebase react-firebase-hooks
```

サーバAPIとして使用する`Firebase Console`の登録が完了していない場合は、以下の手順で登録を実施してください。。



# Reactアプリケーションの開始

プロジェクト内で、下記のコマンドを入力すると、`http://localhost:3000`のローカルサーバが起動し、アプリケーションが開始されます。

```
npm start
```


# Firebase
