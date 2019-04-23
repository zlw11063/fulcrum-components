## Examples

```
initialState = {};
<>
  <Form values={{
      name: 'string',
      addressLine1: {
        type: 'string',
        labelText: 'Address'
      },
      addressLine2: {
        type: 'string',
        hideLabel: true
      },
      phoneNumber: 'number',
      subscribe: {
        type: 'checkbox',
        defaultChecked: true
      },
      color: 'radio',
      email: {
        type: 'email',
        defaultValue: 'potato@gmail.com'
      }
    }}
    onChange={setState}
  />
  <h4>Form Values</h4>
  <pre><code>
    {JSON.stringify(state, null, 4)}
  </code></pre>
</>
```