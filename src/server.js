const express = require('express')

const app = express()
const path = require('path')

/* app.use(express.static(`${__dirname}/`)) */

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

/* if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join('build', 'index.html'))
  })
}
*/
