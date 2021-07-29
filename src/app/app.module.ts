import { Module } from '@nestjs/common';
import { OrdersModule } from './orders';
import { ProductsModule } from './products';
import { ShoppingCartModule } from './shopping-cart';
import { UserProfileModule } from './user-profile';

@Module({
    imports: [
        OrdersModule,
        ProductsModule,
        ShoppingCartModule,
        UserProfileModule
    ]
})
export class AppModule { }
