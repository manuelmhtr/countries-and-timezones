import sinon from 'sinon';
import proxyquire from 'proxyquire';
import buildTimezone from '../../src/build-timezone';
import { timezones } from '../../src/data.json';

const totalTimezones = Object.keys(timezones).length;

describe('Timezones cache', () => {
  const buildTimezoneSpy = sinon.spy(buildTimezone);
  let ct;

  beforeEach(() => {
    buildTimezoneSpy.resetHistory();
    ct = proxyquire('../../src', {
      './build-timezone': {
        __esModule: true,
        default: buildTimezoneSpy
      }
    });
  });

  it('should call "buildTimezone" once when requesting a single timezone', () => {
    ct.getTimezone('America/New_York');
    expect(buildTimezoneSpy.callCount).to.be.equal(1);
  });

  it('should call "buildTimezone" once when requesting the same timezone multiple times', () => {
    ct.getTimezone('America/New_York');
    ct.getTimezone('America/New_York');
    expect(buildTimezoneSpy.callCount).to.be.equal(1);
  });

  it('should call "buildTimezone" method once for each timezone when requesting all', () => {
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).to.be.equal(totalTimezones);
  });

  it('should cache all timezones to minimize "buildTimezone" calls', () => {
    ct.getAllTimezones();
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).to.be.equal(totalTimezones);
  });

  it('should cache timezones incrementally', () => {
    ct.getTimezone('America/New_York');
    expect(buildTimezoneSpy.callCount).to.be.equal(1);
    ct.getTimezone('America/New_York');
    expect(buildTimezoneSpy.callCount).to.be.equal(1);
    ct.getTimezone('UTC');
    expect(buildTimezoneSpy.callCount).to.be.equal(2);
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).to.be.equal(totalTimezones);
    ct.getTimezone('America/New_York');
    expect(buildTimezoneSpy.callCount).to.be.equal(totalTimezones);
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).to.be.equal(totalTimezones);
  });
});
