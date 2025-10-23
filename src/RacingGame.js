import { MissionUtils } from '@woowacourse/mission-utils';
import Car from './Car.js';

// 상수 정의
const MOVE_THRESHOLD = 4;
const RANDOM_MIN = 0;
const RANDOM_MAX = 9;

/**
 * 자동차 경주 게임 클래스
 */
class RacingGame {
  /**
   * 자동차 경주 게임 생성자
   * @param {string[]} carNames - 자동차 이름 배열
   */
  constructor(carNames) {
    this.cars = carNames.map((name) => new Car(name));
  }

  /**
   * 자동차 경주 게임을 진행합니다
   * @param {number} attemptCount - 시도 횟수
   */
  play(attemptCount) {
    for (let i = 0; i < attemptCount; i++) {
      this.playRound();
    }
  }

  /**
   * 한 라운드를 진행합니다
   */
  playRound() {
    this.cars.forEach((car) => {
      const randomValue = MissionUtils.Random.pickNumberInRange(
        RANDOM_MIN,
        RANDOM_MAX,
      );

      if (randomValue >= MOVE_THRESHOLD) {
        car.move();
      }
    });

    this.printRoundResult();
  }

  /**
   * 라운드 결과를 출력합니다
   */
  printRoundResult() {
    this.cars.forEach((car) => {
      MissionUtils.Console.print(car.toString());
    });
    MissionUtils.Console.print('');
  }

  /**
   * 우승자를 찾습니다
   * @returns {Car[]} 우승자 자동차 배열
   */
  getWinners() {
    if (this.cars.length === 0) {
      return [];
    }

    let maxPosition = this.cars[0].position;
    for (let i = 1; i < this.cars.length; i++) {
      if (this.cars[i].position > maxPosition) {
        maxPosition = this.cars[i].position;
      }
    }

    return this.cars.filter((car) => car.position === maxPosition);
  }

  /**
   * 우승자를 출력합니다
   */
  printWinners() {
    const winners = this.getWinners();
    const winnerNames = winners.map((car) => car.name).join(', ');
    MissionUtils.Console.print(`최종 우승자 : ${winnerNames}`);
  }
}

export default RacingGame;
