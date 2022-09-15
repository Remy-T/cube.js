import { mainTestSet, databricksTestSet } from './driverTests/testSets';
import { executeTestSuite } from './driver-test-suite';

executeTestSuite({
  type: 'postgres',
  tests: databricksTestSet,
  
});

// executeTestSuite({
//   type: 'postgres',
//   tests: mainTestSet,
//   config: { CUBEJS_EXTERNAL_DEFAULT: 'true' }
// });
