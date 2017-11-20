## Models

### User

+ username: `String`
+ email: `String`
+ password: `String`
+ collection: `ObjectId, Collection`
+ picture: `String`
+ favorites: `[ObjectId, Chunks]` (necesario?)

### Chunks

+ creator: `objectId, User`
+ name: `String`
+ description: `String`
+ content: `String`
+ language: `String (enum)`
+ likes: `Number`,
+ tags: [String]

### Collection

+ elements: `[ order: ObjectID, Chunks ]`

## Routes

/signup

### New user want to add a chunk to his code collection:

1. User clicks in Signup > 
2. User fills signup form > 
3. User is redirected to login >
4. User fills login > 
5. Redirects and show main page > 
6. User clicks in new chunk > 
7. User creates new chunk > 
8. User is redirected to main page

1. User clicks in Login with github > 
2. Repeat from step 5

### User wants to save other user chunk in his collection:

1. User clicks on 'add to my collection' button on a chunk
2. A reference of that document object is added to user collection
3. Chunk is showed in user collection
4. User clicks on 'edit' button of that chunk and copies the chunk with userid
