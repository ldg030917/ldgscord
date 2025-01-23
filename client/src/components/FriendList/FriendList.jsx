import React, { useEffect, useState } from "react";
import { getFriends } from "../../services/api";
import BasicButton from "../BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

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
  
  const handleClick = (channelId) => {
    navigate(`/channels/@me/${channelId}`);
  };

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