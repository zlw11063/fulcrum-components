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

window.customElements.define('with-listeners', WithListeners);