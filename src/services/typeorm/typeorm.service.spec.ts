import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.service';

describe('TypeOrmConfig', () => {
  it('should have the correct configuration', () => {
    const expectedConfig: TypeOrmModuleOptions = {
      type: 'mysql',
      host: 't4j.h.filess.io',
      port: 3307,
      username: 'bancoSntndr_frozenever',
      password: 'a0e05ae3a84c0ce27bf8fc736242cdabd02b2084',
      database: 'bancoSntndr_frozenever',
      entities: expect.any(Array),
      synchronize: true,
    };

    expect(typeOrmConfig).toMatchObject(expectedConfig);
  });
});

