let mocks = {
    "Label": {
        "setters": {
            "createdLabel": {
                "name": "TEST GH Review: accepted",
                "color": "009800",
                "status": "success"
            },
            "updatedLabel": {
                "name": "TEST GH Review: accepted",
                "color": "000",
                "status": "success"
            },
            "deletedLabel": {
                "name": "TEST GH Review: accepted",
                "color": "000",
                "status": "success"
            }
        },
        "getLabels": [
            {
                "url": 'https://api.github.com/repos/superleap/github-issues-label-sync/labels/Semver:%20premajor',
                "name": 'Semver: premajor',
                "color": 'e99695'
            },
            {
                "url": 'https://api.github.com/repos/superleap/github-issues-label-sync/labels/Type:%20feature-request',
                "name": 'Type: feature-request',
                "color": 'c7def8'
            }
        ]
    },
    "Error": {
        "Unauthorized": {
            "code": 401,
            "status": 'Unauthorized',
            "message": '{"message":"Bad credentials","documentation_url":"https://developer.github.com/v3"}'
        }
    }
};

mocks.Label.getLabels.meta = {
    'x-ratelimit-limit': '5000',
    'x-ratelimit-remaining': '4995',
    'x-ratelimit-reset': '1470247853',
    'x-oauth-scopes': 'admin:gpg_key, admin:org, admin:org_hook, admin:public_key, admin:repo_hook, delete_repo, gist, notifications, repo, user',
    link: '<https://api.github.com/repositories/62481389/labels?access_token=f77d5f4a01e2a745b092ea281a8d2b8e63087b8a&page=2>; rel="next", <https://api.github.com/repositories/62481389/labels?access_token=f77d5f4a01e2a745b092ea281a8d2b8e63087b8a&page=2>; rel="last"',
    etag: '"bfc5008b7bcf38ddc25ac34f44152479"',
    status: '200 OK'
};

export default mocks;
