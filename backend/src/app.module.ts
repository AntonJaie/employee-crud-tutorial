import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import "dotenv/config";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI,
    {
      useNewUrlParser: true
    }), EmployeeModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
