const clashController = require('../controllers/clashController');

test('getClashRoyaleList', ()=> {

 var listOfClashData =  clashController.getClashRoyaleList();
  expect(listOfClashData).not.toBe(null);

});


test('clashroyaleapi not null', ()=> {

  var listOfClashData =  clashController.clashroyaleapi();
   expect(listOfClashData).not.toBe(null);
 
 });



 
