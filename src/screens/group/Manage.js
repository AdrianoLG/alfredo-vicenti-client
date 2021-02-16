import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react';

import Header from '../../components/common/header/Header';
import GroupForm from '../../components/group/GroupForm';
import GroupList from '../../components/group/GroupList';
import { deleteGroup, saveGroup } from '../../redux/actions/groupFormActions';

function GroupManage({
  history,
  userForm,
  user,
  saveGroup,
  deleteGroup,
  ...props
}) {
  const [group, setGroup] = useState({ ...props.group });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userForm.name) {
      history.push('/login');
    }
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setGroup(prevGroup => ({
      ...prevGroup,
      [name]: value
    }));
  }

  function formIsValid() {
    const { name, color } = group;
    const errors = {};

    if (!name) errors.name = 'El nombre es necesario.';
    if (!color) errors.color = 'El color es necesario.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    let groupData = {
      name: group.name,
      admin: user.id
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

  function handleClick(event, action, data) {
    event.preventDefault();
    switch (action) {
      case 'delete':
        deleteGroup(data.groupId, user.id).then(() => {
          toast(`Grupo ${data.groupId} borrado`);
        });
        break;
      default:
        console.log('Error');
    }
  }

  return (
    <>
      <Header />
      <main className='main-container height-pad'>
        {props.loading ? (
          <div className='hundred'>
            <Loader active />
          </div>
        ) : (
          <GroupForm
            group={group}
            errors={errors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
          />
        )}
        <GroupList onClick={handleClick} user={user} />
        <div className='buttons'>
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            Volver
          </Button>
        </div>
      </main>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userForm: state.userForm
  };
};

const mapDispatchToProps = {
  saveGroup,
  deleteGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupManage);
