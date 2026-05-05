const fs = require('node:fs/promises')
const path = require('node:path')
const cors = require('cors')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3002
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json')

const defaultDb = {
  courses: [],
  books: [],
  categories: [],
  goals: [],
  learningSessions: [],
}

app.use(cors())
app.use(express.json())

async function ensureDb() {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })

  try {
    await fs.access(DB_PATH)
  }
  catch {
    await fs.writeFile(DB_PATH, JSON.stringify(defaultDb, null, 2))
  }
}

async function readDb() {
  await ensureDb()
  const raw = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeDb(nextDb) {
  await fs.writeFile(DB_PATH, JSON.stringify(nextDb, null, 2))
}

async function updateDb(updater) {
  const currentDb = await readDb()
  const nextDb = await updater(currentDb)
  await writeDb(nextDb)
  return nextDb
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function badRequest(response, message) {
  return response.status(400).json({ message })
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

// --- Categories ---
app.get('/api/categories', async (_request, response) => {
  const db = await readDb()
  response.json(db.categories)
})

app.post('/api/categories', async (request, response) => {
  const { name } = request.body

  if (!name) {
    return badRequest(response, '`name` is required')
  }

  const category = {
    id: createId('category'),
    name,
  }

  const db = await updateDb((currentDb) => {
    currentDb.categories.unshift(category)
    return currentDb
  })

  return response.status(201).json(db.categories.find(item => item.id === category.id))
})

app.patch('/api/categories/:id', async (request, response) => {
    const { id } = request.params
    const { name } = request.body

    if (!name) {
        return badRequest(response, '`name` is required')
    }

    let updatedCategory = null;
    await updateDb((currentDb) => {
        const category = currentDb.categories.find(item => item.id === id);
        if (category) {
            category.name = name;
            updatedCategory = category;
        }
        return currentDb
    })

    if (!updatedCategory) {
        return response.status(404).json({ message: 'Category not found' })
    }

    return response.json(updatedCategory)
})

app.delete('/api/categories/:id', async (request, response) => {
    const { id } = request.params
    await updateDb((currentDb) => {
        currentDb.categories = currentDb.categories.filter(item => item.id !== id)
        return currentDb
    })
    response.status(204).send()
})

// --- Courses ---
app.get('/api/courses', async (_request, response) => {
    const db = await readDb()
    response.json(db.courses)
})

app.post('/api/courses', async (request, response) => {
    const { title, description = '', url = '', categoryId = null, status = 'planned', totalSteps, currentStep = 0 } = request.body

    if (!title || totalSteps === undefined) {
        return badRequest(response, '`title` and `totalSteps` are required')
    }

    const course = {
        id: createId('course'),
        title,
        description,
        url,
        categoryId,
        status,
        totalSteps: Number(totalSteps),
        currentStep: Number(currentStep),
    }

    const db = await updateDb((currentDb) => {
        currentDb.courses.unshift(course)
        return currentDb
    })

    return response.status(201).json(db.courses.find(item => item.id === course.id))
})

app.patch('/api/courses/:id', async (request, response) => {
    const { id } = request.params
    const body = request.body

    let updatedCourse = null;
    await updateDb((currentDb) => {
        const course = currentDb.courses.find(item => item.id === id);
        if (course) {
            Object.assign(course, body)
            updatedCourse = course;
        }
        return currentDb
    })

    if (!updatedCourse) {
        return response.status(404).json({ message: 'Course not found' })
    }

    return response.json(updatedCourse)
})

app.delete('/api/courses/:id', async (request, response) => {
    const { id } = request.params
    await updateDb((currentDb) => {
        currentDb.courses = currentDb.courses.filter(item => item.id !== id)
        return currentDb
    })
    response.status(204).send()
})


// --- Books ---
app.get('/api/books', async (_request, response) => {
    const db = await readDb()
    response.json(db.books)
})

app.post('/api/books', async (request, response) => {
    const { title, author = '', url = '', categoryId = null, status = 'planned', totalSteps, currentStep = 0 } = request.body

    if (!title || totalSteps === undefined) {
        return badRequest(response, '`title` and `totalSteps` are required')
    }

    const book = {
        id: createId('book'),
        title,
        author,
        url,
        categoryId,
        status,
        totalSteps: Number(totalSteps),
        currentStep: Number(currentStep),
    }

    const db = await updateDb((currentDb) => {
        currentDb.books.unshift(book)
        return currentDb
    })

    return response.status(201).json(db.books.find(item => item.id === book.id))
})

app.patch('/api/books/:id', async (request, response) => {
    const { id } = request.params
    const body = request.body

    let updatedBook = null;
    await updateDb((currentDb) => {
        const book = currentDb.books.find(item => item.id === id);
        if (book) {
            Object.assign(book, body)
            updatedBook = book;
        }
        return currentDb
    })

    if (!updatedBook) {
        return response.status(404).json({ message: 'Book not found' })
    }

    return response.json(updatedBook)
})

app.delete('/api/books/:id', async (request, response) => {
    const { id } = request.params
    await updateDb((currentDb) => {
        currentDb.books = currentDb.books.filter(item => item.id !== id)
        return currentDb
    })
    response.status(204).send()
})


// --- Goals ---
app.get('/api/goals', async (_request, response) => {
    const db = await readDb()
    response.json(db.goals)
})

app.post('/api/goals', async (request, response) => {
    const { title, description = '', deadline = null, relatedItems = [] } = request.body

    if (!title) {
        return badRequest(response, '`title` is required')
    }

    const goal = {
        id: createId('goal'),
        title,
        description,
        deadline,
        relatedItems,
    }

    const db = await updateDb((currentDb) => {
        currentDb.goals.unshift(goal)
        return currentDb
    })

    return response.status(201).json(db.goals.find(item => item.id === goal.id))
})

app.patch('/api/goals/:id', async (request, response) => {
    const { id } = request.params
    const body = request.body

    let updatedGoal = null;
    await updateDb((currentDb) => {
        const goal = currentDb.goals.find(item => item.id === id);
        if (goal) {
            Object.assign(goal, body)
            updatedGoal = goal;
        }
        return currentDb
    })

    if (!updatedGoal) {
        return response.status(404).json({ message: 'Goal not found' })
    }

    return response.json(updatedGoal)
})

app.delete('/api/goals/:id', async (request, response) => {
    const { id } = request.params
    await updateDb((currentDb) => {
        currentDb.goals = currentDb.goals.filter(item => item.id !== id)
        return currentDb
    })
    response.status(204).send()
})


// --- Learning Sessions ---
app.get('/api/learning-sessions', async (_request, response) => {
    const db = await readDb()
    response.json(db.learningSessions)
})

app.post('/api/learning-sessions', async (request, response) => {
    const { date, duration, relatedItemId, type } = request.body

    if (!date || !duration || !relatedItemId || !type) {
        return badRequest(response, '`date`, `duration`, `relatedItemId` and `type` are required')
    }

    const session = {
        id: createId('session'),
        date,
        duration: Number(duration),
        relatedItemId,
        type,
    }

    const db = await updateDb((currentDb) => {
        currentDb.learningSessions.unshift(session)
        return currentDb
    })

    return response.status(201).json(db.learningSessions.find(item => item.id === session.id))
})

app.patch('/api/learning-sessions/:id', async (request, response) => {
    const { id } = request.params
    const body = request.body

    let updatedSession = null;
    await updateDb((currentDb) => {
        const session = currentDb.learningSessions.find(item => item.id === id);
        if (session) {
            Object.assign(session, body)
            updatedSession = session;
        }
        return currentDb
    })

    if (!updatedSession) {
        return response.status(404).json({ message: 'Learning session not found' })
    }

    return response.json(updatedSession)
})

app.delete('/api/learning-sessions/:id', async (request, response) => {
    const { id } = request.params
    await updateDb((currentDb) => {
        currentDb.learningSessions = currentDb.learningSessions.filter(item => item.id !== id)
        return currentDb
    })
    response.status(204).send()
})


app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ message: 'Internal server error' })
})

ensureDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Learning Tracker backend is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to initialize backend', error)
    process.exit(1)
  })
