const express = require('express');
const app = express()
const {MongoClient} = require("mongodb");
const port = 3000;
const uri =  "mongodb+srv://prstharwani:UTU9lE66XA7EG5iJ@first-cluster.nsjz2.mongodb.net/?retryWrites=true&w=majority&appName=first-cluster";
const client = new MongoClient(uri);


//insert one
const myDB = client.db("myDB")
const myColl = myDB.collection("pizzaMenu")
async function add(){
    const doc = { name: "Neapolitan pizza", shape: "round" };
    const result = await myColl.insertOne(doc);
    try{
        await client.connect();
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`,
        );
        
    } finally{
        await client.close()
    }
}
add().catch(console.error);

// with routes
// async function add(){
//     const myDB = client.db("myDB")
//     const myColl = myDB.collection("pizzaMenu")

//     const doc = { name: "Neapolitan pizza", shape: "round" };
//     const result = await myColl.insertOne(doc);
//     console.log(
//         `A document was inserted with the _id: ${result.insertedId}`,
//     );
//     app.get('/', async (req,res) => {
//         try{
//             await client.connect();
           
          
//     }
//     finally{
//         await client.close()
//     }
//     })
// }
// add().catch(console.error);

// app.listen(port, () => {
//     console.log(`server is running on ${port}`);
// })

//insert many

async  function addMany(){
    const docs = [
        { name: "Sicilian pizza", shape: "square" },
       { name: "New York pizza", shape: "round" },
       { name: "Grandma pizza", shape: "square" }
    ]
    
    const insertManyResult = await myColl.insertMany(docs);

try{
   
    await client.connect()
    let ids = insertManyResult.insertedIds
    
    console.log(`${insertManyResult.insertedCount} flavours were inserted`);
    
    for(let id of Object.values(ids)){
        console.log(`Inserted a document with id ${id}`);
    }

}finally{
    await client.close()
}
}

addMany().catch(console.error);

// create multiple listings 

async function main(){
    try {
        //connect to mongodb cluster
        await client.connect()

        await createMultipleListings(client, [
            {
                name: "Infinite Views",
                summary: "Modern home with infinite views from the infinity pool",
                property_type: "House",
                bedrooms: 5,
                bathrooms: 4.5,
                beds: 5
            },
            {
                name: "Private room in London",
                property_type: "Apartment",
                bedrooms: 1,
                bathroom: 1
            },
            {
                name: "Beautiful Beach House",
                summary: "Enjoy relaxed beach living in this house with a private beach",
                bedrooms: 4,
                bathrooms: 2.5,
                beds: 7,
                last_review: new Date()
            }
        ]);

    } finally {
        // closing the connection to mongodb cluster
        await client.close()
    }
}
main().catch(console.error)

    async function createMultipleListings(client, newListings ){
        const result = await client.db('sample_airbnb').collection("listingAndReviews").insertMany(newListings)
        console.log(`${result.insertedCount} new listing(S) created with the following id(s)`);
        console.log(result.insertedIds);
    }



    // finding the listing with particular name
    async function find(){
        try {
            await client.connect()

            await findOneListingByName(client, "Infinite Views");
        } finally{
            await client.close();
        }
    }
    find().catch(console.error)


    async function findingListing(client, nameOfListing){
        const result = await client.db("sample_airbnb").collection("listingAndReveiw").findOne({name: "Infinite Views"})
        if(result){
            console.log(`Found listing in the collection with name ${nameOfListing}`);
            console.log(result);
        } else{
            console.log(`No Listing found with the name ${nameOfListing}`);
        }
    }

// delete

async function deletelist(){
    try{
        await client.connect()

        await deleteListing(client, "Private room in London");
    } finally {
        await client.close()
    }
}
 deletelist().catch(console.error)
async function deleteListing(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .deleteOne({name: nameOfListing} )
    console.log(`${result.deletedCount} document was deleted`);
}


