# test-cassandra

Test pagination with angular 2 and cassandra


  After install cassandra:
```sql
CREATE KEYSPACE ranga WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}  AND durable_writes = true;

CREATE TABLE ranga.employee (
    id bigint PRIMARY KEY,
    age int,
    name text,
    salary float
);

```
