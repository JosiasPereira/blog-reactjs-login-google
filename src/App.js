import React, {Component} from 'react';
import './App.css';
import iconLogin from './user.png';
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig'


export default class App extends Component {
  
  providerGoogle = null;

  state={
    user : null,
  }

  
  
  componentDidMount =()=>{
    firebase.initializeApp(firebaseConfig);
    this.providerGoogle = new firebase.auth.GoogleAuthProvider();
  }

  
  handleLoginWithGoogle =()=>{
    this.providerGoogle.addScope('profile');
    this.providerGoogle.addScope('email');

    var ref = this; // referência da classe
    
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
                      
                      <button 
                        class="btn-login"
                        onClick={this.handleLoginWithGoogle}
                        >
                          Entrar com Google
                      </button>
                     
                      
                  </div>                    
          </div>
        </div>
      </body>
    </div>
  );
  }
  
}

