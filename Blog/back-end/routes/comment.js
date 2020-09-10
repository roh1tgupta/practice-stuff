const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');


router.get('/comments', (req, res) => {
  Comment.find()
    .populate('category', '_id title')
    .then(comments => {
      res.json({ comments })
    })
    .catch(err => console.log(err));
});

router.get("/comments/post/:postId", (req, res) => {
  Comment.find({ post: { _id: req.params.postId } })
    .populate("post", "_id title")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/new-comment', (req, res) => {
  const { body, post } = req.body;

  if (!body || !post ) {
    res.json({ err: "all fields are required" })
  }

  Post.findOne({ _id: post.id})
  .then(post_found => {
    const comment = new Comment({
      post: post_found,
      body
    })
  
    comment.save().then(() => {
      res.json({msg: "comment created"});
    }).catch(err => console.log(err));
  
  })
  .catch(err => console.log(err));
})

router.get('/comments-num', (req, res) => {
  Comment.count({}) // in count passing {} i.e. blank object to count all 
    .then(categories => {
      res.json({ categories })
    })
    .catch(err => console.log(err));
})

module.exports = router;