const API_URL = "http://localhost:8000/v1";

// Load planets and return as JSON.
async function httpGetPlanets() {
  // const response = await fetch(`${API_URL}/planets`);
  // return await response.json();

  const response = await fetch(`${API_URL}/planets`);
  if (response.ok) {
    // 解析 JSON 并返回
    const data = await response.json();
    console.log("Parsed data =======> ", data);
    return data;
  } else {
    // 如果响应失败，抛出错误
    throw new Error("Failed to fetch planets");
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });

}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    }
  }

}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE"
    })
  } catch (err) {
    console.log(err);
    return {
      ok: false
    }
  }

}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
