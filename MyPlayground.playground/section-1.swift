// Playground - noun: a place where people can play

import Cocoa

var airports = ["YYZ": "Toronto Pearson", 1: "Dublin"]
for x in airports.keys {
    println(x)
}

var abcd: Int = 12 {
willSet {
    println("\(newValue) is set")
}
}

abcd = 18


class Test {
    var m: Int {
        get {
            return 12
        }
        set {

        }
    }

    let n: Int?
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
println(i2)


let arr1 = [1, 2, 4]
let arr2 = [4, 7]
let arr3 = arr1 + arr2
