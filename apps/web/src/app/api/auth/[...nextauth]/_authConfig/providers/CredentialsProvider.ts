export const CredentialsProviderConfig = {
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async () => {
    const init = {
      status: 200,
      statusText: 'OK',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };
    const body = JSON.stringify({
      id: '1',
      name: 'John Smith',
      email: 'jsmith@example.com',
      message: '',
    });

    const res = new Response(body, init);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.body?.message);
    }

    console.log('data', data);
    console.log('----- authorize ------');
    return data;
  },
};
