import { MissionUtils } from '@woowacourse/mission-utils';
import Car from './Car.js';
import RacingGame from './RacingGame.js';

const ERROR_MESSAGES = {
  INVALID_ATTEMPT_COUNT: '[ERROR] 시도 횟수는 숫자여야 합니다.',
  INVALID_ATTEMPT_COUNT_RANGE: '[ERROR] 시도 횟수는 1 이상이어야 합니다.',
};

/**
 * 자동차 경주 게임 애플리케이션
 */
class App {
  /**
   * 애플리케이션 실행
   */
  async run() {
    const carNames = await this.getCarNames();
    const attemptCount = await this.getAttemptCount();

    MissionUtils.Console.print('\n실행 결과');
    this.playGame(carNames, attemptCount);
  }

  /**
   * 자동차 이름들을 입력받습니다
   * @returns {Promise<string[]>} 자동차 이름 배열
   */
  async getCarNames() {
    const input = await MissionUtils.Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)',
    );

    return this.parseCarNames(input);
  }

  /**
   * 시도 횟수를 입력받습니다
   * @returns {Promise<number>} 시도 횟수
   */
  async getAttemptCount() {
    const input = await MissionUtils.Console.readLineAsync(
      '시도할 횟수는 몇 회인가요?',
    );

    return this.parseAttemptCount(input);
  }

  /**
   * 자동차 이름 문자열을 파싱합니다
   * @param {string} input - 입력 문자열
   * @returns {string[]} 자동차 이름 배열
   */
  parseCarNames(input) {
    const carNames = input.split(',').map((name) => name.trim());

    this.validateCarNames(carNames);

    return carNames;
  }

  /**
   * 자동차 이름들을 검증합니다
   * @param {string[]} carNames - 자동차 이름 배열
   */
  validateCarNames(carNames) {
    carNames.forEach((name) => {
      Car.validateName(name);
    });
  }

  /**
   * 시도 횟수 문자열을 파싱합니다
   * @param {string} input - 입력 문자열
   * @returns {number} 시도 횟수
   */
  parseAttemptCount(input) {
    const attemptCount = parseInt(input.trim(), 10);

    if (Number.isNaN(attemptCount)) {
      throw new Error(ERROR_MESSAGES.INVALID_ATTEMPT_COUNT);
    }

    if (attemptCount < 1) {
      throw new Error(ERROR_MESSAGES.INVALID_ATTEMPT_COUNT_RANGE);
    }

    return attemptCount;
  }

  /**
   * 자동차 경주 게임을 진행합니다
   * @param {string[]} carNames - 자동차 이름 배열
   * @param {number} attemptCount - 시도 횟수
   */
  playGame(carNames, attemptCount) {
    const racingGame = new RacingGame(carNames);
    racingGame.play(attemptCount);
    racingGame.printWinners();
  }
}

export default App;
