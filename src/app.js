import express from 'express'
import { ProductsService } from './service/products/productsService.js'

const app = express()
const PORT = 3000
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', 'src/views')


app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'World'})
})

app.get('/produtos', (req, res) => {
    res.render('pages/products')
})

app.post('/api/produtos', async (req, res) => {
    const productsService = new ProductsService()
    const response = await productsService.create(req.body)
    console.log(response)
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log('Server on at port 3000')
})