/*
 Designed and developed by Richard Nesnass & Sharanya Manivasagam
*/
const stringify = require('csv-stringify')
const router = require('express').Router()
const utilities = require('../utilities')
const Result = require('../../models/Result')
const Installed = require('../../models/Installed')
const dataFile = require('../../data.json')

const downloadCSV = function (results, response, mode) {
  const data = []
  let header = {}
  if (mode == 'results') {
    header = {
      header: true,
      delimiter: '|',
      columns: {
        installId: 'installId',
        consentEmail: 'consentEmail',
        consented: 'consented',
        url: 'url',
        title: 'title',
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
    }
    results.reduce((acc, curr) => {
      const a = curr.items.map(i => {
        const sKeys = Object.keys(i.selections)
        const b = {}
        sKeys.forEach(key => {
          newKey = key.replace(/ /g, '')
          b[newKey] = i.selections[key]
        })
        return {
          ...b,
          url: i.url,
          title: i.title,
          userId: curr._id.toString(),
          info: i.info,
          count: i.visitData.count
        }
      })
      return acc.concat(a)
    }, [])
  }

  stringify(data, header, (err, content) => {
    response.setHeader(
      'Content-disposition',
      `attachment; filename=data-${mode}.csv`
    )
    response.end(content)
  })
}

router.post('/result', (request, response) => {
  const result = {
    items: request.body.items,
    installId: request.body.id,
    consentEmail: request.body.consentEmail,
    consented: request.body.consented,
    lottery: request.body.lottery
  }
  if (result.items && result.installId && result.consentEmail) {
    Result.create(result, function callback (error, newResult) {
      if (error) {
        utilities.errorResponse(
          { status: 400, message: 'Error creating results' },
          response
        )
      } else {
        console.log('Received a result')
        utilities.successResponse(newResult, response)
      }
    })
  } else {
    utilities.errorResponse({ status: 400, message: '' }, response)
  }
})

router.get('/data', (request, response) => {
  utilities.successResponse(dataFile, response)
})

// Example:  api/resultfile?os=xxxxxx&mode=history    mode == [ 'installs' | 'history' | 'visits']
router.get('/resultfile', (request, response) => {
  const os = process.env.OBFUSCATION_STRING
  if (request.query.os != os) {
    return utilities.errorResponse({ status: 400 }, response)
  }
  const mode = request.query.mode
  const model = mode == 'installs' ? Installed : Result
  model
    .find({}, (error, results) => {
      if (error) {
        utilities.errorResponse(
          { status: 400, message: 'Error finding in DB' },
          response
        )
      } else {
        downloadCSV(results, response, mode)
      }
    })
    .lean()
})

module.exports = router
