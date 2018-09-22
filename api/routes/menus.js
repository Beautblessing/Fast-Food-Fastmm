const express = require('express');

const router = express.Router();

// import menus from ('../models/menu');
//  const menus = require('../menu/menu');
// import menu from './menu/menu';

// dummy array to hold menus
const menu = [
    {
        id: 1,
        foodItemName: 'Chicken pizza',
        itemDesc: 'served with a bottle of yoghout',
        itemAmount: 2000,
    },
];

// get all menus
router.get('/', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'menus retrieved successfully',
        menu,
    });
});

// get a menu from menuCategories
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    menu.map((menuToFind) => {
        if (menuToFind.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'menu retrieved successfully',
                menuToFind,
            });
        }
        return false;
    });
    return res.status(404).send({
        success: 'false',
        message: 'menu does not exist',
    });
});

// add a new menuCategories from menu
router.post('/', (req, res) => {
    if (!req.body.foodItemName) {
        return res.status(400).send({
            success: 'false',
            message: 'food item name is required',
        });
    } if (!req.body.itemDesc) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required',
        });
    } if (!req.body.itemAmount) {
        return res.status(400).send({
            success: 'false',
            message: 'price of item is required',
        });
    }
    const menus = {
        id: menu.length + 1,
        foodItemName: req.body.foodItemName,
        itemDesc: req.body.itemDesc,
        itemAmount: req.body.itemAmount,
    };

    menu.push(menus);
    // console.log(req.body);
    return res.status(201).send({
        success: 'true',
        message: 'menu added successfully',
        menu,
    });
});

// update a menuCategories in menu
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let idFound;
    let itemIndex;
    menu.map((itemToUpdate, index) => {
        if (itemToUpdate.id === id) {
            idFound = itemToUpdate;
            itemIndex = index;
        }
        return true;
    });

    if (!idFound) {
        return res.status(404).send({
            success: 'false',
            message: 'id not found',
        });
    }

    if (!req.body.foodItemName) {
        return res.status(400).send({
            success: 'false',
            message: 'Item Name is required',
        });
    } if (!req.body.itemAmount) {
        return res.status(400).send({
            success: 'false',
            message: 'item Amount is required',
        });
    }

    const updatedItem = {
        id: idFound.id,
        foodItemName: req.body.foodItemName || idFound.foodItemName,
        itemDesc: req.body.itemDesc || idFound.itemDesc,
        itemAmount: req.body.itemAmount || idFound.itemAmount,
    };

    menu.splice(itemIndex, 1, updatedItem);

    return res.status(201).send({
        success: 'true',
        message: 'item updated successfully',
        updatedItem,
    });
});


// delete a menuCategories from list
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let itemToFind;
    let itemIndex;
    menu.map((menus, index) => {
        if (menus.id === id) {
            itemToFind = menus;
            itemIndex = index;
        }
        return true;
    });

    if (!itemToFind) {
        return res.status(404).send({
            success: 'false',
            message: 'menus not found',
        });
    }
    menu.splice(itemIndex, 1);

    return res.status(200).send({
        success: 'true',
        message: 'menus deleted successfuly',
    });
});


module.exports = router;
