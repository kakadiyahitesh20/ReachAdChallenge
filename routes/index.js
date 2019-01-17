var express = require('express');
var router = express.Router();
var data = require('../data.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        userlist : data
    });
});

/* GET Contact card page. */

router.get('/contactCard/:index', function (req, res, next) {
    var index = req.params.index;
    const employeeList = data.find(employee => employee.index == index);
    console.log(employeeList);
    res.render('contactCard', {
        employeeList : employeeList
    });
});

/*  ----------------------------------------------------
Get all employee data
 ----------------------------------------------------   */

router.get('/getAllEmployeeList', function (req, res, next) {
    res.status(200).json(data);
});

/*  ----------------------------------------------------
Get employee data by id
 ----------------------------------------------------   */

router.get('/getEmployeeByIndex/:index', function(req,res,next){
  var index = req.params.index;
  const employeeList = data.find(employee => employee.index == index);
    res.status(200).json(employeeList);
})


/*  ----------------------------------------------------
Create new employee
 ----------------------------------------------------   */

router.post('/createEmployee', function (req, res,next) {
    var newEmployee = req.body;
    data.push(newEmployee);
    res.status(200).json(data);
});

/*  ----------------------------------------------------
    Remove employee data by index
 ----------------------------------------------------   */

router.delete('/deleteEmployeeByIndex/:index', function (req, res,next) {
    var index = req.params.index;
    const employeeList = data.filter(employee => employee.index != index);
    res.status(200).json(employeeList);
});

/*  ----------------------------------------------------
    Update employee date
 ----------------------------------------------------   */

router.post('/updateEmployee', function (req, res) {
    var employeeData = req.body;
    console.log(employeeData);
    const employeeUpdate = data.filter(employee => employee.index != employeeData.index);
    console.log(employeeUpdate);
    employeeUpdate.push(employeeData);
    data = employeeUpdate;
    res.status(200).json(data);
});

/*  ----------------------------------------------------
    Filter data by index
 ----------------------------------------------------   */

router.get('/filterByNameOrIndex/:searchKey', function (req, res) {
    var searchValue = req.params.searchKey;
    const checkIndex = data.filter(employee => employee.index == searchValue);
    if(checkIndex)
    {   res.status(200).json(checkIndex);
    } else if(data.filter(employee => employee.name == searchValue)){
        var checkName = data.filter(employee => employee.name == searchValue);
        res.status(200).json(checkName);
    } else {
        res.status(200).json({status : searchValue + ' Not found'});
    }
})

module.exports = router;
