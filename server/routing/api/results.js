/*
 Designed and developed by Richard Nesnass & Sharanya Manivasagam
*/

const router = require('express').Router()
const utilities = require('../utilities')
const Result = require('../../models/Result')
const dataFile = require('../../data.json')

router.post('/result', (request, response) => {
  const result = { items: request.body }
  Result.create(result, function callback (error, newResult) {
    if (error) {
      utilities.errorResponse(
        { status: 400, message: 'Error finding results' },
        response
      )
    } else {
      console.log('Received a result')
      utilities.successResponse(newResult, response)
    }
  })
})

router.get('/data', (request, response) => {
  utilities.successResponse(dataFile, response)
})

module.exports = router
