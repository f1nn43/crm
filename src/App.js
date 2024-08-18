import './App.css';
import Navbar from './parts/Navbar';
import { useEffect, useState } from 'react';
import Login from './parts/content/Login/Login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import Loading from './parts/content/Loading/Loading';
import 'primeicons/primeicons.css';
import 'reactflow/dist/style.css';
        


firebase.initializeApp({
  apiKey: "AIzaSyA6a2KrgINXs48kh46ujobBHHi2G4DOBSc",
  authDomain: "crm-app-290ad.firebaseapp.com",
  databaseURL: "https://crm-app-290ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crm-app-290ad",
  storageBucket: "crm-app-290ad.appspot.com",
  messagingSenderId: "417688543189",
  appId: "1:417688543189:web:a39ee3eb737363807c675c",
  measurementId: "G-5LNV6GKBVK"
})

const App = (props) => {
  const [data, setData] = useState(null)
  const [users, setUsers] = useState(null)
  const [auth, setAuth] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if(users){
    users.forEach(us => {
      if(!us.notifications){
        us.notifications = []
      }
      if(!us.sessions){
        us.sessions = []
      }
      if(!us.tasks){
        us.tasks = []
      }
    });
  }
  if(data){
    data.forEach(funnel => {
      if(funnel.funnel){
        funnel.funnel.forEach(stage => {
          if(!stage.options){
            stage.options = {isMoving: false}
          }
          if (!stage.deals) {
            stage.deals = []
          }
        })
      } else {
        funnel.funnel = [] 
      }
      
    });
  } else {
    setData([])
  }

  useEffect(() => {
    const database = firebase.database();
    const ref = database.ref('/');

    const handleData = (snapshot) => {
      setData(snapshot.val().funnels);
      setUsers(snapshot.val().users);
    };

    ref.on('value', handleData);

    return () => {
      ref.off('value', handleData);
    };
  }, []);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if(users){
      const updatedUsers = users
      updatedUsers.forEach(us => {
        if (us.uid === localStorage.getItem('uid')) {
          us.isAuth = true
        }
      });
      firebase.database().ref('/users').set(updatedUsers);
    }
  })

  const loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email + "@auth.com", password)
      .then((userCredential) => {
        // Успешный вход
        const uid = userCredential.user.uid;
        localStorage.setItem('uid', uid)
        localStorage.setItem('chat', 'allChat')
        props.rerender()
      })
      .catch((error) => {
        // Обработка ошибок входа
        console.error('Login error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(name, password);
  };

  const handleLogout = () => {
    const updatedUsers = users
    updatedUsers.forEach(us => {
      if (us.uid === localStorage.getItem('uid')) {
        us.isAuth = false
      }
    });
    firebase.database().ref('/users').set(updatedUsers);
    localStorage.removeItem('uid');
    setAuth(false);
  };

  if (auth) {
    return (
      <div className="App">
        {data && users && (
          <Navbar rerender={props.rerender} data={data} users={users} handleLogout={handleLogout} />
        )}
      </div>
    );
  } else {
    return (
      <div className="App">
        <Login handleSubmit={handleSubmit} name={name} setName={setName} password={password} setPassword={setPassword}/>
      </div>
    );
  }
}

export default App;
