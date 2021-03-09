import React from 'react';
import { useHistory } from 'react-router';
import { Button, Loader } from 'semantic-ui-react';

import Header from '../../components/common/header/Header';
import GroupForm from '../../components/group/GroupForm';
import GroupList from '../../components/group/GroupList';

function Manage({
  group,
  errors,
  handleChange,
  handleSave,
  saving,
  handleClick,
  user,
  handleColor,
  handleColorClick,
  handleMailChange,
  handleEmail,
  email,
  savingUser,
  loading
}) {
  const history = useHistory();
  return (
    <>
      <Header />
      <main className='mainContainer height-pad'>
        {loading ? (
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
            handleColorClick={handleColorClick}
          />
        )}
        <GroupList
          onClick={handleClick}
          user={user}
          errors={errors}
          handleColor={handleColor}
          handleMailChange={handleMailChange}
          handleEmail={handleEmail}
          email={email}
          savingUser={savingUser}
        />
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

export default Manage;
