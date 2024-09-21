import { useEffect, useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackakingList from "./PackakingList";
import Stats from "./Stats";

let initialItems = [
  { id: 1, description: "Paszport", quantity: 1, packed: false },
  { id: 2, description: "T-shirts", quantity: 8, packed: false },
  { id: 3, description: "Skarpetki", quantity: 7, packed: false },
  { id: 4, description: "Gatki", quantity: 8, packed: false },
  { id: 5, description: "Kąpielówki", quantity: 3, packed: false },
  { id: 6, description: "Klapki", quantity: 1, packed: false },
  { id: 7, description: "Buty", quantity: 1, packed: false },
  { id: 8, description: "Spodenki", quantity: 3, packed: false },
  { id: 9, description: "Czapka", quantity: 1, packed: false },
  { id: 10, description: "Reczniki", quantity: 2, packed: false },
  { id: 11, description: "Okulary", quantity: 1, packed: false },
  { id: 12, description: "Słuchawki", quantity: 1, packed: false },
  { id: 13, description: "Ładowarka", quantity: 1, packed: false },
  { id: 14, description: "Preparat do brody", quantity: 1, packed: false },
  { id: 15, description: "Strzykawa", quantity: 1, packed: false },
  { id: 16, description: "Szczoteczka do zębów", quantity: 1, packed: false },
  { id: 17, description: "Lakier", quantity: 1, packed: false },
  { id: 18, description: "SPF 50", quantity: 1, packed: false },
  { id: 19, description: "Szczotka do włosów", quantity: 1, packed: false },
  { id: 20, description: "Płyn do mycia", quantity: 1, packed: false },
  { id: 21, description: "Dezodorant", quantity: 1, packed: false },
  { id: 22, description: "Aloes", quantity: 1, packed: false },
  { id: 23, description: "Perfumy", quantity: 1, packed: false },
  { id: 24, description: "PowerBank", quantity: 1, packed: false },
  { id: 25, description: "Portfel", quantity: 1, packed: false },
  { id: 26, description: "Euro!", quantity: 1, packed: false },
  { id: 27, description: "Gumy treningowe", quantity: 1, packed: false },
  { id: 28, description: "Chusteczki", quantity: 1, packed: false },
  { id: 29, description: "Leki", quantity: 1, packed: false },
  { id: 30, description: "Maszynka", quantity: 1, packed: false },
  { id: 31, description: "Patyczki do uszu", quantity: 6, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(item) {
    setItems((items) => items.filter((val) => val.id !== item.id));
  }
  // function handleSortItem() {
  //   setItems((items) =>
  //     [...items].sort((a, b) => a.description.localeCompare(b.description))
  //   );
  // }
  function handleToogleItem(item) {
    setItems((items) =>
      items.map((val) =>
        val.id === item.id
          ? {
              id: item.id,
              description: item.description,
              quantity: item.quantity,
              packed: !item.packed,
            }
          : val
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    console.log(confirmed);
    if (confirmed) setItems((items) => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={handleAddItem} />
      <PackakingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToogleItem={handleToogleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
