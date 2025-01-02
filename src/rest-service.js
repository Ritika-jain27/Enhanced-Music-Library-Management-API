const express = require('express');
const router = express.Router();
const controllers = require('./controllers');
const { authMiddleware } = require('./middleware');

function init() {
    userRoutes();
    artistRoute();
    albumsRoute();
    tracksRoute();
    favorites();
}

function userRoutes() {
    router.get('/', (req, res) => {
        res.status(200).json({ message: "API is connected" });
    });
    router.post(`/signup`, controllers.userSignUp);
    router.post(`/login`, controllers.userLogin);
    router.get('/logout', authMiddleware, controllers.userLogout);
    router.get(`/users`, authMiddleware, controllers.getAllUsers)
    router.post(`/users/add-user`, authMiddleware, controllers.addUser);
    router.delete('/users/:id', authMiddleware, controllers.deleteUser);
    router.put(`/users/update-password`, authMiddleware, controllers.updatePassword);
}

function artistRoute() {

    router.post(`/artists/add-artist`, authMiddleware, controllers.addArtist);
    router.get(`/artists`, authMiddleware, controllers.getArtists);
    router.get(`/artists/:artist_id`, authMiddleware, controllers.getArtistById);
    router.put(`/artists/:id`, authMiddleware, controllers.updateArtists);
    router.delete(`/artists/:id`, authMiddleware, controllers.deleteArtists);
}

function albumsRoute() {
    router.post('/albums/add-album', authMiddleware, controllers.addAlbum);
    router.get(`/albums`, authMiddleware, controllers.getAlbums);
    router.get(`/albums/:id`, authMiddleware, controllers.getAlbumById);
    router.put(`/albums/:id`, authMiddleware, controllers.updateAlbum);
    router.delete(`/albums/:id`, authMiddleware, controllers.deleteAlbum);
}

function tracksRoute() {
    router.post('/tracks/add-track', authMiddleware, controllers.addTrack);
    router.get(`/tracks`, authMiddleware, controllers.getTracks);
    router.get(`/tracks/:track_id`, authMiddleware, controllers.getTrackById);
    router.put(`/tracks/:track_id`, authMiddleware, controllers.updatetrack);
    router.delete(`/tracks/:track_id`, authMiddleware, controllers.deleteTrack);
}

function favorites() {
    router.post('/favorites/add-favorite', authMiddleware, controllers.addFavorite);
    router.get(`/favorites/:category`, authMiddleware, controllers.getFavourites);
    router.delete(`/favorites/remove-favorite/:favorite_id`, authMiddleware, controllers.removeFavorite);
}

init();
module.exports = router;
