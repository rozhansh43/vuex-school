<template>
  <div>
    <h1>
      Product List
    </h1>

    <img 
    v-if="loading"
    src="https://i.imgur.com/JfPpwOA.gif" 
    >

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
        <button 
        @click="addProductToCart(product)"
        :disabled="!productIsInStock(product) > 0" 
        >
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
      return this.$store.state.products
    },
    productIsInStock () {
      return this.getters.productIsInStock
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