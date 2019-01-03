//
//  main.swift
//  TestSwift
//
//  Created by Hongfei Cao on 2018/12/10.
//  Copyright © 2018 Personal. All rights reserved.
//

import Foundation

let a = [5, 7, 68, 333]
let b = 1.0..<5.0
let c = AnySequence(a)

let possibleNumbers = ["1", "2", "three", "///4///", "5"]
let flatMapped: [Int] = possibleNumbers.compactMap { str in Int(str) }
print(flatMapped)