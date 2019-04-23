
**NOTE**: The web component must be loaded on the page beforehand, or you will get an error like this in the console:

```js static
  "my-element" is not a registered custom element!
```

## Examples

Take this simple web component, for example:

```js { "file": "../../../setup-scripts/simple-component.js" }
```

Once it is defined on the page, it will load the web component as expected:

```jsx
  <WebComponent tag="my-comp">
    This can pass children in! Any component can receive children.

    <div>The web component must know what to do with the children.</div>
    <div>This wrapper just passes them on.</div>
  </WebComponent>
```

### Provide Attributes

Any props that aren't reserved, like `eventListeners` or `ref`, will be passed on to the web component as attributes. Since props should be camelcase, but web-component expect dash-case, the prop names are converted to dash case.

Values that you would normally have to serialize, like objects and arrays, are added directly as a property on the component, instead of an attribute.

```jsx static
  <WebComponent tag="my-component" anAttr="purple" fileName="potato.js" personDetails={{ name: 'Bob' }} />
```

This examples results in:

```html static
  <my-component an-attr="purple" file-name="potato.js" data-attr="didney worl"></my-component>
  <!-- "personDetails" is added as a property accessed via mycomponent.personDetails -->
```

### Add Event Listeners with `eventListeners` Prop

The `eventListeners` prop is an object where each key is an event name, and it's value is the event handler function.


```js { "file": "../../../setup-scripts/with-listeners.js" }
```

```jsx
  
  function mouseDownHandler(e) {
    console.log('Mouse down!')
  };

  function mouseUpHandler(e) {
    console.log('Mouse up!')
  };

  function customEventHandler(e) {
    console.log('My custom event!')
  };

  const eventHandlers = {
    'mousedown': mouseDownHandler,
    'mouseup': mouseUpHandler,
    'my-custom-event': customEventHandler
  };
  
  <WebComponent tag="with-listeners" eventHandlers={eventHandlers} />
```


### Externally add Event Listeners

Here is a simple web component that has a method `printDate()`:

```js { "file": "../../../setup-scripts/with-methods.js" }
```

```jsx
  <WebComponent tag="with-methods" />
```

You can also add event listeners directly to the web component, if you'd rather not use the `eventListeners` prop. If you give `WebComponent` a ref, that ref will be assigned to the web component. You can then use `ref.current` to add event listeners.

Note that this example is wrapped in a react function component, since hooks can only be called inside a function component.

```jsx
  import { useRef, useEffect } from 'react'
  function MethodExample() {
    let compRef = useRef(null)

    useEffect(() => {
      // Use the useEffect hook so the ref is defined before attempting to add event listeners
      compRef.current.addEventListener('click', () => {
        compRef.current.printDate()
      })

      // Do your rightful duty and clean up your event listeners
      return () => {
        compRef.current.removeEventListener('click', () => {
          compRef.current.printDate()
        })
      }
    }, [])

    return (
      <WebComponent tag="with-methods" ref={compRef} />
    )
  }
  <MethodExample />
```

### Externally call web component methods

Using the same strategy as adding event listeners with a `ref`, you can also access the web component's exposed methods:

```jsx
  import { useRef, useEffect } from 'react'

  function MethodExample() {
    let compRef = useRef(null)

    function callMethod() {
      console.log('Calling printDate externally:')
      compRef.current.printDate()
    }

    return (
      <>
        <button onClick={callMethod}>Call printDate Method</button>
        <WebComponent tag="with-methods" ref={compRef} />
      </>
    )
  }
  <MethodExample />
```

### Compatability

This will work with all native web components, along with polymer 2 and 3 components (which are just web components).
