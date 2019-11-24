import React, {Component} from 'react';
import './App.css';
import iconLogin from './user.png';
import firebase from 'firebase';


/**
 * @description dados obtidos no firebase.google.com 
 * quando o aplicativo é criado
 */
var firebaseConfig = {
  apiKey: "AIzaSyDAz0YbqXCkinO36sWMG1Y5rCM_114ZXBU",
  authDomain: "login-reactjs-8ab90.firebaseapp.com",
  databaseURL: "https://login-reactjs-8ab90.firebaseio.com",
  projectId: "login-reactjs-8ab90",
  storageBucket: "login-reactjs-8ab90.appspot.com",
  messagingSenderId: "628967696003",
  appId: "1:628967696003:web:dd1d2b0a94a4733a489db6",
  measurementId: "G-899JEJ0X21"
};


export default class App extends Component {
  
  defaultAuth=null;
  providerGoogle = null;
  state={
    user : null,
    userName:'josiassilva32@gmail.com',
    password:'123456'
  }

  
  
  componentDidMount =()=>{
    firebase.initializeApp(firebaseConfig);
    this.defaultAuth = firebase.auth();
    this.providerGoogle = new firebase.auth.GoogleAuthProvider();
  }

  handleLogin =()=>{
    const {userName, password} = this.state;

    var ref = this;
    this.defaultAuth.signInWithEmailAndPassword(userName, password)
      .then(function(result) {
        ref.setState({user:result.user})
        console.log(ref.state.user);
        alert('Login com sucesso!');
      }).catch(function(error) {
        alert('Falha no login: '+error);

      });
  }
  handleLoginWithGoogle =()=>{
    this.providerGoogle.addScope('profile');
    this.providerGoogle.addScope('email');

    var ref = this;
    
    firebase.auth().signInWithPopup(this.providerGoogle)
      .then(function(result) {
        ref.setState({user:result.user})
        console.log(ref.state.user);
        alert('Login com sucesso!\n'+
        'Nome:'+ref.state.user.displayName+
        '\nE-mail:'+ref.state.user.email
        );
          
      }).catch(function(error) {
        alert('Falha no login: '+error);

      });
  }
  handleChange = name => event => {
    this.setState({
      [name]:event.target.value});     
  };

  render(){
    return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <body>
        <div class="wrapp">
          <div class="login">
                  <div class="content">
                      <div class="logo-user">
                          <img class="logo-user-img" src={iconLogin}  srcset=""/>
                      </div>
                      <div class="label">
                          Login de acesso
                      </div>                                                            
                      <input 
                          class="input"
                          placeholder="digite seu usuário" 
                          type="email"
                          onChange={this.handleChange('userName')}
                          value={this.state.userName}
                          />
                      <input 
                          class="input"
                          placeholder="digite sua senha" 
                          type="password"
                          onChange={this.handleChange('password')}
                          value={this.state.password}
                          />
                          
                      <button 
                        class="btn-login"
                        onClick={this.handleLogin}
                        >
                          Entrar com E-mail
                      </button>
                      <button 
                        class="btn-login"
                        onClick={this.handleLoginWithGoogle}
                        >
                          Entrar com Google
                      </button>
                      <a href="#" class="recover">Recuperar senha</a>   
                      
                  </div>                    
          </div>
        </div>
      </body>
    </div>
  );
  }
  
}

