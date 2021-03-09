import React, { useEffect, useState } from 'react';
import { Button, Modal, Radio } from 'semantic-ui-react';

import './changeColor.scss';
import { colors } from './groupColors';

function ChangeColor({ group, handleColor }) {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const handleColorChange = (event, { value }) => setValue(value);
  const [userColors, setUserColors] = useState({});

  useEffect(() => {
    if (selectedGroup !== null) {
      setUserColors(
        selectedGroup.users.map(groupUser => groupUser.pivot.color)
      );
    }
  }, [selectedGroup]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={e => {
        setSelectedGroup(group);
        setOpen(true);
      }}
      open={open}
      trigger={
        <Button basic color='black'>
          Cambiar de color
        </Button>
      }
    >
      <Modal.Header>Cambiar de color</Modal.Header>
      <Modal.Content>
        <ul>
          {userColors.length > 0
            ? colors.map(color => {
                return (
                  <li key={color.color} className='flex-center height-pad'>
                    {userColors.includes(
                      color.color.substr(1, color.color.length)
                    ) ? (
                      <>
                        <Radio
                          name='color'
                          value={color.color}
                          checked={value === color.color}
                          onChange={handleColorChange}
                          disabled
                        />
                        <span
                          className={`colorOption disabled ${color.class}`}
                          data-color={color.color}
                        ></span>
                      </>
                    ) : (
                      <>
                        <Radio
                          name='color'
                          value={color.color}
                          checked={value === color.color}
                          onChange={handleColorChange}
                        />
                        <span
                          className={`colorOption ${color.class}`}
                          data-color={color.color}
                          data-selected={value === color.color}
                          onClick={() => {
                            setValue(color.color);
                          }}
                        ></span>
                      </>
                    )}
                  </li>
                );
              })
            : ''}
        </ul>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Volver</Button>
        <Button
          onClick={() => {
            handleColor(value, selectedGroup.id);
            setOpen(false);
          }}
          secondary
        >
          Aceptar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ChangeColor;
