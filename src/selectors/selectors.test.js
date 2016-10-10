import expect from 'expect';
import {authorsFormattedForDropDown} from './selectors';

describe('Author selectors', ()=>{
   describe('authors formatted dropdown', ()=>{
       it("should return author data", ()=>{
          const authors = [
              {id: 'cory-house', lastName: 'House', firstName: 'Cory'}
          ];

           const expected = [
            {value: 'cory-house', text: "Cory House"}
           ];

           expect(authorsFormattedForDropDown(authors)).toEqual(expected);
       });
   });
});