import { Model } from 'mongoose';

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filterQuery, populate, sort = { createdAt: 'desc' }, projection = null, options = null) {
    return await this._addPopulate(
      this.model
        .find({
          ...filterQuery,
          deletedAt: null,
        })
        .sort(sort)
        .select(projection)
        .setOptions(options),
      populate,
    );
  }

  async findAllIncludeDeleted(filterQuery, populate = [], sort = { createdAt: 'desc' }) {
    return await this._addPopulate(this.model.find(filterQuery).sort(sort), populate, true);
  }

  async findAllDeleted(filterQuery, populate = []) {
    return await this._addPopulate(
      this.model.find({
        ...filterQuery,
        deletedAt: { $ne: null },
      }),
      populate,
    );
  }

  async findOne(filterQuery, populate = []) {
    const query = { ...filterQuery, deletedAt: null };
    return await this._addPopulate(this.model.findOne(query), populate);
  }

  async findById(id, populate = []) {
    const query = {
      _id: id,
      deletedAt: null,
    };
    return (await this._addPopulate(this.model.findOne(query), populate)).toObject();
  }
  async findByUserId(id, populate = []) {
    const query = {
      userId: id,
      deletedAt: null,
    };
    return (await this._addPopulate(this.model.findOne(query), populate)).toObject();
  }

  async findByIds(ids, populate = []) {
    return await this.findAll({ _id: { $in: ids } }, populate);
  }

  async findByIdIncludeDelete(id, populate = []) {
    return await this._addPopulate(this.model.findOne({ _id: id }), populate);
  }

  async paginate(params) {
    const { pagination, populates, searchBy = [] } = params;
    const { size, page, sortBy = 'createdAt', sortType = 'desc', text, isDelete, ...rest } = pagination;
    const conditions = { ...rest };

    if (text && searchBy.length > 0) {
      conditions['$or'] = searchBy.map((key) =>
        !isNaN(Number(text)) ? { [key]: Number(text) } : { [key]: { $regex: new RegExp(text.toString(), 'i') } },
      );
    }
    Object.keys(rest).length > 0 &&
      Object.keys(rest).forEach((key) => {
        conditions[key] = Array.isArray(rest[key]) ? { $in: rest[key] } : rest[key];
      });

    const query = this._addPopulate(
      this.model
        .find(conditions)
        .select('-password')
        .skip((Number(page) - 1) * Number(size))
        .limit(Number(size))
        .sort({ [sortBy]: sortType === 'desc' ? -1 : 1 }),
      populates,
      isDelete,
    );

    const [data, total] = await Promise.all([query, this.model.countDocuments(conditions)]);
    return { data, total: total, currentPage: page, size };
  }

  async create(payload, session) {
    const _createModel = async (data, session) => {
      const document = new this.model(data);
      await document.save({ session });
      return document;
    };

    if (session) {
      try {
        return await _createModel(payload, session);
      } catch (error) {
        throw error;
      }
    }

    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _createModel(payload, sessionLocal);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  async createMany(payload, session) {
    const _createModels = async (data, session) => {
      if (Array.isArray(data)) {
        const models = data.map((item) => new this.model(item));
        const document = await this.model.insertMany(models, {
          session,
        });
        return document;
      }
    };

    if (session) {
      try {
        return await _createModels(payload, session);
      } catch (error) {
        throw error;
      }
    }

    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _createModels(payload, sessionLocal);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  async update(id, payload, session) {
    const _updateModel = async (id, data, session) => {
      return await this.model.findByIdAndUpdate(id, data, {
        new: true,
        session,
      });
    };

    if (session) {
      try {
        return await _updateModel(id, payload, session);
      } catch (error) {
        throw error;
      }
    }

    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _updateModel(id, payload, sessionLocal);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  async insertOrUpdate(filterQuery, payload, session) {
    const _insertOrUpdateModel = async (filterQuery, data, session) => {
      return await this.model.findOneAndUpdate(
        filterQuery,
        { $set: data },
        {
          new: true,
          session,
          upsert: true,
        },
      );
    };

    if (session) {
      return await _insertOrUpdateModel(filterQuery, payload, session);
    }

    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _insertOrUpdateModel(filterQuery, payload, sessionLocal);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  async updateByFilter(filterQuery, payload, session) {
    const _updateMany = async (filterQuery, data, session) => {
      return await this.model.updateMany(filterQuery, data, {
        new: true,
        session,
      });
    };

    if (session) {
      try {
        return await _updateMany(filterQuery, payload, session);
      } catch (error) {
        throw error;
      }
    }

    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _updateMany(filterQuery, payload, sessionLocal);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  async remove(id, session) {
    const _removeModel = async (id, session) => {
      return await this.model.findByIdAndRemove(id, { session });
    };

    if (session) {
      try {
        return await _removeModel(id, session);
      } catch (error) {
        throw error;
      }
    }

    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _removeModel(id, sessionLocal);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  async softDelete(id, session) {
    const data = { deletedAt: new Date() };
    return await this.update(id, data, session);
  }

  async restore(id, session) {
    const data = { deletedAt: null };
    return await this.update(id, data, session);
  }

  async updateMany(payload, session) {
    const _updateMany = async (payload, session) =>
      await Promise.all(
        payload.map(async (item) => {
          const { _id, ...rest } = item;
          const record = await this.findById(_id);
          if (record) {
            return this.update(_id, item, session);
          }
          return this.create(rest, session);
        }),
      );
    if (session) {
      return await _updateMany(payload, session);
    }
    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _updateMany(payload, session);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  async removeByFilter(filterQuery, session) {
    const _deleteMany = async (filterQuery, session) => {
      return await this.model.deleteMany(filterQuery, { session });
    };
    if (session) {
      try {
        return await _deleteMany(filterQuery, session);
      } catch (error) {
        throw error;
      }
    }
    const sessionLocal = await this.model.db.startSession();
    try {
      sessionLocal.startTransaction();
      const data = await _deleteMany(filterQuery, sessionLocal);
      await sessionLocal.commitTransaction();
      return data;
    } catch (error) {
      await sessionLocal.abortTransaction();
      throw error;
    } finally {
      sessionLocal.endSession();
    }
  }

  _addPopulate(query, populate, includingSoftDelete = false) {
    if (populate && populate.length) {
      populate.forEach((item) => {
        const itemTransform = includingSoftDelete
          ? this._addPopulateIncludeSoftDelete(item)
          : this._addPopulateSoftDelete(item);
        query = query.populate(itemTransform);
      });
    }
    return query;
  }

  _addPopulateSoftDelete(item) {
    let tmp = {};
    if (typeof item === 'string') {
      tmp.path = item;
      tmp.match = { deletedAt: null };
    } else {
      tmp = { ...item };
      tmp.match = { deletedAt: null, ...tmp.match };
      if (item.populate) {
        if (Array.isArray(item.populate)) {
          tmp.populate = item.populate.map((val) => this._addPopulateSoftDelete(val));
        } else {
          tmp.populate = this._addPopulateSoftDelete(item.populate);
        }
      }
    }
    return tmp;
  }

  _addPopulateIncludeSoftDelete(item) {
    let tmp = {};
    if (typeof item === 'string') {
      tmp.path = item;
    } else {
      tmp = { ...item };
      tmp.match = { ...tmp.match };
      if (item.populate) {
        if (Array.isArray(item.populate)) {
          tmp.populate = item.populate.map((val) => this._addPopulateIncludeSoftDelete(val));
        } else {
          tmp.populate = this._addPopulateIncludeSoftDelete(item.populate);
        }
      }
    }
    return tmp;
  }
}

export default BaseRepository;
