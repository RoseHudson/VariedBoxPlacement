/* ACTUAL FUNCTION BELOW */
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

