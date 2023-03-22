/**
 * @param {number[]} nums
 * @return {number[]}
 */

class stl {
    static sort(array, params = {}) {
        const { 
            reverse = false,
            inplace = true,
            keysToSort = [],
            order = [],
        } = params;

        if (!inplace) {
            array = [...array];
        }
        array.sort(function (a, b) {
            // reverse b - a
            // a-b 
            let acurr = a;
            let bcurr = b;

            for (let i = 0; i < keysToSort.length; i++) {
                acurr = a;
                bcurr = b;
                const keys = keysToSort[i].split('.');
                for (let key of keys) {
                    acurr = acurr[key]
                    bcurr = bcurr[key];
                }
                if (acurr === bcurr) {
                    continue;
                }
                if (order[i] === 'forward') {
                    return acurr - bcurr;
                } else if (order[i] === 'reverse') {
                    return bcurr - acurr;
                }
                return !reverse ? (acurr - bcurr) : (bcurr - acurr);
            }

            return !reverse ? (acurr - bcurr) : (bcurr - acurr);
        });

        return array;
    }

    static binarySearch(array, toSearch) {

    }
}
console.log(stl.sort([
    { a: { c: 10 }, b: 20 },
    { a: { c: 20 }, b: 20 },
    { a: { c: 50 }, b: 20 },
    { a: { c: 5 }, b: 20 },
    { a: { c: 5 }, b: 10 }
], {keysToSort: ['a.c', 'b'], reverse: true, inplace: true}));
