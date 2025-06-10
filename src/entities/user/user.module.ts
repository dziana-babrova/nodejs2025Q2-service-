import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidateUserPipe, ValidateUserUpdatePipe } from './validate-user.pipe';
import { CombineIdBodyMiddleware } from 'src/middleware/merge-param-body.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ValidateUserUpdatePipe, ValidateUserPipe],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CombineIdBodyMiddleware)
      .forRoutes({ path: 'user/:id', method: RequestMethod.PUT });
  }
}
