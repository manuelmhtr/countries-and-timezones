const sinon = require('sinon');
const proxyquire = require('proxyquire');
const data = require('../../src/data.json');
const totalTimezones = Object.keys(data.timezones).length;
const buildTimezoneMock = sinon.spy(function(data, name) {
  return { name };
});

describe('Timezones cache', () => {
  let ct;

  beforeEach(() => {
    buildTimezoneMock.resetHistory();

    ct = proxyquire('../../src', {
      './build-timezone': buildTimezoneMock
    });
  });

  it('should call "buildTimezone" once when requesting a single timezone', () => {
    ct.getTimezone('America/New_York');
    expect(buildTimezoneMock.callCount).to.be.equal(1);
  });

  it('should call "buildTimezone" once when requesting the same timezone multiple times', () => {
    ct.getTimezone('America/New_York');
    ct.getTimezone('America/New_York');
    expect(buildTimezoneMock.callCount).to.be.equal(1);
  });

  it('should call "buildTimezone" method once for each timezone when requesting all', () => {
    ct.getAllTimezones();
    expect(buildTimezoneMock.callCount).to.be.equal(totalTimezones);
  });

  it('should cache all timezones to minimize "buildTimezone" calls', () => {
    ct.getAllTimezones();
    ct.getAllTimezones();
    expect(buildTimezoneMock.callCount).to.be.equal(totalTimezones);
  });

  it('should cache timezones incrementally', () => {
    ct.getTimezone('America/New_York');
    expect(buildTimezoneMock.callCount).to.be.equal(1);
    ct.getTimezone('America/New_York');
    expect(buildTimezoneMock.callCount).to.be.equal(1);
    ct.getTimezone('UTC');
    expect(buildTimezoneMock.callCount).to.be.equal(2);
    ct.getAllTimezones();
    expect(buildTimezoneMock.callCount).to.be.equal(totalTimezones);
    ct.getTimezone('America/New_York');
    expect(buildTimezoneMock.callCount).to.be.equal(totalTimezones);
    ct.getAllTimezones();
    expect(buildTimezoneMock.callCount).to.be.equal(totalTimezones);
  });
});
