const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  })

  return sum;
}

const favoriteBlog = (blogs) => {
  let highestLikes = -1;
  let returnedBlog = null;
  blogs.forEach((blog) => {
    if(blog.likes > highestLikes) {
      highestLikes = blog.likes
      returnedBlog = blog
    }
  })

  return returnedBlog;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}