import firebase from 'firebase'

// This is insecure and all but the API is public anyway and won't exist in that state for long
const firebaseConfig = {
  apiKey: 'AIzaSyCqNAYQliaXkr4EnsJbRrdnDZSi43KU4IQ',
  authDomain: 'so-little-time-78201.firebaseapp.com',
  databaseURL: 'https://so-little-time-78201.firebaseio.com',
  storageBucket: 'so-little-time-78201.appspot.com'
}

try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {} // silence reinitialize warning (hot-reloading)

export default firebase
