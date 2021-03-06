const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  const tagName = await getAllTags()
  try {
   
    const posts= await getPostsByTagName(tagName)
    console.log(posts);
    res.send({posts: posts})
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    next({ name, message });
    // forward the name and message to the error handler
  }
}); //getting empty posts array back but hey, getting something.

module.exports = tagsRouter;