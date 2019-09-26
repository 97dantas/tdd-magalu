const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const CovenantValidator = require('./tdd')

const { expect } = chai

chai.use(sinonChai)

describe('CovenantValidator', () => {

  describe('smoke tests', () => {
    it('should exist the CovenantValidator', () => {
      expect(CovenantValidator).to.exist
    })
  })

  describe('_validateOauth', () => {
    let validateTokenServerStubs
    let covenantValidator
    const resolveResponse = {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }
    const fakerOuth = {
        validateTokenServer: async () => {
        }
    }

    beforeEach( () => {
      covenantValidator = new CovenantValidator(fakerOuth)
      validateTokenServerStubs = sinon.stub(fakerOuth, 'validateTokenServer')
      validateTokenServerStubs.resolves(resolveResponse)
    })

    afterEach( () => {
      validateTokenServerStubs.restore()
    })

    it('should exist the _validateOauth', () => {
      expect(covenantValidator._validateOauth).to.exist
    })
    
    it('should call _validateOauth with the correct params', () => {
      covenantValidator._validateOauth()
      expect(validateTokenServerStubs).to.have.been.calledWith()
    });

    it('should return the undefined from the Promise', async () => {
      const response = await covenantValidator._validateOauth()
      expect(response).to.equal(undefined)
      //it can`t attribute a value to data because the test case is sending a undefined value
    })

    it('should return the JSON Data from the Promise', async () => {
      const response = await covenantValidator._validateOauth({})
      expect(response.accessToken).to.equal(resolveResponse.access_token)
    })
  })
})