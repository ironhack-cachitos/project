module.exports = {
  get: (req, res, next) => {
    res.render('index');
  },
  main: (req, res, next) => {
    res.render('main');
  }
};
