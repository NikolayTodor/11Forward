
import { Module, Global } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { PhotoUploadService } from './services/photo-upload.service';

@Global()
@Module({
  imports: [ConfigModule, AuthModule],
  providers: [PhotoUploadService],
  exports: [ConfigModule, AuthModule, PhotoUploadService],
})
export class CoreModule {}
