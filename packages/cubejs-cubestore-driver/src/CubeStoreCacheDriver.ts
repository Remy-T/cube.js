import { createCancelablePromise, MaybeCancelablePromise } from '@cubejs-backend/shared';
import { CacheDriverInterface } from '@cubejs-backend/base-driver';

import { CubeStoreDriver } from './CubeStoreDriver';

interface CubeStoreCacheDriverOptions {}

export class CubeStoreCacheDriver implements CacheDriverInterface {
  protected readonly connection: CubeStoreDriver;

  public constructor(options: CubeStoreCacheDriverOptions) {
    this.connection = new CubeStoreDriver({});
  }

  public withLock = (
    key: string,
    cb: () => MaybeCancelablePromise<any>,
    expiration: number = 60,
    freeAfter: boolean = true,
  ) => createCancelablePromise(async (tkn) => {
    // const client = await this.getClient();
    //
    // try {
    //   if (tkn.isCanceled()) {
    //     return false;
    //   }
    //
    //   const response = await client.setAsync(
    //     key,
    //     '1',
    //     // Only set the key if it does not already exist.
    //     'NX',
    //     'EX',
    //     expiration
    //   );
    //
    //   if (response === 'OK') {
    //     try {
    //       await tkn.with(cb());
    //     } finally {
    //       if (freeAfter) {
    //         await client.delAsync(key);
    //       }
    //     }
    //
    //     return true;
    //   }
    //
    //   return false;
    // } finally {
    //   this.redisPool.release(client);
    // }

    throw new Error('Unimplemented withLock');
  });

  public async get(key: string) {
    return this.connection.query(`CACHE GET "${key}"`, []);
  }

  public async set(key: string, value, expiration) {
    const strValue = JSON.stringify(value);
    await this.connection.query(`CACHE SET TTL ${expiration} ? ?`, [key, strValue]);

    return {
      key,
      bytes: Buffer.byteLength(strValue),
    };
  }

  public async remove(key: string) {
    await this.connection.query(`CACHE REMOVE "${key}"`, []);
  }

  // @ts-ignore
  public async keysStartingWith(prefix: string) {
    // const client = await this.getClient();
    //
    // try {
    //   return await client.keysAsync(`${prefix}*`);
    // } finally {
    //   this.redisPool.release(client);
    // }

    throw new Error('Unimplemented keysStartingWith');

    return [];
  }

  public async cleanup(): Promise<void> {
    //
  }

  public async testConnection(): Promise<void> {
    // const client = await this.getClient();
    //
    // try {
    //   await client.ping();
    // } finally {
    //   this.redisPool.release(client);
    // }

    throw new Error('Unimplemented testConnection');
  }
}