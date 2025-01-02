const {artistsDB, usersDB, albumsDB, tracksDB, favouritesDB} = require('../data-access');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const secretKey=config.jwt_token;
// user related usecases
const makeUserSignUp = require('./user-signup');
const userSignUp = makeUserSignUp({usersDB, uuidv4, bcrypt});

const makeUserLogin = require('./user-login');
const userLogin = makeUserLogin({usersDB, bcrypt, jwt, secretKey})

const makeLogoutUser = require('./user-logout');
const userLogout = makeLogoutUser({jwt, secretKey}); 

const makeGetUsers = require('./get-all-users');
const getAllUsers = makeGetUsers({usersDB, jwt, secretKey});

const makeAddUser = require('./add-user');
const addUser = makeAddUser({usersDB, jwt, secretKey, uuidv4, bcrypt});

const makeDeleteUser = require('./delete-user');
const deleteUser = makeDeleteUser({usersDB,jwt,secretKey});

const makeUserPasswordUpdate = require('./update-user-password');
const updatePassword = makeUserPasswordUpdate({usersDB,jwt, secretKey, bcrypt});

// artist related usecases
const makeAddArtist = require('./add-artist');
const addArtist= makeAddArtist({artistsDB,uuidv4, jwt, secretKey});

const makeGetArtists = require('./get-artists');
const getArtists = makeGetArtists({artistsDB, jwt, secretKey});

const makeGetArtistById = require('./get-artist-by-id');
const getArtistById = makeGetArtistById({artistsDB,jwt,secretKey});

const makeUpdateArtistById =  require('./update-artists');
const updateArtists = makeUpdateArtistById({artistsDB,jwt,secretKey});

const makeDeleteArtistById = require('./delete-artists');
const deleteArtists =makeDeleteArtistById({artistsDB, jwt, secretKey});

// album related usecases
const makeAddAlbum = require('./add-album');
const addAlbum = makeAddAlbum({albumsDB, jwt, secretKey, artistsDB, uuidv4});

const makeGetAlbums = require('./get-albums');
const getAlbums = makeGetAlbums({albumsDB, jwt, secretKey, artistsDB});

const makeGetAlbumById = require('./get-album-by-id');
const getAlbumById = makeGetAlbumById({albumsDB,jwt,secretKey});

const makeUpdateAlbumById = require('./update-album');
const updateAlbum = makeUpdateAlbumById({albumsDB, jwt, secretKey});

const makeDeleteAlbum = require('./delete-album');
const deleteAlbum = makeDeleteAlbum({albumsDB, jwt, secretKey});

// tracks related uescases

const makeAddTrack = require('./add-track');
const addTrack = makeAddTrack({tracksDB,artistsDB, albumsDB,jwt,secretKey, uuidv4});

const makeGetTracks = require('./get-tracks');
const getTracks = makeGetTracks({tracksDB, jwt, secretKey});

const makeGetTrack = require('./get-track-by-id');
const getTrackById = makeGetTrack({tracksDB, jwt,secretKey});

const makeUpdateTrack = require('./update-track');
const updateTrack = makeUpdateTrack({tracksDB, jwt, secretKey});

const makeDeleteTrack = require('./delete-track');
const deleteTrack = makeDeleteTrack({tracksDB, jwt, secretKey});

const makeAddFavorite = require('./add-favourite');
const addFavourite = makeAddFavorite({artistsDB, albumsDB, tracksDB, favouritesDB, uuidv4, secretKey, jwt});

const makeRemoveFavorite = require('./delete-favourite');
const removeFavourite = makeRemoveFavorite({favouritesDB, secretKey, jwt});

const makeGetFavorites = require('./get-favourites');
const getFavourites = makeGetFavorites({favouritesDB});


module.exports ={
    userSignUp,
    userLogin,
    userLogout,
    getAllUsers,
    addUser,
    deleteUser,
    updatePassword,
    addArtist,
    getArtists,
    getArtistById,
    updateArtists,
    deleteArtists,
    addAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    addTrack,
    getTracks,
    makeGetTrack,
    getTrackById,
    updateTrack,
    deleteTrack,
    addFavourite,
    removeFavourite,
    getFavourites,
}