import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HotelRoom } from 'src/domain/entities/room/HotelRoom.entity';
import { HotelRoomService } from 'src/domain/services/room/HotelRoom.service';

@Controller('rooms')
export class HotelRoomController {
    constructor(private readonly hotelRoomService: HotelRoomService) { }

    @Get()
    async findAll(): Promise<HotelRoom[]> {
        return this.hotelRoomService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<HotelRoom> {
        return this.hotelRoomService.findById(id);
    }

    @Post()
    async create(@Body() hotelRoom: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.hotelRoomService.save(hotelRoom);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() hotelRoom: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.hotelRoomService.update(id, hotelRoom);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.hotelRoomService.delete(id);
    }
}
