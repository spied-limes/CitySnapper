# Tuesday Code Review

## How are we integrating that image comparison algorithm with Firebase?

- make request TO firebase, that triggers the API call
- see how we can hook up [DeepAI Image Similarity API](https://deepai.org/machine-learning-model/image-similarity) or something that will actually work...
- YES, firebase can store images! 10MB/image
- Does firebase cloud storage gives you a URL (we can use to fed the image similarity API)? **YES**

## Night and Day versions of landmarks

- pull in system time and present appropriate time
- using sunset time to calculate

## SIMPLE MISSIONS ARE GOOD

- Pictures are good

- **MISSION IDEA:** Climb Empire State!", use altitude data from phone- JOHN APPROVED

- **AR MISSION IDEA:** Wikipage on AR Plane (high WOW, but time consuming)

# Friday 16 Nov 2018 6PM Standup

## Reminder: Check in when you start working, check out with us when you gotta go!

## Tasks for the Weekend

### Rich

**MISSION IDEA:** Climb Empire State!", use altitude data from phone

- Implement Firebase Auth, cleanup branches to merge and push to github remote repo
- See about populating db with some stuff
- Check out storage buckets for photos! (collecting to display at end of hunt)

### Kasim

**MISSION IDEA:** None currently

- Getting linking between screens down cold
- Begin layout structuring and routing

### Shaun

**MISSION IDEA:** Do a dance at this location, use accelerometer

- Getting Map to move on change location
- **KASIM** send video to Shaun

### Christian

**MISSION IDEA:** Recreate this photo of this landmark; image comparison API

- Begin BASIC layout ideas for generic pages
- Getting camera functionality working
- Test image comparison API
- Put comparison results on a page
- Looking into sending images to buckets
