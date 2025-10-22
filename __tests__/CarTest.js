import Car from "../src/Car.js";

describe("Car 클래스", () => {
  test("자동차 생성", () => {
    const car = new Car("pobi");

    expect(car.name).toBe("pobi");
    expect(car.position).toBe(0);
  });

  test("자동차 이동", () => {
    const car = new Car("pobi");

    car.move();
    expect(car.position).toBe(1);

    car.move();
    expect(car.position).toBe(2);
  });

  test("자동차 위치 문자열", () => {
    const car = new Car("pobi");

    expect(car.getPositionString()).toBe("");

    car.move();
    expect(car.getPositionString()).toBe("-");

    car.move();
    expect(car.getPositionString()).toBe("--");
  });

  test("자동차 toString", () => {
    const car = new Car("pobi");

    expect(car.toString()).toBe("pobi : ");

    car.move();
    expect(car.toString()).toBe("pobi : -");
  });

  test("자동차 이름 검증 - 정상", () => {
    expect(() => Car.validateName("pobi")).not.toThrow();
    expect(() => Car.validateName("abcde")).not.toThrow();
  });

  test("자동차 이름 검증 - 빈 문자열", () => {
    expect(() => Car.validateName("")).toThrow(
      "[ERROR] 자동차 이름은 비어있을 수 없습니다."
    );
  });

  test("자동차 이름 검증 - 길이 초과", () => {
    expect(() => Car.validateName("abcdef")).toThrow(
      "[ERROR] 자동차 이름은 5자 이하여야 합니다."
    );
  });
});
