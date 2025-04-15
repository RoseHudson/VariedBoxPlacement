export default function Item(){
    return (
    {items.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${item.name} (${item.verticalSize}x${item.horizontalSize})`}
                />
              </ListItem>
            ))}
        )
}