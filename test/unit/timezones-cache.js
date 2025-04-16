import {afterEach, beforeEach, describe, it, expect, vi} from 'vitest';
import buildTimezone from '../../src/build-timezone.js';
import {timezones} from '../../src/data.json';

vi.mock('../../src/build-timezone.js', {spy: true});

const totalTimezones = Object.keys(timezones).length;

describe('Timezones cache', () => {
  let ct;

  beforeEach(async () => {
    ct = await import('../../src/index.js');
  });

  afterEach(() => {
    vi.resetModules();
    vi.resetAllMocks();
  });

  it('should call "buildTimezone" once when requesting a single timezone', () => {
    ct.getTimezone('America/New_York');
    expect(buildTimezone).toHaveBeenCalledTimes(1);
  });

  it('should call "buildTimezone" once when requesting the same timezone multiple times', () => {
    ct.getTimezone('America/New_York');
    ct.getTimezone('America/New_York');
    expect(buildTimezone).toHaveBeenCalledTimes(1);
  });

  it('should call "buildTimezone" method once for each timezone when requesting all', () => {
    ct.getAllTimezones();
    expect(buildTimezone).toHaveBeenCalledTimes(totalTimezones);
  });

  it('should cache all timezones to minimize "buildTimezone" calls', () => {
    ct.getAllTimezones();
    ct.getAllTimezones();
    expect(buildTimezone).toHaveBeenCalledTimes(totalTimezones);
  });

  it('should cache timezones incrementally', () => {
    ct.getTimezone('America/New_York');
    expect(buildTimezone).toHaveBeenCalledTimes(1);
    ct.getTimezone('America/New_York');
    expect(buildTimezone).toHaveBeenCalledTimes(1);
    ct.getTimezone('UTC');
    expect(buildTimezone).toHaveBeenCalledTimes(2);
    ct.getAllTimezones();
    expect(buildTimezone).toHaveBeenCalledTimes(totalTimezones);
    ct.getTimezone('America/New_York');
    expect(buildTimezone).toHaveBeenCalledTimes(totalTimezones);
    ct.getAllTimezones();
    expect(buildTimezone).toHaveBeenCalledTimes(totalTimezones);
  });
});
