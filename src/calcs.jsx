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
//                             // newItem.horizontalPos = x;
//                             // newItem.verticalPos = y;
//                             // console.log(x)
//                             // console.log(newItem);
//                             console.log("inner");
//                             return {'hor': x, 'vert': y};
//                         }
//                     }
//                 }
//                 else{
//                     // newItem.horizontalPos = x;
//                     // newItem.verticalPos = y;
//                     // console.log(newItem);
//                     console.log("outter");
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

export function findCoords(vertSize, horSize, roomWidth, roomHeight, curItemList){
    if (!curItemList || curItemList.length === 0) {
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
        const proposedHor = maxRightItem.horizontalPos + maxRightItem.horizontalSize + 1/30;

        // Check horizontal boundary
        if (proposedHor + horSize <= roomWidth) {
            return { vert: vertPos, hor: proposedHor };
        }

        // Check vertical boundary to break early
        if (vertPos + vertSize + 1 > roomHeight) {
            console.log("FALSE");
            return { vert: null, hor: null };
        }
    }

    const maxBottomItem = curItemList.reduce((maxItem, currentItem) => {
        const maxY = maxItem.verticalPos + maxItem.verticalSize;
        const currY = currentItem.verticalPos + currentItem.verticalSize;
        return currY > maxY ? currentItem : maxItem;
    });

    const proposedVert = maxBottomItem.verticalPos + maxBottomItem.verticalSize + 1/30;
    if (proposedVert + vertSize <= roomHeight) {
        return { vert: proposedVert, hor: 0 };
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