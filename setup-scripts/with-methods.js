class WithMethods extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button id="myButton" style="background-color: #7600f6">
        Print Date
      </button>
    `
    this.querySelector('#myButton').addEventListener('click', () => {
      console.log('Calling printDate internally:')
      this.printDate()
    })
  }

  printDate() {
    console.log(new Date())
  }
}

window.customElements.define('with-methods', WithMethods);