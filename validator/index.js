exports.createPostValidator = (req, res, next) => {
  // validate title
  req.check("title", "Write a Title").notEmpty();
  req
    .check("title", "Title can only be between 4 and 150")
    .isLength({ min: 4, max: 150 });

  // validate body
  req.check("body", "Write a Body").notEmpty();
  req
    .check("body", "Body can only be between 4 and 2000")
    .isLength({ min: 4, max: 2000 });

  // check for errors
  const errors = req.validationErrors();

  // if there are errors show the first error.
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    res.status(400).json({ error: firstError });
  }

  // proceed to the next middleware
  next();
};
