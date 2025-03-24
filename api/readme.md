# TranslateGPT Backend

This is a simple Flask server that handles the conversion of TeamCity Kotlin DSL to GitHub Actions YAML using OpenAI's API.

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the server:
   ```
   python app.py
   ```

The server will start on http://localhost:5000.

## API Endpoint

### POST /api/convert

Converts Kotlin code to YAML using OpenAI's API.

#### Request Headers
- `Content-Type: application/json`
- `X-API-KEY`: Your OpenAI API key

#### Request Body
```json
{
  "code": "Your Kotlin code here"
}
```

#### Response
```json
{
  "yaml": "Converted YAML code"
}
```

#### Error Response
```json
{
  "error": "Error message"
}
```
