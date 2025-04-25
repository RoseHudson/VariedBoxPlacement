/* ACTUAL FUNCTION BELOW */
export function findCoords(vertSize, horSize, roomWidth, roomHeight, curItemList){
    if (horSize > roomWidth || vertSize > roomHeight){
        return { vert: null, hor: null };
    }
    
    else if (!curItemList || curItemList.length === 0) {
        return { vert: 0, hor: 0 };
    }

    const padding = 1/30;
    // Create a list of unique vertical positions sorted in ascending order
    const uniqueVertPositions = [...new Set(curItemList.map(item => item.verticalPos))].sort((a, b) => a - b);

    for (let i = 0; i < uniqueVertPositions.length; i++) {
        const vertPos = uniqueVertPositions[i];

        // Isolate items with this verticalPos
        const sameRowItems = curItemList.filter(item => item.verticalPos === vertPos);

        // Find the object with the greatest horizontalPos + horizontalSize
        const maxRightItem = findGreatestRight(sameRowItems);
        const curRowPropsedHor = maxRightItem.horizontalPos + maxRightItem.horizontalSize + padding;
        
        // Check vert for current row to break early
        const curRowProposedVert = maxRightItem.verticalPos + padding;
        if (curRowProposedVert + vertSize > roomHeight) {
            console.log("FALSE");
            return { vert: null, hor: null };
        }

        // Check hor for current row
        else if (curRowPropsedHor + horSize <= roomWidth) {
            return { vert: vertPos, hor: curRowPropsedHor };
        }

    }

    const maxBottomItem = curItemList.reduce((maxItem, currentItem) => {
        const maxY = maxItem.verticalPos + maxItem.verticalSize;
        const currY = currentItem.verticalPos + currentItem.verticalSize;
        return currY > maxY ? currentItem : maxItem;
    });

    const newRowVert = maxBottomItem.verticalPos + maxBottomItem.verticalSize + padding;
    if (newRowVert + vertSize <= roomHeight) {
        return { vert: newRowVert, hor: 0 };
    }

    console.log("FALSE");
    return { vert: null, hor: null };
}


function findGreatestRight(items) {
    return items.reduce((maxItem, currentItem) => {
        const maxRight = maxItem.horizontalPos + maxItem.horizontalSize;
        const currentRight = currentItem.horizontalPos + currentItem.horizontalSize;
        return currentRight > maxRight ? currentItem : maxItem;
    });
}


export function findLeftMost(curItemList){
    const maxRightEdge = curItemList.reduce((max, item) => {
        const rightEdge = item.horizontalPos + item.horizontalSize;
        return rightEdge > max ? rightEdge : max;
      }, 0);
    return maxRightEdge;
}
  

/**
 * Array of test cases for the findCoords function
 * Each test case contains input parameters and expected output
 */
const testCases = [
    //1
    {
        input: [2, 2, 10, 10, []],
        expected: { vert: 0, hor: 0 }
    },
    //2
    {
        input: [
            2, 2, 10, 10, [
                {
                    verticalPos: 0,
                    horizontalPos: 0,
                    verticalSize: 2,
                    horizontalSize: 2
                }
            ]
        ],
        expected: { vert: 0, hor: 2.033333333333333 }
    },
    //3
    {
        input: [
            2, 2, 10, 10, [
                {
                    verticalPos: 0,
                    horizontalPos: 0,
                    verticalSize: 2,
                    horizontalSize: 2
                },
                {
                    verticalPos: 0,
                    horizontalPos: 2.033333333333333,
                    verticalSize: 2,
                    horizontalSize: 2
                }
            ]
        ],
        expected: { vert: 0, hor: 4.066666666666666 }
    },
    //4
    {
        input: [
            2, 2, 10, 10, [
                {
                    verticalPos: 0,
                    horizontalPos: 0,
                    verticalSize: 2,
                    horizontalSize: 4
                },
                {
                    verticalPos: 0,
                    horizontalPos: 4.033333333333333,
                    verticalSize: 2,
                    horizontalSize: 4
                }
            ]
        ],
        expected: { vert: 2.033333333333333, hor: 0 }
    },
    //5
    {
        input: [
            2, 2, 4, 4, [
                {
                    verticalPos: 0,
                    horizontalPos: 0,
                    verticalSize: 2,
                    horizontalSize: 2
                },
                {
                    verticalPos: 0,
                    horizontalPos: 2.033333333333333,
                    verticalSize: 2,
                    horizontalSize: 2
                },
                {
                    verticalPos: 2.033333333333333,
                    horizontalPos: 0,
                    verticalSize: 2,
                    horizontalSize: 2
                },
                {
                    verticalPos: 2.033333333333333,
                    horizontalPos: 2.033333333333333,
                    verticalSize: 2,
                    horizontalSize: 2
                }
            ]
        ],
        expected: { vert: null, hor: null }
    },
    {
        input: [12, 12, 10, 10, []],
        expected: { vert: null, hor: null }
    },
    {
        input: [
            2, 3.5, 10, 10, [
                {
                    verticalPos: 0,
                    horizontalPos: 0,
                    verticalSize: 2.5,
                    horizontalSize: 2.5
                },
                {
                    verticalPos: 0,
                    horizontalPos: 2.533333333333333,
                    verticalSize: 2,
                    horizontalSize: 2
                }
            ]
        ],
        expected: { vert: 0, hor: 4.566666666666666 }
    },
    {
        input: [
            2, 2.9, 9, 9, [
                {
                    verticalPos: 0,
                    horizontalPos: 0,
                    verticalSize: 1,
                    horizontalSize: 1
                },
                {
                    verticalPos: 0,
                    horizontalPos: 1.033333333333333,
                    verticalSize: 5,
                    horizontalSize: 1
                },
                {
                    verticalPos: 0,
                    horizontalPos: 2.066666666666666,
                    verticalSize: 4,
                    horizontalSize: 4
                }
            ]
        ],
        expected: { vert: 0, hor: 6.1 }
    }
    // Add any additional test cases here
];

/**
 * Run each test case and log results
 * Compares actual output with expected output
 */
testCases.forEach((testCase, index) => {
    const result = findCoords(...testCase.input);
    console.log(`Test Case ${index + 1}:`);
    console.log('Input:', testCase.input);
    console.log('Expected:', testCase.expected);
    console.log('Result:', result);
    console.log('Pass:', JSON.stringify(result) === JSON.stringify(testCase.expected));
    console.log('---');
});
