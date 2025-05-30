import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidateUserPipe } from './validate-user.pipe';
import { CombineIdBodyMiddleware } from 'src/middleware/merge-param-body.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ValidateUserPipe],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CombineIdBodyMiddleware).forRoutes('user/:id');
  }
}
