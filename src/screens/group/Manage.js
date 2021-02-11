import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';
import Header from '../../components/common/header/Header';
import GroupForm from '../../components/group/GroupForm';
import GroupList from '../../components/group/GroupList';

function GroupManage({ history, userForm, user, ...props }) {
  const [group, setGroup] = useState({ ...props.group });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userForm.name) {
      history.push('/login');
    }
  });

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
    console.log(group);
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
        <GroupList user={user} />
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
  // saveGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupManage);
