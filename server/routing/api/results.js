/*
 Designed and developed by Richard Nesnass & Sharanya Manivasagam
*/
const stringify = require('csv-stringify')
const router = require('express').Router()
const utilities = require('../utilities')
const Result = require('../../models/Result')
const Installed = require('../../models/Installed')
const dataFile = require('../../data.json')
const DELIMITER = '|'

const downloadCSV = function (results, response, mode) {
  const getDemographic = (d) => {
    if (typeof d.selection === 'boolean') {
      return d.selection ? 'true' : 'false'
    } else if (Array.isArray(d.selection)) {
      return d.selection.reduce((acc, i) => `${acc}${DELIMITER}${i}`)
    } else {
      return d.selection.level1 + DELIMITER + d.selection.level2.reduce((acc, i) => `${acc}${DELIMITER}${i}`, [])
    }
  }

  const getPractices = (p) => {
    return p.actions.reduce((acc, i) => `${acc}${DELIMITER}${i}`)
  }

  let data = []
  let header = {}
  if (mode == 'overview') {
    header = {
      header: true,
      delimiter: ',',
      columns: {
        installId: 'installId',
        consented: 'consented',
        lottery: 'lottery'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        }
      }
    }
    dataFile.practices.forEach(p => header.columns[p.shortTitle] = p.shortTitle)
    dataFile.demographics.forEach(d => header.columns[d.shortTitle] = d.shortTitle)
    data = results.reduce((acc, r) => {
      const a =  {
        installId: r.installId,
        consented: r.consented,
        lottery: r.lottery,
      }
      r.demographics.forEach(d => a[d.shortTitle] = getDemographic(d))
      r.practices.forEach(p => a[p.shortTitle] = getPractices(p))
      return acc.concat(a)
    }, [])
  } else if (mode == 'emails') {
    header = {
      header: true,
      delimiter: ',',
      columns: {
        installId: 'installId',
        consentEmail: 'consentEmail'
      }
    }
    data = results.reduce((acc, r) => {
      const a =  {
        installId: r.installId,
        consentEmail: r.consentEmail
      }
      return acc.concat(a)
    }, [])
  } else if (mode == 'websites') {
    header = {
      header: true,
      delimiter: ',',
      columns: {
        installId: 'installId',
        search: 'search',
        url: 'url',
        itemCount: 'History Items'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        }
      }
    }
    dataFile.practices.forEach(p => header.columns[p.shortTitle] = p.shortTitle)
    data = results.reduce((acc, r) => {
      const a = r.items.map(i => {
        return {
          installId: r.installId,
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
        search: 'Search URL',

        // History key names : column titles
        historyId: 'History ID',
        // title: 'Title',
        // url: 'URL',
        lastVisitTime: 'Last Visit Time (ms)',
        visitCount: 'Visit Count',

        // Visit key names: column titles
        visitId: 'Visit ID',
        transition: 'Transition',
        referringVisitId: 'Referring Visit ID',
        visitTime: 'Visit Time (ms)'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        },
        date: function (value) {
          // return value.toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',','')
          return value.getTime().toString()
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
              search: i.search,

              // History key names : column titles
              historyId: h.id,
              // title: h.title,
              // url: h.url,
              lastVisitTime: new Date(h.lastVisitTime),
              visitCount: h.visitCount,

              // Visit key names: column titles
              visitId: v.id,
              transition: v.transition,
              referringVisitId: v.referringVisitId,
              visitTime: new Date(v.visitTime)
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
      delimiter: ',',
      columns: {
        installId: 'installId',
        installed: 'installed (ms)',
        uninstalled: 'uninstalled (ms)'
      },
      cast: {
        boolean: function (value) {
          return value ? 'true' : 'false'
        },
        date: function (value) {
          // return value.toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',','')
          return value.getTime().toString()
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

// Example:  api/resultfile?os=xxxxxx&mode=history    mode == [ 'installs' | 'overview' | 'history' | 'websites' ]
router.get('/resultfile', (request, response) => {
  const modeTypes = ['installs', 'overview', 'history', 'websites', 'emails']
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
    demographics: request.body.other.demographics,
    practices: request.body.other.practices
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
