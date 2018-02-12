'use strict';

const fs = require('fs'),
    getData = (req, res) => {
        const {id} = req.params,
            data = fs.readFileSync('data.json'),
            parsedData = JSON.parse(data),
            result = parsedData.filter(item => item.id == id);

        if (!result || !result.length) {
            return res.status(400).send({message: `No resource found with the id - ${id}`})
        }
        return res.status(200).send(result);
    }

module.exports = getData;
