const chai = require('chai');
const expect = chai.expect;
const cz = require('../index');


describe('camelizer', () => {
    it('works with 0 nested children', () => {
        const testObj = {
            PascalCase: 'should be pascalCase'
        };

        const result = cz(testObj);

        expect(result.pascalCase).to.exist;
        expect(result.PascalCase).to.not.exist;
    });

    it('works with 1 nested child', () => {
        const testObj = {
            PascalCase: 'should be pascalCase',
            Child: {
                MorePascal: 'should be morePascal'
            }
        };

        const result = cz(testObj);

        expect(result.child).to.exist;
        expect(result.child.morePascal).to.exist;
    });

    it('works with many nested children', () => {
        const testObj = {
            PascalCase: 'should be pascalCase',
            Child: {
                MorePascal: 'should be morePascal',
                GrandChild: {
                    YetMorePascal: 'should be yetMorePascal'
                }
            }
        };

        const result = cz(testObj);

        expect(result.child).to.exist;
        expect(result.child.grandChild).to.exist;
        expect(result.child.grandChild.yetMorePascal).to.exist;
        expect(result.child.grandChild.YetMorePascal).to.not.exist;
    });

    it('doesn\'t change date values', () => {
        const dateConst = new Date();
        const testObj = {
            ADate: dateConst
        };

        const result = cz(testObj);

        expect(result.aDate).to.exist;
        expect(result.aDate).to.equal(dateConst);
    });

    it('doesn\'t change number values', () => {
        const testObj = {
            ANumber: 3
        };

        const result = cz(testObj);

        expect(result.aNumber).to.exist.and.to.equal(3);
    });

    it('doesn\'t change string values', () => {
        const testObj = {
            PascalCase: 'please don\t mutate me'
        };

        const result = cz(testObj);

        expect(result.pascalCase).to.exist.and.to.equal('please don\t mutate me');
    });

    it('doesn\'t change array values', () => {
        const testObj = {
            AnArray: [
                'hello',
                'world'
            ]
        };

        const result = cz(testObj);

        expect(result.anArray).to.exist;
        expect(result.anArray).to.be.instanceof(Array);
        expect(result.anArray).to.have.members([ 'hello', 'world' ]);
    });

    it('mutates keys but doesn\'t change object array values', () => {
        const testObj = {
            AnObjectArray: [
                {
                    PascalCase: 'hello'
                }
            ]
        };

        const result = cz(testObj);

        expect(result.anObjectArray).to.exist;
        expect(result.anObjectArray[0]).to.have.all.keys([ 'pascalCase' ]);
        expect(result.anObjectArray[0].pascalCase).to.equal('hello');
    });

    it('works with exclude options', () => {
        const testObj = {
            TheOnePercent: 'I am privilged'
        };
        const testOpts = {
            exclude: [ 'TheOnePercent' ]
        };

        const result = cz(testObj, testOpts);

        expect(result.TheOnePercent).to.exist;
        expect(result.theOnePercent).to.not.exist;
    });

    it('works with exclude options on nested children', () => {
        const testObj = {
            AnArray: [
                {
                    ChildName: 'a child'
                }
            ]
        };
        const testOpts = {
            exclude: [ 'ChildName' ]
        };

        const result = cz(testObj, testOpts);

        expect(result.anArray).to.exist;
        expect(result.anArray[0]).to.exist;
        expect(result.anArray[0].childName).to.not.exist;
        expect(result.anArray[0].ChildName).to.exist.and.to.equal('a child');
    });
});
