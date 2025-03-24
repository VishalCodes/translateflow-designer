/**
 * Service for converting Kotlin code to YAML via the OpenAI API
 */

// Update this URL to point to your Python backend
const API_URL = 'http://localhost:5000/api/convert'; 

interface ConversionResponse {
  yaml: string;
  error?: string;
}

/**
 * Converts Kotlin code to YAML by sending it to the Python backend
 * @param kotlinCode The Kotlin code to convert
 * @returns The converted YAML or an error message
 */
export const convertKotlinToYaml = async (kotlinCode: string): Promise<ConversionResponse> => {
  try {
    // Get the API key from localStorage
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      return { 
        yaml: '',
        error: 'API key not found. Please set your OpenAI API key in the settings.'
      };
    }

    console.log('Sending request to API endpoint:', API_URL);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey, // Pass the API key in a header
        'Accept': 'application/json', // Explicitly request JSON response
      },
      body: JSON.stringify({ code: kotlinCode }),
    });

    console.log('Received response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()].map(h => `${h[0]}: ${h[1]}`).join(', '));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    let data;
    const contentType = response.headers.get('content-type');
    console.log('Response content type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
        console.log('Parsed JSON response:', data);
      } catch (jsonError) {
        const textResponse = await response.text();
        console.error('Failed to parse JSON. Raw response:', textResponse);
        throw new Error('Failed to parse server response as JSON');
      }
    } else {
      // Handle non-JSON responses
      const textResponse = await response.text();
      console.error('Received non-JSON response:', textResponse);
      throw new Error(`Server returned invalid content type: ${contentType || 'none'}. Expected application/json.`);
    }

    // Check if the data has the expected structure
    if (!data || typeof data.yaml !== 'string') {
      console.error('Invalid response structure:', data);
      throw new Error('Server response is missing the expected "yaml" field');
    }

    return { yaml: data.yaml };
  } catch (error) {
    console.error('Conversion error:', error);
    return { 
      yaml: '', 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};