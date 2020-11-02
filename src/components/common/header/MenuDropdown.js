import React from 'react';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

const MenuDropdown = () => (
  <Menu id='menu'>
    <Dropdown item icon='bars' size='large'>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Icon name='group' size='small' />
          Grupos
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='cog' size='small' />
          Opciones
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='shutdown' size='small' />
          Desconectar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
);

export default MenuDropdown;
