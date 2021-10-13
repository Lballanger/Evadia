import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import API from '../../../api';
import userStore from '../../../store/user';

const DeleteAccount = () => {
  const history = useHistory();
  const setUser = userStore((state) => state.setUser);

  const handleDelete = async () => {
    try {
      const data = await API.deleteUser();
      history.push('/');
      setUser(null);
      toast.success('Votre compte a bien été supprimé');
    } catch (error) {
      console.log(error);
      toast.error('Une erreur est survenue');
    }
  };
  return (
    <button
      className="account__delete__btn"
      type="button"
      onClick={(e) =>
        window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?') &&
        handleDelete(e)
      }
    >
      Supprimer mon compte
    </button>
  );
};

export default DeleteAccount;
