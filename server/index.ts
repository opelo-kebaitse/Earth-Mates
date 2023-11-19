import server from './server.ts'

const PORT = process.env.PORT || 5173

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
})
