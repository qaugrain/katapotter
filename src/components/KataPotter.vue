<template>
  <div>
    <button v-on:click="addBookToBasket(series[0])">{{ series[0] }}</button>
    <button v-on:click="addBookToBasket(series[1])">{{ series[1] }}</button>
    <button v-on:click="addBookToBasket(series[2])">{{ series[2] }}</button>
    <button v-on:click="addBookToBasket(series[3])">{{ series[3] }}</button>
    <button v-on:click="addBookToBasket(series[4])">{{ series[4] }}</button>
    <ul id="book-list">
      <li v-for="book in basket" :key="book">{{ book }}</li>
    </ul>
    <div>Your basket price is: {{ calculatePrice(basket) }}</div>
  </div>
</template>

<script>
export default {
  name: "KataPotter",
  data() {
    return {
      basePrice: 8,
      series: [
        "first book",
        "second book",
        "third book",
        "fourth book",
        "fifth book",
      ],
      basket: [],
    };
  },
  methods: {
    addBookToBasket(book) {
      if (this.series.includes(book)) this.basket.push(book);
    },
    removeBookFromBasket(book) {
      if (this.basket.includes(book)) {
        let indexToRemove = this.basket.indexOf(book);
        this.basket
          .slice(0, indexToRemove)
          .concat(this.basket.slice(indexToRemove + 1, this.basket.length));
      }
    },
    arrangeBooks(listOfBooks) {
      // arrange books by titles
      let result = [];
      // init empty result
      this.series.forEach((book) => result.push([]));

      listOfBooks.forEach((book) => {
        let index = this.series.indexOf(book);
        if (index > -1) result[index].push(book);
      });

      return result;
    },
    makeTuple(listOfBooks) {
      // arranged list of books can be seen as a tuple
      // index zero : number of first book
      // index 1 : number of second book
      // and so on
      let result = [];
      let arrangedListOfBooks = this.arrangeBooks(listOfBooks);
      arrangedListOfBooks.forEach((element) => result.push(element.length));
      return result;
    },
    calculatePriceOfTuple(tuple) {
      // NOTE : does not work, algo can't see optimal subsets
      
      // recursive method

      // stop cases, apply discounts
      if (tuple.every((element) => element === 0 || element === 1)) {
        let numberOfBooksInSet = tuple.reduce((a, b) => a + b);
        switch (numberOfBooksInSet) {
          case 0:
            return 0;
          case 1:
            return this.basePrice;
          case 2:
            return this.basePrice * 2 * 0.95; // 5% discount
          case 3:
            return this.basePrice * 3 * 0.9; // 10% discount
          case 4:
            return this.basePrice * 4 * 0.8; // 20% discount
          case 5:
            return this.basePrice * 5 * 0.75; // 25% discount
        }
      }

      // recursion
      let arrayOfNextTuples = [
        [tuple[0] - 1, tuple[1], tuple[2], tuple[3], tuple[4]],
        [tuple[0], tuple[1] - 1, tuple[2], tuple[3], tuple[4]],
        [tuple[0], tuple[1], tuple[2] - 1, tuple[3], tuple[4]],
        [tuple[0], tuple[1], tuple[2], tuple[3] - 1, tuple[4]],
        [tuple[0], tuple[1], tuple[2], tuple[3], tuple[4] - 1],
      ];

      // only calculate price if tuple is valid (no negative values)
      let minArray = [];
      arrayOfNextTuples.forEach((nextTuple, index) => {
        // pass tuple with negative values
        if (!nextTuple.some((element) => element < 0)) {
          let finalTuple = [0, 0, 0, 0, 0];
          finalTuple[index] = 1;
          minArray.push(
            this.calculatePriceOfTuple(nextTuple) +
              this.calculatePriceOfTuple(finalTuple)
          );
        }
      });

      return Math.min(...minArray); // minimum price
    },
    calculatePrice(listOfBooks) {
      let tuple = this.makeTuple(listOfBooks);
      let price = this.prec(tuple);
      return price;
    },
    anotherCalculatePriceOfTuple(tuple) {
      //Notes : does not work, same problem as first impl without recursion

      // recursive method

      // stop cases, apply discounts
      if (tuple.every((element) => element === 0 || element === 1)) {
        let numberOfBooksInSet = tuple.reduce((a, b) => a + b);
        switch (numberOfBooksInSet) {
          case 0:
            return 0;
          case 1:
            return this.basePrice;
          case 2:
            return this.basePrice * 2 * 0.95; // 5% discount
          case 3:
            return this.basePrice * 3 * 0.9; // 10% discount
          case 4:
            return this.basePrice * 4 * 0.8; // 20% discount
          case 5:
            return this.basePrice * 5 * 0.75; // 25% discount
        }
      }

      // maybe simply removing one book at all index is enough for tests cases...
      let subset = [0, 0, 0, 0, 0];
      let nextTuple = [];
      tuple.forEach((n, index) => {
        nextTuple[index] = n;
        if (n > 1) {
          subset[index]++;
          nextTuple[index]--;
        }
      });

      return this.anotherCalculatePriceOfTuple(nextTuple) + this.anotherCalculatePriceOfTuple(subset);
    },
  },
};
</script>
