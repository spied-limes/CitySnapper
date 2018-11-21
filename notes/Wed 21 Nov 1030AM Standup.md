# Wed 21 Nov 1030 AM Standup

## Plans for Today

### Shaun

- Last night: success posting base64 strings to Firebase
- Connect that data to the image comparison API and print it to screen
- Idea for "self-guided tours"

### Rich

- Address reducer functionality now that we have a database
  - Write function to update user object on location check in

### Kasim

- create markers for our locations
- basic time and distance set
- extend node_module functionality into a util to present more data on screen
  - modifying the data the Google API call gets
- push locations into a database

### Christian

- finish location landing page
  - title, tagline, photo, borough, info text
  - activities sections - touchable redirect to activity screen
  - make dynamic (pull location data set from reducer)

---

## Notes from yesterdays code review

### How are we integrating that image comparison algorithm with Firebase?

- make request TO firebase, that triggers the API call
- see how we can hook up [DeepAI Image Similarity API](https://deepai.org/machine-learning-model/image-similarity) or something that will actually work...
- YES, firebase can store images! 10MB/image
- Does firebase cloud storage gives you a URL (we can use to fed the image similarity API)? **YES**

### Night and Day versions of landmarks

- pull in system time and present appropriate time
- using sunset time to calculate

### SIMPLE MISSIONS ARE GOOD

- Pictures are good

- **MISSION IDEA:** Climb Empire State!", use altitude data from phone- JOHN APPROVED

- **AR MISSION IDEA:** Wikipage on AR Plane (high WOW, but time consuming)
