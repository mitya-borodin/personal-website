<script lang="typescript">
  export let title: string;
  export let body: string[];
</script>

<section class="root">
  <h1>{title.toUpperCase()}</h1>
  {#each body as item}
    <p>{item}</p>
  {/each}
</section>

<style lang="css">
  @import "./vars/index.css";

  .root {
    width: 100%;
    margin-bottom: 45rem;
  }

  .root > h1 {
    font-size: 14rem;
    font-family: var(--font-family);
    font-weight: 700;
    text-align: left;
    color: var(--color-text-section-h1);
    margin-bottom: 18rem;
  }

  .root > p {
    font-size: 15rem;
    font-family: var(--font-family);
    line-height: 1.6;
    color: var(--color-text-section-p);
  }

  @media (width < 1024px) {
    .root {
      margin-bottom: 32rem;
    }
    .root > div {
      padding: 25rem 20rem;
    }
    .root > h1 {
      text-align: center;
    }
    .root > p {
      font-size: 17rem;
    }
  }
</style>
