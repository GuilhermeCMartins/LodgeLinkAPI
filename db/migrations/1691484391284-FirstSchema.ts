import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstSchema1691484391284 implements MigrationInterface {
    name = 'FirstSchema1691484391284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hotel_room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`pricePerNight\` int NOT NULL, \`capacity\` int NOT NULL, \`isAvailable\` tinyint NOT NULL, \`imageURL\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`checkIn\` datetime NOT NULL, \`checkOut\` datetime NOT NULL, \`userId\` int NULL, \`roomId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_529dceb01ef681127fef04d755d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_ee6959f2cbe32d030b5e58b45d7\` FOREIGN KEY (\`roomId\`) REFERENCES \`hotel_room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_ee6959f2cbe32d030b5e58b45d7\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_529dceb01ef681127fef04d755d\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
        await queryRunner.query(`DROP TABLE \`hotel_room\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
