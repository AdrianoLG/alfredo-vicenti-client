import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

function MenuDropdown() {
  const history = useHistory();

  function handleItemClick(e, { name }) {
    switch (name) {
      case 'groups':
        history.push('/usuario/grupos');
        break;
      case 'options':
        console.log('opciones');
        break;
      case 'logout':
        console.log('desconectarse');
        break;
      default:
        console.log('fuera');
    }
  }

  return (
    <Menu id='menu'>
      <Dropdown item icon='bars' size='large'>
        <Dropdown.Menu>
          <Dropdown.Item name='groups' onClick={handleItemClick}>
            <Icon name='group' size='small' />
            Grupos
          </Dropdown.Item>
          <Dropdown.Item name='options' onClick={handleItemClick}>
            <Icon name='cog' size='small' />
            Opciones
          </Dropdown.Item>
          <Dropdown.Item name='logout' onClick={handleItemClick}>
            <Icon name='shutdown' size='small' />
            Desconectar
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

export default MenuDropdown;
