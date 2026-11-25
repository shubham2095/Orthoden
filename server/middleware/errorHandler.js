export function notFound(req, res) {
  res.status(404).json({ error: 'Not found.' })
}

// Central error handler: client errors (4xx, e.g. bad JSON or a too-large body) are returned as JSON,
// everything else is logged and hidden from the visitor.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500

  if (status < 500) {
    return res.status(status).json({ error: err.message })
  }

  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Something went wrong. Please try again later.' })
}
