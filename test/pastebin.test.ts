import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Pastebin = require('../lib/pastebin-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Pastebin.PastebinStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});