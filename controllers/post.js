exports.getPosts = (req, res) => {
  //   res.send("Hello from express app Nodemon, controller in action");
  res.json({
    posts: [{ title: "First post" }, { title: "Second post" }]
  });
};
