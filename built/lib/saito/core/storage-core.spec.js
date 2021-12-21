"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var storage_core_1 = __importDefault(require("./storage-core"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var blake3 = __importStar(require("blake3"));
var transaction_1 = __importStar(require("../transaction"));
var networkapi_1 = __importDefault(require("../networkapi"));
var crypto_1 = __importDefault(require("../crypto"));
var binary_1 = __importDefault(require("../binary"));
var wallet_1 = __importDefault(require("../wallet"));
var block_1 = __importDefault(require("../block"));
test("write_read_empty_block_to_file", function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockApp, networkApi, crypto, binary, block, storage, result, block2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs_extra_1.default.emptyDirSync("../data/blocks");
                mockApp = {};
                networkApi = new networkapi_1.default(mockApp);
                crypto = new crypto_1.default(mockApp);
                binary = new binary_1.default(mockApp);
                mockApp.networkApi = networkApi;
                mockApp.crypto = crypto;
                mockApp.binary = binary;
                mockApp.hash = function (data) {
                    return blake3.hash(data).toString('hex');
                };
                block = new block_1.default(mockApp);
                block.generateMetadata();
                storage = new storage_core_1.default(mockApp);
                return [4 /*yield*/, storage.saveBlock(block)];
            case 1:
                result = _a.sent();
                expect(result).toBeTruthy();
                return [4 /*yield*/, storage.loadBlockFromDisk(result)];
            case 2:
                block2 = _a.sent();
                expect(block2).toBeTruthy();
                expect(block2.block.id).toEqual(block.block.id);
                expect(block2.hash).toEqual(block.hash);
                expect(block2.prehash).toEqual(block.prehash);
                return [2 /*return*/];
        }
    });
}); });
test("write_read_block_with_data_to_file", function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockApp, networkApi, crypto, binary, wallet, block, tx, storage, result, block2, tx2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs_extra_1.default.emptyDirSync("../data/blocks");
                mockApp = {};
                networkApi = new networkapi_1.default(mockApp);
                crypto = new crypto_1.default(mockApp);
                binary = new binary_1.default(mockApp);
                wallet = new wallet_1.default(mockApp);
                mockApp.networkApi = networkApi;
                mockApp.crypto = crypto;
                mockApp.binary = binary;
                mockApp.wallet = wallet;
                wallet.wallet.privatekey = "854702489d49c7fb2334005b903580c7a48fe81121ff16ee6d1a528ad32f235d";
                wallet.wallet.publickey = "02af1a4714cfc7ae33d3f6e860c23191ddea07bcb1bfa6c85bc124151ad8d4ce74";
                mockApp.hash = function (data) {
                    return blake3.hash(data).toString('hex');
                };
                block = new block_1.default(mockApp);
                block.block.id = 10;
                block.block.timestamp = 1637034582666;
                block.block.previous_block_hash = "bcf6cceb74717f98c3f7239459bb36fdcd8f350eedbfccfbebf7c0b0161fcd8b";
                block.block.merkle = "ccf6cceb74717f98c3f7239459bb36fdcd8f350eedbfccfbebf7c0b0161fcd8b";
                block.block.creator = crypto.toBase58("dcf6cceb74717f98c3f7239459bb36fdcd8f350eedbfccfbebf7c0b0161fcd8bcc");
                block.block.burnfee = BigInt(50000000);
                block.block.difficulty = 0;
                block.block.treasury = BigInt(0);
                block.block.staking_treasury = BigInt(0);
                block.block.signature =
                    "c9a6c2d0bf884be6933878577171a3c8094c2bf6e0bc1b4ec3535a4a55224d186d4d891e254736cae6c0d2002c8dfc0ddfc7fcdbe4bc583f96fa5b273b9d63f4";
                tx = new transaction_1.default();
                tx.transaction.ts = 1637034582666;
                tx.transaction.type = transaction_1.TransactionType.ATR;
                tx.transaction.sig =
                    "c9a6c2d0bf884be6933878577171a3c8094c2bf6e0bc1b4ec3535a4a55224d186d4d891e254736cae6c0d2002c8dfc0ddfc7fcdbe4bc583f96fa5b273b9d63f4";
                block.transactions.push(tx);
                block.generateMetadata();
                storage = new storage_core_1.default(mockApp);
                return [4 /*yield*/, storage.saveBlock(block)];
            case 1:
                result = _a.sent();
                expect(result).toBeTruthy();
                return [4 /*yield*/, storage.loadBlockFromDisk(result)];
            case 2:
                block2 = _a.sent();
                expect(block2).toBeTruthy();
                expect(block2.block.id).toEqual(block.block.id);
                expect(block2.block.timestamp).toEqual(block.block.timestamp);
                expect(block2.block.previous_block_hash).toEqual(block.block.previous_block_hash);
                expect(block2.block.merkle).toEqual(block.block.merkle);
                expect(block2.block.creator).toEqual(block.block.creator);
                expect(block2.block.burnfee).toEqual(block.block.burnfee);
                expect(block2.block.difficulty).toEqual(block.block.difficulty);
                expect(block2.block.treasury).toEqual(block.block.treasury);
                expect(block2.block.staking_treasury).toEqual(block.block.staking_treasury);
                expect(block2.block.signature).toEqual(block.block.signature);
                expect(block2.block.burnfee).toEqual(block.block.burnfee);
                expect(block2.hash).toEqual(block.hash);
                expect(block2.prehash).toEqual(block.prehash);
                expect(block2.transactions.length).toEqual(block.transactions.length);
                tx2 = block2.transactions[0];
                expect(tx2.transaction.ts).toEqual(tx.transaction.ts);
                expect(tx2.transaction.type).toEqual(tx.transaction.type);
                expect(tx2.transaction.sig).toEqual(tx.transaction.sig);
                return [2 /*return*/];
        }
    });
}); });
test.skip("read_block_from_disk (from rust generated block)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockApp, networkApi, crypto, binary, storage, block, block2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mockApp = {};
                networkApi = new networkapi_1.default(mockApp);
                crypto = new crypto_1.default(mockApp);
                binary = new binary_1.default(mockApp);
                mockApp.networkApi = networkApi;
                mockApp.crypto = crypto;
                mockApp.binary = binary;
                mockApp.hash = function (data) {
                    return blake3.hash(data).toString('hex');
                };
                storage = new storage_core_1.default(mockApp);
                block = new block_1.default(mockApp);
                return [4 /*yield*/, storage.loadBlockFromDisk("./data/blocks/0000017d22813455-bcf6cceb74717f98c3f7239459bb36fdcd8f350eedbfccfbebf7c0b0161fcd8b.sai")];
            case 1:
                block2 = _a.sent();
                console.log(process.cwd());
                expect(block2).toBeTruthy();
                expect(block2.block.id).toEqual(block.block.id);
                expect(block2.block.burnfee).toEqual(block2.block.burnfee);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=storage-core.spec.js.map