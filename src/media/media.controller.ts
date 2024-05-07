import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { MediaService } from './media.service';
import { FileUploadDto, FileDeleteDto } from './dto/media.dto';

@Controller('api/media')
@ApiTags('Media Library')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload File' })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const updatedFile = await this.mediaService.create(file);
    return {
      message: 'File uploaded successfully',
      file: updatedFile,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get file list' })
  @ApiResponse({
    status: 200,
    description: 'File list retrieved successfully.',
  })
  async getList() {
    const files = await this.mediaService.findAll({});
    return files;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  async remove(@Param('id') id: string) {
    const deleted = await this.mediaService.remove(id);
    if (!deleted) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'File deleted successfully' };
  }

  @Delete()
  @ApiOperation({ summary: 'Bulk delete files' })
  @ApiResponse({ status: 200, description: 'Files deleted successfully.' })
  async removeList(@Body() dto: FileDeleteDto) {
    const { ids } = dto;
    if (!ids || ids.length === 0) {
      throw new HttpException(
        'IDs are required for bulk delete',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.mediaService.removeList(ids);
    return { message: 'Files deleted successfully' };
  }
}
