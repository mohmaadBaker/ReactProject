import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/Contextfile';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  let url;
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef();
  const password = useRef();
  const [isLoding, setisLoding] = useState(false)
  const contextAut = useContext(AuthContext)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submit = (e) => {
    e.preventDefault();
    const enterEmail = email.current.value;
    const enterPassword = password.current.value;
    let messageError = 'Authotication failed';
    setisLoding(true)
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIpsbtbRYm4LFMDXqNc9Hl44YatnQriyk'
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIpsbtbRYm4LFMDXqNc9Hl44YatnQriyk'

    }
    fetch(url,
      {
        method: 'POST', body: JSON.stringify({ email: enterEmail, password: enterPassword, returnSecureToken: true }),
        headers: {
          'Content-Type': 'application/json'
        }

      }
    )
      .then(res => {
        setisLoding(false)
        if (res.ok) {
          return res.json();
        }
        else {
          return res.json().then((data) => {

            throw new Error(messageError);
          });
        }
      }).then((data => {
        console.log(data)
        contextAut.login(data.idToken)
        history.replace('/')
      })).catch((error) => {
        alert(error.message)
      })

  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={email} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={password} />
        </div>
        <div className={classes.actions}>
          {!isLoding && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoding && <p style={{ color: 'white' }}>Swnding</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
