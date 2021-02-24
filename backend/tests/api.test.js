const { describe, it, before, afterEach } = require('mocha')
const { createSandbox } = require('sinon')
const assert = require('assert')
const request = require('supertest')
const devsMock = require('./mocks/devs.json')
const server = require('./../src/server')
const devModel = require('./../src/models/Dev')
const axios = require('axios')
const devMock = require('./mocks/dev.json')
const createdDev = require('./mocks/createdDev.json')
const githubUser = require('./mocks/githubUser.json')

describe('server', () => {
  let sandbox

  before(() => {
    sandbox = createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('/devs', () => {
    it('Returns all devs and the logged dev when accessing the get route', async () => {
      sandbox.stub(devModel, devModel.findById.name)
        .resolves(devMock)

      sandbox.stub(devModel, devModel.find.name)
        .resolves(devsMock)

      const response = await request(server)
        .get('/devs')
        .set('user', '5e1e4235d17e4c72b47e9661')

      assert.deepStrictEqual(response.body, devsMock)
    })

    it('Should return error when passing an user that already exists', async () => {
      const expectedReturn = {
        "error": "Usuário já existe."
      }

      sandbox.stub(devModel, devModel.findOne.name)
        .resolves(devsMock)

      const response = await request(server)
        .post('/devs')
        .send('{ "username": "piccoloo" }')

      assert.deepStrictEqual(response.body, expectedReturn)
    })

    it("Should return error when passing an username that don't exists in github", async () => {
      const expectedReturn = {
        "error": "User not found"
      }

      sandbox.stub(devModel, devModel.findOne.name)
        .resolves(null)

      sandbox.stub(axios, 'get')
        .rejects({ message: 'not found' })

      const response = await request(server)
        .post('/devs')
        .send('{ "username": "piccoloo" }')

      assert.deepStrictEqual(response.body, expectedReturn)
    })

    it('Should create an user if not already exists passing the github username', async () => {
      const expectedReturn = {
        "error": "Usuário já existe."
      }

      sandbox.stub(devModel, devModel.findOne.name)
        .resolves(null)

      sandbox.stub(devModel, devModel.create.name)
        .resolves(createdDev)

      sandbox.stub(axios, 'get')
        .resolves(githubUser)

      const response = await request(server)
        .post('/devs')
        .send('{ "username": "piccoloo" }')

      assert.deepStrictEqual(response.body, { message: 'Usuário cadastrado' })
    })
  })
})
