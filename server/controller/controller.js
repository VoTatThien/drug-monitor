let Drugdb = require('../model/model');


// creates and saves a new drug
exports.create = (req,res)=>{
    // validate incoming request
    if(!req.body){// if content of request (form data) is empty
        res.status(400).send({ message : "Content cannot be emtpy!"});// respond with this
        return;
    }

    //create new drug
    const drug = new Drugdb({
        name : req.body.name,//take values from form and assign to schema
        card : req.body.card,
        pack: req.body.pack,
        perDay : req.body.perDay,
        dosage : req.body.dosage
    })

    //save created drug to database
    drug
        .save(drug)//use the save operation on drug
        .then(data => {
            console.log(`${data.name} added to the database`) 
            res.redirect('/manage');
        })
        .catch(err =>{
            res.status(500).send({//catch error
                message : err.message || "There was an error while adding the drug"
            });
        });
};

// Delete a drug with specified drug id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Drugdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot delete drug with id ${id}. Drug not found!`});
            }else{
                res.send({
                    message : "Drug was deleted successfully!"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete drug with id=" + id
            });
        });
};

// Update a drug identified by the drug id in the request
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"});
    }

    const id = req.params.id;
    Drugdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update drug with id=${id}. Drug not found!`});
            }else{
                res.send({ message : "Drug was updated successfully." });
            }
        })
        .catch(err =>{
            res.status(500)
                .send({ message : "Error updating drug information"});
        });
}

// can either retrieve all drugs from the database or retrieve a single user
exports.find = (req,res)=>{
    if(req.query.id){//if we are searching for drug using its ID
        const id = req.query.id;

        Drugdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Can't find drug with id: "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving drug with id: " + id})
            });
    }else{
        Drugdb.find()
            .then(drug => {
                res.send(drug)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "An error occurred while retrieving drug information" })
            });
    }
}
            }else{
                res.send(data);
                //res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error in updating drug information"})
        })

}


// deletes a drug using its drug ID
exports.delete = (req,res)=>{
    const id = req.params.id;

    Drugdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete drug with id: ${id}. Pls check id`})
            }else{
                res.send({
                    message : `${data.name} was deleted successfully!`
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Drug with id=" + id
            });
        });

}