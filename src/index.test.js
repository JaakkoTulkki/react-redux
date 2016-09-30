import expect from 'expect';

describe("Our first test", ()=>{
    it('this should pass', ()=>{
        expect(true).toEqual(true, "chicken, error message");
    });
});