// // src/utils/fetchProfileId.ts
// import { ProfileRequest } from '../types';

// export const fetchProfileIdByHandle = async (handle: string): Promise<string | null> => {
//   const ENDPOINT = 'https://api-v2.lens.dev';

//   // Ensure the handle is correctly formatted
//   const cleanHandle = handle.replace('@', '').toLowerCase();

//   const graphqlQuery = `
//     query Profile($request: ProfileRequest!) {
//       profile(request: $request) {
//         id
//       }
//     }
//   `;

//   const variables: { request: ProfileRequest } = {
//     request: {
//       handle: cleanHandle,
//     }
//   };

//   try {
//     const response = await fetch(ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include this if your API request requires authentication
//       },
//       body: JSON.stringify({
//         query: graphqlQuery,
//         variables: variables
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json(); // Get the error response
//       console.error("API Error Response:", errorData);
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Profile Data:", data); // Debugging log

//     if (data.data && data.data.profile) {
//       return data.data.profile.id;
//     } else {
//       throw new Error("Profile not found.");
//     }
//   } catch (error) {
//     console.error("Error fetching profile ID:", error);
//     return null;
//   }
// };