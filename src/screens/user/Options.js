import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Header from '../../components/common/header/Header';
import './options.scss';

const UserOptions = ({ user }) => {
  const [userData, setUserData] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  function onChange(e) {
    console.log(e);
    const { name, value } = e.target;
    setUserData(prevGroup => ({
      ...prevGroup,
      [name]: value
    }));
  }

  function formIsValid() {
    const { name, email } = userData;
    const errors = {};

    if (!name) errors.name = 'El nombre es necesario.';
    if (!email) errors.email = 'El email es necesario.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    console.log('Save');
    // saveBook(book)
    //   .then(() => {
    //     toast('Libro guardado');
    //     history.push('/');
    //   })
    //   .catch(error => {
    //     setSaving(false);
    //     setErrors({ onSave: error.message });
    //   });
  }

  return (
    <>
      <Header />
      <div className='mainContainer'>
        <h2>Opciones</h2>
        <Form onSubmit={handleSave} className='userForm'>
          {errors.onSave && (
            <Message error>
              <p>{errors.onSave}</p>
            </Message>
          )}
          <div className='userForm-fields'>
            <h3>Datos</h3>
            <Form.Field
              control={Input}
              name='name'
              label='Nombre'
              placeholder='Escribe el nombre'
              value={userData.name || ''}
              onChange={onChange}
              fluid
              error={
                errors.name
                  ? { content: errors.name, pointing: 'below' }
                  : false
              }
            ></Form.Field>
            <Form.Field
              control={Input}
              name='email'
              label='Email'
              placeholder='Escribe el email'
              value={userData.email || ''}
              onChange={onChange}
              fluid
              error={
                errors.email
                  ? { content: errors.email, pointing: 'below' }
                  : false
              }
            />
          </div>
          <div className='buttons mt7 mb7'>
            <Button type='submit' disabled={saving} secondary>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
          <h3>Acciones</h3>
          <div className='buttons mt7 mb7'>
            <Button basic color='black'>
              Cambiar contraseña
            </Button>
            <Button basic color='black'>
              Borrar cuenta
            </Button>
          </div>
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            Volver
          </Button>
        </Form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserOptions);
