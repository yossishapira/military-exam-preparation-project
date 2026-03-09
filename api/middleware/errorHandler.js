function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join('; ');
    return res.status(400).json({ error: message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate value' });
  }

  const status = err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';
  res.status(status).json({ error: message });
}

export default errorHandler;
