module.exports = {
    "options": {
        "Promise": Promise,
        "followRedirects": false,
        "headers": {}
    },
    "user": "testUser",
    "repo": "testRepo",
    "token": "testToken",
    "labels": {
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
    }
};
