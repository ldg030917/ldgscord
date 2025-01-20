const formatDate = (timestamp) => {
    const date = new Date(timestamp);
  
    // 날짜와 시간을 원하는 형식으로 포맷
    const options = {
      day: '2-digit',       // 25
      month: '2-digit',     // 01
      year: '2-digit',      // 12
      hour: '2-digit',      // 07
      minute: '2-digit',    // 54
      hour12: true          // 오후/오전 포맷
    };
  
    return date.toLocaleString('ko-KR', options).replace(',', ''); // 'ko-KR'로 한국어 형식
  };

module.exports = { formatDate };
