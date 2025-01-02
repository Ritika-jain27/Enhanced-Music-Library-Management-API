const formatResponse = require('../utilities/format-response').formatResponse;
const usecases = require('../use-cases');

const makeUserSignUp = require('./user-signup');
const userSignUp = makeUserSignUp({formatResponse, userSignUp: usecases.userSignUp})

const makeUserLogin = require('./user-login');
const userLogin = makeUserLogin({formatResponse,userLogin:usecases.userLogin});

const makeUserLogout = require('./user-logout');
const userLogout = makeUserLogout({formatResponse, logoutUser:usecases.userLogout});

const makeGetAllUsers = require('./get-all-users');
const getAllUsers = makeGetAllUsers({formatResponse,getAllUsers : usecases.getAllUsers});

const makeAddUserController = require('./add-user');
const addUser = makeAddUserController({formatResponse, addUser:usecases.addUser});

const makeDeleteUserController = require('./delete-user');
const deleteUser = makeDeleteUserController({formatResponse,deleteUser: usecases.deleteUser});

const makeUpdatePasswordController = require('./update-user-password');
const updatePassword = makeUpdatePasswordController({formatResponse, updatePassword:usecases.updatePassword});

const makeAddArtistController = require('./add-artist');
const addArtist = makeAddArtistController({formatResponse, addArtist:usecases.addArtist});

const makeGetArtists = require('./get-artists');
const getArtists = makeGetArtists({formatResponse, getAllArtists:usecases.getArtists});

const makeGetArtistByIdController = require('./get-artist-by-id');
const getArtistById = makeGetArtistByIdController({formatResponse, getArtistById: usecases.getArtistById});

const  makeUpdateArtistByIdController= require('./update-artists');
const updateArtists = makeUpdateArtistByIdController({formatResponse, updateArtistById:usecases.updateArtists});

const makeDeleteArtistByIdController = require('./delete-artists');
const deleteArtists = makeDeleteArtistByIdController({formatResponse, deleteArtistById:usecases.deleteArtists});

const makeAddAlbumController = require('./add-album');
const addAlbum = makeAddAlbumController({formatResponse, addAlbum:usecases.addAlbum});

const makeGetAlbums = require('./get-albums');
const getAlbums = makeGetAlbums({formatResponse, getAllAlbums:usecases.getAlbums});

const makeGetAlbumController  = require('./get-album-by-id');
const getAlbumById = makeGetAlbumController({formatResponse, getAlbumById:usecases.getAlbumById});

const makeUpdateAlbumController = require('./update-album');
const updateAlbum = makeUpdateAlbumController({formatResponse, updateAlbumById:usecases.updateAlbum});

const makeDeleteAlbumController = require('./delete-album');
const deleteAlbum = makeDeleteAlbumController({formatResponse, deleteAlbum:usecases.deleteAlbum});

const makeAddTrackController = require('./add-track');
const addTrack  = makeAddTrackController({formatResponse,addTrack:usecases.addTrack});

const makeGetTracksController = require('./get-tracks');
const getTracks = makeGetTracksController({formatResponse, getTracks:usecases.getTracks});

const makeGetTrackController = require('./get-track-by-id');
const getTrackById = makeGetTrackController({formatResponse, getTrack:usecases.getTrackById});

const makeUpdateTrackController = require('./update-track');
const updatetrack = makeUpdateTrackController({formatResponse, updateTrack:usecases.updateTrack});

const makeDeleteTrackController = require('./delete-track');
const deleteTrack = makeDeleteTrackController({formatResponse, deleteTrack:usecases.deleteTrack});

const makeAddFavoriteController = require('./add-favourite');
const addFavorite = makeAddFavoriteController({formatResponse, addFavorite:usecases.addFavourite});

const makeRemoveFavoriteController = require('./delete-favourite');
const removeFavorite = makeRemoveFavoriteController({removeFavorite:usecases.removeFavourite, formatResponse});

const makeGetFavoritesController = require('./get-favourites');
const getFavourites = makeGetFavoritesController({formatResponse, getFavorites:usecases.getFavourites});

module.exports = {
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
    getTrackById,
    updatetrack,
    deleteTrack,
    addFavorite,
    removeFavorite,
    getFavourites,
}