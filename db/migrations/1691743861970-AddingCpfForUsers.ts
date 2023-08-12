import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCpfForUsers1691743861970 implements MigrationInterface {
    name = 'AddingCpfForUsers1691743861970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cpf\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_a6235b5ef0939d8deaad755fc8\` (\`cpf\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_a6235b5ef0939d8deaad755fc8\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cpf\``);
    }

}
