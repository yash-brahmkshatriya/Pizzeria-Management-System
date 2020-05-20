const express = require('express')
const app = express()

// customer queries
const clogin = require('./queries/user/login')
const creg = require('./queries/user/register')
const gmenu = require('./queries/user/getmenu')
const gorder = require('./queries/user/order')
const gcashier = require('./queries/user/cashier')

// customer vars
var current_user = undefined
var menu = undefined
var curr_order = []
var final_order_details = undefined

// admin queries
const alogin =  require('./queries/admin/login')
const manageAdmins = require('./queries/admin/manageAdmins')
const manageItems = require('./queries/admin/manageItems')
const stats = require('./queries/admin/stats')
// admin vars
var current_admin = undefined;


app.set('view-engine','ejs')

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res) => {
    res.render('index.ejs')
})

//-------------- CUSTOMER PORTION -------------

app.get('/customer/login',(req,res) => {
    res.render('./customer/login.ejs')
})

app.post('/customer/login', (req,res) => {
    var emailid = req.body.emailid
    var pwd = req.body.pwd
    clogin.login(emailid,pwd, (result) => {
        if(result == false){
            res.redirect('/customer/register')
        } else {
            current_user = result[0]
            res.redirect('/customer/order')
        }
    })
})

app.get('/customer/register',(req,res) =>{
    res.render('./customer/register.ejs')
})

app.post('/customer/register', (req,res) => {
    var fname = req.body.fname
    var lname = req.body.lname
    var phn = req.body.phn
    var emailid = req.body.emailid
    var pwd = req.body.pwd
    creg.register(fname,lname,phn,emailid,pwd, (result) => {
        if(result == false) {
            res.redirect('/')
        } else {
            res.redirect('/customer/login')
        }
    })
})

app.get('/customer/order', (req,res) => {
    curr_order = {}
    console.log(current_user)
    gmenu.getmenu((result) => {
        if(current_user == undefined || result == false){
            res.redirect('/')
        } else {
            menu = result
            res.render('./customer/order.ejs',{data:{"user":current_user,"menu":result}})
        }
    })
})

app.post('/customer/order',(req,res)=> {
    var myans = req.body.myresult;
    myans = myans.split(",");
    for(i=0;i<myans.length-1;i++){
        var item = myans[i].split("-");
        curr_order[item[0]] = item[1];
    }
    console.log('order is',curr_order);
    res.redirect('/customer/bill');
})

app.get('/customer/bill',(req,res) => {
    if(curr_order.length ==0 ){
        res.redirect('/customer/order')
    } else {
        gorder.getOrderDetails(curr_order, (result) =>{
            var totamt = 0;
            for(i=0;i<result.length;i++){
                result[i]["qty"] = curr_order[result[i]["item_id"]];
                result[i]["amt"] = result[i]["qty"] * result[i]["price"];
                totamt+=result[i]["amt"];
            }
            result["totamt"] = totamt;
            final_order_details = result;
            gcashier.getCashierDetails( (cashiers) => {
                res.render('./customer/bill.ejs',{data:{"user":current_user,"order":result,"cashier":cashiers}});
            })
        })
    }
})

app.post('/customer/bill',(req,res) => {
    var billPaidTo = req.body.paidto;
    final_order_details["cashierid"] = billPaidTo;
    gorder.updateDetails(final_order_details,current_user["cust_id"], (order_success) => {
        if(!order_success) {
            console.log('Billing Failed');
            res.redirect('/')
        } else {
            console.log('Billing Success');
            res.redirect('/customer/orderplaced');
        }
    })
})

app.get('/customer/orderplaced',(req,res)=> {
    res.render('./customer/order_placed.ejs',{data:{"user":current_user}});
})

app.post('/customer/logout',(req,res)=>{
    curr_order = []
    current_user = undefined;
    res.redirect('/');
})

//------------------ ADMIN PORTION ----------------

app.get('/admin/login', (req,res) => {
    res.render('./admin/login.ejs');
})

app.post('/admin/login', (req,res) => {
    var emailid = req.body.emailid;
    var pwd = req.body.pwd;
    alogin.login(emailid,pwd, (result)=> {
        if(result==false){
            res.redirect('/');
        } else {
            current_admin = result[0];
            res.redirect('/admin/options');
        }
    })
})

app.get('/admin/options',(req,res)=>{
    if(current_admin == undefined){
        res.redirect('/admin/login')
    } else {
        res.render('./admin/options.ejs',{data:{"admin_details":current_admin}});
    }
})

app.post('/admin/logout',(req,res) =>{
    current_admin = undefined;
    res.redirect('/');
})

// -------------- MANAGE ADMINS ------------

app.get('/admin/options/addAdmin',(req,res)=>{
    if(current_admin == undefined){
        res.redirect('/admin/login')
    } else {
        res.render('./admin/addAdmin.ejs',{data:{"admin_details":current_admin}});
    }
})

app.post('/admin/options/addAdmin',(req,res)=>{
    manageAdmins.addAdmin(req.body.name,req.body.email,req.body.pwd, (success)=>{
        if(success){
            res.redirect('/admin/options');
        } else {
            res.redirect('/admin/options/addAdmin');
        }
    })
})

app.get('/admin/options/removeAdmin',(req,res)=>{
    if(current_admin == undefined){
        res.redirect('/admin/login')
    } else {
        manageAdmins.getAdmins(current_admin["admin_id"],(otheradmins)=>{
            res.render('./admin/removeAdmin.ejs',{data:{"admin_details":current_admin,"otheradmins":otheradmins}});
        })
    }
})

app.post('/admin/options/removeAdmin',(req,res)=>{
    manageAdmins.removeAdmin(req.body.radmin_id, (success)=>{
        if(success){
            res.redirect('/admin/options');
        } else {
            res.redirect('/admin/options/removeAdmin');
        }
    })
})


//  ------------ MANAGE ITEMS ---------------

app.get('/admin/options/addItem',(req,res)=>{
    if(current_admin == undefined){
        res.redirect('/admin/login');
    } else {
        res.render('./admin/addItem.ejs',{data:{"admin_details":current_admin}});
    }
})

app.post('/admin/options/addItem',(req,res) =>{
    manageItems.addItem(req.body.name,req.body.price,req.body.category, (success) => {
        if(success){
            res.redirect('/admin/options');
        } else {
            gmenu.getmenu((result) => {
                if(result == false){
                    res.redirect('/admin/login')
                } else {
                    menu = result
                    res.render('./admin/removeItem.ejs',{data:{"admin_details":current_admin,"menu":result}});
                }
            })
        }
    })
})

app.get('/admin/options/removeItem',(req,res)=>{
    if(current_admin == undefined){
        res.redirect('/admin/login');
    } else {
        gmenu.getmenu((result) => {
            if(result == false){
                res.redirect('/admin/login')
            } else {
                menu = result
                res.render('./admin/removeItem.ejs',{data:{"admin_details":current_admin,"menu":result}});
            }
        })
    }
})

app.post('/admin/options/removeItem',(req,res) =>{
    manageItems.removeItem(req.body.item_id, (success) => {
        if(success){
            res.redirect('/admin/options');
        } else {
            res.redirect('/admin/options/removeItem');
        }
    })
})


app.get('/admin/options/updateItemPrice',(req,res)=>{
    if(current_admin == undefined){
        res.redirect('/admin/login');
    } else {
        gmenu.getmenu((result) => {
            if(result == false){
                res.redirect('/admin/login')
            } else {
                menu = result
                res.render('./admin/updateItemPrice.ejs',{data:{"admin_details":current_admin,"menu":result}});
            }
        })
    }
})

app.post('/admin/options/updateItemPrice',(req,res) =>{
    manageItems.updatePrice(req.body.item_id,req.body.newprice, (success) => {
        if(success){
            res.redirect('/admin/options');
        } else {
            res.redirect('/admin/options/updateItemPrice');
        }
    })
})

// ----------- Sale Statistics ----------

app.get('/admin/options/itemstats', (req,res) => {
    if(current_admin == undefined){
        res.redirect('/admin/login');
    } else {
        stats.getItemStats((statsres)=>{
            if(statsres == false){
                console.log("Error in fetching item stats");
                res.redirect('/');
            } else {
                for(i=0;i<statsres.length;i++){
                    statsres[i]["srno"]= (i+1);
                }
                res.render('./admin/itemstats.ejs',{data:{"admin_details":current_admin,"stats":statsres}});
            }
        })
    }
})

app.listen(2831)