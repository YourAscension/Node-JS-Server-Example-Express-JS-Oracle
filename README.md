# Node JS Server Example: Express JS + Oracle

Dependencies:

1. express
2. oracledb

DevDependencies:

1. nodemon

Oracle DB create table query:

```
   create table todos (
    dbid varchar2(512) default regexp_replace(rawtohex(sys_guid()), '([A-F0-9]{8})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{12})', '\1-\2-\3-\4-\5') primary key,
    todo NVARCHAR2(256) not null,
    is_completed char(1) not null,
    created_at date DEFAULT current_date,
    updated_at date DEFAULT current_date
    );
```
