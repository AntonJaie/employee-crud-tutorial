import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './interfaces/employee.interface';
import { CreateEmployeeDTO } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<Employee> {
    const employee = await new this.employeeModel(createEmployeeDTO);
    return employee.save();
  }
  async getAllEmployee(): Promise<Employee[]> {
    const employees = await this.employeeModel.find().exec();
    return employees;
  }

  async getEmployee(employeeId): Promise<Employee> {
    const employee = await this.employeeModel.findById(employeeId);
    return employee;
  }

  async updateEmployee(
    employeeId,
    createEmployeeDTO: CreateEmployeeDTO,
  ): Promise<Employee> {
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
      employeeId,
      createEmployeeDTO,
      { new: true },
    );
    return updatedEmployee;
  }

  async deleteEmployee(employeeId): Promise<any> {
    const deletedCustomer = await this.employeeModel.findByIdAndRemove(
      employeeId,
    );
    return deletedCustomer;
  }
}
