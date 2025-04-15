// my_x = 0
// my_y = 0
// while my_x + my_hor <= roomDimensions.x and my_y + my_vert <= roomDimensions.y:
//   for item in list:
//     if there is any overlap in range(my_x, my_x + my_hor) with anything in range(item.x + item.hor):
//       if my_x + my_hor + item.x + item.hor + 1 < roomDimensions.x:
//         my_x = 0
//       else:
//         my_x += item.x + item.hor + 1
//     elif there is any overlap in range (my_y, my_y + my_vert) with anything in range(item.y + item.vert):
//       if my_y + my_vert + item.y + item.vert + 1 < roomDimensions.y:
//         my_y = 0
//       else:
//         my_y += item.y + item.vert + 1
//     else:
//       place item at my_x, my_y