import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEMBER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'NOTIFY_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'STORE_SERVICE',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GlobalClientModule {}
