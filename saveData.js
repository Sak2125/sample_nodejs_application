'use strict';

const
    fs = require('fs'),
    path = require('path'),
getExistingData = () => {
    if(fs.existsSync('data.json')){
        const data = fs.readFileSync('data.json');
        return JSON.parse(data);
    }
    },
    saveData = (req, res) => {
        const {title, content} = req.body,
            existingData = getExistingData();
        let inputData,id;

        if(!existingData || !existingData.length){
            inputData = [];
            id = 0;
        } else {
            const filteredData = existingData.map(item => item.id),
            existingMaxID = Math.max(...filteredData);
            id = existingMaxID + 1;
            inputData = existingData;
        }
        
        inputData.push({id,title,content});

         fs.writeFile('data.json', JSON.stringify(inputData,null,2), (err, data)=> {
            if (err) {
                return res.status(500).send('An error occurred while saving data to file');
            }

            return res.send({message: `Data successfully appended with id ${id}`});
        })
    };


module.exports = saveData;
