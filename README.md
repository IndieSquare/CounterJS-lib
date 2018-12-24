CounterJS-lib
=========
 
A pure and easy-to-use [Counterparty](https://counterparty.io/) Node.js (JavaScript) library based off of https://github.com/visvirial/CounterJS



Features
--------

 * Can generate or parse Counterparty messages without interaction with a Counterparty server (`counterparty-lib` and/or `blockparty`)
 * Can generate or decode bitcoin transactions with Counterparty messages embedded
 * No specific bitcoin library (e.g. Bitcore and BitcoinJS) dependency. You can use any bitcoin library you prefer



Install
-------

### With NPM

```
$ npm install counterjs
```

### From Source

```
$ git clone https://github.com/IndieSquare/CounterJS-lib
$ cd CounterJSLib
$ npm install
```


Miscellaneous
-------------

### Running Tests

To run all tests, run

```
$ mocha
```