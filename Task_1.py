def find_total():
    # define the array of the products with default properties
    products = [
        {"name": "Product A", "price": 20, "quantity": 0, "isGiftWrapped": False},
        {"name": "Product B", "price": 40, "quantity": 0, "isGiftWrapped": False},
        {"name": "Product C", "price": 50, "quantity": 0, "isGiftWrapped": False}
    ]

    cartTotal = 0
    TotalQuantity = 0 
    giftWrapFee = 0

    # take inputs from user for each product
    for product in products:
        is_wrapped = False

        # a prompt will be given to enter the input.
        product["quantity"] = int(input(f"Enter quantity for {product['name']}: "))

        # if no input entered or any other input other than "yes" will consider as no.
        if input(f"Is {product['name']} wrapped as a gift? (yes/no): ").lower() == "yes":
            is_wrapped = True

        if is_wrapped:
            giftWrapFee += product["quantity"]

        # calculate and add to total
        cartTotal += product["quantity"] * product["price"]
        TotalQuantity += product["quantity"]

    # Apply discounts
    applicableDiscounts = {
        "flat_10_discount": {},
        "bulk_5_discount": {},
        "bulk_10_discount": {},
        "tiered_50_discount": {}
    }

    # flat_10_discount
    if cartTotal > 200:
        # apply flat 10 dollars discount on total cart amount.
        applicableDiscounts["flat_10_discount"]["name"] = "flat_10_discount"
        applicableDiscounts["flat_10_discount"]["TotalCartCostWithoutDiscount"] = cartTotal
        applicableDiscounts["flat_10_discount"]["TotalCartCost"] = cartTotal - 10

    # bulk_5_discount
    totalCartAmount_5_discount = 0
    for product in products:
        if product["quantity"] > 10:
            # apply 5% discount on this product total amount.
            TotalProductPrice = product["quantity"] * product["price"]
            TotalProductPrice_with_discount = TotalProductPrice - ((TotalProductPrice / 100) * 5)
            totalCartAmount_5_discount += TotalProductPrice_with_discount
        else:
            totalCartAmount_5_discount += product["quantity"] * product["price"]
    applicableDiscounts["bulk_5_discount"]["TotalCartCost"] = totalCartAmount_5_discount
    applicableDiscounts["bulk_5_discount"]["TotalCartCostWithoutDiscount"] = cartTotal
    applicableDiscounts["bulk_5_discount"]["name"] = "bulk_5_discount"

    # bulk_10_discount
    if TotalQuantity > 20:
        # apply 10% discount on total cart amount
        totalCartAmount = cartTotal - ((cartTotal / 100) * 10)
        applicableDiscounts["bulk_10_discount"]["TotalCartCost"] = totalCartAmount
        applicableDiscounts["bulk_10_discount"]["TotalCartCostWithoutDiscount"] = cartTotal
        applicableDiscounts["bulk_10_discount"]["name"] = 'bulk_10_discount'

    # tiered_50_discount
    if TotalQuantity > 30:
        totalCartAmount = 0
        for product in products:
            if product["quantity"] > 15:
                # the first 15 units will have the original price and the units above 15 will get 50% discount
                TotalCost_first_15_units = product["price"] * 15
                balance_units = product["quantity"] - 15
                CostPerUnit_above_15_units = product["price"] / 2
                balance_cost = CostPerUnit_above_15_units * balance_units
                TotalCostOfProduct = TotalCost_first_15_units + balance_cost
                totalCartAmount += TotalCostOfProduct
            else:
                totalCartAmount += product["price"] * product["quantity"]

        applicableDiscounts["tiered_50_discount"]["TotalCartCost"] = totalCartAmount
        applicableDiscounts["tiered_50_discount"]["TotalCartCostWithoutDiscount"] = cartTotal
        applicableDiscounts["tiered_50_discount"]["name"] = 'tiered_50_discount'

    # find Best discount
    BestDiscount = {
        "name": '',
        "DiscountValue": 0,
        "CartCostWithoutDiscount": 0,
        "CartCostWithDiscount": 0
    }

    if applicableDiscounts["flat_10_discount"]["TotalCartCost"]:
        if not BestDiscount["name"]:
            BestDiscount["CartCostWithDiscount"] = applicableDiscounts["flat_10_discount"]["TotalCartCost"]
            BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["flat_10_discount"]["TotalCartCostWithoutDiscount"]
            BestDiscount["name"] = applicableDiscounts["flat_10_discount"]["name"]
            BestDiscount["DiscountValue"] = applicableDiscounts["flat_10_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["flat_10_discount"]["TotalCartCost"]
        else:
            if BestDiscount["CartCostWithDiscount"] > applicableDiscounts["flat_10_discount"]["TotalCartCost"]:
                BestDiscount["CartCostWithDiscount"] = applicableDiscounts["flat_10_discount"]["TotalCartCost"]
                BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["flat_10_discount"]["TotalCartCostWithoutDiscount"]
                BestDiscount["name"] = applicableDiscounts["flat_10_discount"]["name"]
                BestDiscount["DiscountValue"] = applicableDiscounts["flat_10_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["flat_10_discount"]["TotalCartCost"]

    if applicableDiscounts["bulk_5_discount"]["TotalCartCost"]:
        if not BestDiscount["name"]:
            BestDiscount["CartCostWithDiscount"] = applicableDiscounts["bulk_5_discount"]["TotalCartCost"]
            BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["bulk_5_discount"]["TotalCartCostWithoutDiscount"]
            BestDiscount["name"] = applicableDiscounts["bulk_5_discount"]["name"]
            BestDiscount["DiscountValue"] = applicableDiscounts["bulk_5_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["bulk_5_discount"]["TotalCartCost"]
        else:
            if BestDiscount["CartCostWithDiscount"] > applicableDiscounts["bulk_5_discount"]["TotalCartCost"]:
                BestDiscount["CartCostWithDiscount"] = applicableDiscounts["bulk_5_discount"]["TotalCartCost"]
                BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["bulk_5_discount"]["TotalCartCostWithoutDiscount"]
                BestDiscount["name"] = applicableDiscounts["bulk_5_discount"]["name"]
                BestDiscount["DiscountValue"] = applicableDiscounts["bulk_5_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["bulk_5_discount"]["TotalCartCost"]

    if applicableDiscounts["bulk_10_discount"]["TotalCartCost"]:
        if not BestDiscount["name"]:
            BestDiscount["CartCostWithDiscount"] = applicableDiscounts["bulk_10_discount"]["TotalCartCost"]
            BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["bulk_10_discount"]["TotalCartCostWithoutDiscount"]
            BestDiscount["name"] = applicableDiscounts["bulk_10_discount"]["name"]
            BestDiscount["DiscountValue"] = applicableDiscounts["bulk_10_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["bulk_10_discount"]["TotalCartCost"]
        else:
            if BestDiscount["CartCostWithDiscount"] > applicableDiscounts["bulk_10_discount"]["TotalCartCost"]:
                BestDiscount["CartCostWithDiscount"] = applicableDiscounts["bulk_10_discount"]["TotalCartCost"]
                BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["bulk_10_discount"]["TotalCartCostWithoutDiscount"]
                BestDiscount["name"] = applicableDiscounts["bulk_10_discount"]["name"]
                BestDiscount["DiscountValue"] = applicableDiscounts["bulk_10_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["bulk_10_discount"]["TotalCartCost"]

    if applicableDiscounts["tiered_50_discount"]["TotalCartCost"]:
        if not BestDiscount["name"]:
            BestDiscount["CartCostWithDiscount"] = applicableDiscounts["tiered_50_discount"]["TotalCartCost"]
            BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["tiered_50_discount"]["TotalCartCostWithoutDiscount"]
            BestDiscount["name"] = applicableDiscounts["tiered_50_discount"]["name"]
            BestDiscount["DiscountValue"] = applicableDiscounts["tiered_50_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["tiered_50_discount"]["TotalCartCost"]
        else:
            if BestDiscount["CartCostWithDiscount"] > applicableDiscounts["tiered_50_discount"]["TotalCartCost"]:
                BestDiscount["CartCostWithDiscount"] = applicableDiscounts["tiered_50_discount"]["TotalCartCost"]
                BestDiscount["CartCostWithoutDiscount"] = applicableDiscounts["tiered_50_discount"]["TotalCartCostWithoutDiscount"]
                BestDiscount["name"] = applicableDiscounts["tiered_50_discount"]["name"]
                BestDiscount["DiscountValue"] = applicableDiscounts["tiered_50_discount"]["TotalCartCostWithoutDiscount"] - applicableDiscounts["tiered_50_discount"]["TotalCartCost"]

    # Apply shippingCost
    # Shipping fee is calculated based on each product.
    TotalShippingFee = 0
    for product in products:
        shipping_fee_of_each_product = 0
        # round to next higher digit.
        ProductQuantity = -(-product["quantity"] // 10)
        TotalShippingFee += ProductQuantity * 5

    # total amount
    totalAmount = BestDiscount["CartCostWithDiscount"] + TotalShippingFee + giftWrapFee

    # output the final result as Order Summary
    print("\nOrder Summary:")

    for product in products:
        print(f"{product['name']}: {product['quantity']} units - ${product['quantity'] * product['price']:.2f}")

    print(f"Subtotal: ${cartTotal:.2f}")
    print(f"Discount Applied: {BestDiscount['name']}")
    print(f"Discount Amount: {BestDiscount['DiscountValue']:.2f}")
    print(f"Shipping Fee: ${TotalShippingFee:.2f}")
    print(f"Gift Wrap Fee: ${giftWrapFee:.2f}")
    print(f"Total: ${totalAmount:.2f}")


# calling the function to take the input and calculate
find_total()
