module.exports = (req, res, next) => {
    console.log(req.query)
    if(req.query.id){
        next();
    }else{
        req.status(404).send('路径失效');
    }
  };