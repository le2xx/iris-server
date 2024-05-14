import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RssList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
