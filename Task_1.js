// i would recommend https://www.programiz.com/javascript/online-compiler/ this website to run this code. 


function findTotal() {
    // define the array of the products with default properties
    const products = [
        { name: "Product A", price: 20, quantity: 0, isGiftWrapped: false },
        { name: "Product B", price: 40, quantity: 0, isGiftWrapped: false },
        { name: "Product C", price: 50, quantity: 0, isGiftWrapped: false },
    ];

    let cartTotal = 0;
    let TotalQuantity = 0;
    let giftWrapFee = 0;

    // take inputs from user for each products
    products.forEach(product => {
        let isWrapped // this is the flag that is used to check whether the product is wraped or not

        // a prompt will be given to enter the input.
        product.quantity = parseInt(prompt(`Enter quantity for ${product.name}: `));

        // if no input entered or any other input other than "yes" will consider as no.
        if (prompt(`Is ${product.name} wrapped as a gift? (yes/no):`).toLowerCase() === "yes") {
            isWrapped = true;
        }

        if (isWrapped) {
            giftWrapFee += product.quantity;
        }

        // calculate and add to total
        cartTotal += product.quantity * product.price;
        TotalQuantity += product.quantity;
    });


    // Apply discounts
    let applicableDiscounts = {
        flat_10_Discount: {},
        bulk_5_discount: {},
        bulk_10_discount: {},
        tiered_50_discount: {}
    };

    // flat_10_discount
    if (cartTotal > 200) {
        // apply flat 10 dollors dicount on total cart amount.
        applicableDiscounts.flat_10_Discount.name = "flat_10_discount";
        applicableDiscounts.flat_10_Discount.TotalCartCostWithoutDiscount = cartTotal;
        applicableDiscounts.flat_10_Discount.TotalCartCost = cartTotal - 10;
    }

    // bulk_5_discount
    var totalCartAmount_5_discount = 0;
    products.forEach(product => {

        if (product.quantity > 10) {
            // apply 5% discount on this product total amount.
            var TotalProductPrice = product.quantity * product.price;
            var TotalProductPriceWithDiscount = TotalProductPrice - ((TotalProductPrice / 100) * 5);
            totalCartAmount_5_discount += TotalProductPriceWithDiscount;
        } else {
            totalCartAmount_5_discount += product.quantity * product.price;
        }
    });
    applicableDiscounts.bulk_5_discount.TotalCartCost = totalCartAmount_5_discount;
    applicableDiscounts.bulk_5_discount.TotalCartCostWithoutDiscount = cartTotal;
    applicableDiscounts.bulk_5_discount.name = "bulk_5_discount";


    // bulk_10_discount
    if (TotalQuantity > 20) {
        // apply 10% discount on total cart amount
        var totalCartAmount = cartTotal - ((cartTotal / 100) * 10);
        applicableDiscounts.bulk_10_discount.TotalCartCost = totalCartAmount;
        applicableDiscounts.bulk_10_discount.TotalCartCostWithoutDiscount = cartTotal;
        applicableDiscounts.bulk_10_discount.name = 'bulk_10_discount';
    }

    // tiered_50_discount
    if (TotalQuantity > 30) {
        var totalCartAmount = 0;

        products.forEach(product => {
            if (product.quantity > 15) {
                // the first 15 units will have the original price and the units above 15 will get 50% discount
                var TotalCost_first_15_units = product.price * 15;
                var Balance_Units = product.quantity - 15;
                var CostPerUnit_above_15_units = product.price / 2;
                var Balance_Cost = CostPerUnit_above_15_units * Balance_Units;
                var TotalCostOfProduct = TotalCost_first_15_units + Balance_Cost;
                totalCartAmount += TotalCostOfProduct;
            } else {
                totalCartAmount += product.price * product.quantity;
            }
        })

        applicableDiscounts.tiered_50_discount.TotalCartCost = totalCartAmount;
        applicableDiscounts.tiered_50_discount.TotalCartCostWithoutDiscount = cartTotal;
        applicableDiscounts.tiered_50_discount.name = 'tiered_50_discount';
    }

    // find Best discount
    // console.log("applicableDiscounts: ", applicableDiscounts);
    var BestDiscount = {
        name: '',
        DiscountValue: 0,
        CartCostWithoutDiscount: 0,
        CartCostWithDiscount: 0
    };

    if (applicableDiscounts.flat_10_Discount.TotalCartCost) {
        if (!BestDiscount.name) {
            BestDiscount.CartCostWithDiscount = applicableDiscounts.flat_10_Discount.TotalCartCost;
            BestDiscount.CartCostWithoutDiscount = applicableDiscounts.flat_10_Discount.TotalCartCostWithoutDiscount;
            BestDiscount.name = applicableDiscounts.flat_10_Discount.name;
            BestDiscount.DiscountValue = applicableDiscounts.flat_10_Discount.TotalCartCostWithoutDiscount - applicableDiscounts.flat_10_Discount.TotalCartCost;
        } else {
            if (BestDiscount.CartCostWithDiscount > applicableDiscounts.flat_10_Discount.TotalCartCost) {
                BestDiscount.CartCostWithDiscount = applicableDiscounts.flat_10_Discount.TotalCartCost;
                BestDiscount.CartCostWithoutDiscount = applicableDiscounts.flat_10_Discount.TotalCartCostWithoutDiscount;
                BestDiscount.name = applicableDiscounts.flat_10_Discount.name;
                BestDiscount.DiscountValue = applicableDiscounts.flat_10_Discount.TotalCartCostWithoutDiscount - applicableDiscounts.flat_10_Discount.TotalCartCost;
            }
        }
    }

    if (applicableDiscounts.bulk_5_discount.TotalCartCost) {
        if (!BestDiscount.name) {
            BestDiscount.CartCostWithDiscount = applicableDiscounts.bulk_5_discount.TotalCartCost;
            BestDiscount.CartCostWithoutDiscount = applicableDiscounts.bulk_5_discount.TotalCartCostWithoutDiscount;
            BestDiscount.name = applicableDiscounts.bulk_5_discount.name;
            BestDiscount.DiscountValue = applicableDiscounts.bulk_5_discount.TotalCartCostWithoutDiscount - applicableDiscounts.bulk_5_discount.TotalCartCost;
        } else {
            if (BestDiscount.CartCostWithDiscount > applicableDiscounts.bulk_5_discount.TotalCartCost) {
                BestDiscount.CartCostWithDiscount = applicableDiscounts.bulk_5_discount.TotalCartCost;
                BestDiscount.CartCostWithoutDiscount = applicableDiscounts.bulk_5_discount.TotalCartCostWithoutDiscount;
                BestDiscount.name = applicableDiscounts.bulk_5_discount.name;
                BestDiscount.DiscountValue = applicableDiscounts.bulk_5_discount.TotalCartCostWithoutDiscount - applicableDiscounts.bulk_5_discount.TotalCartCost;
            }
        }
    }

    if (applicableDiscounts.bulk_10_discount.TotalCartCost) {
        if (!BestDiscount.name) {
            BestDiscount.CartCostWithDiscount = applicableDiscounts.bulk_10_discount.TotalCartCost;
            BestDiscount.CartCostWithoutDiscount = applicableDiscounts.bulk_10_discount.TotalCartCostWithoutDiscount;
            BestDiscount.name = applicableDiscounts.bulk_10_discount.name;
            BestDiscount.DiscountValue = applicableDiscounts.bulk_10_discount.TotalCartCostWithoutDiscount - applicableDiscounts.bulk_10_discount.TotalCartCost;
        } else {
            if (BestDiscount.CartCostWithDiscount > applicableDiscounts.bulk_10_discount.TotalCartCost) {
                BestDiscount.CartCostWithDiscount = applicableDiscounts.bulk_10_discount.TotalCartCost;
                BestDiscount.CartCostWithoutDiscount = applicableDiscounts.bulk_10_discount.TotalCartCostWithoutDiscount;
                BestDiscount.name = applicableDiscounts.bulk_10_discount.name;
                BestDiscount.DiscountValue = applicableDiscounts.bulk_10_discount.TotalCartCostWithoutDiscount - applicableDiscounts.bulk_10_discount.TotalCartCost;
            }
        }
    }

    if (applicableDiscounts.tiered_50_discount.TotalCartCost) {
        if (!BestDiscount.name) {
            BestDiscount.CartCostWithDiscount = applicableDiscounts.tiered_50_discount.TotalCartCost;
            BestDiscount.CartCostWithoutDiscount = applicableDiscounts.tiered_50_discount.TotalCartCostWithoutDiscount;
            BestDiscount.name = applicableDiscounts.tiered_50_discount.name;
            BestDiscount.DiscountValue = applicableDiscounts.tiered_50_discount.TotalCartCostWithoutDiscount - applicableDiscounts.tiered_50_discount.TotalCartCost;
        } else {
            if (BestDiscount.CartCostWithDiscount > applicableDiscounts.tiered_50_discount.TotalCartCost) {
                BestDiscount.CartCostWithDiscount = applicableDiscounts.tiered_50_discount.TotalCartCost;
                BestDiscount.CartCostWithoutDiscount = applicableDiscounts.tiered_50_discount.TotalCartCostWithoutDiscount;
                BestDiscount.name = applicableDiscounts.tiered_50_discount.name;
                BestDiscount.DiscountValue = applicableDiscounts.tiered_50_discount.TotalCartCostWithoutDiscount - applicableDiscounts.tiered_50_discount.TotalCartCost;
            }
        }
    }



    // Apply shippingCost
    // Shipping fee is calculated baesd on each product. 
    var TotalShippingFee = 0;
    products.forEach(product => {
        var ShippingFeeOfEachProduct = 0;
        // round to next heigher digit.
        var ProductQuantity = Math.ceil(product.quantity / 10);
        // console.log(`Shipping of ${product.name} : with quantity: ${product.quantity} is:  ${ProductQuantity * 5}`);
        TotalShippingFee = TotalShippingFee + ProductQuantity * 5;
    })


    // total amount
    const totalAmount = BestDiscount.CartCostWithDiscount + TotalShippingFee + giftWrapFee;

    // output the final result as Order Summary
    console.log("\nOrder Summary:");

    products.forEach(product => {
        console.log(`${product.name}: ${product.quantity} units - $${(product.quantity * product.price).toFixed(2)}`);
    })

    console.log(`Subtotal: $${cartTotal.toFixed(2)}`);
    console.log(`Discount Applied: ${BestDiscount.name}`);
    console.log(`Discount Amount: ${BestDiscount.DiscountValue}`);
    console.log(`Shipping Fee: $${TotalShippingFee.toFixed(2)}`);
    console.log(`Gift Wrap Fee: $${giftWrapFee.toFixed(2)}`);
    console.log(`Total: $${totalAmount.toFixed(2)}`);
}


// call the function to take the input and calculate
findTotal()