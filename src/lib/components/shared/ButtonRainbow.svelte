<script>
</script>

<div class="btnContainer">
  <button class="btnBg" on:mousedown|preventDefault on:click|preventDefault>
    <span>
      <slot />
    </span>
  </button>
</div>

<style>
  :root{
    --btn-bg-col:   #1F2633;
    --btn-txt-col:  #ffff;
      font-size: 14px;
  }

  button{
      text-decoration: none;
      cursor: pointer;
  }


  .btnContainer {
    padding: 0 1rem;
    max-width: 300px;
    max-height: 80px;
  }

  .btnBg {
    margin: 0 auto;
    /* width: calc(100% - 1rem);    <== Tym kontrolujemy padding */
    text-align: center;
    position: relative;
    border-radius: 6px;
    box-sizing: border-box;
    color: var(--btn-txt-col);
    display: block;
    z-index: 2;
    overflow: hidden;
    padding: 3px; /* <== Tym zmieniamy grubość ramki */
  }

  .btnBg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 400%; /* <== Jak bardzo rozciągnięta jest tęcza */
    height: 100%;
    background: linear-gradient(
      115deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
    background-size: 50% 100%;
  }

  .btnBg:focus:before,
  .btnBg:hover:before {
    animation: SidebarCreate_rainbowSlide-zxLzf 0.75s linear infinite;
  }

  @keyframes SidebarCreate_rainbowSlide-zxLzf {
    to {
      transform: translateX(-50%);
    }
  }

  .btnBg span {
    position: relative;
    z-index: 2;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    background: var(--btn-bg-col); /* <== Tym zmieniamy kolor przycisku */
    border-radius: 3px;
    display: block;
    box-sizing: border-box;
    height: 100%;
  }
</style>
