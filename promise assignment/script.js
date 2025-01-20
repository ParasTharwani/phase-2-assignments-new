// Promise  chaining
const users = {
    name: "paras",
    id: 4,
    age: 24
};

const orderId = 3333;

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(users.id === 4) {
            resolve("User verified");
        } else {
            reject("User verification failed");
        }
    }, 2000);
  
});

const orderP = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(orderId && orderId === 3333) {
            resolve("Order verified");
        } else {
            reject("Order verification failed");
        }
    }, 1000);
  
});

// then chaining
myPromise
    .then(userResult => {
        console.log(userResult);  
        return orderP;  
    })
    .then(orderResult => {
        console.log(orderResult);  // "Order verified"
        return {
            userStatus: "User verified",
            orderStatus: "Order verified",
            finalStatus: "Both verifications successful"
        };
    })
    .then(finalResult => {
        console.log("Final result:", finalResult);
    })
    .catch(error => {
        console.error("An error occurred:", error);
    })
    .finally(() => {
        console.log("Verification process completed");
    });

    //Promise All
    Promise.all([myPromise, orderP])
    .then(([userResult, orderResult]) => {
        console.log("User status:", userResult);
        console.log("Order status:", orderResult);
        return "All verifications successful";
    })
    .catch(error => {
        console.error("Verification failed:", error);
    })
    .finally(() => {
        console.log("Verification process completed");
    });

    //promise race
    console.log("Starting Promise.race()...");
Promise.race([myPromise, orderP])
    .then(result => {
        console.log("Race winner:", result);  // Will show "Order verified" because orderP is faster
    })
    .catch(error => {
        console.log("Race error:", error);
    });

    //promiseallsettled()
    console.log("Starting Promise.allSettled()...");
Promise.allSettled([myPromise, orderP])
    .then(results => {
        results.forEach((result, index) => {
            if(result.status === 'fulfilled') {
                console.log(`Promise ${index + 1} fulfilled with value:`, result.value);
            } else {
                console.log(`Promise ${index + 1} rejected with reason:`, result.reason);
            }
        });
        const [userResult, orderResult] = results;
    });