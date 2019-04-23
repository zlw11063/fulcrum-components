class MyComp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="myComponent" style="background-color: lightblue; padding: 15px;">
        ${this.innerHTML}
      </div>
    `
  }
}

class WithListeners extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button id="myButton" style="background-color: #7600f6">
        Click me!
      </button>
    `
    this.querySelector('#myButton').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('my-custom-event'))
    })
  }
}

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

window.customElements.define('my-comp', MyComp);
window.customElements.define('with-listeners', WithListeners);
window.customElements.define('with-methods', WithMethods);