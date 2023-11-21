import { Module } from '@nestjs/common';
import { GlobalClientModule } from './client.module';
import { MemberModule } from './member/member.module';
import { StoreModule } from './store/store.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [GlobalClientModule, MemberModule, StoreModule, NotifyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
