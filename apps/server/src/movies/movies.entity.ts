import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string

    @Column({ name: 'original_title' })
    originalTitle: string

    @Column({type: 'text'})
    description: string

    @Column({ type: 'text', nullable: true })
    tagline: string

    @Column({ type: 'decimal', precision: 10, scale: 2, default:0  })
    popularity: number

    @Column({ type: 'int', default: 0 })
    voteCount: number

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    voteAverage: number

    @Column({ type: 'date' })
    releaseDate: Date

    @Column({ type: 'int' })
    duration: number

    @Column()
    status: string

    @Column()
    language: string

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    budget: number

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    revenue: number

    @Column({ type: 'varchar', array: true, default: []})
    genres: string[]

    @Column({ nullable: true })
    coverImageUrl: string

    @Column({ nullable: true })
    trailerUrl: string

    @Column({ default: false })
    notified: string
}