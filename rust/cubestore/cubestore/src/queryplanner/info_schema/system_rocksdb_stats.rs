use crate::metastore::table::TablePath;
use crate::metastore::{ColumnFamilyName, MetaStore};
use crate::queryplanner::InfoSchemaTableDef;
use crate::CubeError;
use arrow::array::{ArrayRef, BooleanArray, StringArray, TimestampNanosecondArray, UInt64Array};
use arrow::datatypes::{DataType, Field, TimeUnit};
use async_trait::async_trait;
use std::sync::Arc;

pub struct SystemRocksdbStatsRow {
    cf: String,
    stats: Option<String>,
}

pub struct SystemRocksdbStatsDef;

#[async_trait]
impl InfoSchemaTableDef for SystemRocksdbStatsDef {
    type T = SystemRocksdbStatsRow;

    async fn rows(&self, meta_store: Arc<dyn MetaStore>) -> Result<Arc<Vec<Self::T>>, CubeError> {
        let cfs = vec![ColumnFamilyName::Default, ColumnFamilyName::Cache];
        let mut result = Vec::with_capacity(cfs.len());

        for cfn in cfs {
            result.push(SystemRocksdbStatsRow {
                cf: "cache".to_string(),
                stats: meta_store.cf_statistics(cfn).await?,
            })
        }

        Ok(Arc::new(result))
    }

    fn columns(&self) -> Vec<(Field, Box<dyn Fn(Arc<Vec<Self::T>>) -> ArrayRef>)> {
        vec![
            (
                Field::new("cf", DataType::Utf8, false),
                Box::new(|rows| {
                    Arc::new(StringArray::from_iter(
                        rows.iter().map(|row| Some(&row.cf)).collect::<Vec<_>>(),
                    ))
                }),
            ),
            (
                Field::new("value", DataType::Utf8, false),
                Box::new(|rows| {
                    Arc::new(StringArray::from_iter(
                        rows.iter()
                            .map(|row| row.stats.as_ref())
                            .collect::<Vec<_>>(),
                    ))
                }),
            ),
        ]
    }
}

crate::base_info_schema_table_def!(SystemRocksdbStatsDef);