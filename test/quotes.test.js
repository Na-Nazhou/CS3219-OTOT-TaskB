import { expect, server, BASE_URL } from './setup';

describe('Testing the qupte endpoints:', () => {
  it('should create a quote', (done) => {
    const quote = {
      content: 'A quote',
    };

    server
      .post(`${BASE_URL}/`)
      .set('Accept', 'application/json')
      .send(quote)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          content: quote.content,
        });
        done();
      });
  });

  it('should not create a quote with incomplete parameters', (done) => {
    const quote = {
      content: '',
    };
    server
      .post(`${BASE_URL}/`)
      .set('Accept', 'application/json')
      .send(quote)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
