# Summary of the errors I took for 2 day's !

- Related to how Node.js handles ESmodules and TypeScript especially when using tools like 'ts-node' and 'nodemon'.

## First issue : Unknown file extension '.ts'.

- Node.js in its ES module mode,didn't know how to handle typeScript files (.ts extensions). 
- By default Node.js understands only javaScript files(.js or mjs).

## Use of ES modules with ts-node

- ES Modules (import/export syntax) require special handling in Node.js, particularly when using TypeScript. ts-node can handle this, but it requires explicit configuration. When you tried to run your server using ts-node, Node.js was unsure how to load .ts files as ES modules.

## How the issue was resolved

 1) Using the `--loader ts-node/esm` flag

 - The flag --loader ts-node/esm tells Node.js to use ts-node to compile TypeScript files on the fly, even when working with ES modules. This loader bridges the gap between Node.js's ES module system and TypeScript.

 ## Experimental warning 
 - The warning message you saw (ExperimentalWarning: --experimental-loader may be removed in the future) is Node.js letting you know that the --loader flag is still an experimental feature. This means it might change in the future, but for now, it's the right approach to get TypeScript working with ES modules.

 ## Running the server with nodemon

 - By configuring nodemon to use the correct loader (ts-node/esm), it allowed your TypeScript server file (server.ts) to be correctly interpreted as an ES module. That's why your server eventually started working.

 ## summary of the mistake
 - The main issue was that Node.js, by default, doesn’t know how to handle .ts files as ES modules without additional configuration. The use of ts-node with the appropriate loader resolved this.

 ## How to avoid this in future
 1) Stick to ES modules or CommonJS consistently

 - If you want to use ES modules, ensure your Node.js and tsconfig.json settings are correctly configured to handle them.
- Alternatively, stick to CommonJS (require/module.exports) if you want to avoid these issues.

## npm touch-cli
Just create a file with `touch <fileName>`
But it have to be installed globally to work using above command, if only installed for that project, then use `npx touch-cli <filename>`
eg; `npx touch-cli index.ts`


## Do not give special characters
- In the mongodb connection string , while creating the password dont give passwords with @,# $ etc. only alphabets and numbers is good.

## Password hashing middleware
- userSchema.pre('save',async function (next){...}), this is actually a middleware, that runs before a document is saved to the database.
What it does ? 
1) First checks whether the password is modified using (!this.isModified('password')).

So when this piece of code will be useful ? yes especially when password is not modified and it calls the next() to proceed with the save operation without modifying the password ( useful when updating the user details other than the password).
But if the user is a new user , then it proceeds with password hash.

After all these, when next() is called the hashed password is saved to the database.

## mongoose Schema
- To create a new Schema, should use new keyword before it. 
- mongoose.Schema is not a function, it is a type.
-need to import Schema from mongoose = import mongoose,{Schema} from mongoose.
- a new Schema is created and from that schema a model is created using mongoose.model which is then used to interact with the database.