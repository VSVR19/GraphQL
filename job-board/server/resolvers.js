import { getJobs } from "./db/jobs.js";

// const resolvers = {
//   Query: {
//     greeting: () => 'Hello GraphQL!'
//   }
// };

// const resolvers = {
//   Query: {
//     jobs: async () => {
//       const jobs = await getJobs();
//       return jobs.map((job) => ({
//         id: job.id,
//         title: job.title,
//         description: job.description,
//         blah: 'bluh',
//       }));
//     }
//   }
// }

const resolvers = {
  Query: {
    jobs: () => getJobs(),
  }
}

export { resolvers };
