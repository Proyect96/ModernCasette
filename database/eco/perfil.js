const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    UserID: String,
    GuildID: String,
    Inventary: String
})

module.exports = mongoose.model("inventario", schema)