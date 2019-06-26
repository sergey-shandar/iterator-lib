/* tslint:disable */

import * as _ from "../index"

describe("map", () => {
    it("array", () => {
        const result = _.map([1, 2, 3], x => x * x).toArray()
        expect([1, 4, 9]).toEqual(result)
    })
    it("undefined", () => {
        const result = _.map(undefined, x => x).toArray()
        expect([]).toEqual(result)
    })
    it("member", () => {
        const result = Array.from(_.chain([1, 2, 3]).map(x => x * x))
        expect([1, 4, 9]).toEqual(result)
    })
})

describe("filter", () => {
    it("array", () => {
        const result = Array.from(_.filter([1, 2, 3, 4], x => x % 2 === 0))
        expect([2, 4]).toEqual(result)
    })
    it("member", () => {
        const result = Array.from(_.iterable(function *() { yield *[1, 2, 3, 4] }).filter(x => x % 2 === 0))
        expect([2, 4]).toEqual(result)
    })
})

describe("drop", () => {
    it("array", () => {
        const result = Array.from(_.drop(["a", "b", "c", "d", "e"], 2))
        expect(["c", "d", "e"]).toEqual(result)
    })
    it("default", () => {
        const result = Array.from(_.drop(["a", "b", "c", "d", "e"]))
        expect(["b", "c", "d", "e"]).toEqual(result)
    })
    it("member", () => {
        const result = Array.from(_.iterable(function *() { yield *["a", "b", "c", "d", "e"] }).drop(2))
        expect(["c", "d", "e"]).toEqual(result)
    })
})

describe("filterMap", () => {
    it("array", () => {
        const result = Array.from(_.filterMap([1, 2, 3, 4], x => x))
        expect([1, 2, 3, 4]).toEqual(result)
    })
    it("array with undefined", () => {
        const result: number[] = Array.from(_.filterMap([1, 2, 3, 4, undefined], x => x))
        expect([1, 2, 3, 4]).toEqual(result)
    })
    it("member", () => {
        const result = Array.from(_.concat([1, 2, 3, 4]).filterMap(x => x < 3 ? x * 2 : undefined))
        expect([2, 4]).toEqual(result)
    })
})

describe("flat", () => {
    it("array", () => {
        const result = Array.from(_.flat([[1, 2], [2, 3], [3, 4]]))
        expect([1, 2, 2, 3, 3, 4]).toEqual(result)
    })
    it("undefined", () => {
        const result = Array.from(_.flat(undefined))
        expect([]).toEqual(result)
    })
})

describe("flatMap", () => {
    it("array", () => {
        const result = Array.from(_.flatMap([1, 2, 3], x => [x, x * 2]))
        expect([1, 2, 2, 4, 3, 6]).toEqual(result)
    })
    it("member", () => {
        const result = Array.from(_.iterable(() => [1, 2, 3][Symbol.iterator]()).flatMap(x => [x, x * 2]))
        expect([1, 2, 2, 4, 3, 6]).toEqual(result)
    })
})

describe("repeat", () => {
    it("array", () => {
        const result = Array.from(_.repeat("Hello!", 5))
        expect(["Hello!", "Hello!", "Hello!", "Hello!", "Hello!"]).toEqual(result)
    })
})

describe("zip", () => {
    it("array", () => {
        const result = Array.from(_.zip([1, "b", 4], ["a", 2, 6]))
        expect([[1, "a"], ["b", 2], [4, 6]]).toEqual(result)
    })
    it("empty item", () => {
        const result = Array.from(_.zip([1, "b"], [], ["a", 2]))
        expect([]).toEqual(result)
    })
    it("undefined", () => {
        const result = Array.from(_.zip([1, "b"], undefined, ["a", 2]))
        expect([]).toEqual(result)
    })
    it("member", () => {
        const result = Array.from(_.concat([1, "b", 4]).zip(["a", 2, 6]))
        expect([[1, "a"], ["b", 2], [4, 6]]).toEqual(result)
    })
})

describe("generate", () => {
    it("infinite", () => {
        const result = Array.from(_.zip(_.repeat(2), [1, 3]))
        expect([[2, 1], [2, 3]]).toEqual(result)
    })
})

describe("reduce", () => {
    it("no items", () => {
        const result = _.reduce([], a => a)
        expect(result).toEqual(undefined)
    })
    it("1", () => {
        const result = _.reduce([1], (a, b) => a + b)
        if (result === undefined) {
            throw new Error("undefined")
        }
        expect(1).toEqual(result)
    })
    it("2", () => {
        const result = _.reduce([1, 2], (a, b) => a + b)
        if (result === undefined) {
            throw new Error("undefined")
        }
        expect(3).toEqual(result)
    })
    it("member", () => {
        const result = _.concat([1, 2, 3]).reduce((a, b) => a + b)
        if (result === undefined) {
            throw new Error("undefined")
        }
        expect(6).toEqual(result)
    })
})

describe("sum", () => {
    it("array", () => {
        const result = _.sum([1, 2, 3])
        expect(6).toEqual(result)
    })
})

describe("min", () => {
    it("3", () => {
        const result = _.min([1, 2, 3])
        expect(1).toEqual(result)
    })
    it("0", () => {
        const result = _.min([])
        expect(Infinity).toEqual(result)
    })
    it("negative", () => {
        const result = _.min([-1, -2, -3])
        expect(-3).toEqual(result)
    })
})

describe("fold", () => {
    it("member", () => {
        const result = _.concat([1, 2, 3]).fold((a, b) => a + b, "")
        expect(result).toEqual("123")
    })
})

describe("max", () => {
    it("3", () => {
        const result = _.max([1, 2, 3])
        expect(3).toEqual(result)
    })
    it("0", () => {
        const result = _.max([])
        expect(-Infinity).toEqual(result)
    })
    it("negative (to make sure, no zeros are involved", () => {
        const result = _.max([-2, -3, -4])
        expect(-2).toEqual(result)
    })
})

describe("forEach", () => {
    it("array", () => {
        let x = 0
        let ii = 0
        _.forEach(
            [1, 2, 4],
            (v, i) => {
                x = x + v
                ii = ii + i
            })
        expect(7).toEqual(x)
        expect(3).toEqual(ii)
    })
    it("member", () => {
        let x = 0
        let ii = 0
        _.concat([1, 2, 4]).forEach(
            (v, i) => {
                x = x + v
                ii = ii + i
            })
        expect(7).toEqual(x)
        expect(3).toEqual(ii)
    })
})

describe("isEqual", () => {
    it("ref equal", () => {
        const ref: ReadonlyArray<string> = ["a", "b"]
        const result = _.isEqual(ref, ref, (a, b) => a === b)
        expect(result).toEqual(true)
    })
    it("equal", () => {
        const result = _.isEqual(["a", "b"], ["a", "b"], (a, b) => a === b)
        expect(result).toEqual(true)
    })
    it("length", () => {
        const result = _.isEqual(["a", "b"], ["a", "b", "c"], (a, b) => a === b)
        expect(result).toEqual(false)
    })
    it("not equal", () => {
        const result = _.isEqual(["a", "b"], ["a", "c"], (a, b) => a === b)
        expect(result).toEqual(false)
    })
    it("default e", () => {
        const result = _.isEqual(["a", "b"], ["a", "c"])
        expect(result).toEqual(false)
    })
    it("one undefined", () => {
        const result = _.isEqual(undefined, "a")
        expect(result).toEqual(false)
    })
    it("both undefined", () => {
        const result = _.isEqual(undefined, undefined)
        expect(result).toEqual(true)
    })
    it("member", () => {
        const result = _.concat(["a", "b"]).isEqual(["a", "c"])
        expect(result).toEqual(false)
    })
})

describe("last", () => {
    it("3", () => {
        const result = _.last([1, 4, 5, 3])
        expect(3).toEqual(result)
    })
    it("undefined", () => {
        const result = _.last([])
        expect(result).toEqual(undefined)
    })
    it("member", () => {
        const result = _.concat([1, 4, 5, 3, 9]).last()
        expect(9).toEqual(result)
    })
})

describe("some", () => {
    it("some", () => {
        const result = _.some([1, 2, 3, 4], v => v == 2)
        expect(result).toEqual(true)
    })
    it("none", () => {
        const result = _.some([1, 5, 3, 4], v => v == 2)
        expect(result).toEqual(false)
    })
    it("with undefined", () => {
        const result = _.some([undefined], () => true)
        expect(result).toEqual(true)
    })
    it("member", () => {
        const result = _.concat([1, 2, 3, 4]).some(v => v == 4)
        expect(result).toEqual(true)
    })
    it("member default, non empty", () => {
        const result = _.concat([1, 2]).some()
        expect(result).toEqual(true)
    })
    it("member default, empty", () => {
        const result = _.concat([]).some()
        expect(result).toEqual(false)
    })
})

function readonlyArrayOrString(v: readonly string[]|string): readonly string[]|string {
    return v
}

describe("isArray", () => {
    it("array", () => {
        const v = readonlyArrayOrString(["5"])
        if (_.isArray(v)) {
            expect(1).toEqual(v.length)
            expect("5").toEqual(v[0])
        } else {
            throw Error("`isArray()` returned `false`")
        }
    })
    it("array", () => {
        const v = readonlyArrayOrString("5")
        if (_.isArray(v)) {
            throw Error("`isArray()` returned `true`")

        } else {
            expect("5").toEqual(v)
        }
    })
})

describe("concat", () => {
    it("several", () => {
        const result = _.concat([1, 2, 3], [5, 7, 9], [-1])
        expect([1, 2, 3, 5, 7, 9, -1]).toEqual(_.toArray(result))
    })
    it("concat", () => {
        const result = _.concat([1, 2, 3], [5, 7, 9], undefined, [-1])
        expect([1, 2, 3, 5, 7, 9, -1]).toEqual(_.toArray(result))
    })
    it("member", () => {
        const result = _.concat([91, 140]).concat([1, 2, 3], [5, 7, 9], undefined, [-1])
        expect([91, 140, 1, 2, 3, 5, 7, 9, -1]).toEqual(_.toArray(result))
    })
})

describe("toArray", () => {
    it("undefined", () => {
        const result = _.toArray(undefined)
        expect([]).toEqual(result)
    })
    it("member", () => {
        const result = _.concat([1, 2, 3]).toArray()
        expect([1, 2, 3]).toEqual(result)
    })
})

describe("every", () => {
    it("all", () => {
        const result = _.every([1, 2, 3], v => v > 0)
        expect(result).toEqual(true)
    })
    it("not all", () => {
        const result = _.every([1, 2, 0], v => v > 0)
        expect(result).toEqual(false)
    })
    it("member", () => {
        const result = _.concat([1, 2, 3]).every(v => v > 0)
        expect(result).toEqual(true)
    })
})

describe("reverse", () => {
    it("array", () => {
        const result = _.reverse([1, 2, 3])
        expect([3, 2, 1]).toEqual(result)
    })
    it("member", () => {
        const result = _.concat([1, 2, 3]).reverse()
        expect([3, 2, 1]).toEqual(result)
    })
})

describe("isEmpty", () => {
    it("empty", () => {
        const result = _.isEmpty(undefined)
        expect(result).toEqual(true)
    })
    it("not empty", () => {
        function *iterator() {
            yield 23
            // make sure we never check next item
            throw new Error()
        }
        const result = _.isEmpty(iterator())
        expect(result).toEqual(false)
    })
    it("with undefined", () => {
        const result = _.isEmpty([undefined])
        expect(result).toEqual(false)
    })
    it("member", () => {
        const result = _.concat([2]).isEmpty()
        expect(result).toEqual(false)
    })
})

describe("entries", () => {
    it("member", () => {
        const result = _.toArray(_.iterable(function *(): _.Iterator<string> { yield "a"; yield "b"; yield "c"; }).entries())
        expect(result).toEqual([[0, "a"], [1, "b"], [2, "c"]])
    })
})

describe("findEntry", () => {
    it("some", () => {
        const result = _.findEntry([0, 1, 0], v => v === 0)
        expect(result).toEqual([0, 0])
    })
    it("none", () => {
        const result = _.find([0, 1, 0], v => v === 2)
        expect(result).toEqual(undefined)
    })
    it("undefined", () => {
        const result = _.findEntry([undefined], () => true)
        expect(result).toEqual([0, undefined])
    })
    it("member", () => {
        const result = _.concat([0, 1, 0]).findEntry(v => v === 0)
        expect(result).toEqual([0, 0])
    })
})

describe("find", () => {
    it("some", () => {
        const result = _.find([0, 1, 0], v => v === 0)
        expect(result).toEqual(0)
    })
    it("none", () => {
        const result = _.find([0, 1, 0], v => v === 2)
        expect(result).toEqual(undefined)
    })
    it("undefined", () => {
        const result = _.find([undefined], () => true)
        expect(result).toEqual(undefined)
    })
    it("member", () => {
        const result = _.concat([0, 1, 0]).find(v => v === 2)
        expect(result).toEqual(undefined)
    })
})

describe("join", () => {
    it("/", () => {
        const result = _.join(["aaa", "bb", "c"], "/")
        expect(result).toEqual("aaa/bb/c")
    })
    it("one", () => {
        const result = _.join(["rrr"], "/")
        expect(result).toEqual("rrr")
    })
    it("empty", () => {
        const result = _.join([], "/")
        expect(result).toEqual("")
    })
})

describe("takeWhile", () => {
    it("member", () => {
        const result = _.toArray(_.concat(["a", "b", "c", "d"]).takeWhile(v => v !== "c"))
        expect(result).toEqual(["a", "b"])
    })
})

describe("take", () => {
    it("1", () => {
        const result = _.toArray(_.take(["a", "b", "c"]))
        expect(result).toEqual(["a"])
    })
    it("member", () => {
        const result = _.toArray(_.concat(["a", "b", "c", "d"]).take(2))
        expect(result).toEqual(["a", "b"])
    })
})

describe("dropRight", () => {
    it("array", () => {
        const result = _.toArray(_.dropRight(["a", "b", "c", "d", "e"], 2))
        expect(result).toEqual(["a", "b", "c"])
    })
    it("1", () => {
        const result = _.toArray(_.dropRight(["a", "b", "c", "d", "e"]))
        expect(result).toEqual(["a", "b", "c", "d"])
    })
    it("undefined", () => {
        const result = _.dropRight(undefined).toArray()
        expect(result).toEqual([])
    })
})

describe("uniq", () => {
    it("sorted", () => {
        const result = _.toArray(_.uniq([1, 2, 2, 3]))
        expect(result).toEqual([1, 2, 3])
    })
    it("unsorted", () => {
        const result = _.toArray(_.uniq([3, 1, 2, 2, 3]))
        expect(result).toEqual([3, 1, 2])
    })
    it("complex", () => {
        const result = _.toArray(_.uniq(
            [{ a: 3 },  { a: 1 },  { a: 2 }, { a: 2 }, { a: 3 }],
            v => v.a
        ))
        expect(result).toEqual([{ a: 3 }, { a: 1 }, { a: 2 }])
    })
    it("member", () => {
        const result = _.concat([3, 1, 2, 2, 3]).uniq().toArray()
        expect(result).toEqual([3, 1, 2])
    })
})

describe("chain", () => {
    it("Symbol.iterator", () => {
        const c = _.chain([1, 2])
        const createIterator = c[Symbol.iterator]
        const x = _.iterable(createIterator)
        const result = x.toArray()
        expect(result).toEqual([1, 2])
    })
    it("no this", () => {
        const c = _.chain([1, 2])
        const f = c.map
        const result = f(v => v * 2).toArray()
        expect(result).toEqual([2, 4])
    })
})

describe("arrayReverse", () => {
    it("some value", () => {
        const c = _.arrayReverse([1, 2, 3])
        const x = c.last()
        expect(x).toEqual(1)
    })
})

describe("scan", () => {
    it("scan", () => {
        const c = _.chain([56, 27, 155])
        const r = c.scan((a, v) => a + v, ":").toArray()
        expect(r).toEqual([":", ":56", ":5627", ":5627155"])
    })
})

describe("first", () => {
    it("first", () => {
        const c = _.chain([2, 3]).first()
        expect(c).toEqual(2)
    })
    it("undefined", () => {
        const c = _.first(undefined)
        expect(c).toEqual(undefined)
    })
})