const logOutController = {};

logOutController.logOut = async (req, res) => {
  res.clearCookie("authToken");

  return res.json({message: "Session closed successfully"});
  };

export default logOutController;