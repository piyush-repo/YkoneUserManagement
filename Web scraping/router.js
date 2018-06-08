"use strict";

let express = require('express'),
    router = express.Router(),
    controller = require('./controller');

router.get('/client/listAll', controller.listAll)

router.post('/client/create', controller.create)

router.delete('/client/:email', controller.delete)

router.get('/client/list/:email', controller.getClient)

router.put("/client", controller.updateClient)

router.get("/client/search", controller.searchClient)

router.post('/scrap', controller.scrap)



module.exports = router;