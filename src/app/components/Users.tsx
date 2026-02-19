import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { usersThunk } from "../../redux/users/usersSlice";
import UsersItem from "./UsersItem";

const Users = ({ onClose }: { onClose: () => void }) => {
  const { users, isLoading, error } = useAppSelector(
    (state) => state.usersSlice,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersThunk());
  }, [dispatch]);

  return (
    <div className="users">
      {isLoading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="users__list">
          {users.map((user) => (
            <li key={user.id} className="users__item">
              <UsersItem user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
