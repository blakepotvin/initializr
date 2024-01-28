import json
from flask import Flask, request, jsonify
from injection import assemble_repo

api = Flask(__name__)

@api.route('/')
def index():
    return json.dumps({'name': 'alice',
                       'email': 'alice@outlook.com'})

@api.route('/frameworks')
def frameworks():
    with open('form_data.json') as fp:
        form_data = json.load(fp)

    return jsonify(form_data['frameworks'])

@api.route('/dependencies/<framework>')
def dependencies(framework):
    with open('form_data.json') as fp:
        form_data = json.load(fp)

    deps = []

    for dep in form_data['dependencies'][framework]:
        deps.append({"name": dep['name'], "category": dep['category']})

    return jsonify(deps)

@api.route('/create', methods=["POST"])
def create():
    req = request.get_json()

    name, deps, ac_token = req['repo_name'], req['deps'], req['access_token']

    repo_url = assemble_repo(ac_token, name, deps)

    return jsonify({"status": "success", "repo_url": repo_url})

if __name__ == "__main__":
    api.run(debug=True)