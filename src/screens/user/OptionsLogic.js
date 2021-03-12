import CryptoJS from 'crypto-js';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { updateUserPasswordToken } from '../../api/userApi';
import UserOptions from '../../components/user/Options';
import { updateUser } from '../../redux/actions/userActions';

const {
  REACT_APP_SECRET,
  REACT_APP_SERVICE_ID_2,
  REACT_APP_TEMPLATE_ID_UPDATE_PASS,
  REACT_APP_USER_ID_2
} = process.env;

const UserOptionsLogic = ({ user, updateUser }) => {
  const [userData, setUserData] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [savingPassToken, setSavingPassToken] = useState(false);

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
    if (name && name.length > 30) errors.name = 'Límite de 30 caracteres';
    if (!email) errors.email = 'El email es necesario.';
    if (email && email.length > 50) errors.email = 'Límite de 50 caracteres';

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

  function changePassword() {
    setSavingPassToken(true);
    const token = Math.random().toString(36).substring(2);
    updateUserPasswordToken(user.id, token)
      .then(() => {
        const mailInfo = {
          userId: user.id,
          token: token
        };
        var ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(mailInfo),
          REACT_APP_SECRET
        ).toString();

        const mailData = {
          ciphertext: ciphertext,
          email: user.email
        };
        emailjs
          .send(
            REACT_APP_SERVICE_ID_2,
            REACT_APP_TEMPLATE_ID_UPDATE_PASS,
            mailData,
            REACT_APP_USER_ID_2
          )
          .then(() => {
            setSavingPassToken(false);
            toast(
              `Se ha enviado un email con instrucciones para cambiar la contraseña`
            );
          })
          .catch(error => {
            setSavingPassToken(false);
            toast.error('Error del servicio');
          });
      })
      .catch(error => {
        setSavingPassToken(false);
        toast.error('Error al mandar email');
        console.log(error);
      });
  }

  return (
    <UserOptions
      onChange={onChange}
      handleSave={handleSave}
      errors={errors}
      userData={userData}
      changePassword={changePassword}
      saving={saving}
      savingPassToken={savingPassToken}
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
