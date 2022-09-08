use super::{
    BaseRocksSecondaryIndex, CacheItem, IndexId, RocksSecondaryIndex, RocksTable, TableId,
};
use crate::metastore::{IdRow, MetaStoreEvent};
use crate::rocks_table_impl;
use crate::table::Row;
use crate::{base_rocks_secondary_index, CubeError};
use byteorder::{BigEndian, WriteBytesExt};
use chrono::{DateTime, Utc};
use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};
use rocksdb::DB;
use serde::{Deserialize, Deserializer};

impl CacheItem {
    pub fn new(key: String, expire: Option<DateTime<Utc>>) -> CacheItem {
        CacheItem { key, expire }
    }
}

#[derive(Clone, Copy, Debug)]
pub(crate) enum CacheItemRocksIndex {
    Key = 1,
}

rocks_table_impl!(CacheItem, CacheItemRocksTable, TableId::CacheItems, {
    vec![Box::new(CacheItemRocksIndex::Key)]
});

#[derive(Hash, Clone, Debug)]
pub enum CacheItemIndexKey {
    ByKey(String),
}

base_rocks_secondary_index!(CacheItem, CacheItemRocksIndex);

impl RocksSecondaryIndex<CacheItem, CacheItemIndexKey> for CacheItemRocksIndex {
    fn typed_key_by(&self, row: &CacheItem) -> CacheItemIndexKey {
        match self {
            CacheItemRocksIndex::Key => CacheItemIndexKey::ByKey(row.key.clone()),
        }
    }

    fn key_to_bytes(&self, key: &CacheItemIndexKey) -> Vec<u8> {
        match key {
            CacheItemIndexKey::ByKey(key) => key.as_bytes().to_vec(),
        }
    }

    fn is_unique(&self) -> bool {
        match self {
            CacheItemRocksIndex::Key => true,
        }
    }

    fn version(&self) -> u32 {
        match self {
            CacheItemRocksIndex::Key => 1,
        }
    }

    fn get_id(&self) -> IndexId {
        *self as IndexId
    }
}
