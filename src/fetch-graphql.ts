// your-app-name/src/fetchGraphQL.js
export async function fetchGraphQL(text: string, variables: any) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("https://countries.trevorblades.com", {
    method: "POST",
    headers: {
      ["content-type"]: "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}
