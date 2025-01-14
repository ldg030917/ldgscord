class SimpleSnowflake {
  constructor() {
    this.EPOCH = 1420070400000n;   // 기준 시간 (2015년 1월 1일)
    this.MAX_SEQUENCE = 4095n; // 최대 시퀀스 번호 (4095)
    this.sequence = 0n;   // 시퀀스 번호 초기화
    this.lastTimestamp = 0n; // 마지막 타임스탬프 초기화
  }

  generateID() {
    let timestamp = BigInt(Date.now());  // 현재 시간 밀리초
    if (timestamp === this.lastTimestamp) {
      // 같은 밀리초 내에서 생성된 ID가 있다면 시퀀스를 증가
      this.sequence = (this.sequence + 1n) & this.MAX_SEQUENCE;
      if (this.sequence === 0n) {
        // 같은 밀리초 내에서 더 이상 ID를 생성할 수 없다면 다음 밀리초로 대기
        timestamp = this.waitForNextMillis(this.lastTimestamp);
      }
    } else {
      // 다른 밀리초일 경우 시퀀스를 초기화
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    // Snowflake ID 생성 (단일 데이터 센터와 서버 ID 가정)
    const dataCenterID = BigInt(1);  // 고정값 (단일 데이터 센터)
    const serverID = BigInt(1);      // 고정값 (단일 서버)

    // Snowflake ID 계산
    let id = (timestamp - this.EPOCH) << 22n;
    id |= (dataCenterID << 17n);
    id |= (serverID << 12n);
    id |= this.sequence;

    return id;
  }
  
  waitForNextMillis(lastTimestamp) {
    let timestamp = BigInt(Date.now());
    while (timestamp <= lastTimestamp) {
      timestamp = BigInt(Date.now());
    }
    return timestamp;
  }
}

module.exports = SimpleSnowflake;