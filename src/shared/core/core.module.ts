import { EnvService } from '@/shared/env/env.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IApplicationBootstrapOptions } from '../utils/utility.types';

@Module({})
export class CoreModule {
  static forRoot(options: IApplicationBootstrapOptions): DynamicModule {
    const imports: DynamicModule[] = this.resolveImports(options);

    return {
      module: CoreModule,
      imports: imports,
    };
  }

  private static resolveImports(options: IApplicationBootstrapOptions): DynamicModule[] {
    const imports: DynamicModule[] = [];

    if (options.driver === 'prisma') {
      throw new Error('Prisma driver is not supported yet');
    }

    if (options.driver === 'typeorm') {
      throw new Error('TypeORM driver is not supported yet');
    }
    return imports;
  }
}
