const fetchGreeting = async () => {
  const apiResponse = await fetch('http://localhost:2619/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'query { greeting }',
    }),
  });

  // const body = await apiResponse.json();
  // console.log(body);  
  // return body.data.greeting;

  // const { data } = await apiResponse.json();
  // return data.greeting;

  const { data: { greeting } } = await apiResponse.json();
  return greeting;
}

fetchGreeting().then((greeting) => {
  // document.getElementById('greeting').innerText = greeting;
  document.getElementById('greeting').textContent = greeting;
})