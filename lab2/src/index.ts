import { reconstructFiles } from './fileReconstruction';
import { tollRoadBilling } from './tollRoad';

const fileInput = `
1

1010
0101
`;

console.log('--- File Reconstruction ---');
console.log(reconstructFiles(fileInput));

const tollInput = `
1
10 10 10 10 10 10 20 20 20 15 15 15 15 15 15 15 20 30 20 15 15 10 10 10
ABCD123 01:01:06:01 enter 17
765DEF 01:01:07:00 exit 95
ABCD123 01:01:08:03 exit 95
765DEF 01:01:05:59 enter 17
`;

console.log('--- Toll Road ---');
console.log(tollRoadBilling(tollInput));