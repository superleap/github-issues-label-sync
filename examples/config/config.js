let config = {
    "github": {
        "user": "superleap",
        "repo": "github-issues-label-sync",
        "token": process.env.GH_TOKEN,
        "options": {
            "debug": true
        }
    },
    "categories": [
        {
            "name": "GH Review",
            "labels": [
                {
                    "name": "accepted",
                    "color": "009800"
                },
                {
                    "name": "breaking changes",
                    "color": "a33cd6"
                },
                {
                    "name": "needs-revision",
                    "color": "e11d21"
                },
                {
                    "name": "on hold",
                    "color": "bfdadc"
                },
                {
                    "name": "review-needed",
                    "color": "fbca04"
                },
                {
                    "name": "shipped",
                    "color": "d4c5f9"
                }
            ]
        },
        {
            "name": "Resolution",
            "labels": [
                {
                    "name": "duplicate",
                    "color": "ccc"
                },
                {
                    "name": "invalid",
                    "color": "e6e6e6"
                },
                {
                    "name": "unresolved",
                    "color": "fef2c0"
                },
                {
                    "name": "wontfix",
                    "color": "fff"
                }
            ]
        },
        {
            "name": "Semver",
            "labels": [
                {
                    "name": "exempt",
                    "color": "1d76db"
                },
                {
                    "name": "major",
                    "color": "b60205"
                },
                {
                    "name": "minor",
                    "color": "fbca04"
                },
                {
                    "name": "patch",
                    "color": "0e8a16"
                },
                {
                    "name": "premajor",
                    "color": "e99695"
                }
            ]
        },
        {
            "name": "Status",
            "labels": [
                {
                    "name": "new",
                    "color": "006b75"
                },
                {
                    "name": "reverted",
                    "color": "d93f0b"
                },
                {
                    "name": "unconfirmed",
                    "color": "d4c5f9"
                }
            ]
        },
        {
            "name": "Type",
            "labels": [
                {
                    "name": "bug",
                    "color": "fc2929"
                },
                {
                    "name": "enhancement",
                    "color": "84b6eb"
                },
                {
                    "name": "feature-request",
                    "color": "c7def8"
                },
                {
                    "name": "question",
                    "color": "cc317c"
                },
                {
                    "name": "regression",
                    "color": "e11d21"
                }
            ]
        }
    ]
};

module.exports = config;
