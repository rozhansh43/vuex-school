import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products:[],
    cart: []
  },
  getters: {
    availableProducts (state, ) {
      return state.products.filter(product => product => product.inventory > 0)
    },
    cartProducts (state) {
      return state.cart.map(cartItem => {
        const product = state.product.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state,getters) {
      return getters.cartProduct.reduce((total, product ) => total += product.price * product.quantity, 0)
    },
    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  actions: {
    fetchProducts ({commit}) {
      return new Promise ((resolve,reject) => {
        shop.getProducts ( products => {
          commit ('setProducts', products)
          resolve ()
        })
      })
    },

    addProductToCart ({state, getters, commit}, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = context.state.cart.find(item => item.id === product.id )
        if (!cartItem) {
          commit ('pushProductToCart', product) 
        }else {
          commit('increamentItemQuantitiy', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    }
  },
  mutations: {
    setProducts (state,products) {
      state.products = products
    },
    pushProductToCart (state, productId) {
      state.cart.push ({
        id: productId,
        quantity: 1
      })
    }
  },
  incrementItemQuantity (state, cartItem) {
    cartItem.quantitiy++
  },
  decrementProductInventory (state, product) {
    product.inventory--
  },
  modules: {},
});
