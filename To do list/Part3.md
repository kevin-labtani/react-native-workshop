## Part - 3

In this part you will create an input to add new todos in the TodoList.

### 3.1

In "components" folder create a new file "addToDo.js" and copy-paste the folowing code at the top of the file.
```js
import React, { useState} from 'react';
import { StyleSheet, Text, TextInput, Button} from 'react-native';
```
Here we need to use {useState}, because we will keep track what a user is typing in the input.

