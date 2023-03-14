import { compareUsage } from ".";

describe('compareUsage', () => {
  it("should compare a client's usage between a given year and a previous one", () => {
    expect(compareUsage('1920', 2016, 1)).toEqual({ change: -20, laterAmount: 50 });
  });
});
