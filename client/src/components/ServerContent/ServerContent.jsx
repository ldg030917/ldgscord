// components/ServerContent/ServerContent.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ServerContent.css';
import { getServerContent } from '../../services/api';

function ServerContent() {
  const { serverId } = useParams();
  const [serverContent, setServerContent] = useState(null);

  useEffect(() => {
    // 서버 콘텐츠를 백엔드에서 받아오기
    const fetchServerContent = async () => {
      const data = await getServerContent(serverId);
      setServerContent(data);
    };

    fetchServerContent();
  }, [serverId]);

  if (!serverContent) {
    return <h2>Loading server content...</h2>;
  }

  return (
    <div className="server-content">
      <h1>{serverContent.name}</h1>
      <p>{serverContent.description}</p>
      {/* 서버의 추가 콘텐츠를 여기에 렌더링 */}
    </div>
  );
}

export default ServerContent;
