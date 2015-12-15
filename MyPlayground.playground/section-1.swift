// Playground - noun: a place where people can play

import Cocoa

class MyClass {
    class func f() {
        print("f in MyClass")
    }
}

class MySubClass : MyClass {
    override class func f() {
        print("f in MySubClass")
    }
}

let x: MyClass.Type
x = MySubClass.self
x.f()