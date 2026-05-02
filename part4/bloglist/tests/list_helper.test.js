const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const nodeUtil = require('node:util')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
]

const multipleFavoriteBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 5,
      __v: 0
    },
]

const multipleMostBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }
]

const listWithNoBlog = []

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('sum of likes from multiple blogs', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })

  test('sum of likes from empty blog', () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlog), 0)
  })
})

describe('favorite blog', () => {
  test('favorite blog with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })

  test('favorite blog with empty blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithNoBlog), null)
  })

  test('favorite blog with one blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('favorite blog where multiple blogs have same likes', () => {
    const result = listHelper.favoriteBlog(multipleFavoriteBlog)
    assert.strictEqual(result.likes, 5)
  })
})

describe('most blogs', () => {
  test('most blogs with multiple blogs', () => {
    let expected = {
      'author': 'Robert C. Martin',
      'blogs': 3
    }

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), expected)
  })

  test('most blogs with only one blog', () => {
    let expected = {
      'author': 'Edsger W. Dijkstra',
      'blogs': 1
    }

    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), expected)
  })

  test('most blogs with no blog', () => {
    let expected = null

    assert.deepStrictEqual(listHelper.mostBlogs(listWithNoBlog), expected)
  })

  test('most blogs with multiple author', () => {
    let expected = [{
        'author': 'Edsger W. Dijkstra',
        'blogs': 2
      },
      {
        'author': 'Robert C. Martin',
        'blogs': 2
      }
    ]

    let author = listHelper.mostBlogs(multipleMostBlog)

    assert.ok(expected.some((blog) => {
      return nodeUtil.isDeepStrictEqual(blog, author)
    }))
  })

  
})

describe('most likes', () => {
  const blogsWithSameLikes = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 5,
      __v: 0
    }
  ]

  test('most likes with multiple blogs', () => {
    let expected = {
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    }

    assert.deepStrictEqual(listHelper.mostLikes(blogs), expected)
  })

  test('most likes with no blog', () => {
    let expected = {
      'author': '',
      'likes': 0
    }

    assert.deepStrictEqual(listHelper.mostLikes(listWithNoBlog), expected)
  })

  test('most likes with one blog', () => {
    let expected = {
      'author': 'Edsger W. Dijkstra',
      'likes': 5
    }

    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), expected)
  })

  test('most likes with multiple author', () => {
    let expected = [{
      'author': 'Edsger W. Dijkstra',
      'likes': 10
    },
    {
      'author': 'Robert C. Martin',
      'likes': 10
    }]

    let author = listHelper.mostLikes(blogsWithSameLikes)

    assert.ok(expected.some((blog) => {
      return nodeUtil.isDeepStrictEqual(blog, author)
    }))
  })
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})