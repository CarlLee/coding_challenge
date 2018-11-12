const names = ['Adam', 'Andrew', 'Bill', 'Carl', 'Desmond', 'Eli', 'Jane', 'Alex'];
const surNames = ['Johnson', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Smith', 'Price', 'Wood', 'Barnes'];

let output = {
    contracts: []
}
for(let i = 0; i < 100; i++) {
    let json = {
        id: i,
        user: {
            name: randomArrayElement(names),
            surname: randomArrayElement(surNames)
        },
        amountInUsd: (Math.random() * 10000).toFixed(2),
        currency: 'ETH' + (Math.random() * 10000).toFixed(2),
        date: new Date().toUTCString()
    }
    output.contracts.push(json)
}

console.log(JSON.stringify(output))

function randomArrayElement(arr) {
    return arr[Math.round(Math.random() * arr.length)]
}