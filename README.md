# captsone-level-2

### Objective 
- I will make a news website that will let user search news from any city they want to see.

#### Reflection

### Day 1: Project Initialization and API Selection

- I used an api from https://gnews.io/ to get data from each city I search up.

# Blockers 
- city news wouldn't display.

# Solution
- I solved the first blocker by realizing I had a typo in my code.

### Day 2: API Integration and Class Implementation

# Blockers
- None
### Understanding 

# .then
The .then() method is a fundamental part of working with Promises in JavaScript. Promises are objects that represent the eventual completion (or failure) of an asynchronous operation, and .then() is used to handle the result of that operation.

Here's how .then() works:

It takes one or two arguments:

The first argument is a callback function that will be called if the Promise is resolved (i.e., the asynchronous operation is successful).
The second argument (optional) is a callback function that will be called if the Promise is rejected (i.e., the asynchronous operation fails).
When the Promise is resolved (i.e., the asynchronous operation succeeds), the first callback function provided to .then() is invoked with the result of the operation as its argument.

If the Promise is rejected (i.e., the asynchronous operation fails), and a second callback function is provided to .then(), that function is invoked with the error as its argument.

Importantly, .then() itself returns a Promise, which allows for chaining multiple .then() calls together. Each .then() call can transform the value or handle errors as needed.

# window.location.href: Gets or sets the entire URL.
# window.location.search: Gets or sets the query string portion of the URL (starts with "?" if present).
