

export class CreateCategoryDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
        const { name, available } = object
        let availableBoolean = available;

        if (!name) return ['Falta el nombre'];
        if (typeof available !== 'boolean') {
            availableBoolean = (available === 'true')
        }

        return [, new CreateCategoryDto(name, availableBoolean)]

    }

}