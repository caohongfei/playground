// Playground - noun: a place where people can play

import Cocoa

var airports = ["YYZ": "Toronto Pearson", 1: "Dublin"]
for x in airports.keys {
    print(x)
}

var abcd: Int = 12 {
willSet {
    print("\(newValue) is set")
}
}

let u: Optional<Int> = 12
print(u)
if case .Some(let value) = u {
    print(value)
}

abcd = 18

let c = 4

for index in 2..<c {
    print(index)
}

class Test {
    var m: Int {
        get {
            return 12
        }
        set {

        }
    }
}

struct Celsius {
    var temperatureInCelsius: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
}
let boilingPointOfWater = Celsius(fromFahrenheit: 212.0)
// boilingPointOfWater.temperatureInCelsius is 100.0
let freezingPointOfWater = Celsius(fromKelvin: 273.15)
// freezingPointOfWater.temperatureInCelsius is 0.0


var i1 = 4
i1 = 5
var i2 = i1 * 10
i1 = 6
print(i2)


let arr1 = [1, 2, 4]
let arr2 = [4, 7]
let arr3 = arr1 + arr2




class BankAccount {
    var balance: Double = 0.0

    func deposit(amount: Double) {
        balance += amount
    }
}



let account = BankAccount()
account.deposit(100) // balance is now 100



let depositor: (BankAccount) -> (Double) -> ()


depositor = BankAccount.deposit

depositor(account)(345.0)

print(account.balance)