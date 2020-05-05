const { nanoid } = require('nanoid')
const router = require('express').Router()
const utilities = require('../utilities')
const Installed = require('../../models/Installed')

router.post('/installed', (request, response) => {
  const mode = request.body.mode
  let installId = request.body.id
  Installed.findOne({ installId }, (err, ins) => {
    if (err) {
      return utilities.errorResponse('Error finding in DB', response)
    }
    const nowDate = new Date()
    if (!ins) {
      installId = nanoid()
      ins = new Installed({ installId, installed: nowDate })
    } else if (mode == 'uninstalled') {
      ins.uninstalled = new Date()
    }
    ins.save(() => {
      utilities.successResponse({ id: installId }, response)
    })
  })
})

module.exports = router
