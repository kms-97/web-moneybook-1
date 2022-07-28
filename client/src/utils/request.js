const BASE_URL = process.env.BASE_URL;

export async function request({ method, requestURL, body }) {
  const URL = `${BASE_URL}${requestURL}`;
  const options = {
    method,
    headers: {
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      const { name, message } = await response.json();
      const customError = new Error(message);
      customError.name = name;
      throw customError;
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}
