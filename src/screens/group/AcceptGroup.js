import CryptoJS from 'crypto-js';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { saveGroupUser } from '../../api/groupApi';

function AcceptGroup({ history, location }) {
  useEffect(() => {
    const params = location.search;
    const token = params.substr(7, params.length);
    const bytes = CryptoJS.AES.decrypt(token, process.env.REACT_APP_SECRET);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    acceptGroup(decrypted);
  });

  function acceptGroup(decrypted) {
    const groupUser = {
      email: decrypted.email,
      group_id: decrypted.groupId,
      color: decrypted.color
    };
    saveGroupUser(groupUser)
      .then(() => {
        toast(`Usuario añadido al grupo ${decrypted.groupName}`);
        history.push('/login');
      })
      .catch(error => {
        toast(error.message);
      });
  }

  return <p>Guardando en grupo...</p>;
}

export default AcceptGroup;
