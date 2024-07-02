const taskRoutes = require("../routes/taskRoute");
const userRoutes = require("../routes/user.route");
const { auth } = require("../middleware/authMiddleware");

const Router = (app) => {
  app.use("/api/tasks", auth, taskRoutes);

  app.use("/api/user", userRoutes);

  // Catch-all route for any unhandled paths
  app.all("*", (req, res, next) => {
    const err = new Error();
    err.message = `Can't find ${req.originalUrl} on the server!`;
    err.status = 404;
    next(err);
  });
};

module.exports.Router = Router;
