/*
 Designed and developed by Richard Nesnass & Sharanya Manivasagam
*/

const router = require('express').Router();
const utilities = require('../utilities');
const Result = require('../../models/Result');


// Get existing results for a given user and session
/* router.get('/results', utilities.checkAuthentication, (request, response) => {
  Result.find(
    {
      sessionId: request.query.sessionId,
      userId: request.query.userId,
    },
    (error, foundResults) => {
      if (error) {
        utilities.errorResponse(
          { status: 400, message: 'Error finding results' },
          response
        );
      } else {
        console.log(`GET ${foundResults.length} results`);
        utilities.successResponse(foundResults, response);
      }
    }
  );
}); */

router.post('/result', (request, response) => {
  const data = { items: request.body }
  Result.create(data, function(error, newResult) {
    if (error) {
      utilities.errorResponse(
        { status: 400, message: 'Error finding results' },
        response
      );
    } else {
      console.log('Received a result');
      utilities.successResponse(newResult, response);
    }
  });
});

module.exports = router;
