const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: "User"
    },
    accessToken: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    institutionId: {
        type: String,
        required: true
    },
    institutionName: {
        type: String
    },
    accountName: {
        type: String
    },
    accountType: {
        type: String
    },
    accountSubtype: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);