<template>
  <div>
    <h1>
      Product List
    </h1>

    <img 
    v-if="loaded"
    src="https://i.imgur.com/JfPpwOA.gif" 
    alt=""
    >

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
        <button @click="addProductToCart(product)">
          add to cart
        </button>
      </li>
    </ul>
    
  </div>
</template>

<script>
import store from '@/store/index.js'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    products () {
      return store.getters.availableProducts
    }
  },
  methods: {
    addProductToCart (product) {
      this.store.dispatch('addProductToCart', product)
    }
  },
  created () {
    this.loading = true
    store.dispatch('fetchProducts')
      .then(() => this.loading = false )
  }
}
</script>