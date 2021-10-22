import {
  addressEllipsis,
  fromSymbolUnit,
  isEmpty,
  timeDuration,
  toFixedPrecision,
  toPrecision,
} from "./index";

test("addressEllipsis", () => {
  const address = "hahahahahaha";
  expect(addressEllipsis(address)).toBe(`haha...haha`);
});

test("timeDuration", () => {
  Date.now = jest.fn(() => new Date().getTime());
  expect(["0 sec ago", "a few secs ago"]).toContain(
    timeDuration(new Date().getTime())
  );
});

test("toFixedPrecision", () => {
  expect(toFixedPrecision("3.1415926", 0, 1)).toBe("3.1");
});

test("toPrecision", () => {
  expect(toPrecision("314", 2)).toBe("3.14");
});

test("isEmpty", () => {
  expect(isEmpty(undefined)).toBe(true);
});

test("fromSymbolUnit", () => {
  expect(fromSymbolUnit(10000000000, "DOT")).toBe("1");
});
