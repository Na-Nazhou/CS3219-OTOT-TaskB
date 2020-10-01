import { expect, server, BASE_URL } from './setup';

describe('Testing the qupte endpoints:', () => {
  it('should create a quote', (done) => {
    const quote = {
      content: 'A quote',
    };
    server
      .post(`${BASE_URL}/`)
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
      .send(quote)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should get all quotes', (done) => {
    server.get(`${BASE_URL}/`).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.instanceOf(Array);
      res.body.data.forEach((data) => {
        expect(data).to.have.property('id');
        expect(data).to.property('content');
      });
      done();
    });
  });

  it('should get a particular quote', (done) => {
    const quoteId = 1;
    server.get(`${BASE_URL}/${quoteId}`).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property('id');
      expect(res.body.data).to.have.property('content');
      done();
    });
  });

  it('should not get a particular quote with invalid id', (done) => {
    const quoteId = 8888;
    server.get(`${BASE_URL}/${quoteId}`).end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        'message',
        `Cannot find quote with the id ${quoteId}`
      );
      done();
    });
  });

  it('should not get a particular quote with non-numeric id', (done) => {
    const quoteId = 'aaa';
    server.get(`${BASE_URL}/${quoteId}`).end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'message',
        'Please input a valid numeric value'
      );
      done();
    });
  });

  it('should update a quote', (done) => {
    const quoteId = 1;
    const updatedQuote = {
      id: quoteId,
      content: 'Updated Quote',
    };
    server
      .put(`${BASE_URL}/${quoteId}`)
      .send(updatedQuote)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedQuote.id);
        expect(res.body.data.content).equal(updatedQuote.content);
        done();
      });
  });

  it('should not update a quote with invalid id', (done) => {
    const quoteId = '9999';
    const updatedQuote = {
      id: quoteId,
      content: 'Updated Quote',
    };
    server
      .put(`${BASE_URL}/${quoteId}`)
      .send(updatedQuote)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property(
          'message',
          `Cannot find quote with the id: ${quoteId}`
        );
        done();
      });
  });

  it('should not update a quote with non-numeric id value', (done) => {
    const quoteId = 'ggg';
    const updatedQuote = {
      id: quoteId,
      content: 'Updated Quote',
    };
    server
      .put(`${BASE_URL}/${quoteId}`)
      .send(updatedQuote)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property(
          'message',
          `Please input a valid numeric value`
        );
        done();
      });
  });

  it('should delete a quote', (done) => {
    const quoteId = 1;
    server.delete(`${BASE_URL}/${quoteId}`).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.include({});
      done();
    });
  });

  it('should not delete a quote with invalid id', (done) => {
    const quoteId = 999;
    server.delete(`${BASE_URL}/${quoteId}`).end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        'message',
        `Quote with the id ${quoteId} cannot be found`
      );
      done();
    });
  });

  it('should not delete a quote with non-numeric id value', (done) => {
    const quoteId = 'ggg';
    server.delete(`${BASE_URL}/${quoteId}`).end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'message',
        'Please provide a numeric value'
      );
      done();
    });
  });
});
