import { EnvService } from '@/shared/env/env.service';
import { DynamicModule, Module } from '@nestjs/common';
import { IApplicationBootstrapOptions } from '../utils/utility.types';
import { PrismaModule } from '../prisma/prisma.module';

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
    const imports: any[] = [];

    if (options.driver === 'prisma') {
      imports.push(PrismaModule.register());
    }

    if (options.driver === 'typeorm') {
      throw new Error('TypeORM driver is not supported yet');
    }
    return imports;
  }
}
