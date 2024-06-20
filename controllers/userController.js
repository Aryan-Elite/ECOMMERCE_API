const User = require("../Models/userModel");
const AppError = require("../utils/appError");

exports.update = async (req, res, next) => {
  try {
    // 1) Create error if user tries to update password data
    if (req.body.password || req.body.confirmPassword) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updatePassword",
          400
        )
      );
    }

    // 2) Filter out unwanted fields names that are not allowed to be updated
    const filteredBody = {};
    const allowedFields = ["name", "email"]; // Add any other fields that you want to allow updates for
    Object.keys(req.body).forEach((el) => {
      if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
    });

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError("No User found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "User has been deleted...",
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("No user with that ID was found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getallUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const stats = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: lastYear },
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        numUsers: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    stats: "success",
    data: {
      stats,
    },
  });
};
