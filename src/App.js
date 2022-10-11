import {React, useState, useRef} from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})


const auth = firebase.auth()
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
        {user ? <ChatRoom /> : <SignIn/>}　
      </section>
    </div>
  );
}


//セクション内のチェット画面
function ChatRoom() {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, {idField: 'id'})
  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault()

    const {uid, photoURL} = auth.currentUser

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
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
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
  //if !auth.curentUser {return null}
  return auth.currentUser && (
    <>
      <button onClick={ () => auth.signOut() }>Sign Out</button>
    </>
  )
}
export default App;
