
const logoutController = {};

logoutController.logout = (req, res) => {
    try {
        res.clearCookie("authCookie");
        return res.status(200).json({status: "OK", message: "Logout successful"})
    } catch (error) {
        return res.status(500).json({status: "Internal server error", message: error})
    }
}


export default logoutController;