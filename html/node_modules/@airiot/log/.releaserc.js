const package = require('./package.json')
const group = package.iotGroup || 'front'
const repo = package.name
const tagName = package.tagName

module.exports = {
  "branches": [
    'master','version/v+([0-9])'
  ],
  "tagFormat": tagName ? tagName + "-v${version}" : "v${version}",
  "plugins": [
    ["@semantic-release/commit-analyzer", {
      "preset": "angular",
      "releaseRules": [
        { type: 'breaking', release: 'major' },
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' }
      ]
    }],
    ["@semantic-release/release-notes-generator", {
      "preset": "angular",
      "linkCompare": false,
      "linkReferences": false
    }],
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "./node_modules/.bin/airiot build && ./node_modules/.bin/airiot pack"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json",
          "CHANGELOG.md"
        ],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    [
      "@gtiot/semantic-release-qiniu",
      {
        "host": "https://d.airiot.cn/",
        "assets": [
          {
            "path": "package.tgz",
            "key": `${group}/${repo}/${repo.replace('/', '_')}-<%= nextRelease.version %>.tgz`,
            "name": "package.tgz"
          }
        ]
      }
    ],
    [
      "@gtiot/semantic-release-airiot",
      {
        "group": group,
        "repoName": package.name,
        "draft": true
      }
    ]
  ]
}