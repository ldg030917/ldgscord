import React, { useEffect, useState } from "react";
import { getFriends } from "../../services/api";
import BasicButton from "../BasicButton/BasicButton";

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    console.log('ff:', friends);
    console.log('Is array:', Array.isArray(friends));
    const fetchFriend = async () => {
      const data = await getFriends();
      setFriends(data);
    };
    fetchFriend();
    console.log('f2f:', friends);
    console.log('Is array:', Array.isArray(friends));
  }, []);
  
  return (
    <>
      <p>친구 목록</p>
      {friends.map((friend, index) => (
        <BasicButton key={index}>{friend.id}</BasicButton>
      ))}
    </>
  );
}

export default FriendList;