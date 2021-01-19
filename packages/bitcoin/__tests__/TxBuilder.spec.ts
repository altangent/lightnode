import { StreamReader } from "@node-lightning/bufio";
import { expect } from "chai";
import { OpCode } from "../lib/OpCodes";
import { OutPoint } from "../lib/OutPoint";
import { Script } from "../lib/Script";
import { Tx } from "../lib/Tx";
import { TxBuilder } from "../lib/TxBuilder";
import { TxIn } from "../lib/TxIn";
import { TxInSequence } from "../lib/TxInSequence";
import { TxLockTime } from "../lib/TxLockTime";
import { TxOut } from "../lib/TxOut";
import { Value } from "../lib/Value";

describe("TxBuilder", () => {
    describe(".hashAll", () => {
        it("p2pkh", () => {
            const sut = new TxBuilder(undefined, (a, b) => 0);
            sut.version = 1;
            sut.addInput(
                new TxIn(
                    OutPoint.fromString(
                        "d1c789a9c60383bf715f3f6ad9d14b91fe55f3deb369fe5d9280cb1a01793f81:0",
                    ),
                    undefined,
                    new TxInSequence(0xfffffffe),
                ),
            );
            sut.addOutput(
                new TxOut(
                    Value.fromSats(32454049),
                    new Script(
                        OpCode.OP_DUP,
                        OpCode.OP_HASH160,
                        Buffer.from("bc3b654dca7e56b04dca18f2566cdaf02e8d9ada", "hex"),
                        OpCode.OP_EQUALVERIFY,
                        OpCode.OP_CHECKSIG,
                    ),
                ),
            );
            sut.addOutput(
                new TxOut(
                    Value.fromSats(10011545),
                    new Script(
                        OpCode.OP_DUP,
                        OpCode.OP_HASH160,
                        Buffer.from("1c4bc762dd5423e332166702cb75f40df79fea12", "hex"),
                        OpCode.OP_EQUALVERIFY,
                        OpCode.OP_CHECKSIG,
                    ),
                ),
            );
            sut.locktime = new TxLockTime(410393);

            const prevOut = new TxOut(
                Value.fromSats(42505594),
                Script.p2pkhLock(Buffer.from("a802fc56c704ce87c42d7c92eb75e7896bdc41ae", "hex")),
            );

            const expected = "27e0c5994dec7824e56dec6b2fcb342eb7cdb0d0957c2fce9882f715e85d81a6";
            const result = sut.hashAll(0, prevOut);
            expect(result.toString("hex")).to.equal(expected);
        });

        describe("P2SH", () => {});
    });
});
