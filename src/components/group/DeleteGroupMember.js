import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { deleteGroupUser } from '../../redux/actions/groupActions';

const DeleteGroupMember = ({
  groupId,
  groupName,
  userId,
  userName,
  deleteGroupUser
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button icon size='mini' className='deleteButton' color='black'>
          <Icon name='close' />
        </Button>
      }
    >
      <Modal.Header>Borrar usuario</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>
            <Icon name='warning circle' color='red' size='large' />
            ¿Quiere borrar a {userName} del grupo {groupName}?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>No</Button>
        <Button
          color='red'
          onClick={() => {
            deleteGroupUser(groupId, userId).then(() => {
              toast(`Usuario eliminado`);
            });
            setOpen(false);
          }}
        >
          Sí
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  deleteGroupUser
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteGroupMember);
