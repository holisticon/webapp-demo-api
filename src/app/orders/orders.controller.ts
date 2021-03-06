import { Body, Controller, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from '../formats/handler';
import { getAddressUri, getOrderPath, getOrdersBasePath, getOrdersRootPath, getOrderUri, getPaymentOptionUri, getShoppingCartItemUri } from '../routing';
import { EntityId } from '../store';
import { OrderService } from './order.service';
import { toJsonOrder, toJsonOrderHistory } from './orders.json';

@Controller(getOrdersBasePath())
export class OrdersController {

    constructor(
        private orderService: OrderService
    ) { }

    @Get(getOrdersRootPath())
    async getOrderHistory(
        @Res() response: Response
    ) {
        const orderHistory = await this.orderService.getOrderHistory();

        return sendResponse(response, {
            json: toJsonOrderHistory(orderHistory)
        });
    }

    @Post(getOrdersRootPath())
    async placeOrder(
        @Res() response: Response,
        @Req() request: Request,
        @Body('shoppingCartItems') shoppingCartItems: EntityId[],
        @Body('billingAddress') billingAddress: EntityId,
        @Body('shippingAddress') shippingAddress: EntityId,
        @Body('payment') payment: EntityId
    ) {
        const shoppingCartItemIds = shoppingCartItems.map(item => item.replace(new RegExp(getShoppingCartItemUri('(.*)')), '$1') as EntityId);
        const billingAddressId = billingAddress.replace(new RegExp(getAddressUri('(.*)')), '$1');
        const shippingAddressId = shippingAddress.replace(new RegExp(getAddressUri('(.*)')), '$1');
        const paymentId = payment.replace(new RegExp(getPaymentOptionUri('(.*)')), '$1');

        const orderId = await this.orderService.placeOrder({
            shoppingCartItems: shoppingCartItemIds,
            billingAddress: billingAddressId,
            shippingAddress: shippingAddressId,
            payment: paymentId
        });

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getOrderUri(orderId));
    }

    @Get(getOrderPath())
    async getOrder(
        @Res() response: Response,
        @Param('orderId') orderId: EntityId,
    ) {
        const order = await this.orderService.getOrder(orderId);

        return sendResponse(response, {
            json: toJsonOrder(order)
        });
    }

    @Patch(getOrderPath())
    async cancelOrder(
        @Res() response: Response,
        @Param('orderId') orderId: EntityId,
        @Body('cancellationReason') cancellationReason: string,
    ) {
        await this.orderService.cancelOrder(orderId, cancellationReason);

        return response.redirect(303, getOrderUri(orderId))
    }
}
