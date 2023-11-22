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

  it('shold PUT an existing book', (done) => {
    const bookUpdate = { id: bookId, title: "Updated Test Book", author: "Updated Test Author" };
    chai.request(server)
      .put(`/books/${bookId}`)
      .send(bookUpdate)
      .end((err, res) => {
        expect(res, 'Responce status shoud be 200').to.have.status(200);
        expect(res.body, 'res.body is an object').to.be.an('object');
        expect(res.body.id, 'res.body has correct "id" property').to.be.equal(bookUpdate.id);
        expect(res.body.title, 'res.body has correct "title" property').to.be.equal(bookUpdate.title);
        expect(res.body.author, 'res.body has correct "author" property').to.be.equal(bookUpdate.author);
        done();
      });
  });

  it('should Delete a single book', (done) => {
    chai.request(server)
      .delete(`/books/${bookId}`)
      .end((err, res) => {
        expect(res, 'Responce status shoud be 204').to.have.status(204);
        done();
      });
  });

  it('should return 404 when trying to GET, PUT or DELETE a non-existing book', (done) => {
    chai.request(server)
      .get('/books/9999')
      .end((err, res) => {
        expect(res).to.have.status(404);
      });

    const nonExistingBook = { id: "999", title: "Non-existing Book", author: "Non-existing Author" };
    chai.request(server)
      .put('/books/9999')
      .send(nonExistingBook)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });

    chai.request(server)
      .delete('/books/9999')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

});