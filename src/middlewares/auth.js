const authAdmin = (req, res, next) => {
    const token = "xyz";
    const isAuthorized = token === "xyz";

    if (isAuthorized) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

const authUser = (req, res, next) => {
    const token = "xyz";
    const isAuthorized = token === "xyz";

    if (isAuthorized) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}
module.exports = {
    authAdmin,
    authUser
};