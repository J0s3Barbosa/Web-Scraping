const nock = require('nock');

it('should return a user', () => {
  
    nock('https://randomuser.me')
      .get('/api/')
      .reply(200, {
        results: [{ name: 'Dominic' }],
      });
    return query
      .getRandomUser()
      .then(res => res.results[0].name)
      .then(res => expect(res).toEqual('Dominic'));
  });


  
