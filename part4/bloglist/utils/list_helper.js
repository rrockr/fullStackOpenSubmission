const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
  let returnedAuthor = null;

  if(lodash.isEmpty(blogs)) {
    return null
  }

  const authorCount = lodash.countBy(blogs, (blog) => {
    return blog.author;
  })

  let maxBlogCount = lodash.max(lodash.values(authorCount))

  let author = lodash.findKey(authorCount, (author) => {
    return author === maxBlogCount
  })

  returnedAuthor = {
    'author': author,
    'blogs': maxBlogCount
  }

  console.dir(returnedAuthor)

  return returnedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}