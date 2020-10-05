const errorControllers = {}

//404
errorControllers.render404 = (req, res) => {
   res.render('404');
}

module.exports = errorControllers;