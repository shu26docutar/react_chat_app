<div align="center"><h1>Reactチャットアプリケーション</h1></div>

Reactを使用して、チャットアプリケーションを作成しました。Googleアカウントを使用した認証機能と、チャット機能を持ったアプリケーションになります。

# 開発環境
- MacOS: Monterey v12.6
- React.js: v18.2.0
- Firebase: v9.10.0
- React-Firebase-Hooks: v5.0.3

# 機能
- ログイン
- ログアウト
- チャット

# アプリケーションの概要
本アプリケーションはチャットアプリケーションです。本アプリケーションでは初回利用の場合でも、Googleアカウントがあれば、簡単に使用できるようになっています。  
サインインボタンを押下後、チャットを開始するアカウントを選択します。  
認証が完了すると、チャットルームが表示されます。

[![Image from Gyazo](https://i.gyazo.com/1866d98a9e8722940458eae7f327ad1c.gif)](https://gyazo.com/1866d98a9e8722940458eae7f327ad1c)

チャットではテキストに文字を入力し、送信ボタン押下もしくはEnterで送信をすることができます。  
送信完了後は、入力したテキスト内の文字はクリアになるようになっています。  

テキストに何も入力されていない場合は、送信ボタンを押下することができないようにしています。  
テキストに何も入力されていない状態で、送信ボタンを押下してしまうと、テキストが空の状態でメッセージを送信することになります。  
その場合、エラーもしくは空の状態を防ぐために誤送信対策になります。

[![Image from Gyazo](https://i.gyazo.com/d07bbc740668ee9a755ef0c26840d72c.gif)](https://gyazo.com/d07bbc740668ee9a755ef0c26840d72c)

ログアウトでは、アカウントでログイン中の場合は、ログアウトボタンが表示されます。ボタンを押下するとログアウトされトップ画面に遷移します。  
ログアウト後のログアウトボタンは非表示となり、表示されることはなくとてもシンプルなアプリケーションになっています。

[![Image from Gyazo](https://i.gyazo.com/d155b70ab0cd79dfeab3f4c68fb6a986.gif)](https://gyazo.com/d155b70ab0cd79dfeab3f4c68fb6a986)

チャットルームでは、自身が送信したい内容を入力し、送信ボタンで送信をすると、トーク画面に送信した内容が表示されるようになっています。
