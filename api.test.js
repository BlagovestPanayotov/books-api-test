const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const server = require('./server');


chai.use(chaiHttp);