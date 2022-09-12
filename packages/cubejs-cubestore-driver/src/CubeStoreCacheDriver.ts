import { createCancelablePromise, MaybeCancelablePromise } from '@cubejs-backend/shared';
import { CacheDriverInterface } from '@cubejs-backend/base-driver';

import { CubeStoreDriver } from './CubeStoreDriver';

interface CubeStoreCacheDriverOptions {}

export class CubeStoreCacheDriver implements CacheDriverInterface {
  protected readonly connection: CubeStoreDriver;

  public constructor(options: CubeStoreCacheDriverOptions) {
    this.connection = new CubeStoreDriver({});
  }

  // protected async getClient() {
  //   return this.connection.getClient();
  // }

  public async get(key: string) {
    // const client = await this.getClient();
    //
    // try {
    //   const res = await client.getAsync(key);
    //   return res && JSON.parse(res);
    // } finally {
    //   this.redisPool.release(client);
    // }

    throw new Error('Unimplemented');
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

    throw new Error('Unimplemented');
  });

  // @ts-ignore
  public async set(key: string, value, expiration) {
    // const client = await this.getClient();
    //
    // try {
    //   const strValue = JSON.stringify(value);
    //   await client.setAsync(key, strValue, 'EX', expiration);
    //   return {
    //     key,
    //     bytes: Buffer.byteLength(strValue),
    //   };
    // } finally {
    //   this.redisPool.release(client);
    // }

    throw new Error('Unimplemented');
  }

  // @ts-ignore
  public async remove(key: string) {
    // const client = await this.getClient();
    //
    // try {
    //   return await client.delAsync(key);
    // } finally {
    //   this.redisPool.release(client);
    // }

    throw new Error('Unimplemented');
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

    throw new Error('Unimplemented');
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

    throw new Error('Unimplemented');
  }
}
