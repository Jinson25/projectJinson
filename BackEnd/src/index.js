//archivo que sirve para arrancar
import app from './app'
import './database'

app.listen(4000);

console.log('Servidor encendido en el puerto', 4000)