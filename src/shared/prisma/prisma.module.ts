import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}
