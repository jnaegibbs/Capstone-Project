function requireUser(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    } else {
        console.log('User authenticated');
        next();
    }
}
  
  module.exports ={ 
    requireUser
}
  