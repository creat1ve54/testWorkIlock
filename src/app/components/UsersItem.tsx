import React from "react";
import { IUser } from "../../type";

const UsersItem = ({ user }: { user: IUser }) => {
  return (
    <div className="user-item">
      <h3 className="user-item__title">{user.name}</h3>
      <p className="user-item__bio">{user.bio}</p>
      <p className="user-item__role">{user.role}</p>
    </div>
  );
};

export default UsersItem;
