import React, { useEffect } from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';

import AddGroupMember from './AddGroupMember';
import ChangeColor from './ChangeColor';
import DeleteGroupMember from './DeleteGroupMember';
import './groupList.scss';

function GroupList({
  user,
  onClick,
  handleColor,
  handleEmail,
  handleMailChange,
  email,
  savingUser,
  errors
}) {
  useEffect(() => {}, [user]);

  return (
    <>
      <h2>Grupos</h2>
      <Grid>
        <Grid.Row>
          {user.groups !== undefined && user.groups.length > 0 ? (
            user.groups.map(group => (
              <Grid.Column
                key={group.id}
                mobile={8}
                tablet={4}
                computer={4}
                className='height-pad'
              >
                <div className='group'>
                  <div>
                    <h3>{group.name}</h3>
                    <ul className='groupUsers'>
                      {group.users.length > 0
                        ? group.users.map(groupUser => (
                            <li
                              key={`${groupUser.pivot.group_id}-${groupUser.pivot.user_id}`}
                              data-group={groupUser.pivot.group_id}
                            >
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
                                <DeleteGroupMember
                                  groupId={groupUser.pivot.group_id}
                                  groupName={group.name}
                                  userId={groupUser.pivot.user_id}
                                  userName={groupUser.name}
                                />
                              ) : (
                                ''
                              )}
                            </li>
                          ))
                        : ''}
                    </ul>
                    {group.admin === user.id ? (
                      <div id={group.id} className='buttons flex-row'>
                        <Button
                          color='black'
                          basic
                          onClick={e => {
                            onClick(e, 'delete', {
                              groupId: group.id,
                              groupName: group.name
                            });
                          }}
                        >
                          Eliminar grupo
                        </Button>
                        <ChangeColor
                          group={group}
                          user={user}
                          handleColor={handleColor}
                        />
                        <AddGroupMember
                          handleEmail={handleEmail}
                          handleMailChange={handleMailChange}
                          email={email}
                          savingUser={savingUser}
                          errors={errors}
                          group={group}
                          name={user.name}
                        />
                      </div>
                    ) : (
                      <div className='buttons flex-row'>
                        <Button
                          basic
                          color='black'
                          onClick={e => {
                            onClick(e, 'quit', {
                              groupName: group.name,
                              groupId: group.id,
                              userId: user.id
                            });
                          }}
                        >
                          Salir de grupo
                        </Button>
                        <ChangeColor
                          group={group}
                          user={user}
                          handleColor={handleColor}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Grid.Column>
            ))
          ) : (
            <Grid.Column mobile={12} className='height-pad mb7'>
              Todavía no perteneces a ningún grupo. ¡Crea uno!
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default GroupList;
