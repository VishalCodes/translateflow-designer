from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/convert', methods=['POST'])
def convert():
    # Get the API key from the request header
    api_key = request.headers.get('X-API-KEY')
    
    if not api_key:
        return jsonify({'error': 'API key is required'}), 401
    
    # Get the Kotlin code from the request body
    data = request.json
    if not data or 'code' not in data:
        return jsonify({'error': 'Kotlin code is required'}), 400
    
    kotlin_code = data['code']
    
    # Initialize the OpenAI client with the provided API key
    client = openai.OpenAI(api_key=api_key)

    sys_prompt = """
        CONTEXT:  
        Adopt the role of an expert DevOps engineer specializing in CI/CD pipeline migrations. Your task is to translate a TeamCity (Kotlin DSL) configuration into GitHub Actions (YAML) while adhering to best practices for migration and CI/CD optimization. The goal is to ensure a seamless transition while improving maintainability, security, and performance.  

        GOAL:  
        You will convert a given TeamCity (Kotlin DSL) configuration into an equivalent GitHub Actions (YAML) workflow. The migration must follow best practices to maintain efficiency, security, and clarity while preserving the original pipeline's intent.  

        RESPONSE GUIDELINES:  
        Follow these step-by-step migration principles to ensure a smooth transition:  

        1. Map Build Steps Correctly  
        - Identify and migrate equivalent steps from TeamCity to GitHub Actions jobs.  
        - Use GitHub Actions runners and their available environments effectively.  

        2. Maintain Environment Consistency  
        - Ensure the environment variables in TeamCity are properly mapped to secrets or env variables in GitHub Actions.  
        - Replace TeamCity-specific parameters (like `%env.VARIABLE%`) with GitHub's `${{ secrets.VARIABLE }}` or `env.VARIABLE`.  

        3. Optimize Job Execution  
        - Convert sequential TeamCity steps into GitHub Actions job dependencies (`needs:`).  
        - Run parallel jobs when possible to speed up execution.  

        4. Handle Artifact Storage & Dependencies  
        - Migrate TeamCity artifact publishing to GitHub’s `actions/upload-artifact` and `actions/download-artifact`.  
        - Ensure external dependencies are properly cached with `actions/cache` to optimize build times.  

        5. Secrets Management & Authentication  
        - Securely replace hardcoded credentials with GitHub Secrets (`${{ secrets.TOKEN }}`).  
        - Ensure OAuth tokens, SSH keys, or API keys used in TeamCity are mapped properly.  

        6. Adapt Trigger Mechanisms  
        - Convert TeamCity build triggers (e.g., VCS triggers, schedule triggers) into GitHub Action event triggers (`on:`).  
        - Ensure the correct GitHub workflow event (`push`, `pull_request`, `schedule`, etc.) is mapped.  

        7. Error Handling & Debugging  
        - Replace TeamCity failure conditions with GitHub’s `continue-on-error: false` and job `if:` conditions.  
        - Use `fail-fast: true` in matrix jobs to stop execution early if failures occur.  

        8. Logging & Notifications  
        - Convert TeamCity service messages (`teamcity[message ...]`) into GitHub Actions log levels (`echo "::warning"`, `echo "::error"`).  
        - Ensure GitHub Actions logs provide the same level of debugging insights as TeamCity.  

        OUTPUT:  
        - Respond strictly in JSON without explanations.  
        - Provide only the converted GitHub Actions (YAML) code.  
        - Ensure the workflow is fully functional, optimized, and secure.  
    """
    
    try:
        # Call OpenAI API to convert Kotlin to YAML
        response = client.chat.completions.create(
            model="gpt-4o",  # You can change this to a different model if needed
            messages=[
                {"role": "system", "content": sys_prompt},
                {"role": "user", "content": f"Convert this TeamCity Kotlin DSL to GitHub Actions YAML:\n\n{kotlin_code}"}
            ],
            temperature=0.2,  # Lower temperature for more deterministic results
        )
        
        # Extract the converted YAML from the response
        yaml_content = response.choices[0].message.content
        
        # Return the YAML content
        return jsonify({'yaml': yaml_content})
    
    except Exception as e:
        print(f"Error during OpenAI API call: {str(e)}")
        return jsonify({'error': f'Error during conversion: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)