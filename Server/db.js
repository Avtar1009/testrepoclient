const mongoose = require('mongoose');

//  password is "Ankit@9053", encode the "@" as "%40"
const connection = mongoose.connect("mongodb+srv://ankit8287670719:Ankit%409053@cluster0.mbtax.mongodb.net/rctserver?retryWrites=true&w=majority");

module.exports = {
    connection
};
