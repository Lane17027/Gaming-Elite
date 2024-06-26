const express = require('express')
const mongoose = require('mongoose')
// const cors = require('cors')
const logger = require('morgan')
const gameController = require('./controllers/games')
const consoleController = require('./controllers/consoles')
const brandController = require('./controllers/brands')
const retroController = require('./controllers/retro')
const userController = require('./controllers/user')
const bannerAdController = require('./controllers/bannerAdController')
const { getItem,addItem,getCartItems, getCartItemById, createCartItem, updateCartItem, deleteCartItem, getCartItemsInShoppingCart } = require('./controllers/cartItemController');
const { getShoppingCarts,addShoppingCart, getShoppingCartById, createShoppingCart, updateShoppingCart, deleteShoppingCart, getUserShoppingCart } = require('./controllers/shoppingCartController');
const { getAccessory, getAccessoryById, createAccessory, updateAccessory, deleteAccessory} = require('./controllers/accessoryController');
const db = require('./db')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
// app.use(cors())
app.use(logger('dev'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
app.get('/', async (req,res) => {
  res.send("Welcome to my Not So Best Buy!")
})
//for search
app.get('/games/search', gameController.searchGame)
app.get('/consoles/search', consoleController.searchConsole)

// create
app.post('/users/signup', userController.userSignup)
app.post('/users/login', userController.userLogin)
app.post('/games', gameController.createGame)
app.post('/brands', brandController.createBrand)
app.post('/consoles', consoleController.createConsole)
app.post('/users/create', userController.createUser)

// read
app.get('/brands/:id', brandController.getBrandById)
app.get('/brands', brandController.getBrand)
app.get('/consoles/:id', consoleController.getConsoleById)
app.get('/consoles', consoleController.getConsole)
app.get('/games/:id', gameController.getGameById)
app.get('/games', gameController.getGame)
app.get('/games/consoles/:id', consoleController.getGameConsoleById)
app.get('/users/:id', userController.getUserById)
app.get('/users', userController.getUser)
app.get('/bannerAds', bannerAdController.getBannerAds)
app.get('/retro', retroController.getRetro)

// update
app.put('/users/:id/update', userController.updateUser)
app.put('/users', userController.updateUser)
app.put('/games', gameController.updateGame)
app.put('/brands', brandController.updateBrand)
app.put('/consoles', consoleController.updateConsole)

// delete
app.delete('/users/:id/delete', userController.deleteUser)
app.delete('/users', userController.deleteUser)
app.delete('/games', gameController.deleteGame)
app.delete('/brands', brandController.deleteBrand)
app.delete('/consoles', consoleController.deleteConsole)

//shoppingcart
app.get('/shoppingCarts', getShoppingCarts)
app.post('/shoppingCarts/create', createShoppingCart)
app.get('/shoppingCarts/:id', getShoppingCartById)
app.put('/shoppingCarts/:id/update', updateShoppingCart)
app.delete('/shoppingCarts/:id/delete', deleteShoppingCart)

//accessories
app.get('/accessories', getAccessory)
app.post('/saccessories/create', createAccessory)
app.get('/accessories/:id', getAccessoryById)
app.put('/accessories/:id/update', updateAccessory)
app.delete('/accessoriess/:id/delete', deleteAccessory)

//shoppingcart items
app.get('/cartItems', getCartItems)
app.post('/cartItems/create', createCartItem)
app.get('/cartItems/:id', getCartItemById)
app.put('/cartItems/:id/update', updateCartItem)
app.delete('/cartItems/:id/delete', deleteCartItem)

//user shopping cart and items
app.get('/cart', getItem);
app.post('/cart', addItem);
app.get('/users/:id/shopping-cart/items', getCartItemsInShoppingCart)

//handle 404 error
app.get('/*', async (req,res) => {
  res.send('An error has occurred. Try again later (404)')
})
