import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingPromotionOnHotelRoom1691746409050 implements MigrationInterface {
    name = 'AddingPromotionOnHotelRoom1691746409050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hotel_room\` ADD \`onPromotion\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hotel_room\` DROP COLUMN \`onPromotion\``);
    }

}
