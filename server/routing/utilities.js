/*
 Designed and developed by Richard Nesnass & Sharanya Manivasagam
*/

let TEST_MODE = false;

const errorResponse = (error, response) => {
  console.log(`Error: ${error.message}`);
  response.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};

const successResponse = (object, response) => {
  response
    .json(object)
    .status(200)
    .end();
};

const shuffleArray = array => {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const setTestMode = mode => {
  TEST_MODE = mode;
};

const getTestMode = () => TEST_MODE;

const checkAuthentication = (request, response, next) => {
  if (request.isAuthenticated() || TEST_MODE) {
    next();
  } else {
    response
      .status(401)
      .send({ message: 'Not Authorized' })
      .end();
  }
};

module.exports = {
  successResponse,
  errorResponse,
  shuffleArray,
  checkAuthentication,
  setTestMode,
  getTestMode,
};
