document.addEventListener("alpine:init", () => {
  function init() {
    this.$refs.appContainer.classList.add("alpine-is-loaded");
  }

  Alpine.data("form", () => ({
    source: 'no Page',
    price: 'none',
    stock: false,
    ctaText: 'Sent',

    
    url: new URL(window.location.href),

    async getLinkInfo() {
      if (this.url.searchParams.get("source")) {
        this.source = this.url.searchParams.get("source");
      } else {
        this.source = "no source";
      }
      if (this.url.searchParams.get("price")) {
        this.price = this.url.searchParams.get("price");
      } else {
        this.price = "no price";
      }
      
      if (this.url.searchParams.get("stock")) {
        this.stock = this.url.searchParams.get("stock");
      } else {
        this.stock = "no stock";
      }

      if(this.url.searchParams.get("ctaText")) {
        this.ctaText = this.url.searchParams.get("ctaText");
      } else {
        this.ctaText = 'Submit';
      }

      // console.log('source: ', this.source, 'price: ', this.price, 'stock', this.stock)
    },

    init() {
      this.getLinkInfo();
    },
  }));
});	