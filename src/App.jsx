
import { useState } from "react"

function App() {

  const allItems = [
    {
      id: 1,
      name: "Black T shirt",
      price: 5
    },
    {
      id: 2,
      name: "Hanger Set",
      price: 8
    },
    {
      id: 3,
      name: "Thoub",
      price: 12
    },
    {
      id: 4,
      name: "Computer Bag",
      price: 20
    },
    {
      id: 5,
      name: "Couch",
      price: 50
    },
    {
      id: 6,
      name: "Gaming Chair",
      price: 70
    }
  ]

  // States
  const [availableItems, setAvailableItems] = useState(allItems)
  const [shoppingCart, setShoppingCart] = useState([])
  const [availableBalance, setAvailableBalance] = useState(100)
  const [warningMessage, setWarningMessage] = useState(null)


  // add the item to shopping cart
  function handleAddToCart(clickedItem) {

    if (availableBalance >= clickedItem.price) {

      const filteredItems = availableItems.filter((oneItem) => {
        return clickedItem.id !== oneItem.id
      })

      setAvailableItems(filteredItems)

      setShoppingCart([...shoppingCart, clickedItem])

      setAvailableBalance(availableBalance - clickedItem.price)

      setWarningMessage(null)

    } else {

      setWarningMessage("Insufficient funds. Your balance is too low to purchase this item")

    }
  }


  // remove the item from shopping cart
  function handleRemoveFromShoppingCart(clickedItem) {

    const filteredCart = shoppingCart.filter((oneItem) => {
      return clickedItem.id !== oneItem.id
    })

    setShoppingCart(filteredCart)

    setAvailableItems([...availableItems, clickedItem])

    setAvailableBalance(availableBalance + clickedItem.price)

    setWarningMessage(null)
  }


  return (
    <div>

      <h1>Zaid's Closet</h1>

      <h2>Your Balance: {availableBalance}</h2>

      <p>{warningMessage}</p>


      <h2>Available Items</h2>

      {availableItems.length === 0 ? (
        <p>No available items</p>
      ) : (
        availableItems.map((oneItem) =>
          <div key={oneItem.id}>
            <p>Name: {oneItem.name}</p>
            <p>Price: {oneItem.price} BD</p>
            <button onClick={() => {handleAddToCart(oneItem)}}>
              Add to Cart
            </button>
          </div>
        )
      )}


      <h2>Shopping Cart</h2>

      {shoppingCart.length === 0 ? (
        <p>Your shopping cart is empty</p>
      ) : (
        shoppingCart.map((oneItem) =>
          <div key={oneItem.id}>
            <p>Name: {oneItem.name}</p>
            <p>Price: {oneItem.price} BD</p>
            <button onClick={() => {handleRemoveFromShoppingCart(oneItem)}}>
              Remove from Cart
            </button>
          </div>
        )
      )}

    </div>
  )
}

export default App
