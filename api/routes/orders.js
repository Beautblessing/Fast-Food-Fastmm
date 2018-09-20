const express = require("express");

const router = express.Router();


let order = [
    {
        id: 1,
        foodItemName: "Chicken pizza",
        itemAmount: 2000,
        itemQuantity: 1,
        nameOfCustomer: "Bunmi Thomas",
        email: "bubu@yahoo.com",
        phone: "09087654367",
        address: "ushafa",
        orderStatus: "completed",
        date: "2018-09-15",
        paymentType: "Cash/POS"
    }
];

//get all orders
router.get("/", (req, res) => {

    res.status(200).send({
        success: "true",
        message: "order retrieved successfully",
        order: order
    });
});


//get a specific order from orders
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    order.map((itemToFind) => {
        if (itemToFind.id === id) {
            return res.status(200).send({
                success: "true",
                message: "order retrieved successfully",
                itemToFind,
            });
        }
    });

    return res.status(404).send({
        success: "false",
        message: "such order does not exist",
    });
});

//post a new order

router.post("/", (req, res) => {
    if(!req.body.foodItemName) {
        return res.status(400).send({
            success: "false",
            message: "food item name is required"
        });

    } else if(!req.body.itemAmount) {
        return res.status(400).send({
            success: "false",
            message: "price of item is required"
        });
    } else if(!req.body.itemQuantity) {
        return res.status(400).send({
            success: "false",
            message: "quantity of item is required"
        });
    } else if(!req.body.nameOfCustomer) {
        return res.status(400).send({
            success: "false",
            message: "name of customer is required"
        });
    // } else if(!req.body.email) {
    //     return res.status(400).send({
    //         success: "false",
    //         message: "price of item is required"
    //     });
    } else if(!req.body.phone) {
        return res.status(400).send({
            success: "false",
            message: "phone number is required"
        });
    } else if(!req.body.address) {
        return res.status(400).send({
            success: "false",
            message: "delivery address is required"
        });
    } else if(!req.body.date) {
        return res.status(400).send({
            success: "false",
            message: "delivery date is required"
        });
    } else if(!req.body.paymentType) {
        return res.status(400).send({
            success: "false",
            message: "mode of payment is required"
        });
    }
    const  orders = {
        id: order.length + 1,
        foodItemName: req.body.foodItemName,
        itemAmount: req.body.itemAmount,
        itemQuantity: req.body.itemQuantity,
        nameOfCustomer: req.body.nameOfCustomer,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        orderStatus: "Processing",
        date: req.body.date,
        paymentType:req.body.paymentType

    };

    order.push(orders);
    //console.log(req.body);
    return  res.status(201).send({
        success: "true",
        message: "order added successfully",
        order: order
    });
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //         error: err
    //     });
    // });
});

//update an order status
router.put("/:id",(req, res) => {
    const id = parseInt(req.params.id, 10);
    let idFound;
    let orderIndex;
    order.map((orderToUpdate, index) => {
        if (orderToUpdate.id === id) {
            idFound = orderToUpdate;
            orderIndex = index;
        }
    });

    if (!idFound) {
        return res.status(404).send({
            success: "false",
            message: "id not found",
        });
    }

    if (!req.body.orderStatus) {
        return res.status(400).send({
            success: "false",
            message: "Order Status is required",
        });

    }

    const updatedOrder = {
        id: idFound.id,
        foodItemName: idFound.foodItemName,
        itemAmount: idFound.itemAmount,
        itemQuantity: idFound.itemQuantity,
        nameOfCustomer: idFound.nameOfCustomer,
        email: idFound.email,
        phone: idFound.phone,
        address: idFound.address,
        paymentType: idFound.paymentType,
        orderStatus: req.body.orderStatus || idFound.orderStatus,
        date: idFound.date

    };

    order.splice(orderIndex, 1, updatedOrder);

    return res.status(201).send({
        success: "true",
        message: "item updated successfully",
        updatedOrder,
    });
});




module.exports=router;
