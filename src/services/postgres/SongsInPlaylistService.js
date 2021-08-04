const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class SongsInPlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async addSongToPlaylist(songId, playlistId) {
    const id = `songPlaylist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs_in_playlist VALUES($1, $2, $3) RETURNING id',
      values: [id, songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Failed to add the song to the playlist');
    }

    return result.rows[0].id;
  }

  async getSongsInPlaylist(playlistId) {
    const query = {
      text: `
      SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN songs_in_playlist 
      ON songs_in_playlist.song_id = songs.id WHERE songs_in_playlist.playlist_id = $1
      `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async deleteSongFromPlaylist(songId, playlistId) {
    const query = {
      text: 'DELETE FROM songs_in_playlist WHERE song_id = $1 AND playlist_id = $2 RETURNING id',
      values: [songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete the song in the playlist');
    }
  }

  async verifySongInPlaylist(songId, playlistId) {
    const query = {
      text: 'SELECT * FROM songs_in_playlist WHERE song_id = $1 AND playlist_id = $2',
      values: [songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to verify the song in the playlist');
    }
  }
}

module.exports = SongsInPlaylistService;
