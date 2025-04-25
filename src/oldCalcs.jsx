/* FUNCTIONS WRITTEN WHILE FIGURING OUT HOW TO WRITE FINDCOORDS */
// export function checkObs(curY, curX, vert, hor, grid_vert, grid_hor) {
//     for (let y = curY; y < curY + vert; y++) {
//       for (let x = curX; x < curX + hor; x++) {
//         if (grid[y][x] === 'o') {
//           return false;
//         }
//       }
//     }
//     return true;
//   }


// export function placeInPos(yCoord, xCoord, vert, hor, grid) {
//     for (let y = yCoord; y < yCoord + vert; y++) {
//       for (let x = xCoord; x < xCoord + hor; x++) {
//         grid[y][x] = 'o';
//       }
//     }
//   }


// export function putInGrid(vert, hor, grid_vert, grid_hor) {
//     if (hor > grid_hor || vert > grid_vert) {
//       return "Error, obj too large to fit in grid";
//     } else {
//       let curX = 0;
//       let curY = 0;
  
//       while (curY + vert <= grid_vert) {
//         if (curX + hor > grid_hor) {
//           curX = 0;
//           curY += 1;
//         } else {
//           if (!checkObs(curY, curX, vert, hor, grid_vert, grid_hor)) {
//             curX += 1;
//           } else {
//             return {'x' : curX, 'y': curY}
//           }
//         }
//       }
  
//       return "Not enough vertical room for object";
//     }
//   }

// export function findCoords(newItem, roomWidth, roomHeight, curItemList){

//     if (!curItemList){
//         return {'hor': 0, 'vert': 0};
//     }

//     else {
//         let x = 0;
//         let y = 0;
//         console.log(newItem);
//         console.log(curItemList);
//         for (const item of curItemList) {
//             while (y + newItem.verticalSize < roomHeight) {
//                 if (item.horizontalPos + item.horizontalSize >= x) {
//                     if (y >= item.verticalPos && y < item.verticalPos + item.verticalSize) {
//                         if (x + newItem.horizontalSize > roomWidth) {
//                             x = 0;
//                             y += 1;
//                         } else {
//                             // console.log("inner");
//                             return {'hor': x, 'vert': y};
//                         }
//                     }
//                 }
//                 else{
//                     // console.log("outter");
//                     return {'hor': x, 'vert': y};
//                 }
//             }
//         }
//         return {'hor': 0, 'vert': 0};
//     }
// }

// export function findCoords1(vertSize, horSize, roomWidth, roomHeight, curItemList){
//     console.log(`vericalSize: ${vertSize}, horSize: ${horSize}, roomWidth: ${roomWidth}, roomHeight: ${roomHeight}, curItemList: `);
//     console.log(curItemList);

//     if (!curItemList){
//         return {'hor': 0, 'vert': 0};
//     }

//     else {
//         let x = 0;
//         let y = 0;

//         for (const item of curItemList) {
//             while (true) {
//                 if (y + vertSize > roomHeight){
//                     console.log(`y: ${y}, vertSize: ${vertSize}, roomHeight: ${roomHeight}`);
//                     return false;
//                 }
//                 if (checkHorOverlap(x, item)) {
//                     // console.log('Types:', typeof x, typeof horSize, typeof roomWidth);
//                     console.log(`x + horSize = ${x + horSize}`);
//                     console.log((x + horSize) > roomWidth);
//                     if ((x + horSize) > roomWidth) {
//                         x = 0;
//                         y += 1;
//                         console.log('entering if');
//                         // console.log(`x: ${x}, horSize: ${horSize}, roomWidth: ${roomWidth}`);
//                     } else {
//                         x += 1;
//                     }
//                 }
//                 else if (checkVertOverlap(y, item)){
//                     console.log("Y");
//                     // console.log(`y + horSize = ${x + horSize}`);
//                     // console.log((x + horSize) > roomWidth);
//                     y += 1
//                 }
//                 else{
//                     break;
//                 }
//             }
//         }
//         return {'vert': y, 'hor': x};
//     }
// }

// export function checkHorOverlap(hor, curItem){
//     if (curItem.horizontalPos + curItem.horizontalSize >= hor) {
//         return true;
//     }
//     // else if (vert >= curItem.verticalPos && vert < curItem.verticalPos + curItem.verticalSize) {
//     //     return true;
//     // }
//     else{
//         return false;
//     }
// }

// export function checkVertOverlap(vert, curItem){
//     if (vert >= curItem.verticalPos && vert < curItem.verticalPos + curItem.verticalSize) {
//         return true;
//     }
//     else{
//         return false;
//     }
// }


/* BROKEN VERSION OF FUNCTION PROVIDED ON APRIL 24 */
// export function findCoords(vertSize, horSize, roomWidth, roomHeight, curItemList){
//     // if (!curItemList || curItemList.length === 0) {
//     //     return { vert: 0, hor: 0 };
//     // }
//     const padding = 1/30;
    
//     // Create a list of unique vertical positions sorted in ascending order
//     const uniqueVertPositions = [...new Set(curItemList.map(item => item.verticalPos))].sort((a, b) => a - b);
    
//     for (let i = 0; i < uniqueVertPositions.length; i++) {
//         const vertPos = uniqueVertPositions[i];
    
//         // Isolate items with this verticalPos
//         const sameRowItems = curItemList.filter(item => item.verticalPos === vertPos);
    
//         // Find the object with the greatest horizontalPos + horizontalSize
//         const maxRightItem = findGreatestRight(sameRowItems);
//         const proposedHor = maxRightItem.horizontalPos + maxRightItem.horizontalSize + padding;
    
//         // Check horizontal boundary
//         if (proposedHor + horSize <= roomWidth) {
//             return { vert: vertPos, hor: proposedHor };
//         }
    
//         // Check the vertical boundary
//         else if (maxRightItem.verticalPos + vertSize +  padding > roomHeight) {
//             return { vert: null, hor: null };
//         }

//         // Check next row vertical boundary 
//         else if (maxRightItem.verticalPos + maxRightItem.vertSize + vertSize + padding > roomHeight) {
//             return { vert: null, hor: null };
//         }

//         // If vertical and horizontal boundaries good, place item
//         else {
//             return {vert: maxRightItem.verticalPos + maxRightItem.vertSize + padding, hor: 0 }
//         }
//     }
    
//     return { vert: null, hor: null };
// }

    // const maxBottomItem = curItemList.reduce((maxItem, currentItem) => {
    //     const maxY = maxItem.verticalPos + maxItem.verticalSize;
    //     const currY = currentItem.verticalPos + currentItem.verticalSize;
    //     return currY > maxY ? currentItem : maxItem;
    // });

    // const proposedVert = maxBottomItem.verticalPos + maxBottomItem.verticalSize + 1/30;
    // if (proposedVert + vertSize <= roomHeight) {
    //     return { vert: proposedVert, hor: 0 };
    // }

    // return { vert: null, hor: null };
// }

// function findGreatestRight(items) {
//     return items.reduce((maxItem, currentItem) => {
//         const maxRight = maxItem.horizontalPos + maxItem.horizontalSize;
//         const currentRight = currentItem.horizontalPos + currentItem.horizontalSize;
//         return currentRight > maxRight ? currentItem : maxItem;
//     });
// }


/* FIXED VERSION OF BROKEN VERSION FROM APRIL 24 */
function findGreatestRight(items) {
    return items.reduce((maxItem, currentItem) => {
        const maxRight = maxItem.horizontalPos + maxItem.horizontalSize;
        const currentRight = currentItem.horizontalPos + currentItem.horizontalSize;
        return currentRight > maxRight ? currentItem : maxItem;
    });
}

export function findCoords(vertSize, horSize, roomWidth, roomHeight, curItemList){
    //me
    if (horSize > roomWidth || vertSize > roomHeight){
        return { vert: null, hor: null };
    }
    //me done
    const padding = 1/30;

    // If no items in the list, place the first item at the top-left corner
    if (curItemList.length === 0) {
        return { vert: 0, hor: 0 };
    }

    // Create a list of unique vertical positions sorted in ascending order
    const uniqueVertPositions = [...new Set(curItemList.map(item => item.verticalPos))].sort((a, b) => a - b);

    for (let i = 0; i < uniqueVertPositions.length; i++) {
        const vertPos = uniqueVertPositions[i];

        // Isolate items with this verticalPos
        const sameRowItems = curItemList.filter(item => item.verticalPos === vertPos);

        // Find the object with the greatest horizontalPos + horizontalSize
        const maxRightItem = findGreatestRight(sameRowItems);
        const proposedHor = maxRightItem.horizontalPos + maxRightItem.horizontalSize + padding;

        // Check horizontal boundary
        // if (proposedHor + horSize <= roomWidth) {
        //     return { vert: vertPos, hor: proposedHor };
        // }
        if (proposedHor + horSize <= roomWidth && maxRightItem.verticalPos + vertSize <= roomHeight) {
            return { vert: vertPos, hor: proposedHor };
        }
    }

    // If no space in existing rows, check if it can fit in a new row
    const maxBottomItem = curItemList.reduce((maxItem, currentItem) => {
        const maxBottom = maxItem.verticalPos + maxItem.verticalSize;
        const currentBottom = currentItem.verticalPos + currentItem.verticalSize;
        return currentBottom > maxBottom ? currentItem : maxItem;
    }, {verticalPos: 0, verticalSize: 0}); // Initialize with an item that has no size or position

    const proposedVert = maxBottomItem.verticalPos + maxBottomItem.verticalSize + padding;

    if (proposedVert + vertSize <= roomHeight) {
        return { vert: proposedVert, hor: 0 };
    }

    // If the item can't fit in any existing row or in a new row, return null coordinates
    // console.log('FALSE')
    return { vert: null, hor: null };
}


/* FINAL VERSION WRITTEN FOR DA CODE GEN TASKS ON APRIL 22 */
// function findCoords(verticalSize, horizontalSize, roomWidth, roomHeight, curItemList) {
//     // Assign the padding to a variable
//     const padding = 0.033333333333333;
  
//     // Check if the item can fit in the room at all
//     if (verticalSize > roomHeight || horizontalSize > roomWidth) {
//       return { vert: null, hor: null };
//     }
  
//     if (curItemList.length) {
//       // Find vertical position of the newest row 
//       const maxVerticalPos = Math.max(...curItemList.map((item) => item.verticalPos));
  
//       // Find all objects contained within newest row
//       const itemsWithMaxVertical = curItemList.filter((item) => item.verticalPos === maxVerticalPos);
  
//       // Find tallest object contained within newest row
//       const itemWithGreatestVerticalSize = itemsWithMaxVertical.reduce((maxItem, currentItem) => {
//         return currentItem.verticalSize > maxItem.verticalSize ? currentItem : maxItem;
//       });
  
//       // Find further right object contained within newest row
//       const itemWithGreatestHorizontal = itemsWithMaxVertical.reduce((maxItem, currentItem) => {
//         return currentItem.horizontalPos > maxItem.horizontalPos ? currentItem : maxItem;
//       });
  
//       // Check if new object is short enough to fit into newest row
//       if (itemWithGreatestHorizontal.verticalPos + verticalSize < roomHeight) {
//         // Check if new object is narrow enough to fit into newest row
//         if (
//           itemWithGreatestHorizontal.horizontalPos +
//           itemWithGreatestHorizontal.horizontalSize +
//           padding +
//           horizontalSize <= roomWidth
//         ) {
//           return {
//             vert: itemWithGreatestHorizontal.verticalPos,
//             hor:
//               itemWithGreatestHorizontal.horizontalPos +
//               itemWithGreatestHorizontal.horizontalSize +
//               padding,
//           };
//         } else {
//           // Check if new object is short enough to fit into new row
//           if (
//             itemWithGreatestVerticalSize.verticalPos +
//               itemWithGreatestVerticalSize.verticalSize +
//               padding +
//               verticalSize <= roomHeight
//           ) {
//             return {
//               vert:
//                 itemWithGreatestVerticalSize.verticalPos +
//                 itemWithGreatestVerticalSize.verticalSize +
//                 padding,
//               hor: 0,
//             };
//           } else {
//             return { vert: null, hor: null };
//           }
//         }
//       } else {
//         return { vert: null, hor: null };
//       }
//     }
  
//     // If there are no items inside the parent container yet, place the item at 0, 0
//     return { vert: 0, hor: 0 };
//   }
  
//   // Export the function for use in other files
//   export { findCoords };



