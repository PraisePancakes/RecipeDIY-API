const Report = require("../../Models/Report");
const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  const userId = req.id;
  const { postId } = req.params;
  const { reason, reportType } = req.body;

  try {
    const post = await Post.findById(postId);
    const postAuthor = post.author;
    const reportedAlreadyByUser = await Report.findOne({
      postReporter: userId,
    });
    if (reportedAlreadyByUser) {
      return res
        .status(400)
        .send({ message: "You Already Reported This Post" });
    }
    if (!reason) {
      return res.status(400).send({ message: "Must State A Reason" });
    }
    if (!reportType) {
      return res.status(400).send({ message: "Must Select A Report Type" });
    }

    const report = new Report({
      postAuthor,
      postReporter: userId,
      postId,
      reason,
      reportType,
    });

    await report.save();
    return res.status(200).send({
      message: "Post Has Been Reported And Is Under Inspection",
      report: report,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
