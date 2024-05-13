import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RssTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
