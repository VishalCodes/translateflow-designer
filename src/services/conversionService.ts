
/**
 * Service for converting Kotlin code to YAML via the OpenAI API
 */

const API_URL = '/api/convert'; // This would point to your Python backend

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

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey, // Pass the API key in a header
      },
      body: JSON.stringify({ code: kotlinCode }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { yaml: data.yaml };
  } catch (error) {
    console.error('Conversion error:', error);
    return { 
      yaml: '', 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};
