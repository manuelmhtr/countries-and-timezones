import chai from 'chai';

declare global {
  namespace NodeJS {
    interface Global {
      expect: Chai.ExpectStatic;
    }
  }

  var expect: Chai.ExpectStatic;
}

globalThis.expect = chai.expect;
