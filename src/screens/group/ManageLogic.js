import CryptoJS from 'crypto-js';
import emailjs from 'emailjs-com';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { userExists } from '../../api/userApi';
import Manage from './Manage';
import {
  changeGroupColor,
  deleteGroup,
  saveGroup
} from '../../redux/actions/groupActions';

const {
  REACT_APP_SECRET,
  REACT_APP_SERVICE_ID,
  REACT_APP_TEMPLATE_ID_JOIN_GROUP,
  REACT_APP_USER_ID
} = process.env;

function GroupManage({
  history,
  user,
  saveGroup,
  deleteGroup,
  changeGroupColor,
  loading,
  ...props
}) {
  const [group, setGroup] = useState({ ...props.group });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!user.name) {
      history.push('/login');
    }
  }, [user, history]);

  function formIsValid() {
    const { name, color } = group;
    const errors = {};

    if (!name) errors.name = 'El nombre es necesario.';
    if (!color) errors.color = 'El color es necesario.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setGroup(prevGroup => ({
      ...prevGroup,
      [name]: value
    }));
  }

  function handleClick(event, action, data) {
    event.preventDefault();
    switch (action) {
      case 'delete':
        deleteGroup(data.groupId, user.id).then(() => {
          toast(`Grupo borrado`);
        });
        break;
      default:
        console.log('Error');
    }
  }

  function handleColor(color, groupId) {
    changeGroupColor(groupId, user.id, color.substr(1, color.length)).then(
      () => {
        toast('Color cambiado');
      }
    );
  }

  function handleColorClick(e) {
    group.color = e.target.dataset.color;
    if (document.querySelectorAll('.selected').length > 0) {
      document.querySelectorAll('.selected')[0].classList.remove('selected');
    }
    e.target.classList.add('selected');
  }

  function handleEmail(groupId, groupName, name, color) {
    if (!userGroupFormIsValid()) return;
    setSavingUser(true);
    userExists(email).then(() => {
      const addToGroup = {
        email: email,
        groupId: groupId,
        groupName: groupName,
        color: color
      };
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(addToGroup),
        REACT_APP_SECRET
      ).toString();

      const mailData = {
        ciphertext: ciphertext,
        email: addToGroup.email,
        groupName: groupName,
        name: name
      };
      emailjs
        .send(
          REACT_APP_SERVICE_ID,
          REACT_APP_TEMPLATE_ID_JOIN_GROUP,
          mailData,
          REACT_APP_USER_ID
        )
        .then(() => {
          toast(
            `Se ha enviado un email ${email} al usuario para que se una al grupo ${groupName}`
          );
          setSavingUser(false);
        })
        .catch(error => {
          setSavingUser(false);
          toast.error('No existe ningún usuario con ese email');
          setErrors({ onSave: error.message });
        });
    });
  }

  function handleMailChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    let groupData = {
      name: group.name,
      admin: user.id,
      email: user.email
    };
    let color = group.color.substr(1, group.color.length);
    setGroup({ ...props.group });
    saveGroup(groupData, color, user.name)
      .then(() => {
        toast('Grupo guardado');
        setSaving(false);
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function userGroupFormIsValid() {
    const errors = {};

    if (email.length === 0) errors.email = 'El email es necesario.';
    else if (!validateEmail(email)) errors.email = 'El email es inválido';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateEmail(mail) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    return re.test(mail);
  }

  return (
    <Manage
      group={group}
      errors={errors}
      handleChange={handleChange}
      handleSave={handleSave}
      saving={saving}
      handleClick={handleClick}
      user={user}
      handleColor={handleColor}
      handleColorClick={handleColorClick}
      handleMailChange={handleMailChange}
      handleEmail={handleEmail}
      email={email}
      savingUser={savingUser}
      istory={history}
      loading={loading}
    />
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  saveGroup,
  deleteGroup,
  changeGroupColor
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupManage);
