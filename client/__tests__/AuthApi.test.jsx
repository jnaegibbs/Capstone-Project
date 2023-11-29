
/**
 * @jest-environment jsdom
 */
import tokenReducer, { logout } from "../redux/tokenSlice";


test("should return the initial state", () => {
  expect(tokenReducer(undefined,{type:undefined})).toEqual(
    {token:null,user:null}
  )
});

// test('should handle a token and user being added to an tokenSlice', () => {
//     const previousState = {}
  
//     expect(tokenReducer(previousState,)).toEqual([
//       { text: 'Run the tests', completed: false, id: 0 }
//     ])
//   })
