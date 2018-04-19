var express = require('express')
var pool = require('../modules/pool')
var router = express.Router();

router.get('/', (req, res) => {
    var queryText = `SELECT * FROM pizza`;
    pool.query(queryText).then((result) => {
        console.log('Successfully got pizzas');
        res.send(result.rows)
    })

})

module.exports = router