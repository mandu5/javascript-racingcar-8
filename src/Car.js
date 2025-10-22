/**
 * 자동차 클래스
 */
class Car {
  /**
   * 자동차 생성자
   * @param {string} name - 자동차 이름
   */
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  /**
   * 자동차 이름을 검증합니다
   * @param {string} name - 자동차 이름
   * @throws {Error} 잘못된 자동차 이름일 경우
   */
  static validateName(name) {
    if (name === '') {
      throw new Error('[ERROR] 자동차 이름은 비어있을 수 없습니다.');
    }
    if (name.length > 5) {
      throw new Error('[ERROR] 자동차 이름은 5자 이하여야 합니다.');
    }
  }

  /**
   * 자동차를 전진시킵니다
   */
  move() {
    this.position++;
  }

  /**
   * 자동차의 현재 위치를 문자열로 반환합니다
   * @returns {string} 현재 위치를 나타내는 문자열
   */
  getPositionString() {
    return '-'.repeat(this.position);
  }

  /**
   * 자동차 정보를 문자열로 반환합니다
   * @returns {string} 자동차 이름과 위치
   */
  toString() {
    return `${this.name} : ${this.getPositionString()}`;
  }
}

export default Car;
