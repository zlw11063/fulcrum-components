## Installation

Using npm:

```bash
npm i @fs/zionclick-to-copy
```

Wrapping text with this component will give it "click to copy" functionality.

Styling, such as hover and focus appearance, is up to the developer. For example, if a tooltip displaying "Click to Copy" is needed, the developer should wrap this component with their tooltip.

### Do

- Use the `value` prop only, if possible.

### Dont

- Do **not** wrap the value to be copied in a span or paragraph tag. This can cause whitespace issues on some browsers, causing random spaces to be included on the beginning and end of the copied value.


### Examples

#### Default component:

```
<ClickToCopy value="Click me to copy me!" />
```

#### Giving it styling

Styling can be added however it is needed. 

```
<div style={{cursor: 'pointer'}}>
  <ClickToCopy value="I have a better pointer!" />
</div>
```

#### Disabling Copy Functionality

In cases where you need it to dynamically disable copying, you can use the `disableCopy` boolean prop:

```
<ClickToCopy disableCopy value="Can't copy this!" />
```

#### As a button


```
const str = "I'm just the value to copy! But you have to click the button.";

<>
  <div>
    {str}
    <button style={{cursor: 'pointer', display: 'inline-block', marginLeft: 10}}>
      <ClickToCopy value={str}>Copy</ClickToCopy>
    </button>
  </div>
</>
```



