import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Radio } from 'semantic-ui-react';
import { loadBooks, loadGroupBooks } from '../../redux/actions/bookActions';
import { getName } from '../../redux/actions/nameActions';

function Groups({ user, getName, loadGroupBooks, loadBooks }) {
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
                trigger={<span className='link'>{user.groups[0].name}</span>}
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
              getName(user.groups[0].name);
            }}
          >
            Todos
          </button>
          <button
            className='ui button'
            onClick={e => {
              handleClick(e);
              loadBooks(user.id);
              getName(user.name);
            }}
            disabled={start}
          >
            {user.name}
          </button>
          {user.groups[0].users
            .filter(element => element.name !== user.name)
            .map(user => (
              <button
                key={user.id}
                className='ui button'
                onClick={e => {
                  handleClick(e);
                  loadBooks(user.pivot.user_id);
                  getName(user.name);
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
    name: state.name
  };
};

const mapDispatchToProps = {
  loadGroupBooks,
  loadBooks,
  getName
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
