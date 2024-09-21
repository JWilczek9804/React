export default function Item({ item, deleteItem, toogleItem }) {
    return (
      <li>
        <input type="checkbox" onClick={() => toogleItem(item)} />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => deleteItem(item)}>❌</button>
      </li>
    );
  }
  
  {
    /* <button
  onClick={setItems((arr) => arr.filter((val) => val.id != item.id))}
  >
  &times;
  </button> */
  }