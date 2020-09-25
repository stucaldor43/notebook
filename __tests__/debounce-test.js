const { default: debounce } = require("../src/js/utils/debounce");

describe("debounce function", function () {
  it("works properly", function (done) {
    const mockFn = jest.fn();
    
    expect(mockFn).toHaveBeenCalledTimes(0);
    
    const fn = debounce(mockFn, 300);
    fn();
    
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 500)
  });
})