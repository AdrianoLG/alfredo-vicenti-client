import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Radio } from 'semantic-ui-react';
import { loadBooks, loadGroupBooks } from '../../redux/actions/bookActions';
import { chooseGroup } from '../../redux/actions/groupActions';
import { getName } from '../../redux/actions/nameActions';

function Groups({
  user,
  getName,
  loadGroupBooks,
  loadBooks,
  chooseGroup,
  chosenGroup
}) {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(true);
  const handleChange = (event, { value }) => setValue(value);

  if (user.groups !== undefined) {
    return (
      <>
        <h2>
          Grupo:{' '}
          {user.groups.length > 1 ? (
            <>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <span className='link'>
                    {Object.getOwnPropertyNames(chosenGroup).length > 0
                      ? chosenGroup.group.name
                      : user.groups[0].name}
                  </span>
                }
              >
                <Modal.Header>Grupos</Modal.Header>
                <Modal.Content>
                  <ul>
                    {user.groups.map(group => (
                      <li key={group.id}>
                        <Radio
                          key={group.name}
                          label={group.name}
                          name='group'
                          value={group.name}
                          checked={value === group.name}
                          onChange={handleChange}
                        />
                      </li>
                    ))}
                  </ul>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button
                    onClick={() => {
                      let chosenGroup = user.groups.filter(
                        group => group.name === value
                      )[0];
                      let users = chosenGroup.users.map(user => {
                        return {
                          name: user.name,
                          color: user.pivot.color,
                          id: user.pivot.user_id
                        };
                      });
                      let group = {
                        name: chosenGroup.name,
                        admin: chosenGroup.admin,
                        users: users
                      };
                      chooseGroup(group);
                      setOpen(false);
                    }}
                  >
                    Aceptar
                  </Button>
                </Modal.Actions>
              </Modal>
            </>
          ) : (
            user.groups[0].name
          )}
        </h2>
        <div className='ui buttons group-users'>
          <button
            className='ui button'
            onClick={e => {
              handleClick(e);
              loadGroupBooks(user.id, user.groups[0].id);
              getName(`del grupo ${user.groups[0].name}`);
            }}
          >
            Todos
          </button>
          <button
            className='ui button'
            onClick={e => {
              handleClick(e);
              loadBooks(user.id);
              getName(`de ${user.name}`);
            }}
            disabled={start}
          >
            {user.name}
          </button>
          {Object.getOwnPropertyNames(chosenGroup).length > 0
            ? chosenGroup.group.users
                .filter(element => element.name !== user.name)
                .map(user => (
                  <button
                    key={user.id}
                    className='ui button'
                    onClick={e => {
                      handleClick(e);
                      loadBooks(user.pivot ? user.pivot.user_id : user.id);
                      getName(`de ${user.name}`);
                    }}
                  >
                    {user.name}
                  </button>
                ))
            : user.groups[0].users
                .filter(element => element.name !== user.name)
                .map(user => (
                  <button
                    key={user.id}
                    className='ui button'
                    onClick={e => {
                      handleClick(e);
                      loadBooks(user.pivot.user_id);
                      getName(`de ${user.name}`);
                    }}
                  >
                    {user.name}
                  </button>
                ))}
        </div>
      </>
    );
  } else {
    return null;
  }

  function handleClick(e) {
    setStart(false);
    document.querySelectorAll('.group-users button').forEach(button => {
      button.disabled = false;
    });
    e.target.disabled = true;
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    chosenGroup: state.chosenGroup
  };
};

const mapDispatchToProps = {
  loadGroupBooks,
  loadBooks,
  getName,
  chooseGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
