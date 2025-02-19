import express from 'express';
const app = express();
const port = 3000
import {MongoClient, ObjectId} from 'mongodb'
const uri =  "mongodb+srv://prstharwani:UTU9lE66XA7EG5iJ@first-cluster.nsjz2.mongodb.net/?retryWrites=true&w=majority&appName=first-cluster";
const client = new MongoClient(uri, 
    {useNewURLParser : true, useUnifiedTopology : true}
);

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// index page 
app.get('/', (req,res) => {
    client.connect(async (err) => {
        if(err) throw err;
        const userCollection = client.db('myDB').collection('usersCollection');
        await userCollection.find({}).toArray( (err, userData) => {
            if(err) throw err;
            res.render('./index.ejs', {userData})
        });

    })
    console.log("read");
})

// create
app.post('/add', (req,res) => {
    console.log("inside create");
    client.connect(async (err)  => {
        if(err) throw err;
        const userCollection = client.db('myDB').collection('userCollection');
        await userCollection.insertOne(req.body, (err,result) => {
            if(err) throw err;
            if(result.aknowledged) {
                console.log(result.insertedCount +  ` document inserted Successfully!`);
            } else {
                console.log(`There was an error inserting the document`);
            }
            res.redirect('/')
        })
        //client close
    })
    console.log('after closing the doc');
})

//delete
app.get('/delete/:userId', (req,res) => {
    console.log('inside delete');
    client.connect(async (err) => {
        if(err) throw err;
        const userCollection = client.db('myDB').collection('userCollection');
        await userCollection.deleteOne({'_id' : new ObjectId(req.params.userId)}, (err, result) => {
            if(err) throw err;
            if(result.aknowledged) {
                console.log(result.insertedCount +  ` document inserted Successfully!`);
            } else {
                console.log(`There was an error inserting the document`);
            }
            res.redirect('/')
        })
    })
    console.log('after closing the doc');
})

//update
app.post('/edit', (req,res) => {
    console.log('updating');
    client.connect(async (err) => {
        if(err) throw err;
        const userCollection = client.db('myDB').collection('userCollection');
        await userCollection.updateOne({'_id' : new ObjectId(req.body._id )}, {$Set: {'name': req.body.name, 'email': req.body.email, 'address':req.body.address, 'phone':req.body.phone}}, (err, result) => {
            if (err) throw err;
            if (result.acknowledged) {
              console.log(result.updatedCount + ' document updated successfully!');
            } else {
              console.log('There was an error in updating the document');
            }
            res.redirect('/');
        })
    })
})

app.listen(port);