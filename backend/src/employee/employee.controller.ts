import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { create } from 'domain';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('/create')
  async addEmployee(
    @Res() response,
    @Body() createEmployeeDTO: CreateEmployeeDTO,
  ) {
    const employee = await this.employeeService.addEmployee(createEmployeeDTO);
    return response.status(HttpStatus.OK).json({
      message: 'Employee has been created successfully',
      employee,
    });
  }

  @Get('/employees')
  async getAllEmployees(@Res() response) {
    const employees = await this.employeeService.getAllEmployee();
    return response.status(HttpStatus.OK).json(employees);
  }

  @Get('employee/:employeeId')
  async getEmployee(@Res() response, @Param('employeeId') employeeId) {
    const employee = await this.employeeService.getEmployee(employeeId);

    if (!employee) {
      throw new NotFoundException('Employee does not exists!');
    }

    return response.status(HttpStatus.OK).json(employee);
  }

  @Put('/update')
  async updateEmployee(
    @Res() response,
    @Query('employeeId') employeeId,
    @Body() createEmployeeDTO,
  ) {
    const employee = await this.employeeService.updateEmployee(
      employeeId,
      createEmployeeDTO,
    );
    if (!employee) {
      throw new NotFoundException('Employee does not exists!');
    }

    return response.status(HttpStatus.OK).json({
      message: 'Employee has been updated successfully!',
      employee,
    });
  }

  @Delete('/delete')
  async deleteEmployee(@Res() response, @Query('employeeId') employeeId) {
    const employee = await this.employeeService.deleteEmployee(employeeId);

    if (!employee) {
      throw new NotFoundException('Employee does not exists!');
    }

    return response.status(HttpStatus.OK).json({
      message: 'Employee has been successfully deleted',
      employee,
    });
  }
}
