import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';

import LoginForm from '../../components/user/LoginForm';
import { userLogin } from '../../redux/actions/userActions';

function UserLogin({ userLogin, history, ...props }) {
  const [userForm, setUserForm] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserForm(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function formIsValid() {
    const { email, password } = userForm;
    const errors = {};

    if (!email) errors.email = 'El email es necesario.';
    if (!password) errors.password = 'La contraseña es necesaria.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    userLogin(userForm)
      .then(() => {
        toast('Usuario identificado');
        history.push('/');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <>
      {props.loading ? (
        <div className='hundred'>
          <Loader active />
        </div>
      ) : (
        <LoginForm
          user={userForm}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  userLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
