const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: true }));
// app.use(express.static('client/public'));

app.use('/api/recipes', require('./server/routes/recipes.routes'));
app.use('/api/admin', require('./server/routes/admin.routes'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@atlascluster.xfav8hg.mongodb.net/nahlebniki?retryWrites=true&w=majority');

        app.listen(PORT, () => {
            console.log(`Server started on the port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();