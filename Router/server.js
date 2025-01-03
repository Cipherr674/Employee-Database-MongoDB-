const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



const employeeModel=require('../model/employeeData');

function employeerouting(nav){

    router.get('/data',async(req,res)=>{
        try {
            const data= await employeeModel.find();
            res.render("home",{
                title:'Employee Database',
                data,
                nav
            })
        } catch (error) {
            res.status(404).send('Error 404 not found')
            
        }
    });

    router.get('/form',async(req,res)=>{
        res.render("form",{
            title:"Add Employee",
            nav
        })
    });

    router.post('/add',async(req,res)=>{
        try {
            var item=req.body;
            const data = new employeeModel(item);
            await data.save();
            res.redirect('/server/data')
        } catch (error) {
            res.status(404).send('Post was Unsucessfull')
        }
    });

    router.get('/updatepage/:id', async (req, res) => {
        const data = await employeeModel.findOne({ "_id": req.params.id });
        res.render("updateform", {
            nav,
            data,
            employeeid: req.params.id
        });
    });
    
    router.post('/edit/:id', async (req, res) => {
        try {
            const data = await employeeModel.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/server/data');
        } catch (error) {
            res.status(404).send('Update Unsuccessful');
        }
    });

    router.post('/delete/:id', async (req, res) => {
        try {
            await employeeModel.findByIdAndDelete(req.params.id);
            res.redirect('/server/data');
        } catch (error) {
            res.status(404).send('Delete Unsuccessful');
        }
    });
    return router;
}

module.exports=employeerouting