[
	"""create keyspace IF NOT EXISTS "${keyspace}" with replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};""".toString(),
	"""CREATE TABLE if not exists ${keyspace}.employee(id bigint PRIMARY KEY, name text, age int, salary float);""".toString()
]