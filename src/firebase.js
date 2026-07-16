import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  projectId: 'grad-project-d5f84',
  appId: '1:864059181654:web:271c6411e240766d6ec9f7',
  storageBucket: 'grad-project-d5f84.firebasestorage.app',
  apiKey: 'AIzaSyCJAfNZLRonNwe3izjLIfJI0aYFJj7EW7s',
  authDomain: 'grad-project-d5f84.firebaseapp.com',
  messagingSenderId: '864059181654',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
