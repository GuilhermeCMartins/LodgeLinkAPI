import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HotelRoom } from 'src/domain/entities/room/HotelRoom.entity';
import { BadRequestException } from 'src/domain/exceptions/BadRequestException';
import { NotFoundException } from 'src/domain/exceptions/NotFoundException';
import { HotelRoomService } from 'src/domain/services/room/HotelRoom.service';
import { createHotelRoomSchema } from 'src/utils/validations/hotelroom.validation';

@Controller('rooms')
export class HotelRoomController {
    constructor(private readonly hotelRoomService: HotelRoomService) { }

    @Get()
    async findAll(): Promise<HotelRoom[]> {
        return this.hotelRoomService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<HotelRoom> {

        try {
            const hotelRoom = await this.hotelRoomService.findById(id);

            if (!hotelRoom) {
                throw new NotFoundException(`Hotelroom not found by this id: ${id}`)
            }

            return hotelRoom
        } catch (error) {
            throw error
        }



    }

    @Post()
    async create(@Body() hotelRoom: Partial<HotelRoom>): Promise<HotelRoom> {

        try {

            const { error } = createHotelRoomSchema.validate(hotelRoom);

            if (error) {
                throw new BadRequestException(error.message)
            }

            return this.hotelRoomService.save(hotelRoom);
        } catch (error) {
            throw error
        }
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
