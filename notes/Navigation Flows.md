# Navigation Flow Proposal

## Log In to Main Stack

| Log In Page                             | Sign Up Page                                                                                               | Proceed as Guest                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Displays First                          | Toggle to View                                                                                             | On Press: `navigate("IntroSlider")`     |
| Input Data                              | Input Data (remove Street Addr, City, State, Zip; see last step)                                           | On `Skip` or `Done`: `navigate('Main")` |
| Press "Log In"                          | Press "Sign Up"                                                                                            | -- Useful for Friends & Fam Night?      |
| On Success: `navigate("IntroSlider")`   | On Success: `navigate('IntroSlider")`                                                                      |
| On `Skip` or `Done`: `navigate("Main")` | On `Skip` or `Done`: `navigate('Main")`                                                                    |
| -----                                   | After location permissions, ask "Ok to use currLocation as starting point?" (use coordinates as home base) |
