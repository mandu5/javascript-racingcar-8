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
});
