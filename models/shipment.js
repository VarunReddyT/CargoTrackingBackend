const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    shipmentId: {
        type: String,
        required: true,
        unique : true
    },
    containerId: {
        type: String,
        required: true
    },
    origin : {
        type: String
    },
    destination: {
        type: String
    },
    route: {
        type: [String],
        required: true
    },
    currentLocation: {
        type : {
            latitude: String,
            longitude: String,
            location: String
        },
        required: true
    },
    currentETA: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Transit', 'Delayed', 'Delivered', 'Cancelled'],
        required: true
    },
    departureTime: {
        type: Date
    },
    arrivalTime: {
        type: Date
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    trackingHistory: {
        type: [{
            location: String,
            timestamp: Date,
            status: String
        }],
        default: []
    },

});

module.exports = mongoose.model('Shipment', shipmentSchema);