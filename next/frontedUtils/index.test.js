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
  const now = Math.floor(new Date().getTime() / 1000) * 1000;
  expect(timeDuration(now)).toBe("0 sec ago");
  expect(timeDuration(now - 61 * 1000)).toBe("1 min 1 sec ago");
  expect(timeDuration(now - 3661 * 1000)).toBe("1 hr 1 min ago");
  expect(timeDuration(now - 90000 * 1000)).toBe("1 day 1 hr ago");
  expect(timeDuration(now - Math.pow(10, 10))).toBe("3 mons ago");
  expect(timeDuration(now - Math.pow(10, 11))).toBe("3 years 2 mons ago");
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
