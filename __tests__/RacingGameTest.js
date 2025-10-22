import RacingGame from "../src/RacingGame.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockRandoms = (numbers) => {
  jest
    .spyOn(MissionUtils.Random, "pickNumberInRange")
    .mockImplementation(() => {
      return numbers.shift();
    });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("RacingGame 클래스", () => {
  test("경주 게임 생성", () => {
    const racingGame = new RacingGame(["pobi", "woni"]);

    expect(racingGame.cars).toHaveLength(2);
    expect(racingGame.cars[0].name).toBe("pobi");
    expect(racingGame.cars[1].name).toBe("woni");
  });

  test("경주 게임 진행", () => {
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const racingGame = new RacingGame(["pobi", "woni"]);
    const logSpy = getLogSpy();

    mockRandoms([MOVING_FORWARD, STOP]);

    racingGame.play(1);

    expect(racingGame.cars[0].position).toBe(1);
    expect(racingGame.cars[1].position).toBe(0);
  });

  test("우승자 찾기", () => {
    const racingGame = new RacingGame(["pobi", "woni", "jun"]);

    racingGame.cars[0].move(); // pobi: 1
    racingGame.cars[1].move(); // woni: 1
    racingGame.cars[1].move(); // woni: 2
    racingGame.cars[2].move(); // jun: 1

    const winners = racingGame.getWinners();
    expect(winners).toHaveLength(1);
    expect(winners[0].name).toBe("woni");
  });

  test("공동 우승자", () => {
    const racingGame = new RacingGame(["pobi", "woni"]);

    racingGame.cars[0].move(); // pobi: 1
    racingGame.cars[1].move(); // woni: 1

    const winners = racingGame.getWinners();
    expect(winners).toHaveLength(2);
    expect(winners.map((car) => car.name)).toEqual(["pobi", "woni"]);
  });
});
