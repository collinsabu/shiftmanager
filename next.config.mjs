const nextConfig = {
   webpack: (config, { isServer }) => {
     if (isServer) {
       import('./libs/scheduler.mjs'); // Adjust the path as necessary
     }
     return config;
   },
 };
 
 export default nextConfig;
 