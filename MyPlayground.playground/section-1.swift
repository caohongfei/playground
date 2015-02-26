// Playground - noun: a place where people can play

import Cocoa

let allowedEntry = false
if !allowedEntry {
    println("ACCESS DENIED")
}

let a: Character = "b"

let string1 = "hello"
let string2 = " there"
var welcome = string1 + string2
// welcome now equals "hello there"
let exclamationMark: Character = "!"

let dogString = "Dog‼🐶"

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

func containsCharacter(#string: String, characterToFind: Character) -> Bool {
    for character in string {
        if character == characterToFind {
            return true
        }
    }
    return false
}

containsCharacter(string: "abc", "a")

func join(string s1: String, toString s2: String, let withJoiner joiner: String) -> String {
        return s1 + joiner + s2
}


class Test {
    var m: Int {
        get {
            return 12
        }
        set {

        }
    }

    let n: Int = 17
}



struct Fahrenheit {
    var temperature: Double
    init() {
        temperature = 12.0
    }
}
var f = Fahrenheit()
println("The default temperature is \(f.temperature)° Fahrenheit")


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




