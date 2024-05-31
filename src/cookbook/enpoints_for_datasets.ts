import { Parea } from '../client';
import * as dotenv from 'dotenv';

dotenv.config();

const p = new Parea(process.env.PAREA_API_KEY);

export async function main() {
  const data = [
    {
      problem: '1+2',
      target: 3,
      tags: ['easy'],
    },
    { problem: 'Solve the differential equation dy/dx = 3y.', target: 'y = c * e^(3x)', tags: ['hard'] },
  ];

  // this will create a new dataset on Parea named "Math problems".
  // The dataset will have one column named "problem", and two columns using the reserved names "target" and "tags".
  // when using this dataset the expected prompt template should have a placeholder for the variable problem.
  await p.createTestCollection(data, 'Math problems 3');

  const new_data = [{ problem: 'Evaluate the integral ∫x^2 dx from 0 to 3.', target: 9, tags: ['hard'] }];
  // this will add the new test cases to the existing "Math problems" dataset.
  // New test cases must have the same columns as the existing dataset.
  await p.addTestCases(new_data, 'Math problems 3');
  // Or if you can use the dataset ID instead of the name
  // await p.addTestCases(new_data, undefined, 121);
}

main().then(() => {
  console.log('Done!');
});
