const router = require('express').Router();
const Shipment = require('../models/shipment');

router.get('/shipments', async (req, res) => {
    try{
        const shipments = await Shipment.find();
        res.status(200).send(shipments);
    }
    catch(err){
        res.status(404).send('Shipments not found');
    }
});

router.get('/shipment/:id', async (req, res) => {
    const shipmentId = req.params.id;
    try{
        const shipment = await Shipment.findOne({shipmentId: shipmentId});
        res.status(200).send(shipment);
    }
    catch(err){
        res.status(404).send('Shipment not found');
    }
});

router.post('/shipment/:id/update-location', async (req, res) => {
    const shipmentId = req.params.id;
    console.log(req.body);
    try{
        const shipment = await Shipment.findOne({shipmentId: shipmentId});
        shipment.currentLocation = req.body.currentLocation;
        shipment.currentETA = req.body.currentETA;
        shipment.trackingHistory.push({
            location: req.body.currentLocation.location,
            timestamp: req.body.currentETA,
            status: shipment.status
        });
        await shipment.save();
        res.status(200).send(shipment);
    }
    catch(err){
        res.status(404).send(err);
    }
});

router.get('/shipment/:id/eta', async (req, res) => {
    const shipmentId = req.params.id;
    try{
        const shipment = await Shipment.findOne({shipmentId: shipmentId});
        res.status(200).send(shipment.currentETA);
    }
    catch(err){
        res.status(404).send('Shipment not found');
    }
});

router.post('/shipment', async (req, res) => {
    try{
        const shipment = new Shipment({
            shipmentId: req.body.shipmentId,
            containerId: req.body.containerId,
            origin: req.body.origin,
            destination: req.body.destination,
            route: req.body.route,
            currentLocation: req.body.currentLocation,
            currentETA: req.body.currentETA,
            status: req.body.status,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime
        });
        await shipment.save();
        res.status(200).send(shipment);
    }
    catch(err){
        res.status(404).send('Shipment not created');
    }
});

module.exports = router;