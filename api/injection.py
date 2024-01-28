from github import Github, Auth
import requests

def assemble_repo(access_token, name, deps):

    # using an access token
    auth = Auth.Token(access_token)

    # Public Web Github
    g = Github(auth=auth)

    u = g.get_user()

    repo = u.create_repo(name)

    repo.create_file("setup.sh", "Added setup.sh", customize_sh(deps))
    
    with open("testnextautomatic/.devcontainer/devcontainer.json") as fp:
        repo.create_file(".devcontainer/devcontainer.json", "Added .devcontainer", fp.read())

    # The URL for the API request
    url = f"https://api.github.com/repos/Murdock022X/{repo.name}/codespaces"

    print(url)

    g.close()

    # Headers
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {access_token}",
        "X-GitHub-Api-Version": "2022-11-28"
    }

    # Data payload
    data = {
        "ref": "main",
        "machine": "standardLinux32gb"
    }

    print(headers, data)

    # Make the POST request
    response = requests.post(url, headers=headers, json=data)

    print(response)

    return repo.html_url

def customize_sh(deps):
    with open('testnextautomatic/setup.sh') as fp:
        setup = fp.readlines()
    
    custom = []

    i = 0
    for line in setup:
        if i == 6:
            for dep in deps:
                custom.append("npm install {}".format(dep))
                custom.append("\n")
        
        custom.append(line)
        i += 1
    
    return ''.join(custom)
