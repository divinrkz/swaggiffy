// import { registerDefinition } from './helpers/registerDefinition';
// // import { Schema } from './decorators/Schema';
import { registerSchema } from './helpers/registerSchema';

const { Swaggiffy } = require('./Swaggiffy');
const mongoose = require('mongoose');
const { Sequelize, DataTypes } = require('sequelize');
const { Schema } = require('mongoose');
const express = require('express');
const { registerDefinition } = require('./helpers/registerDefinition');
const app = express();

const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
    },
);

registerSchema('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.UUIDV4
    },
    obj1: {
        type: DataTypes.STRING.BINARY
    },
    obj2: {
        type: DataTypes.TEXT
    },
    obj3: {
        type: DataTypes.TEXT('tiny')
    },
    obj4: {
        type: DataTypes.CITEXT
    },
    obj5: {
        type: DataTypes.TSVECTOR
    },
    obj6: {
        type: DataTypes.BOOLEAN
    },
    obj7: {
        type: DataTypes.INTEGER
    },
    obj8: {
        type: DataTypes.BIGINT
    },
    obj9: {
        type: DataTypes.BIGINT(11)
    },
    obj10: {
        type: DataTypes.FLOAT
    },
    obj11: {
        type: DataTypes.FLOAT(11) 
    },
    obj12: {
        type: DataTypes.REAL 
    },
    obj13: {
        type: DataTypes.DOUBLE 
    },
    obj14: {
        type: DataTypes.DECIMAL 
    },
    obj15: {
        type: DataTypes.DATE 
    },
    obj16: {
        type: DataTypes.DATEONLY 
    },
    OBJ17: {
        type: DataTypes.UUID
    }
}, {orm: 'sequelize'});

new Swaggiffy().setupExpress(app).setupPort(5008).swaggiffy();
