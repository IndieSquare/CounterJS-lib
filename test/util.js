
var Long = require('long');
var util = require('../src/util.js');
var Message = require('../src/Message.js');

var assert = require('assert');

describe('util', function() {
	it('should process ARC4 encryption correctly', function() {
		var key = Buffer.from('b34ddf8904bcfc454c6f06d33e600942c7ce8f75dd2d46532f263a6e56d83d34', 'hex');
		var encrypted = Buffer.from('5e1ef3f99e3a89060c43caacc0a05c15678ef8e9ba96f42e8dc64fa04dda759c2b0f4f8c34b91acf6f86e7', 'hex');
		var decrypted = Buffer.from('434e545250525459000000148322228e656758700000000000000000010000000000000000000466756761', 'hex');
		assert.deepEqual(util.arc4(key, encrypted), decrypted);
	});
	it('should generate an address from a mnemonic code', function() {
		var mnemonic = 'spot continue stumble wipe crimson cause sword school blur music sob through';
		var priv = util.mnemonicToPrivateKey(mnemonic, 0);
		assert.equal(priv, 'L5WSPy4TdW1x7HAxwRC2QMzpLfAvJD3cu6un9TSr6tA5yRbXqSa7');
	});
	it('should recover numeric asset name from ID', function() {
		assert.equal(util.assetIdToName(Long.fromString('ac59c7c2fd194d10', true, 16)), 'A12419177087734730000');
	});
	it('should recover alphabetic asset name from ID', function() {
		assert.equal(util.assetIdToName(Long.fromString('0000040d5cba2a73', true, 16)), 'VISVIRIAL');
	});
	it('should recover asset ID from numeric asset name', function() {
		assert(util.assetNameToId('A12419177087734730000').equals(Long.fromString('ac59c7c2fd194d10', true, 16)));
	});
	it('should recover asset ID from alphabetic asset name', function() {
		assert(util.assetNameToId('VISVIRIAL').equals(Long.fromString('0000040d5cba2a73', true, 16)));
	});
	it('should build a transaction', function() {
		var inputs = [{
			txid: '43c8f86a9668092c7bcc89dced79562a9f55f269cd4cf282d29125876b475b1e',
			vout: 1,
		}];
		var memo = Buffer.from("hello world", 'utf8');
		var pubkeyhash= Buffer.from("43f54875a20596fde56a53a701d855bfacc812fd", 'hex'); 
		var networkPrefix = 111;
		var quantity = 100000000; //token is divisible so quantity is in satoshis
		var message = Message.createEnhancedSend('SARUTOBI', quantity, networkPrefix, pubkeyhash, memo);
		console.log(message.data.toString('hex'))
 
		var change = {
			address: 'n3D2BSyPYJzhaf75X2DVGyAvSKTALfWbmH',
			value: 9598944358,
		};
		var rawtx = util.buildTransaction(inputs, 'msTBjkycK1ZmPq1EBkQUwvSYq2fm5KrpJJ', message, change, 'testnet', true/*oldStyle*/);
		console.log("tx is",rawtx.toString('hex'));
		assert.deepEqual(rawtx.toString('hex'), '02000000011e5b476b872591d282f24ccd69f2559f2a5679eddc89cc7b2c0968966af8c8430100000000ffffffff0200000000000000003b6a39e20ca89899bfa085397892b16af15b1126bcbdc5f53b540c150ccf072db76b931f7b480875706b302cdb32c7dddf65de24bec302c9bdc877956644243c020000001976a914edee861dff4de166683e4c54ae3869cd05c7ae0f88ac00000000');
	}); 
}); 
