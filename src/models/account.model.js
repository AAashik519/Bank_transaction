

const mongoose = require('mongoose');
const { AccountStatus } = require('../utils/enums');


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: {
            values: Object.values(AccountStatus),
            message: 'Status must be either ACTIVE, FROZEN or CLOSED',
        },
        required: [true, 'Status is required'],
        default: AccountStatus.ACTIVE,
    
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        default: 'USD',
    }
},{timestamps: true});

accountSchema.index({userId:1, status:1}) 


const accountModel = mongoose.model('account', accountSchema);

module.exports = accountModel;