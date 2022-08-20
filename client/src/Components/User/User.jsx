import React from "react";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const User = ({ person, id }) => {
  return (
    <div className="follower" key={id}>
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button className="button fc-button">Follow</button>
    </div>
  );
};

export default User;
