import json
from flask import Flask, request, jsonify
from injection import assemble_repo
from flask_cors import CORS, cross_origin

api = Flask(__name__)

api_cors_config = {
    "origins": ['http://localhost:3000'],
    "methods": ['OPTIONS', 'GET', 'POST'],
    "allow_headers": ["Authorization", "Content-Type"]
}

cors = CORS(api, resources={
    r"/*": api_cors_config
})

@api.route('/')
#@cross_origin()
def index():
    return json.dumps({'name': 'alice',
                       'email': 'alice@outlook.com'})

@api.route('/frameworks')
#@cross_origin()
def frameworks():
    with open('form_data.json') as fp:
        form_data = json.load(fp)

    return jsonify(form_data['frameworks'])

@api.route('/dependencies/<framework>')
#@cross_origin()
def dependencies(framework):
    with open('form_data.json') as fp:
        form_data = json.load(fp)

    deps = []

    for dep in form_data['dependencies'][framework]:
        deps.append({"name": dep['name'], "category": dep['category']})

    return jsonify(deps)

@api.route('/create', methods=["POST"])
#@cross_origin()
def create():
    req = request.get_json()

    print(req)

    name, deps, ac_token = req['repo_name'], req['deps'], req['access_token']

    repo_url = assemble_repo(ac_token, name, deps)

    return jsonify({"status": "success", "repo_url": repo_url})

if __name__ == "__main__":
    api.run(host='0.0.0.0', debug=True)