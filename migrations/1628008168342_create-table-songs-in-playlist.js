/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs_in_playlist', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    song_id: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    playlist_id: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
  });

  pgm.addConstraint('songs_in_playlist', 'unique_song_id_and_playlist_id', 'UNIQUE(song_id, playlist_id)');

  pgm.addConstraint('songs_in_playlist', 'fk_songs_in_playlist.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
  pgm.addConstraint('songs_in_playlist', 'fk_songs_in_playlist.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('songs_in_playlist');
};
