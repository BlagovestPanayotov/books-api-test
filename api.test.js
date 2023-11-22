const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const server = require('./server');


chai.use(chaiHttp);


describe('Books Api', () => {
  let bookId;

  it('should POST a book', (done) => {
    const book = { id: "1", title: "Test Book", author: "Test Author" };
    chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        expect(res, 'Responce statust shoud be 201').to.have.status(201);
        expect(res.body, 'res.body is an object').to.be.an('object');
        expect(res.body, 'res.body have a property "id"').to.have.property('id');
        expect(res.body, 'res.body have a property "title"').to.have.property('title');
        expect(res.body, 'res.body have a property "author"').to.have.property('author');
        bookId = res.body.id;
        done();
      });
  });

  it('should GET all books', (done) => {
    chai.request(server)
      .get('/books')
      .end((err, res) => {
        expect(res, 'Responce status shoud be 200').to.have.status(200);
        expect(res.body, 'res.body is array').to.be.an('array');
        done();
      });
  });

  it('should GET a single book', (done) => {
    chai.request(server)
      .get(`/books/${bookId}`)
      .end((err, res) => {
        expect(res, 'Responce status shoud be 200').to.have.status(200);
        expect(res.body, 'res.body is an object').to.be.an('object');
        expect(res.body, 'res.body have a property "id"').to.have.property('id');
        expect(res.body, 'res.body have a property "title"').to.have.property('title');
        expect(res.body, 'res.body have a property "author"').to.have.property('author');
        expect(res.body.id, 'res.body has to be correct').to.be.equal(bookId);
        done();
      });
  });
});