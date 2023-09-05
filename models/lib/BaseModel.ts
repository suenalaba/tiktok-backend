import {
  FindOptions,
  Model,
  QueryOptions,
  InferAttributes,
  InferCreationAttributes,
  Attributes,
  CreationOptional,
  ModelStatic,
  UpdateOptions,
} from 'sequelize';

export abstract class BaseModel<T extends BaseModel<T>> extends Model<
  InferAttributes<T>,
  InferCreationAttributes<T>
> {
  declare id: CreationOptional<string>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  /**
   * Find a single row that matches the query. If no row is found, throws an error.
   * @param options - sequelize find options
   * @returns the found row
   * @throws Error if no row is found
   */
  static async findOrThrow<M extends BaseModel<M>>(
    this: ModelStatic<M>,
    options: FindOptions
  ): Promise<M> {
    const res = (await this.findOne(options)) as M | null;
    if (!res) {
      throw new Error(`${this.name}NotFound`);
    }
    return res;
  }

  /**
   * Find a single row by ID. If no row is found, throws an error.
   * @param id - the ID of the row to find
   * @param options - sequelize find options
   * @returns the found row
   * @throws Error if no row is found
   */
  static async findByPkOrThrow<M extends BaseModel<M>>(
    this: ModelStatic<M>,
    id: string,
    options?: FindOptions
  ): Promise<M> {
    const res = await this.findByPk(id, options);
    if (!res) {
      throw new Error(`${this.name}NotFound`);
    }
    return res as M;
  }

  /**
   * Update a single row by ID and return the updated instance.
   * @param id - the ID of the row to update
   * @param values - the values to update
   * @param queryOptions - sequelize query options
   * @returns the updated instance
   */
  static async updateById<M extends BaseModel<M>>(
    this: ModelStatic<M>,
    id: string,
    values: {
      [key in keyof Attributes<M>]?: Attributes<M>[key];
    },
    queryOptions: QueryOptions = {}
  ) {
    const options = {
      where: {
        id,
      },
      returning: true,
      ...queryOptions,
    };
    const [number, [updatedInstance]] = (await (this as any).updateWithHooks(
      values,
      options
    )) as [number, M[]];
    if (!updatedInstance) {
      throw new Error(
        `Unexpected error: No row was updated in updateById db response ${JSON.stringify(
          { number, updatedInstance }
        )}`
      );
    }
    return updatedInstance;
  }

  /**
   * Same as update(), but will fire sequelize hooks for each row individually.
   * @param values the values to set
   * @param options the sequelize options
   * @returns an array with one or two elements. The first element is always the number of affected rows, while the second element is the actual affected rows (with options.returning true.)
   */
  static async updateWithHooks<M extends BaseModel<M>>(
    this: ModelStatic<M>,
    values: {
      [key in keyof Attributes<M>]?: Attributes<M>[key];
    },
    options: UpdateOptions<Attributes<M>>
  ): Promise<[number, M[]]> {
    return this.update(values, {
      ...options,
      individualHooks: true,
    }) as unknown as Promise<[number, M[]]>;
  }
}
