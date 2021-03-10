import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import UserOptions from '../../components/user/Options';
import { updateUser } from '../../redux/actions/userActions';
import './options.scss';

const UserOptionsLogic = ({ user, updateUser }) => {
  const [userData, setUserData] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setUserData(prevGroup => ({
      ...prevGroup,
      [name]: value
    }));
  }

  function formIsValid() {
    const { name, email } = userData;
    const errors = {};

    if (!name) errors.name = 'El nombre es necesario.';
    if (!email) errors.email = 'El email es necesario.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    updateUser(user.id, userData.name, userData.email)
      .then(() => {
        toast('Usuario actualizado');
        setSaving(false);
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <UserOptions
      onChange={onChange}
      handleSave={handleSave}
      errors={errors}
      userData={userData}
      saving={saving}
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOptionsLogic);
