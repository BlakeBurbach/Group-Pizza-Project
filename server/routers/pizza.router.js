var express = require('express')
var pool = require('../modules/pool')
var router = express.Router();

router.get('/', (req, res) => {
    const order = req.query.id;
    if(order != undefined){
        console.log('Getting order!');
        const queryText = `SELECT * FROM "order";`
        pool.query(queryText).then((result) => {
            console.log('Successfully got orders!');
            res.send(result.rows)
        }).catch((error) => {
            console.log('Error in getting orders: ', error);
            res.sendStatus(500);
        })
        
    }else {
        var queryText = `SELECT * FROM pizza`;
        pool.query(queryText).then((result) => {
            console.log('Successfully got pizzas');
            res.send(result.rows)
        }).catch((error) => {
            console.log('Error in getting pizzas: ', error)
            res.sendStatus(500);
        })
    }
})

router.post('/', (req, res) => {
    var pizza = req.body;
    console.log(pizza);
    var queryText = `INSERT INTO "order" ("customer_name", "order_total") VALUES ($1, $2);`
    pool.query(queryText, [pizza.customer_name, pizza.order_total]).then((response) => {
        console.log('Succesfully posted pizza!');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in posting pizza: ', error);
        res.sendStatus(500);
    })
})

module.exports = router