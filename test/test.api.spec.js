var assert = require('assert');

describe('Basic Mocha String Test', function () {

 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 5);
    });

 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });

    it('test palindrom', function () {
        var word = 'noon'
        var reverseStr = word.split('').reverse().join(''); 
        assert.equal("noon",  reverseStr);
    });

    it('test palindrom using for', function () {
        var word = 'A man, a plan, a canal. Panama'
        str = formatNoSpace(word) 

        var wordToCompare = 'A man, a plan, a canal. Panama'
        wordToCompare =  formatNoSpace(wordToCompare)

        assert.equal(wordToCompare,  str);
    });

  function formatNoSpace(str) {
        var re = /[^A-Za-z0-9]/g;
        str = str.toLowerCase().replace(re, '');
        return str;
       }


});
