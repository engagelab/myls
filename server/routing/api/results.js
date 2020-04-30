/*
 Designed and developed by Richard Nesnass & Sharanya Manivasagam
*/
var fs = require('fs')
const stringify = require('csv-stringify')
const router = require('express').Router()
const utilities = require('../utilities')
const Result = require('../../models/Result')
const dataFile = require('../../data.json')

const downloadCSV = function (results, response) {
  const data = results.reduce((acc, curr) => {
    const a = curr.items.map(i => {
      const sKeys = Object.keys(i.selections)
      const b = {}
      sKeys.forEach(key => {
        newKey = key.replace(/ /g, '')
        b[newKey] = i.selections[key]
      })
      return {
        ...b,
        url: i.title,
        userId: curr._id.toString(),
        info: i.info,
        count: i.visitData.count
      }
    })
    return acc.concat(a)
  }, [])

  stringify(
    data,
    {
      header: true,
      delimiter: '|',
      columns: {
        userId: 'userid',
        url: 'url',
        count: 'visits',
        OtherStudents: 'Other Students',
        DeveloperCommunity: 'Developer Community',
        ExpertDevelopers: 'Expert Developers',
        TimeSpent: 'Time Spent',
        Activity: 'Activity',
        info: 'Titles'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        }
      }
    },
    (err, content) => {
      response.setHeader(
        'Content-disposition',
        'attachment; filename=data.csv'
      )
      response.end(content)
    }
  )
}

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

router.get('/resultfile', (request, response) => {
  Result.find({}, (error, results) => {
    if (error) {
      utilities.errorResponse(
        { status: 400, message: 'Error finding results' },
        response
      )
    } else {
      downloadCSV(results, response)
    }
  }).lean()
})

module.exports = router
