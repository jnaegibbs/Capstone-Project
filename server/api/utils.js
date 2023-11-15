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

function requireAdmin(req, res, next) {
    if (!req.user || !req.user.isAdmin) {
        res.status(403).json({
            name: "UnauthorizedError",
            message: "You do not have permission to perform this action"
        });
    } else {
        console.log('User is an admin');
        next();
    }
}
  
  module.exports ={ 
    requireUser,
    requireAdmin
}
  