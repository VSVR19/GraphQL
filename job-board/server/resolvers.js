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
    // In GraphQL resolvers, if a resolver returns a Promise, 
    // GraphQL will automatically wait for it to resolve. 
    // We don't need to explicitly mark the resolver as async if we're just returning the Promise directly.
    jobsZZZ: () => getJobs(),
  },
  Job: {
    // Each resolver function is passed some objects from the GraphQL engine.
    // The first argument is called parent.
    date: (job) => job.createdAt.slice(0, 'yyyy-mm-dd'.length),
  },
}

export { resolvers };
