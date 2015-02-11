// Playground - noun: a place where people can play

import Cocoa

var str = "Hello, playground"
var d = 3.233
var abc = 10 + d
let http404Error: (Int, String) = (404, "Not Found")

let possibleNumber = "123"
let convertedNumber = possibleNumber.toInt()
if convertedNumber != nil {
    println("convertedNumber has an integer value of \(convertedNumber).")
}

let defaultColorName = "red"
var userDefinedColorName: String = "b"   // defaults to nil

var colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName is nil, so colorNameToUse is set to the default of "red"

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
