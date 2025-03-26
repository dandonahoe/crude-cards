module.exports = {
    repositoryUrl: "https://github.com/dandonahoe/crude-cards.git",
    branches: [
        { name: "dev" },
        { name: "main" }
    ],
    plugins: [
        ["@semantic-release/commit-analyzer", {
            preset: 'angular',
            releaseRules: [
                { scope: "dev", release: "patch" },
                { scope: "main", release: "minor" },

                // Set most commit types to patch
                { type: "feat", release: "patch" },
                { type: "fix", release: "patch" },
                { type: "perf", release: "patch" },
                { type: "docs", release: "patch" },
                { type: "style", release: "patch" },
                { type: "refactor", release: "patch" },
                { type: "test", release: "patch" },
                { type: "build", release: "patch" },
                { type: "ci", release: "patch" },
                { type: "chore", release: "patch" },
                { type: "revert", release: "patch" }
            ]
        }],
        ["@semantic-release/release-notes-generator", {
            preset: 'angular',
            writerOpts: {
                commitsSort: ['subject', 'scope']
            }
        }],

        ["@semantic-release/changelog", {
            changelogFile: "CHANGELOG.md"
        }],

        ["@semantic-release/npm", {
            npmPublish: false
        }],

        ["@semantic-release/git", {
            assets: [
                "CHANGELOG.md",
                "package.json",
                "package-lock.json",
                "artifact/**/*"
            ],
            message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }]
    ]
};
