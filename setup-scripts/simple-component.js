class MyComp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="myComponent" style="background-color: lightblue; padding: 15px;">
        ${this.innerHTML}
      </div>
    `
  }
}

window.customElements.define('my-comp', MyComp);