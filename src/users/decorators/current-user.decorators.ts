import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// coustom decorator
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //   this giving the request comming to the app
    const requset = context.switchToHttp().getRequest();
    return requset.currentUser;
  },
);
