import { expect } from "chai";
import testUtils from "./utils";

describe("application launch", () => {
  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('should open initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      expect(count).to.equal(1);
    })
  });

  it("should render #markdown div on start", function() {
    return this.app.client.element('#markdown').then((element) => {
      expect(element).to.not.equal(null);
    });
  });


  it("should render hidden #teacher-input", function() {
    return this.app.client.getText('#teacher-input').then((element) => {
      console.log(element);
      expect(element).to.not.equal(null);
      // element.getCssProperty('display');

    })
  })
});
