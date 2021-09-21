class easyhttp {
  //make http get request
  async get(url) {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
  }
  //make http post request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json" 
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json();
    return responseData;
  }
  //make http put request
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json" 
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json();
    return responseData;
  }
  //make http delete request
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json" 
      }
    })
    const responseData = "Success! Deleted"
    return responseData;
  }
}

export const http = new easyhttp();