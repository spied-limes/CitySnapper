# Navigation Flow Proposal

## Log In to Main Stack

| Log In Page                    | Sign Up Page                                                                                               | Proceed as Guest                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Displays First                 | Toggle to View                                                                                             | On Press: `navigate("Main")`       |
| Input Data                     | Input Data (remove Street Addr, City, State, Zip; see last step)                                           | -- Useful for Friends & Fam Night? |
| Press "Log In"                 | Press "Sign Up"                                                                                            |
| On Success: `navigate("Main")` | On Success: `navigate('Main")`                                                                             |
| -----                          | After location permissions, ask "Ok to use currLocation as starting point?" (use coordinates as home base) |
