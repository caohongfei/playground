// Playground - noun: a place where people can play

import Cocoa

class MyClass {
    var a = 1
    deinit {
        print("deinit")
    }
}

var pointer: UnsafeMutablePointer<MyClass>!

pointer = UnsafeMutablePointer<MyClass>.alloc(1)
pointer.initialize(MyClass())

print(pointer.memory.a)
pointer.destroy()
pointer.dealloc(1)
//pointer = nil

var p: CFunctionPointer<() -> ()>