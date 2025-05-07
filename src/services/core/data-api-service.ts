// DONT CHANGE THIS FILE

import axios, { AxiosRequestConfig } from "axios";

namespace DataAPIService {
  export const DATA_API_URLS = {
    findOne: `${process.env.MONGO_DATA_API_BASE_URL}/findOne`,
    findMany: `${process.env.MONGO_DATA_API_BASE_URL}/find`,
    insertOne: `${process.env.MONGO_DATA_API_BASE_URL}/insertOne`,
    insertMany: `${process.env.MONGO_DATA_API_BASE_URL}/insertMany`,
    updateOne: `${process.env.MONGO_DATA_API_BASE_URL}/updateOne`,
    updateMany: `${process.env.MONGO_DATA_API_BASE_URL}/updateMany`,
    deleteOne: `${process.env.MONGO_DATA_API_BASE_URL}/deleteOne`,
    deleteMany: `${process.env.MONGO_DATA_API_BASE_URL}/deleteMany`,
    aggregate: `${process.env.MONGO_DATA_API_BASE_URL}/aggregate`,
  };

  export function findOne<T>(collection: string, id: string): Promise<T | null>;

  export function findOne<T>(
    collection: string,
    filter: Partial<T>
  ): Promise<T | null>;

  export async function findOne<T>(
    collection: string,
    arg2: string | Partial<T>
  ): Promise<T | null> {
    let filter: string | object;

    if (typeof arg2 === "string") {
      filter = { _id: { $oid: arg2 } };
    } else {
      filter = arg2;
    }

    const res = await post(DATA_API_URLS.findOne, { collection, filter });
    const data = res.document as T | null;

    return data;
  }

  export const findMany = async <T>(
    collection: string,
    filter: object = {}
  ): Promise<T[] | null> => {
    const body = { collection: collection, filter: filter };

    const res = await post(DATA_API_URLS.findMany, body);

    if (res.documents.length == 0) return null;

    const data = res.documents as T[];

    return data;
  };

  export const insertOne = async <T>(
    collection: string,
    document: T
  ): Promise<string> => {
    const body = {
      collection: collection,
      document: document,
    };

    const res = await post(DATA_API_URLS.insertOne, body);

    const insertedId = res.insertedId as string;

    return insertedId;
  };

  export const inserMany = async <T>(
    collection: string,
    documents: [T]
  ): Promise<string[]> => {
    const body = {
      collection: collection,
      documents: documents,
    };

    const res = await post(DATA_API_URLS.insertMany, body);

    const insertedIds = res.insertedIds as string[];

    return insertedIds;
  };

  export const updateOne = async <T>(
    collection: string,
    id: string,
    updatedFields: Partial<T>
  ): Promise<boolean> => {
    const body = {
      collection: collection,
      filter: {
        _id: {
          $oid: id,
        },
      },
      update: {
        $set: updatedFields,
      },
    };

    const res = await post(DATA_API_URLS.updateOne, body);

    const modifiedCount = res.modifiedCount as number;
    console.log(modifiedCount);
    return modifiedCount == 1;
  };

  /**
   * This function updates multiple documents
   * @param {string} collection - Name of the collection
   * @param {string} field - The field name to match
   * @param {T} updates - An object with field(s) and updated fieldValue(s)
   * @returns {numbr} - The number of updated documents
   */

  export const updateMany = async <T>(
    collection: string,
    field: string,
    fieldValue: any,
    updates: Partial<T>
  ): Promise<number> => {
    const matcher: { [key: string]: any } = {};
    matcher[field] = fieldValue;

    const body = {
      collection: collection,
      filter: matcher,
      update: {
        $set: updates,
      },
    };

    const res = await post(DATA_API_URLS.updateMany, body);

    const modifiedCount = res.modifiedCount as number;
    return modifiedCount;
  };

  export const deleteOne = async <T>(
    collection: string,
    id: string
  ): Promise<boolean> => {
    const body = {
      collection: collection,
      filter: {
        _id: {
          $oid: id,
        },
      },
    };

    const res = await post(DATA_API_URLS.deleteOne, body);

    const deletedCount = res.deletedCount as number;

    return deletedCount == 1;
  };

  /**
   * This function deletes multiple documents
   * @param {string} collection - Name of the collection
   * @param {string} field - The field name to match
   * @param {any} fieldValue - Documents with field: fieldValue will be matched and be deleted
   * @returns {number} - The number of deleted documents
   */

  // field: , fieldValue:
  // returns count of deleted documents
  export const deleteMany = async <T>(
    collection: string,
    field: string,
    fieldValue: any
  ): Promise<number> => {
    const matcher: { [key: string]: any } = {};
    matcher[field] = fieldValue;

    const body = {
      collection: collection,
      filter: matcher,
    };

    const res = await post(DATA_API_URLS.deleteMany, body);

    const deletedCount = res.deletedCount as number;
    return deletedCount;
  };

  export const aggregate = async <T>(
    collection: string,
    pipeline: object[]
  ): Promise<[T]> => {
    const body = {
      collection: collection,
      pipeline: pipeline,
    };

    const res = await post(DATA_API_URLS.aggregate, body);

    const documents = res.documents as [T];

    return documents;
  };

  const post = async (url: string, body: Object): Promise<any> => {
    const DATA_SOURCE = process.env.MONGO_DATA_SOURCE; // Mongodb datasource name
    const DATABASE = process.env.MONGO_DATABASE; // Database name

    const finalBody = { dataSource: DATA_SOURCE, database: DATABASE, ...body };

    const headers = {
      "Content-Type": "application/ejson",
      Accept: "application/json",
      apiKey: process.env.MONGO_API_KEY,
    };

    try {
      const response = await axios.post(url, finalBody, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default DataAPIService;
