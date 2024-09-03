const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
    title: String,
    permissions : {
        type : Array,
        default : []
    },
    description: String,
    deleted: {
        type : Boolean,
        default : false
    },
    deletedAt : Date
},{ timestamps: true });

const Roles = mongoose.model('Roles', rolesSchema, "roles");

module.exports = Roles;