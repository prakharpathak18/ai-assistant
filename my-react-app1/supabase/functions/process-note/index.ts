// Deno.serve(async (req) => {

//   const { content } = await req.json();

//   const GEMINI_API_KEY =
//     Deno.env.get("GEMINI_API_KEY");

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Summarize this research note clearly:\n\n${content}`,
//               },
//             ],
//           },
//         ],
//       }),
//     }
//   );

//   const data = await response.json();

//   return new Response(
//     JSON.stringify({
//       summary:
//         data.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "No summary generated",
//     }),
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
// });







// Deno.serve(async (req) => {

//   // Handle CORS preflight request
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         "Access-Control-Allow-Methods": "POST, OPTIONS"
//       }
//     });
//   }

//   const { content } = await req.json();

//   const GEMINI_API_KEY =
//     Deno.env.get("GEMINI_API_KEY");

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Summarize this research note clearly:\n\n${content}`
//               }
//             ]
//           }
//         ]
//       })
//     }
//   );

//   const data = await response.json();

//   return new Response(
//     JSON.stringify({
//       summary:
//         data.candidates?.[0]?.content?.parts?.[0]?.text
//         ?? "No summary generated"
//     }),
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*"
//       }
//     }
//   );
// });









Deno.serve(async (req) => {

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      }
    });
  }

  // Check authentication
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Missing auth header" }),
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  }

  const { content } = await req.json();

  const GEMINI_API_KEY =
    Deno.env.get("GEMINI_API_KEY");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  `Summarize this research note clearly:\n\n${content}`
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  return new Response(
    JSON.stringify({
      summary:
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "No summary generated"
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
});