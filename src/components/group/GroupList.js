import React, { useEffect } from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';

function GroupList({ user }) {
  useEffect(() => {}, [user]);

  function addUser(groupId) {
    console.log(`groupId: ${groupId}`);
  }

  function chooseColor(groupId, userId) {
    console.log(`groupId: ${groupId}, userId: ${userId}`);
  }

  function deleteGroup(groupId) {
    console.log(`groupId: ${groupId}`);
  }

  function deleteUser(groupId, userId) {
    console.log(`groupId: ${groupId}, userId: ${userId}`);
  }

  function quitGroup(groupId, userId) {
    console.log(`groupId: ${groupId}, userId: ${userId}`);
  }

  return (
    <>
      <h2>Grupos</h2>
      <Grid>
        <Grid.Row>
          {user.groups
            ? user.groups.map(group => (
                <Grid.Column
                  mobile={8}
                  tablet={4}
                  computer={4}
                  className='height-pad'
                >
                  <div className='group'>
                    <div>
                      <h3>{group.name}</h3>
                      <ul className='groupUsers'>
                        {group.users.map(groupUser => (
                          <>
                            <li data-group={groupUser.pivot.group_id}>
                              <span
                                className='groupUser-color'
                                style={{
                                  backgroundColor: '#' + groupUser.pivot.color
                                }}
                              ></span>
                              <span>{groupUser.name}</span>
                              {group.admin === groupUser.pivot.user_id ? (
                                <Icon name='key' />
                              ) : (
                                ''
                              )}{' '}
                              {group.admin === user.id &&
                              group.admin !== groupUser.pivot.user_id ? (
                                <Button
                                  icon
                                  size='mini'
                                  className='deleteButton'
                                  color='black'
                                  onClick={() =>
                                    deleteUser(
                                      groupUser.pivot.group_id,
                                      groupUser.pivot.user_id
                                    )
                                  }
                                >
                                  <Icon name='close' />
                                </Button>
                              ) : (
                                ''
                              )}
                            </li>
                          </>
                        ))}
                      </ul>
                      {group.admin === user.id ? (
                        <div className='buttons flex-row'>
                          <Button
                            color='black'
                            onClick={() => deleteGroup(group.id)}
                          >
                            Eliminar grupo
                          </Button>
                          <Button
                            onClick={() => chooseColor(group.id, user.id)}
                          >
                            Escoger color
                          </Button>
                          <Button secondary onClick={() => addUser(group.id)}>
                            Añadir miembro
                          </Button>
                        </div>
                      ) : (
                        <div className='buttons flex-row'>
                          <Button
                            color='black'
                            onClick={() => quitGroup(group.id, user.id)}
                          >
                            Salir de grupo
                          </Button>
                          <Button
                            onClick={() => chooseColor(group.id, user.id)}
                          >
                            Escoger color
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Grid.Column>
              ))
            : ''}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default GroupList;
