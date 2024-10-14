from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Remplacez par votre clé d'API Perspective
PERSPECTIVE_API_KEY = 'YOUR_API_KEY'

@app.route('/analyze', methods=['POST'])
def analyze_comment():
    comment = request.json.get('comment', '')
    if not comment:
        return jsonify({'error': 'No comment provided'}), 400

    # Appel à l'API Perspective
    url = f"https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key={PERSPECTIVE_API_KEY}"
    data = {
        'comment': {'text': comment},
        'languages': ['fr'],
        'requestedAttributes': {'TOXICITY': {}}
    }
    response = requests.post(url, json=data)
    analysis = response.json()

    toxicity_score = analysis['attributeScores']['TOXICITY']['summaryScore']['value']
    return jsonify({'toxicity_score': toxicity_score})

if __name__ == '__main__':
    app.run(debug=True)
