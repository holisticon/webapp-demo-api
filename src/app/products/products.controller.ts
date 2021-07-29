import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../formats/handler';
import { getProductPath, getProductsBasePath, getProductsRootPath } from '../routing/product.uris';
import { EntityId } from '../store';
import { ProductService } from './product.service';
import { toJsonProduct, toJsonSearchResults } from './products.json';

@Controller(getProductsBasePath())
export class ProductsController {

    constructor(
        private productService: ProductService
    ) { }

    @Get(getProductsRootPath())
    async getSearchResults(
        @Res() response: Response,
        @Query('queryString') queryString: string
    ) {
        const searchResults = await this.productService.searchCatalog(queryString);

        return sendResponse(response, {
            json: toJsonSearchResults(searchResults)
        });
    }

    @Get(getProductPath())
    async getProduct(
        @Res() response: Response,
        @Param('productId') productId: EntityId
    ) {
        const product = await this.productService.getProduct(productId);

        return sendResponse(response, {
            json: toJsonProduct(product)
        });
    }

}
