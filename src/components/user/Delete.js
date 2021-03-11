import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { deleteUser } from '../../api/userApi';

function UserDelete({ userId }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color='black'>
          Borrar cuenta
        </Button>
      }
    >
      <Modal.Header>Borrar cuenta</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>
            <Icon name='warning circle' color='red' size='large' />
            ¡Atención! Perderá todos los datos guardados hasta el momento.
            ¿Seguro que quiere borrar su usuario?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>No</Button>
        <Button
          color='red'
          onClick={() => {
            deleteUser(userId).then(() => {
              toast(`Usuario eliminado`);
            });
            setOpen(false);
            history.push('/login');
          }}
        >
          Sí
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default UserDelete;
