const express = require('express')
const mongoose = require('mongoose')

const display = (req, res, next) => {
    mongoose.connection.db
        .collection('movieDetails')
        .find({ title: 'Once Upon a Time in the West' })
        .toArray()
        .then(result => {
            res.json(result)
        })
}

module.exports = {
    display: display
}