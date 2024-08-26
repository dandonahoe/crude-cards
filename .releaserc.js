module.exports = {
    repositoryUrl: "https://github.com/ConstructWorks/cards.git",
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

                // Disable default rules for commit types
                { type: "feat", release: true },
                { type: "fix", release: true },
                { type: "perf", release: false },
                { type: "docs", release: false },
                { type: "style", release: false },
                { type: "refactor", release: false },
                { type: "test", release: false },
                { type: "build", release: false },
                { type: "ci", release: false },
                { type: "chore", release: false },
                { type: "revert", release: false }
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
