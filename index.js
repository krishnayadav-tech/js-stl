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

    static __binarySearch(array, left, right, toSearch) {
        /* base case */
        if(left === right) {
            return array[left] === toSearch ? left : -1;
        }

        if(left > right) {
            return -1;
        }

        let mid = Math.floor(left + (right - left)/2);
        const leftRes = this.__binarySearch(array, left, mid, toSearch);
        const rightRes = this.__binarySearch(array, mid + 1, right, toSearch);
        return Math.max(leftRes, rightRes);
    }
    
    static binarySearch(array, toSearch) {
       return this.__binarySearch(array, 0, array.length -1, toSearch);
    }

    static __lowerBound(array, left, right, element) {
        if(left === right) {
            return (
                array[left] === element &&
                    (left === 0 || array[left - 1] < element) ?
                    left : -1
            );
        }
        if(left > right) {
            return -1;
        }
        let mid = Math.floor(left + (right - left)/2);
        const leftRes = this.__lowerBound(array, left, mid, element);
        const rightRes = this.__lowerBound(array, mid + 1, right, element);
        return Math.max(leftRes, rightRes);
    }


    static lowerBound(array, element) {
        return this.__lowerBound(array, 0, array.length - 1 , element);
    }

    static __upperBound(array, left, right, element) {
        if(left === right) {
            return (
                array[left] === element &&
                    (left === array.length -1 || array[left + 1] > element) ?
                    left : -1
            );
        }
        if(left > right) {
            return -1;
        }
        let mid = Math.floor(left + (right - left)/2);
        const leftRes = this.__upperBound(array, left, mid, element);
        const rightRes = this.__upperBound(array, mid + 1, right, element);
        return Math.max(leftRes, rightRes);
    }

    static upperBound(array, element) {
        return this.__upperBound(array, 0, array.length -1 , element);
    }
}

console.log(stl.sort([
    { a: { c: 10 }, b: 20 },
    { a: { c: 20 }, b: 20 },
    { a: { c: 50 }, b: 20 },
    { a: { c: 5 }, b: 20 },
    { a: { c: 5 }, b: 10 }
], {keysToSort: ['a.c', 'b'], reverse: true, inplace: true}));
