
# fluent-mysql


![Image of version](https://img.shields.io/badge/npm-v1.2.1-blue)
![Image of version](https://img.shields.io/badge/licence-MIT-yellowgreen)

**fluent-mysql** is a query builder for MySQL. It performs basic database operations using [mysql](https://www.npmjs.com/package/mysql) library.

* It is  **ES5** compatible.

*Inspired by [Laravel Query Builder](https://laravel.com/docs/master/queries)*

## Table of Contents

- [Installation](#installation)
- [Connection to Database](#connection-to-database)
- [Pooling connections](#pooling-connections)
- [Selections](#selections)
  - [table()](#table)
  - [select()](#select)
  - [distinct()](#distinct)
- [Retrieving Results](#retrieving-results)
  - [get()](#get)
  - [first()](#first)
  - [find()](#find)
  - [query()](#query)
- [Where Clauses](#where-clauses)
  - [where()](#where)
  - [orWhere()](#orwhere)
  - [whereBetween()](#wherebetween)
  - [orWhereBetween()](#orwherebetween)
  - [whereNotBetween()](#wherenotbetween)
  - [orWhereNotBetween()](#orwherenotbetween)
  - [whereIn()](#wherein)
  - [orWhereIn()](#orwherein)
  - [whereNotIn()](#wherenotin)
  - [orWhereNotIn()](#orwherenotin)
  - [whereNull()](#wherenull)
  - [orWhereNull()](#orwherenull)
  - [whereNotNull()](#wherenotnull)
  - [orWhereNotNull()](#orwherenotnull)
- [Ordering, Grouping, Limit & Offset](#ordering-grouping-limit--offset)
  - [orderBy()](#orderby)
  - [limit()](#limit)
  - [offset](#offset)
  - [groupBy() / having()](#groupby--having)
- [Joins](#joins)
  - [join()](#join)
  - [leftJoin()](#leftjoin)
  - [rightJoin()](#rightjoin)
- [Aggregate Functions](#aggregate-functions)
  - [count()](#count)
  - [min()](#min)
  - [max()](#max)
  - [avg()](#avg)
  - [sum()](#sum)
  - [exists()](#exists)
- [Insert, Update & Delete](#insert-update--delete)
  - [insert()](#insert)
  - [insertOrUpdate()](#insertorupdate)
  - [update()](#update)
  - [delete()](#delete)
- [Combining Methods](#combining-methods)
- [Contributing](#contributing)
- [License](#license)



## Installation

Use the node package manager [npm](https://www.npmjs.com/package/fluent-mysql) to install fluent-mysql.

```bash
npm install fluent-mysql
```

```js
const DB = require('fluent-mysql');
```

## Connection to Database
The parameters are the same with [mysql](https://www.npmjs.com/package/mysql) library. You can list all options from [here](https://www.npmjs.com/package/mysql#connection-options)


```js
const DB = require('fluent-mysql');

let connection = DB.connect({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port     : process.env.DB_PORT,
  database : process.env.DB_DATABASE,
});

connection.then(result => {
  console.log(result.message); // Connected to MySQL Database

  if(result.success){
   // ...
  }
}).catch(err => console.log(err));

```

## Pooling connections
This function provides connection pooling using createPool(config).
This function gets pool connection, query and release it.


```js
const DB = require('fluent-mysql');

DB.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port     : process.env.DB_PORT,
  database : process.env.DB_DATABASE,
});

let query = DB.table('users').get();

query.then(results => {
  //...
  }
}).catch(err => console.log(err));

```

## Selections

### table()

It is necessary to specify `table` in all queries except for writing your own query with `query` method. 

```js
// Get all records from users table
let users = DB.table('users').get();

users.then( results => {
  //...
});
```

### select()

Using the `select` method, you can specify a custom select clause for the query.

```js
let users = DB.table('users').select('name', 'phone', 'age').get();

users.then( results => {
  //...
});
```
### distinct()

You can also use the distinct method to force the query to return distinct results.

```js
let users = DB.table('users').select('name').distinct().get();

users.then( results => {
  //...
});
```


## Retrieving Results

**NOTE:** All queries return **Promise**, for this reason use `async/await` or `then()`  if you need query results immediately before any action.


### get()

`get` must be the last method in methods chain.

```js
let users = DB.table('users').get();

users.then( results => {
  //...
});
```

### first()
You can get only the first row from all results.

```js
let users = DB.table('users').first();

users.then( result => {
  //...
});
```

### find()
To retrieve a single row by its id column value, use the `find` method:


```js
let users = DB.table('users').find(10);

users.then( result => {
  //...
});
```

### query()

You can also write your own query with `query` method.
```js
let users = DB.query(`SELECT * FROM users WHERE name = "John"`);

users.then( results => {
  //...
});
```

## Where Clauses

### where()


```js
let users = DB.table('users').where('userName', '=', 'John' ).get();

users.then( results => {
  //...
});
```

### orWhere()


```js
let users = DB.table('users').where('userName', '=', 'John' ).orWhere('age', '>', 20 ).get();

users.then( results => {
  //...
});
```

### whereBetween()


```js
// Get users whose ages between 20 and 30
let users = DB.table('users').whereBetween('age', 20, 40 ).get();

users.then( results => {
  //...
});
```

### orWhereBetween()


```js
let users = DB.table('users').where('name', '=', 'John' ).orWhereBetween('age', 30, 40 ).get();

users.then( results => {
  //...
});
```

### whereNotBetween()


```js
let users = DB.table('users').whereNotBetween('age', 50, 60 ).get();

users.then( results => {
  //...
});
```

### orWhereNotBetween()


```js
let users = DB.table('users').whereBetween('salary', 1000, 2000 ).orWhereNotBetween('age', 50, 60 ).get();

users.then( results => {
  //...
});
```

### whereIn()


```js
let users = DB.table('users').whereIn('age', [25,35,45] ).get();

users.then( results => {
  //...
});
```


### orWhereIn()


```js
let users = DB.table('users').where('userName', '=', 'John' ).orWhereIn('age', [25,35,45] ).get();

users.then( results => {
  //...
});
```


### whereNotIn()


```js
let users = DB.table('users').whereNotIn('age', [25,35,45] ).get();

users.then( results => {
  //...
});
```


### orWhereNotIn()


```js
let users = DB.table('users').where('userName', '=', 'John' ).orWhereNotIn('age', [20,30,40] ).get();

users.then( results => {
  //...
});
```


### whereNull()


```js
let users = DB.table('users').whereNull('phone').get();

users.then( results => {
  //...
});
```


### orWhereNull()


```js
let users = DB.table('users').whereNull('phone').orWhereNull('email').get();

users.then( results => {
  //...
});
```


### whereNotNull()


```js
let users = DB.table('users').whereNotNull('phone' ).get();

users.then( results => {
  //...
});
```

### orWhereNotNull()


```js
let users = DB.table('users').where('age', '>', 25 ).orWhereNotNull('email').get();

users.then( results => {
  //...
});
```

## Ordering, Grouping, Limit & Offset

### orderBy()
The `orderBy` method allows you to sort the result of the query by a given column. The first argument to the `orderBy` method should be the column you wish to sort by, while the second argument controls the direction of the sort and may be either `asc` or `desc`.


```js
let users = DB.table('users').orderBy('name', 'ASC').get();

users.then( results => {
  //...
});
```

### limit()
To limit the number of results returned from the query, you may use the `limit` method.

```js
let users = DB.table('users').limit(20).get();

users.then( results => {
  //...
});
```

### offset()
To skip a given number of results in the query, you may use the `offset` method.

```js
let users = DB.table('users').limit(20).offset(10).get();

users.then( results => {
  //...
});
```

### groupBy() / having()

The `groupBy` and `having` methods may be used to group the query results.

```js
let authorBooks = DB.table('books')
                    .select('author', 'COUNT(bookID) AS totalBook')
                    .groupBy('author')
                    .having('totalBook', '>', 10)
                    .get();

authorBooks.then( results => {
  //...
});
```

## Joins


### join()

The **fluent-mysql** may also be used to write join statements. The first argument passed to the join method is the name of the table you need to join to, while the remaining arguments specify the column constraints for the join. You can even join to multiple tables in a single query.

```js
let users = DB.table('users')
              .join('contacts', 'users.id', '=', 'contacts.user_id')
              .join('orders', 'users.id', '=', 'orders.user_id')
              .select('users.*', 'contacts.phone', 'orders.price')
              .get();

users.then( results => {
  //...
});
```

### leftJoin()

```js
let users = DB.table('users')
              .leftJoin('contacts', 'users.id', '=', 'contacts.user_id')
              .select('users.*', 'contacts.phone')
              .get();

users.then( results => {
  //...
});
```

### rightJoin()

```js
let users = DB.table('users')
              .rightJoin('contacts', 'users.id', '=', 'contacts.user_id')
              .select('users.*', 'contacts.phone')
              .get();

users.then( results => {
  //...
});
```

## Aggregate Functions

You may call any of these methods after constructing your query. `min`, `max`, `avg` and `sum` methods take two parameters. First is the name of column in database. Second one is the column name after query. It may be anything you want. Second parameter is optional.

### count()

```js
let usersCount = DB.table('users').count();
```
### min()

```js
// SELECT MIN(age) AS minAge FROM users
let minAge = DB.table('users').min('age', 'minAge');
```

### max()

```js
// SELECT MAX(age) AS maxAge FROM users
let maxAge = DB.table('users').max('age', 'maxAge');
```

### avg()

```js
// SELECT AVG(age) AS avgAge FROM users
let avgAge = DB.table('users').avg('age', 'avgAge');
```

### sum()

```js
// SELECT SUM(age) AS sumAge FROM users
let sumAge = DB.table('users').sum('age', 'sumAge');
```

### exists()

Instead of using the `count` method to determine if any records exist that match your query's constraints, you may use the `exists` method.

```js
let exists = DB.table('users').where('name', '=', 'John').exists();
```

## Insert, Update & Delete

### insert()

```js
let insertion = DB.table('users')
                  .insert({id: 50, name: 'John', age:25});
              
insertion.then( result => {
  // ...
});
```

### insertOrUpdate()

This method updates  a record, if not exists creates it.

```js
let update = DB.table('users')
               .insertOrUpdate({name: 'John', age:25});
              
insertion.then( result => {
  // ...
});
```

### update()


```js
let update = DB.table('users')
               .update({id: 125, name: 'John', age:35});
              
insertion.then( result => {
  // ..
});
```

Also you can use `where` method in order to specify conditions. 
(Be careful about putting `where` method before `update`.)

```js
let update = DB.table('users')
               .where('age', '>',40)
               .update({salary :  5000});
              
insertion.then( result => {
  // ..
});
```

### delete()

```js
let deletion = DB.table('users')
               .where('name','=','John')
               .delete();
              
deletion.then( result => {
  // ..
});
```


## Combining Methods

Example of using with multiple methods: 

```js
let users = DB.table('users')
              .select('name','age')
              .where('age', '>', 30)
              .where('name', '=', 'John')
              .limit(5)
              .orderBy('age', 'DESC')
              .get();

users.then( results => {
  // ...
});
```
**As long as you use the last method correctly, you can change the order of methods**

```js
//Both functions returns the same result
let users = DB.table('users').select('name','age').where('age', '>', 30).get();
    
let users = DB.where('age', '>', 30).select('name','age').table('users').get();
         
users.then( results => {
  //...
});
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
The fluent-mysql is open-sourced software licensed under the MIT license.
[MIT](https://opensource.org/licenses/MIT)