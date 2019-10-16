#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { PastebinStack, LoaderStack } from '../lib/pastebin-stack';

const app = new cdk.App();
new PastebinStack(app, 'PastebinStack');
new LoaderStack(app, "TestLoaderSTack");
