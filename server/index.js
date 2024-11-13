const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./config/db'); // Importe o novo arquivo de conexão
require('dotenv').config();

const app = express();

// Conecte ao banco de dados
connectDB(); // Chamada para conectar ao MongoDB

// Configura o EJS como mecanismo de visualização (se necessário)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/eventos', eventRoutes);

// Rota para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});

// Rota para qualquer outra página que não seja API
app.get('*', (req, res) => {
    res.status(404).send('Página não encontrada');
});

// Definindo a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
