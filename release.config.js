module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [{
        type: 'docs',
        release: 'patch',
      }, {
        type: 'chore',
        release: 'patch',
      },
      {
        type: 'refactor',
        release: 'patch',
      },
      {
        type: 'style',
        release: 'patch',
      },
      ],
    }],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', {
      npmPublish: true,
      pkgRoot: '.',
      tarball: false,
    }],
    ['@semantic-release/git', {
      assets: [
        'dist',
        'docs',
        'package.json',
        'package-lock.json',
      ],
      // eslint-disable-next-line
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
  ],
};
