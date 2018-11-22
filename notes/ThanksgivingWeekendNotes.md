# Thanksgiving work

## Layout

```
Container
  ImageBackground
    KeyboardAvoidingView
      Logo
      Log In Button
      Signup Button
```

## signup screen

- Search maps for direction to pull in, use current loaction as homebase

## Code Snippets

Outside render

```const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};


####

<KeyboardAvoidingView
  contentContainerStyle={styles.loginContainer}
  behavior="position"
>

</KeyboardAvoidingView>
```
