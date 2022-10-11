import {React, useState, useRef} from 'react';
import './App.css';

//firebaseモジュールのインポート
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//firebaseインスタンス初期化(firebaseオブジェクトの作成:サービスに必要な認証に使用)
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

//firebase認証サービスを取得、認証サービスにアクセス
const auth = firebase.auth()
//firestoreのオブジェクト取得
const firestore = firebase.firestore()

//main
function App() {
  const [ user ] = useAuthState(auth)

  return (
    <div className="App">
      <header>
        <h1>Talk</h1>
        <SignOut />
      </header>

      <section>
        {/* ログインされている場合は、チャット画面そうで無い場合はサインイン画面 */}
        {user ? <ChatRoom /> : <SignIn/>}　
      </section>
    </div>
  );
}

//セクション内のチェット画面
function ChatRoom() {
  //なぜuseRefを使用して、変数がdummyと付けているのか
  const dummy = useRef()

  //firestoreのコレクション'messages'のインスタンス取得
  const messagesRef = firestore.collection('messages')
  //orderByでデータカラムを指定、limitで取得するDB数を制限:DB25件を上限に取得する
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})
  const [formValue, setFormValue] = useState('')

  //関数ないの処理を詳細にする
  const sendMessage = async(e) => {
    //React では false を返してもデフォルトの動作を抑止することができないため、明示的に preventDefault を呼び出している。
    //https://ja.reactjs.org/docs/handling-events.html
    e.preventDefault()

    const {uid, photoURL} = auth.currentUser
    //非同期により、トーク情報を送信
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')

    dummy.current.scrollIntoView({ behavior: 'smooth'})
  }

  return (
    <>
      <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
          <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit' disabled={!formValue}>送信</button>
      </form>
    </>
  )
}

//チャット送信制御
function ChatMessage(props) {
  const {text, uid, photoURL} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="text"/>
      <p>{text}</p>
    </div>
  )
}


function SignIn() {
  //ボタンが押下時、Googleでログイン処理
  const signInWithGoogle = () => {
    //firebase.auth.GoogleAuthProviderの処理内容は何か
    const provider = new firebase.auth.GoogleAuthProvider()
    //signInWithPopupとは
    auth.signInWithPopup(provider)
  }
  //トップ画面
  return (
    <>
      <button onClick={ signInWithGoogle }>Sign in With Google</button>
    </>
  )
}

function SignOut() {
  //ログインしている場合は、処理を実行、ログインしていない場合は、下記は実行されずViewに表示しない
  //if !auth.curentUser {return null}
  return auth.currentUser && (
    <>
    {/*無名関数でログアウトの実施。無名関数により処理を簡潔化*/}
    <button onClick={ () => auth.signOut() }>Sign Out</button>
    </>
  )
}

export default App;

/*
それぞれのメソッドの役割とコードの内容、
なぜそれをしているのか、その意味をまとめる
処理に必要なことは何か（通信に必要なことなど）

完成からちょっとしたアレンジを追加する
・ログインすると「{name}さん、お帰りなさい」のポップアップを表示させる

リファクタリングでコンポーネントを追加する
・PDFで学習したことも取り入れる
*/

//React Hooks
//https://qiita.com/seira/items/f063e262b1d57d7e78b4

