require('dotenv').config();

const cors = require('cors')
const express = require('express');
const connectDB = require('./database/db');
const User = require('./database/models/user')
const Frag = require('./database/models/frag_user')
const Pix = require('./database/models/pix_user')
const Winners = require('./database/models/winners')
const IdsGroupsVinte = require('./database/models/ids_groups_20')
const IdsGroupsCinquenta = require('./database/models/ids_groups_50')
const IdsGroupsCem = require('./database/models/ids_groups_100')
const IdsGroupsQuinhentos = require('./database/models/ids_groups_500')
const GroupVinte = require('./database/models/group_20')
const GroupCinquenta = require('./database/models/group_50')
const GroupCem = require('./database/models/group_100')
const GroupQuinhentos = require('./database/models/group_500')


const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000


app.listen(PORT, () => {
    console.log('Server started in port::', PORT)
})
app.get('/busca', async (req,res) => {

    await connectDB.sync({force: true});
    // const newUser = await User.create({
    //     email: 'th...@',
    //     username: 'thi',
    //     password: "4e3209-42-",
    //     saldo: 1500
    // })
    // console.log(newUser)
    // connectDB.query('SELECT * FROM ids_groups_20;', (err, result) => {
    //     if(err) {
    //         console.log(err)
    //         console.log('lols   ')
    //     }
        
    //     console.log('coxinhba')
    //     console.log(result)
    // })
})