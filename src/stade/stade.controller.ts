import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StadeService } from './stade.service';
import { CreateStadeDto } from './dto/create-stade.dto';
import { UpdateStadeDto } from './dto/update-stade.dto';

@Controller('stade')
export class StadeController {
  constructor(private readonly stadeService: StadeService) {}

  @Post()
  create(@Body() createStadeDto: CreateStadeDto) {
    return this.stadeService.create(createStadeDto);
  }

  @Get()
  findAll() {
    return this.stadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadeDto: UpdateStadeDto) {
    return this.stadeService.update(+id, updateStadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadeService.remove(+id);
  }
}
