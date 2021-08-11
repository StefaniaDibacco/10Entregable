import express from 'express';
import path from 'path';
import routerProductos from './routes/productos.js';
import handlebars from 'express-handlebars';


/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;

const publicFolderPath = path.resolve(__dirname, '../public');
app.use(express.static(publicFolderPath));

const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);


app.get('/', (req, res) => {
  const listaDinamica ={
  nombre: 'calculadora',
  precio: 200,
  url: 'url',
  }
  res.render('main', listaDinamica);
});


//const publicPath = path.resolve(__dirname, '../public');
//app.use(express.static(publicPath));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/productos', routerProductos);


const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});