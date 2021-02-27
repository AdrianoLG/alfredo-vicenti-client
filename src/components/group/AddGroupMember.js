import React, { useState } from 'react';
import { Button, Form, Input, Message, Modal } from 'semantic-ui-react';
import { colors } from './groupColors';

function AddGroupMember({
  handleEmail,
  handleMailChange,
  errors = {},
  email,
  savingUser,
  group,
  name
}) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
      }}
      open={open}
      trigger={<Button secondary>Añadir miembro</Button>}
    >
      <Modal.Header>Añadir miembro</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={() => {
            let tempColors = colors.map(color =>
              color.color.substr(1, color.color.length)
            );
            const userColors = group.users.map(
              groupUser => groupUser.pivot.color
            );
            tempColors = tempColors.filter(
              color => !userColors.includes(color)
            );
            handleEmail(group.id, group.name, name, tempColors[0]);
          }}
          className='addGroupUser-form'
        >
          {errors.handleEmail && (
            <Message error>
              <p>{errors.handleEmail}</p>
            </Message>
          )}
          <div className='addGroupUser'>
            <div className='addGroupUser-form_fields'>
              <Form.Field
                control={Input}
                name='email'
                label='Email'
                placeholder='Escribe el email del miembro a añadir'
                value={email || ''}
                onChange={handleMailChange}
                fluid
                error={
                  errors.email
                    ? { content: errors.email, pointing: 'below' }
                    : false
                }
              />
            </div>
          </div>
          <div className='actions'>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type='submit' disabled={savingUser} secondary>
              {savingUser ? 'Comprobando...' : 'Añadir'}
            </Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddGroupMember;
