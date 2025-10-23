import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  jest.spyOn(MissionUtils.Console, "readLineAsync").mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

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

describe("자동차 경주", () => {
  test("기능 테스트", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    console.log("Before app.run()");
    try {
      await app.run();
      console.log("After app.run()");
    } catch (error) {
      console.log("Error during app.run():", error);
    }

    // then
    console.log("logSpy calls:", logSpy.mock.calls);
    console.log(
      "MissionUtils.Console.readLineAsync calls:",
      MissionUtils.Console.readLineAsync.mock?.calls
    );
    console.log(
      "MissionUtils.Random.pickNumberInRange calls:",
      MissionUtils.Random.pickNumberInRange.mock?.calls
    );
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("예외 테스트", async () => {
    // given
    const inputs = ["pobi,javaji"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("공동 우승자 테스트", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni,jun", "1"];
    const logs = [
      "pobi : -",
      "woni : -",
      "jun : -",
      "최종 우승자 : pobi, woni, jun",
    ];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("자동차 이름 비어있음 에러", async () => {
    // given
    const inputs = ["pobi,,jun"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수 음수 에러", async () => {
    // given
    const inputs = ["pobi,woni", "-1"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름 공백만 있는 경우", async () => {
    // given
    const inputs = ["pobi, ,jun"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름이 정확히 5자인 경우", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["abcde,fghij", "1"];
    const logs = ["abcde : -", "fghij : ", "최종 우승자 : abcde"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("시도 횟수가 매우 큰 경우", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1000"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    // 1000번의 랜덤값 생성 (대부분 STOP으로 설정)
    const randomValues = Array(2000).fill(STOP);
    mockRandoms(randomValues);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("최종 우승자"));
  });
});
