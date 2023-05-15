import { Controller, Get, Post, Delete, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

const API_KEY = '*****';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(@Req() request: Request) {
    return this.appService.getHello();
  }
}
