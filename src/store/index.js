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
    availableProducts (state, getters) {
      return state.products.filter(product => product => product.inventory > 0)
    }
  },
  mutations: {
    setProducts (state,products) {
      state.products = products
    }
  },
  actions: {
    fetchProducts ({commit}) {
      return new promise ((resolve,reject) => {
        shop.getProducts ( products => {
          commit ('setProducts', products)
          resolve ()
        })
      })
    },
    addProductToCart (context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id )
        if (!carIitem) {
          context.commit ('pushProductToCart', product) 
        }else {
          context.commit('increamentItemQuantitiy', cartItem)
        }
      }
     
    }
  },
  modules: {},
});
