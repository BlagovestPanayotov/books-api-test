const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const server = require('./server');


chai.use(chaiHttp);


describe('Books Api', () => {
  let bookId;
  //Verify Posting a Book

  it('should POST a book', (done) => {
    const book = { id: "1", title: "Test Book", author: "Test Author" };
    chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        expect(res,'Responce statust shoud be 201').to.have.status(201);
        expect(res.body,'res.body is an object').to.be.an('object');
        expect(res.body,'res.body have a property "id"').to.have.property('id');
        expect(res.body,'res.body have a property "title"').to.have.property('title');
        expect(res.body,'res.body have a property "author"').to.have.property('author');
        bookId = res.body.id;
        done();
      });
  });
});