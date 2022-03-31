const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const nftSchema = new Schema({
  // Some NFT information
});

const NFT = model('NFT', nftSchema);

module.exports = NFT;
