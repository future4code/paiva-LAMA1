
export class Band {
    constructor(
        private id: string,
        private name: string,
        private genre: string,
        private responsible: string
    ) {}

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getGenre(): string {
        return this.genre
    }

    public getResponsible(): string {
        return this.responsible
    }


    public setName(name: string) {
        this.name = name
    }

    public setGenre(genre: string) {
        this.genre = genre
    }

    public setResponsible(responsible: string) {
        this.responsible = responsible
    }


    public static toBandModel(band?: any): Band | undefined {
        return (band && new Band(
            band.id,
            band.name,
            band.genre || band.music_genre,
            band.responsible
        ))
    }
}

export interface BandInputDTO {
    name: string,
    genre: string,
    responsible: string
}