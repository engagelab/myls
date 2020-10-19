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
  let data = []
  let header = {}
  if (mode == 'overview') {
    header = {
      header: true,
      delimiter: ',',
      columns: {
        installId: 'installId',
        consentEmail: 'consentEmail',
        consented: 'consented',
        search: 'search',
        url: 'url',
        itemCount: 'History Items',

        // Selection key names : column titles
        'Other Students': 'Other Students',
        'Developer Community': 'Developer Community',
        'Expert Developers': 'Expert Developers',
        'Time Spent in that activity': 'Time Spent',
        Activity: 'Activity'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        }
      }
    }
    data = results.reduce((acc, r) => {
      const a = r.items.map(i => {
        return {
          installId: r.installId,
          consentEmail: r.consentEmail,
          consented: r.consented,
          search: i.search,
          url: i.url,
          itemCount: i.historyItems.length,
          ...i.selections
        }
      })
      return acc.concat(a)
    }, [])
  } else if (mode == 'history') {
    header = {
      header: true,
      delimiter: ',',
      columns: {
        installId: 'installId',

        // Item key names: column titles
        name: 'Name',
        url: 'URL',

        // History key names : column titles
        historyId: 'History ID',
        // title: 'Title',
        // url: 'URL',
        visitCount: 'Visit Count',

        // Visit key names: column titles
        visitId: 'Visit ID',
        transition: 'Transition',
        referringVisitId: 'Referring Visit ID',
        visitTime: 'Visit Time'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        },
        date: function (value) {
          return value.toTimeString()
        }
      }
    }
    data = results.reduce((acc, r) => {
      const a = []
      r.items.forEach(i => {
        i.historyItems.forEach(h => {
          h.visitItems.forEach(v => {
            const n = {
              installId: r.installId,
              name: i.name,
              url: i.url,

              // History key names : column titles
              historyId: h.id,
              // title: h.title,
              // url: h.url,
              visitCount: h.visitCount,

              // Visit key names: column titles
              visitId: v.id,
              transition: v.transition,
              referringVisitId: v.referringVisitId,
              visitTime: v.visitTime
            }
            a.push(n)
          })
        })
      })
      return acc.concat(a)
    }, [])
  } else if (mode == 'installs') {
    header = {
      header: true,
      delimiter: '|',
      columns: {
        installId: 'installId',
        installed: 'installed',
        uninstalled: 'uninstalled'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        },
        date: function (value) {
          return value.toLocaleString('en-GB', { timeZone: 'UTC' })
        }
      }
    }
    data = results
  }

  stringify(data, header, (err, content) => {
    response.setHeader(
      'Content-disposition',
      `attachment; filename=data-${mode}.csv`
    )
    response.end(content)
  })
}

// Example:  api/resultfile?os=xxxxxx&mode=history    mode == [ 'installs' | 'overview' | 'history' ]
router.get('/resultfile', (request, response) => {
  const modeTypes = ['installs', 'overview', 'history']
  const os = process.env.OBFUSCATION_STRING
  const mode = request.query.mode
  if (request.query.os != os || modeTypes.indexOf(mode) < 0) {
    return utilities.errorResponse({ status: 400 }, response)
  }
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

router.post('/result', (request, response) => {
  const result = {
    items: request.body.items,
    installId: request.body.id,
    consentEmail: request.body.email,
    consented: request.body.consented,
    lottery: request.body.lottery,
    demographics: request.body.demographics,
    practices: request.body.practices
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

module.exports = router
