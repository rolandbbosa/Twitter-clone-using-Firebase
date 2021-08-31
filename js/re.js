// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: ".....",
  authDomain: ".....",
  projectId: ".....",
  storageBucket: ".....",
  messagingSenderId: ".....",
  appId: ".....",
  measurementId: "....."
};

firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()



document.querySelector('#message-form').addEventListener('submit', e => {
e.preventDefault()

let message = document.querySelector('#message-input').value
db.collection('messages')
.add({
 
  message: message,
  date: firebase.firestore.Timestamp.fromMillis(Date.now())
  })
.then(docRef => {
  console.log(`Document written with ID: ${docRef.id}`)
  document.querySelector('#message-form').reset()
})
.catch(error => {
  console.log(`Error adding document: ${error}`)
})
})

db.collection('messages')
.orderBy('date', 'asc')
.onSnapshot(snapshot => {
document.querySelector('#messages').innerHTML = ''
snapshot.forEach(doc => {
  let message = document.createElement('div')
  message.innerHTML = `

  <p>${doc.data().message}</p>
  `
  document.querySelector('#messages').prepend(message)
})
})

document.querySelector('#clear').addEventListener('click', () => {
db.collection('messages')
.get()
.then(snapshot => {
  snapshot.forEach(doc => {
    db.collection('messages').doc(doc.id).delete()
    .then(() => {
      console.log('Document successfully deleted!')
    })
    .catch((error) => {
      console.log(`Error removing document: ${error}`)
    })
  })
})
.catch(error => {
  console.log(`Error getting documents: ${error}`)
})
})

