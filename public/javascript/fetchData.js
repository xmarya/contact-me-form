
export const useFetch = async (url, emailData) => {
  
  try {
    const request = fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        });
                
    const response = await request;
    
    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Assuming the error response is in JSON format
      throw Error(errorData.message || "Something went wrong");
    }
        
    const data = await response.json();
    
    return data;

    
  } catch (error) {
    if (error.message === "Failed to fetch")
      error.message = `Unable to reach the server. Please check your internet connection...`;
    throw error;
  }
};
