<template>
  <div>
    <h1>
      Shopping Cart
    </h1>

    <p>
      Total: {{ total | currency }}
    </p>

    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.getters.cartProducts
    },
    total () {
      return this.$store.getters.cartTotal
    }
  }
}
</script>