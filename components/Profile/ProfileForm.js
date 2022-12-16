import { useRef, useContext } from 'react';
import AuthContext from '../../store/Contextfile';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';


const ProfileForm = () => {
  const history = useHistory();
  const newpassword = useRef();
  const authcxt = useContext(AuthContext)
  const submit = (e) => {
    e.preventDefault();
    const enterNewPassword = newpassword.current.value;


    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAIpsbtbRYm4LFMDXqNc9Hl44YatnQriyk',
      {
        method: 'POST', body: JSON.stringify({
          idToken: authcxt.token, password: enterNewPassword, returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json',

        }
      }
    ).then(res => {
      history.replace('/');
    })
  }
  return (
    <form className={classes.form} onSubmit={submit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newpassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
