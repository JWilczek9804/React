import { useState } from "react";
import React from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendsArray, setFriendsArray] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFrom, setShowAddForm] = useState(false);

  function handleAddFriend(newFriend) {
    setFriendsArray((friends) => [...friends, newFriend]);

    console.log(friendsArray);
  }

  function handleSelection(friend) {
    setSelectedFriend(friend);
  }

  function handleNewBalance(friendWithNewBalance, newBalance) {
    setFriendsArray((friends) =>
      friends.map((friend) =>
        friend.id == friendWithNewBalance.id
          ? {
              id: friendWithNewBalance.id,
              name: friendWithNewBalance.name,
              image: friendWithNewBalance.image,
              balance: newBalance,
            }
          : friend
      )
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendsArray={friendsArray}
          selectedFriend={selectedFriend}
          handleSelection={handleSelection}
        />
        {showAddFrom && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={() => setShowAddForm((val) => !val)}>
          {showAddFrom ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleNewBalance={handleNewBalance}
          setSelectedFriend={setSelectedFriend}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

//
//
//
//
//

function FriendList({ friendsArray, selectedFriend, handleSelection }) {
  return (
    <ul>
      {friendsArray.map((friend) => (
        <Friend
          friend={friend}
          selectedFriend={selectedFriend}
          handleSelection={handleSelection}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

//
//
//
//
//

function Friend({ friend, selectedFriend, handleSelection }) {
  let selected = friend == selectedFriend;
  return (
    <li className={selected ? "selected" : ""}>
      <img src={friend.image} alt={friend.id} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {friend.balance} euro
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you {Math.abs(friend.balance)} euro
        </p>
      )}
      {friend.balance == 0 && <p>No one owes anyone</p>}
      <Button
        onClick={() =>
          handleSelection(friend == selectedFriend ? null : friend)
        }
      >
        {selected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

//
//
//
//
//

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newFriend = { id, name, image: `${image}?u=${id}`, balance: 0 };

    if (!name) return;
    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <h2>Add Friend</h2>

      <label>👉 Set name</label>
      <input
        type="text"
        placeholder="Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>👉 Set image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add Friend</Button>
    </form>
  );
}

//
//
//
//
//

function FormSplitBill({
  selectedFriend,
  handleNewBalance,
  setSelectedFriend,
}) {
  const [bill, setBill] = useState(null);
  const [userExpense, setUserExpense] = useState(null);
  const [payingPerson, setPayingPerson] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill) return;

    handleNewBalance(
      selectedFriend,
      payingPerson == "user"
        ? selectedFriend.balance - (bill - userExpense)
        : selectedFriend.balance + (bill - userExpense)
    );

    setBill(null);
    setUserExpense(null);
    setPayingPerson("user");
    setSelectedFriend(null);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Joint food bill with {selectedFriend.name}</h2>

      <label>💸 Whole bill</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>💵 Your expense</label>
      <input
        type="number"
        value={userExpense}
        onChange={(e) => setUserExpense(Number(e.target.value))}
      />

      <label>💵 {selectedFriend.name} expense</label>
      <input type="number" value={bill - userExpense} disabled />

      <label>👉 Who pay?</label>
      <select
        value={payingPerson}
        onChange={(e) => setPayingPerson(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Pay</Button>
    </form>
  );
}

//
//
//
//
//

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
