import React, { useState } from 'react';
import { Button, Form, Input, Message, Modal } from 'semantic-ui-react';

function AddGroupMember({
  handleEmail,
  handleMailChange,
  errors = {},
  email,
  savingUser,
  open,
  setModalOpen
}) {
  return (
    <Modal
      onClose={() => setModalOpen(false)}
      onOpen={() => {
        setModalOpen(true);
      }}
      open={open}
      trigger={<Button secondary>Añadir miembro</Button>}
    >
      <Modal.Header>Añadir miembro</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={e => {
            handleEmail(e);
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
            <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
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
