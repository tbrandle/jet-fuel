const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const md5 = require('md5')

const environment = 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.post('/api/v1/folders', (request, response) => {
  const folder = request.body

  database('folders').insert(folder, 'id')
    .then(folder => {
      console.log('folder: ', folder);
      response.status(201).json({ id: folder[0] })
    })
    .catch(error => {
      console.log('error: ', error);
    });
})

app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(folders => {
      response.status(200).json(folders)
    })
    .catch(error => {
      console.error('error: ', error)
    });
})

app.get('/api/v1/folders/:id/links', (request, response) => {
  database('links').where('folder_id', request.params.id).select()
    .then(links => {
      response.status(200).json(links)
    })
    .catch(error => {
      console.error('error: ', error)
    });
})

app.post('/api/v1/links', (request, response) => {
  const { long_url, folder_id } = request.body
  const short_url = md5(long_url)
  const link = { long_url, short_url, folder_id }

  database('links').insert(link, 'id')
    .then(link => {
      console.log('link: ', link);
      response.status(201).json({ id: link[0] })
    })
    .catch(error => {
      console.error('error: ', error)
    })
})

app.get('/api/v1/links', (request, response) => {
  database('links').select()
    .then(links => {
      response.status(200).json(links)
    })
    .catch(error => {
      console.error('error: ', error)
    })
})

app.listen(app.get('port'), () => {
  console.log(`port is running on ${app.get('port')}.`)
})
